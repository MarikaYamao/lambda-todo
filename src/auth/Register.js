import React from 'react'
import {CognitoUserPool, CognitoUserAttribute} from 'amazon-cognito-identity-js'
import * as appConfig from '../appConfig'

const userPool = new CognitoUserPool({
    UserPoolId: appConfig.USER_POOL_ID,
    ClientId: appConfig.CLIENT_ID
})
const Register = (props) => {
    const [error, setError] = React.useState('')
    const signUp = (e) => {
        const attributeList = [
                new CognitoUserAttribute({
                    Name: 'email',
                    Value: e.target.email.value
                }),
                new CognitoUserAttribute({
                    Name: 'name',
                    Value: e.target.name.value
                })
            ]
        // cognitoに登録処理
        userPool.signUp(e.target.email.value, e.target.password.value, attributeList, [], (err, result) => {
            if(err){
                setError(err)
                console.log(err)
            }else{
                console.log('user name is '+ result.user.getUsername())
                console.log('call result: '+ result)
            }
        })
    }
    return(
        <div className="Register">
            <h2>Register</h2>
            {error && <p>error : {error.message}</p>}
            <form onSubmit={signUp}>
                <input type="text" name="email" placeholder="email"/>
                <input type="text" name="name" placeholder="name"/>
                <input type="password" name="password" placeholder="password"/>
                <input type="submit" value="Register" />
            </form>
        </div>
        )
}
export default Register