import React, {ChangeEvent} from 'react';
import {FilterType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {CheckBox} from "@material-ui/icons";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (value: FilterType, todolistID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeCheckbox: (id: string, taskIsDone: boolean, todoListID: string) => void
    todoID: string
    filter: FilterType
    removeTodoList: (id: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (todoId: string, newTile: string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.todoID)
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.todoID, newTitle)
    }

    const changeFilterAll = () => props.changeFilter('all', props.todoID)
    const changeFilterActive = () => props.changeFilter('active', props.todoID)
    const changeFilterComplete = () => props.changeFilter('completed', props.todoID)

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
            <IconButton aria-label="delete">
                <DeleteIcon onClick={() => props.removeTodoList(props.todoID)}/>
            </IconButton>
        </h3>
        <div>
            <AddItemForm addItem={addTask}/>
        </div>
        <ul>
            {
                props.tasks.map(f => {

                    const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDone = e.currentTarget.checked
                        props.changeCheckbox(f.id, newIsDone, props.todoID)
                    }

                    const onChangeTitle = (newValue: string) => {
                        props.changeTaskTitle(f.id, newValue, props.todoID)
                    }

                    return (
                        <div key={f.id}><Checkbox checked={f.isDone} onChange={changeCheckboxHandler}/>
                            <EditableSpan title={f.title} onChange={onChangeTitle}/>
                            <IconButton aria-label="delete">
                                <DeleteIcon onClick={() => props.removeTask(f.id, props.todoID)}/>
                            </IconButton>
                        </div>
                    )
                })
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
}
