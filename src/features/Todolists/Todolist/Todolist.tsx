import React, {useCallback, useEffect} from 'react';

import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {Task} from "./Task/Task";
import {FilterType} from '../../../state/todolist-reducer';
import {useDispatch} from "react-redux";
import {createTaskTC, setTaskTC} from "../../../state/tasks-reducers";
import {RequestStatusType} from "../../../app/app-reducer";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";


type PropsType = {
    entifyStatus:RequestStatusType
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (value: FilterType, todolistID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeStatus: (id: string, todoListID: string, status: TaskStatuses) => void
    todoID: string
    filter: FilterType
    removeTodoList: (id: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (todoId: string, newTile: string) => void
}

export const Todolist = React.memo((props: PropsType) => {

    const addTask = useCallback((title: string) => {
        dispatch(createTaskTC(props.todoID, title))
                // props.addTask(props.todoID, title)
    }, [])

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(setTaskTC(props.todoID))
    }, [])

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.todoID, newTitle)
    }, [props.todoID, props.changeTodoListTitle])

    const changeFilterAll = useCallback(() => props.changeFilter('all', props.todoID), [props.changeFilter, props.todoID])
    const changeFilterActive = useCallback(() => props.changeFilter('active', props.todoID), [props.changeFilter, props.todoID])
    const changeFilterComplete = useCallback(() => props.changeFilter('completed', props.todoID), [props.changeFilter, props.todoID])

    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter((f) => f.status === TaskStatuses.New);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter((f) => f.status === TaskStatuses.Completed);
    }


    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
            <IconButton aria-label="delete" disabled={props.entifyStatus === 'loading'}>
                <DeleteIcon onClick={() => props.removeTodoList(props.todoID)}/>
            </IconButton>
        </h3>
        <div>
            <AddItemForm addItem={addTask} disabled={props.entifyStatus === 'loading'}/>
        </div>
        <ul>
            {
                tasksForTodolist.map(f => <Task task={f}
                                                changeCheckbox={props.changeStatus}
                                                changeTaskTitle={props.changeTaskTitle}
                                                removeTask={props.removeTask}
                                                todoID={props.todoID}
                                                key={f.id}
                />)
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={changeFilterAll}>All</Button>
            <Button variant={props.filter === 'active' ? 'contained' : 'text'} color={"primary"}
                    onClick={changeFilterActive}>Active</Button>
            <Button variant={props.filter === 'completed' ? 'contained' : 'text'} color={"secondary"}
                    onClick={changeFilterComplete}>Completed</Button>
        </div>
    </div>
})

