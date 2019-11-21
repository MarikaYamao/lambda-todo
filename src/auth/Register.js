import React from 'react'
import {CognitoUserPool, CognitoUserAttribute} from 'amazon-cognito-identity-js'
import * as appConfig from '../appConfig'

const userPool = new CognitoUserPool({
    UserPoolId: appConfig.USER_POOL_ID,
    ClientId: appConfig.CLIENT_ID
})
const Register = (props) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')
    const [error, setError] = React.useState('')
    const changedEmailHandler = (e) => setEmail(e.target.value)
    const changedPasswordHandler = (e) => setPassword(e.target.value)
    const changedNameHandler = (e) => setName(e.target.value)
    
    const signUp = () => {
        const attributeList = [
                new CognitoUserAttribute({
                    Name: 'email',
                    Value: email
                }),
                new CognitoUserAttribute({
                    Name: 'name',
                    Value: name
                })
            ]
        // cognitoに登録処理
        userPool.signUp(email, password, attributeList, [], (err, result) => {
            if(err){
                setError(err)
                console.log(err)
            }else{
                console.log('user name is '+ result.user.getUsername())
                console.log('call result: '+ result)
                props.success();
            }
            // 空に戻しておく
            setEmail('')
            setPassword('')
            setName('')
        })
    }
    return(
        <div className="Register">
            <h2>Register</h2>
            {error && <p>error : {error.message}</p>}
            <input type="text" placeholder="email" onChange={changedEmailHandler}/>
            <input type="text" placeholder="name" onChange={changedNameHandler}/>
            <input type="password" placeholder="password" onChange={changedPasswordHandler} />
            <button onClick={signUp}>SignUp</button>
        </div>
        )
}
export default Register