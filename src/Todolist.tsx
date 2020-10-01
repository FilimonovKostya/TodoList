import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterType} from './App';

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
    changeCheckbox:(id: string, taskIsDone: boolean, todoListID: string) => void
    todoID:string
    filter:FilterType
    removeTodoList:(id:string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
debugger
    const addTask = () => {

        if (title.trim()) {
            props.addTask(title.trim(), props.todoID)
            setTitle('')
            setError(null)
        } else {
            setError('Введите имя')
            setTitle('')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)

        if (e.key === 'Enter') {
            addTask()
        }
    }

    const changeFilterAll = () => props.changeFilter('all', props.todoID)
    const changeFilterActive = () => props.changeFilter('active', props.todoID)
    const changeFilterComplete = () => props.changeFilter('completed', props.todoID)

    return <div>
        <h3>{props.title} <button onClick={() => props.removeTodoList(props.todoID)}>X</button></h3>
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} className={error ? 'error' : ''}/>
            <button onClick={addTask}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(f => {

                    const changeCheckboxHandler = (e:ChangeEvent<HTMLInputElement>) => {                   let newIsDone = e.currentTarget.checked
                        props.changeCheckbox(f.id,newIsDone,props.todoID)

                    }

                    return (
                        <li key={f.id}><input type="checkbox" checked={f.isDone} onChange={changeCheckboxHandler} /><span>{f.title}</span>
                            <button onClick={() => props.removeTask(f.id,props.todoID)}>X</button>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'button' : ''} onClick={changeFilterAll}>All</button>
            <button className={props.filter === 'active' ? 'button' : ''} onClick={changeFilterActive}>Active</button>
            <button className={props.filter === 'completed' ? 'button' : ''} onClick={changeFilterComplete}>Completed</button>
        </div>
    </div>
}
