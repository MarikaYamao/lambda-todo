import React from 'react'
import {CognitoUserPool, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js'
import * as appConfig from '../appConfig'

const userPool = new CognitoUserPool({
    UserPoolId: appConfig.USER_POOL_ID,
    ClientId: appConfig.CLIENT_ID
})

const Signin = (props) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')
    const changedEmailHandler = (e) => setEmail(e.target.value)
    const changedPasswordHandler = (e) => setPassword(e.target.value)
    
    const signIn = () => {
        const authenticationDetails = new AuthenticationDetails({
            Username : email,
            Password : password
        })
        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: userPool
        })
        
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                console.log(result)
                window.location.reload()
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
            <input type="text" placeholder='email' onChange={changedEmailHandler}/>
            <input type="password" placeholder='password' onChange={changedPasswordHandler}/>
            <button onClick={signIn}>Sign In</button>
        </div>
        )
}
export default Signin