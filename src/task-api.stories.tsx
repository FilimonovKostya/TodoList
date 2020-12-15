import React, {useEffect, useState} from "react";
import Axios from "axios";
import {taskAPI} from "./api/task-api";
import {v1} from "uuid";

export default {
    title: 'Task-API',
}


export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todoListID = '5734efd1-6495-4d71-bb4d-a75f9ed4de40'

        taskAPI().getTask(todoListID)
            .then(res => {
                debugger
                setState(res.data.items)
            },)
    }, [])

     return <div>{JSON.stringify(state)}</div>

}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todoListID = '5734efd1-6495-4d71-bb4d-a75f9ed4de40'
        const titleTask = 'NEW CREATE TASK BY ME ---->'

        taskAPI().createTask(todoListID, titleTask)
            .then(res => {
                setState(res.data)
            })
    }, [])

     return <div>{JSON.stringify(state)}</div>

}


export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const taskID = '31fe543f-d77a-4a94-a49b-d76fcebd21b7'
        const todoListID = '5734efd1-6495-4d71-bb4d-a75f9ed4de40'

        taskAPI().deleteTask(todoListID, taskID)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const UpdateTitleTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const taskID = 'd2294579-c6c1-4e1a-b0b0-51862d044203'
        const todoListID = '5734efd1-6495-4d71-bb4d-a75f9ed4de40'
        const newTitle = 'NEW-TITLE CHAAAAAAAAAANGE'

        taskAPI().updateTitleTask(todoListID, taskID, newTitle)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}