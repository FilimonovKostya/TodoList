import React, {ChangeEvent} from "react";
import {FilterType} from "../../App";
import {TodolistForm} from "../TodolistForm";
import {EditableSpan} from "../EditableSpan";

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

    const onChangeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.todoID, newTitle)
    }

    const changeFilterAll = () => props.changeFilter('all', props.todoID)
    const changeFilterActive = () => props.changeFilter('active', props.todoID)
    const changeFilterComplete = () => props.changeFilter('completed', props.todoID)

    return <div>
        <h3><EditableSpan titleName={props.title} onChange={onChangeTodoListTitle}/>
            <button onClick={() => props.removeTodoList(props.todoID)}>X</button>
        </h3>
        <div>
            <TodolistForm addItem={addTask}/>
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
                        <li key={f.id}><input type="checkbox" checked={f.isDone} onChange={changeCheckboxHandler}/>
                            <EditableSpan titleName={f.title} onChange={onChangeTitle}/>
                            <button onClick={() => props.removeTask(f.id, props.todoID)}>X</button>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'button' : ''} onClick={changeFilterAll}>All</button>
            <button className={props.filter === 'active' ? 'button' : ''} onClick={changeFilterActive}>Active</button>
            <button className={props.filter === 'completed' ? 'button' : ''} onClick={changeFilterComplete}>Completed
            </button>
        </div>
    </div>
}