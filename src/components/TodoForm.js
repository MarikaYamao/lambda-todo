import React from 'react'
import * as appConfig from '../appConfig'
import axios from 'axios'

const TodoForm= (props) => {
    const [content, setContent] = React.useState('')
    const changedContentHandler = (e) => setContent(e.target.value)
    
    const postDataFromApi = () => {
        axios({
            method: 'POST',
            url: appConfig.INVOKE_URL + '/todo',
            headers: {
                Authorization: props.accessToken
            },
            data: JSON.stringify({
                content: content
            }),
            contentType: 'application/json'
        })
        .then((results) => {
            console.log(results)
        }).catch((error) => {
            console.log(error)
        })
        setContent('')
    }
    return(
        <div className="todoForm">
            <input type="text" placeholder='todo .... ' onChange={changedContentHandler} value={content}/>
            <button onClick={postDataFromApi}>Sign In</button>
        </div>
        )
}
export default TodoForm