import React from 'react'

// auth
import Register from '../auth/Register'
import SignIn from '../auth/Signin'
import SignOut from '../auth/Signout'
import Verification from '../auth/Verification'

const Auth = (props) => {
    // 現在の状態取得
    const [currentPage, setCurrentPage] = React.useState('')
    if(props.cognitoUser){
        // 親にトークンを渡す
        return (
          <div className="authorizeMode">
            <SignOut />
          </div>
        )
    }else{
        let Content = null
        switch (currentPage) {
          case 'Register':
            Content = (<Register success={() => setCurrentPage('Verification')} />)
            break
          case 'SignIn':
            Content = (<SignIn success={() => setCurrentPage('SigninIn')}/>)
            break
          case 'Verification':
            Content = (<Verification />)
            break
          default:
            break
        }
      return (
          <div className="unauthorizeMode">
            <span className="btn" onClick={() => setCurrentPage('Register')}>Register</span>
            <span className="btn" onClick={() => setCurrentPage('SignIn')}>SignIn</span>
            <div>{Content}</div>
          </div>
        )
    }
}
export default Auth