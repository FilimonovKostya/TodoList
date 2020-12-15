import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import {todolistAPI} from "./api/todolist-api";

export default {
    title: 'API'
}


export const GetTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistAPI().getTodoList()
            .then(response => {

                setState(response.data)

            },)
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        let titleTodoList = 'CSS'
        todolistAPI().createTodoList(titleTodoList)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        let todolist = '67c64354-f9be-48f8-a733-dff0ad50588e'
        todolistAPI().deleteTodoList(todolist)
            .then(res => {
                debugger
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolist = 'd63328d2-e81e-4792-a63d-70ec9c64e9c7'
        todolistAPI().updateTodolist(todolist, 'React')
            .then(res => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
