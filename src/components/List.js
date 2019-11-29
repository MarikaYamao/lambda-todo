import React from 'react'
import * as appConfig from '../appConfig'
import axios from 'axios'

const List = (props) => {
    const [complete, setComplete] = React.useState(false)
    const updateTodo = () => {
        
    }
    
    return(
        <li className={props.class} key={props.key}><button type="button"/>{props.content}</li>
    )
}
export default List