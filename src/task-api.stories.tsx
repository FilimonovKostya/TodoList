import React, {useEffect, useState} from "react";
import Axios from "axios";
import {taskAPI} from "./api/task-api";
import {v1} from "uuid";

export default {
    title: 'Task-API',
}


export const getTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todoListID = '5734efd1-6495-4d71-bb4d-a75f9ed4de40'

        taskAPI().getTask(todoListID)
            .then(res => {
                debugger
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const createTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todoListID = '5734efd1-6495-4d71-bb4d-a75f9ed4de40'
        const titleTask = 'My TEST ONE'

        taskAPI().createTask(todoListID, titleTask)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const deleteTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const taskID = '4baff3a1-cbbf-469a-9552-dc2375ffa197'
        const todoListID = '5734efd1-6495-4d71-bb4d-a75f9ed4de40'

        taskAPI().deleteTask(todoListID, taskID)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const updateTitleTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const taskID = '4baff3a1-cbbf-469a-9552-dc2375ffa197'
        const todoListID = '5734efd1-6495-4d71-bb4d-a75f9ed4de40'

        taskAPI().updateTitleTask(todoListID, taskID)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}