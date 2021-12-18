import React, {useEffect, useState} from "react";
import {taskAPI} from "./api/task-api";

export default {
    title: 'Task-API',
}


export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todoListID = '5734efd1-6495-4d71-bb4d-a75f9ed4de40'

        taskAPI().getTask(todoListID)
            .then(res => {

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
        const taskID = '81acd870-6693-4abf-bc3d-ffb9aeceb245'
        const todoListID = '5734efd1-6495-4d71-bb4d-a75f9ed4de40'
        const newTitle = 'Change Title 2222222'

        taskAPI().updateTask(todoListID, taskID, {title: newTitle})
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}