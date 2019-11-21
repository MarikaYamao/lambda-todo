import React from 'react'
import './App.css'

import {CognitoUserPool} from 'amazon-cognito-identity-js'
import * as appConfig from './appConfig'

// auth
import Register from './auth/Register'
import SignIn from './auth/Signin'
import SignOut from './auth/Signout'
import Verification from './auth/Verification'

// todo
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'

const userPool = new CognitoUserPool({
    UserPoolId: appConfig.USER_POOL_ID,
    ClientId: appConfig.CLIENT_ID
})

const App = () => {
  const [currentPage, setCurrentPage] = React.useState('')
  const [todoList, setTodoList] = React.useState({})
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
  const authentication = () => {
    const cognitoUser = userPool.getCurrentUser()
    if(cognitoUser){
      var token
      cognitoUser.getSession((err, session)=>{
        if(err){
          console.log(err)
        }else{
          console.log(session)
          token = session.getIdToken().getJwtToken()
        }
      })
      return (
          <div className="authorizeMode">
            <SignOut />
            <TodoList accessToken={token} />
            <TodoForm accessToken={token} />
          </div>
        )
    }else{
      return (
          <div className="unauthorizeMode">
            <span onClick={() => setCurrentPage('Register')}>Register</span>
            <span onClick={() => setCurrentPage('SignIn')}>SignIn</span>
            <div>{Content}</div>
          </div>
        )
    }
  }
  
  return (
      <div className="App">
        {authentication()}
      </div>
    )
}
export default App