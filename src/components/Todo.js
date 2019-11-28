import React from 'react'
import * as appConfig from '../appConfig'
import axios from 'axios'

import List from './List'

const Todo = (props) => {
    const [content, setContent] = React.useState('')
    const changedContentHandler = (e) => setContent(e.target.value)

    const list = props.todos.map((todo) => {
      return <List class={""} key={todo.TodoId} content={todo.content} />
    })
    const addTodo = () => {
        const text = content
        axios({
            method: 'POST',
            url: appConfig.INVOKE_URL + '/todo',
            headers: {
                Authorization: props.accessToken
            },
            data: JSON.stringify({
                content: text
            }),
            contentType: 'application/json'
        })
        .then((results) => {
            setContent('')
            props.getTodo()
            console.log(results)
        }).catch((error) => {
            console.log(error)
        })
    }
    return(
        <div>
            <input type="text" placeholder='todo .... ' value={content} onChange={changedContentHandler}/>
            <button onClick={addTodo}>add</button>
            <ul className="todoList">
                {list}
            </ul>
        </div>
        )
}
export default Todo