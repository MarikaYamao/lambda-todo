import React from 'react'
import {CognitoUserPool, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js'
import * as appConfig from '../appConfig'

const userPool = new CognitoUserPool({
    UserPoolId: appConfig.USER_POOL_ID,
    ClientId: appConfig.CLIENT_ID
})

const Signin = (props) => {
    const [error, setError] = React.useState('')
    
    const signIn = (e) => {
        const authenticationDetails = new AuthenticationDetails({
            Username : e.target.email.value,
            Password : e.target.password.value
        })
        const cognitoUser = new CognitoUser({
            Username: e.target.email.value,
            Pool: userPool
        })
        
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                console.log(result)
                props.success()
            },
            onFailure: (err) => {
                setError(err)
                console.log(error)
            }
        })
    }
    
    return(
        <div className="SignIn">
            <h2>Sign In</h2>
            {error && <p>error : {error.message}</p>}
            <form onSubmit={signIn}>
                <input type="text" name="email" placeholder='email' />
                <input type="password" name="password" placeholder='password' />
                <input type="submit" value="SignIn" />
            </form>
        </div>
        )
}
export default Signin