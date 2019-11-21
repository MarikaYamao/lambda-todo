import React from 'react'
import * as appConfig from '../appConfig'
import axios from 'axios'

const getList = (accessToken) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': accessToken
        } 
    axios.get(appConfig.INVOKE_URL + '/todo', { headers: headers  })
    .then((results) => {
        console.log(results.data.Items)
        // 通信に成功してレスポンスが返ってきた時に実行したい処理
        for (var item in results.data.Items) {
          items.push(results.data.Items[item].content)
        }
    }).catch((error) => {
        console.log(error)
        // 通信に失敗してレスポンスが返ってこなかった時に実行したい処理
    })
}

const TodoList = (props) => {
    getList(props.accessToken)

    var items = []
    getList()
    console.log(items)
    return(
        <div className="todoList">
            <h2>TODO LIST</h2>
            <ul>{}</ul>
            <p>todoList</p>
        </div>
        )
}
export default TodoList