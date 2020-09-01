import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import { FilterType } from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id:string) => void
    changeFilter:(value:FilterType) => void
    addTask:(task:string) => void
}

export function Todolist(props: PropsType) {

    let [title,setTitle] = useState('')

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>  setTitle(e.currentTarget.value)

    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {if (e.key === 'Enter') { addTask() }}

    const changeFilterAll = () => props.changeFilter('all')
    const changeFilterActive = () => props.changeFilter('active')
    const changeFilterComplete = () => props.changeFilter('completed')

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map( f => {
                    return (
                    <li key={f.id}><input type="checkbox" checked={f.isDone}/><span>{f.title}</span>
                    <button onClick={() => props.removeTask(f.id)}>X</button>
                    </li>
                    )
                })
            }
        </ul>
        <div>
            <button onClick={changeFilterAll}>All</button>
            <button onClick={changeFilterActive}>Active</button>
            <button onClick={changeFilterComplete}>Completed</button>
        </div>
    </div>
}
