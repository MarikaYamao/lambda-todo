import React from 'react'
import './App.css'
import * as appConfig from './appConfig'
import {CognitoUserPool} from 'amazon-cognito-identity-js'
import axios from 'axios'

import Auth from './components/Auth'
import Todo from './components/Todo'

// ユーザー認証
const userPool = new CognitoUserPool({
    UserPoolId: appConfig.USER_POOL_ID,
    ClientId: appConfig.CLIENT_ID
})
const cognitoUser = userPool.getCurrentUser()
const token = cognitoUser ? cognitoUser.getSession((err, session)=>{
        if(err){
            console.log(err)
        }else{
            console.log(session)
            return session.getIdToken().getJwtToken()
        }
    }) : null

export default class App extends React.Component {
    state = {
        token: token,
        todoList: []
    }
    componentWillMount(){
        if(!token)return
        return axios.get(appConfig.INVOKE_URL + '/todo'
                            , { headers: {
                                'Content-Type': 'application/json',
                                'Authorization': token
                                } 
                            })
                        .then((results) => {        
                            this.setState({ todoList: results.data.Items })
                        }).catch((error) => {
                            console.log(error)
                        })
    }
    
    render(){
        return (
            <div className="App">
                <Auth cognitoUser={cognitoUser}/>
                { token && 
                <Todo accessToken={this.state.token} todos={this.state.todoList}/>}
            </div>
        )
    }
}