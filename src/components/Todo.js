import React from 'react'
import * as appConfig from '../appConfig'
import axios from 'axios'

const Todo = (props) => {
    const list = props.todos.map((todo) => {
      return <li key={todo.TodoId}>{todo.content}</li>
    })
    const addTodo = (e) => {
        axios({
            method: 'POST',
            url: appConfig.INVOKE_URL + '/todo',
            headers: {
                Authorization: props.accessToken
            },
            data: JSON.stringify({
                content: e.target.content.value
            }),
            contentType: 'application/json'
        })
        .then((results) => {
            console.log(results)
        }).catch((error) => {
            console.log(error)
        })
    }
    return(
        <div>
            <form onSubmit={addTodo}>
                <input type="text" placeholder='todo .... ' name="content"/>
                <input type="submit" value="add" />
            </form>
            <ul>
                {list}
            </ul>
        </div>
        )
}
export default Todo