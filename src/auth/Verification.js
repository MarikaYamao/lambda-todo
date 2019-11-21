import React from 'react'
import {CognitoUserPool, CognitoUser} from 'amazon-cognito-identity-js'
import * as appConfig from '../appConfig'

const userPool = new CognitoUserPool({
    UserPoolId: appConfig.USER_POOL_ID,
    ClientId: appConfig.CLIENT_ID
})
const Verification = () => {
    const [email, setEmail] = React.useState('')
    const [verificationCode, setVerificationCode] = React.useState('')
    const changedEmailHandler = (e) => setEmail(e.target.value)
    const changedVerificationCode = (e) => setVerificationCode(e.target.value)
    
    const verifyCode = () => {
        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: userPool
        })
        cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
            if(err){
                console.log(err)
                return
            }else{
                console.log(result)
                setEmail('')
                setVerificationCode('')
                window.location.reload()
            }
        })
    }
    
    return(
            <div className="Verification">
                <h2>Verification</h2>
                <input type="text" placeholder="verification code" onChange={changedVerificationCode}/>
                <input type="text" placeholder="email" onChange={changedEmailHandler}/>
                <button onClick={verifyCode}>Authenticate</button>
            </div>
        )
}

export default Verification