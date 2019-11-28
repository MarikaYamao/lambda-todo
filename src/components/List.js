import React from 'react'
import * as appConfig from '../appConfig'
import axios from 'axios'

const List = (props) => {
    const [complete, setComplete] = useState(false)
    const updateTodo = () => {
        
    }
    
    return(
        <li className={props.class} key={props.key}><button type="button" onClick={}/>{props.content}</li>
    )
}
export default List