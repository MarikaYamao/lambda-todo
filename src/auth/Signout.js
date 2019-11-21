import React from 'react'
import {CognitoUserPool} from 'amazon-cognito-identity-js'
import * as appConfig from '../appConfig'

const userPool = new CognitoUserPool({
    UserPoolId: appConfig.USER_POOL_ID,
    ClientId: appConfig.CLIENT_ID
})
const Signout = () => {
    const signOut = () => {
        var confirm = window.confirm('Are you sure?');
        if(confirm){
            const cognitoUser = userPool.getCurrentUser()
            if(cognitoUser){
                cognitoUser.signOut()
                localStorage.clear()
                window.location.reload()
            }else{
                localStorage.clear()
            }
        }
    }
    return (
        <div className="SignOut">
          <span onClick={signOut}>Sign Out</span>
        </div>
    )
}
export default Signout