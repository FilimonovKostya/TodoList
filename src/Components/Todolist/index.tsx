import React, {ChangeEvent, FC} from "react";
import {FilterType} from "../App";
import {TodolistForm} from "../TodolistForm";
import {EditableSpan} from "../EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type Props = {
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

export const Todolist: FC<Props> = ({
   addTask,
   title,
   changeTaskTitle,
   changeCheckbox,
   changeFilter,
   changeTodoListTitle,
   removeTodoList,
   todoID,
   removeTask,
   filter,
   tasks
}): JSX.Element => {

    const addTaskItem = (title: string): void => addTask(title, todoID)

    const onChangeTodoListTitle = (newTitle: string): void => changeTodoListTitle(todoID, newTitle)

    const changeFilterAll = (): void => changeFilter('all', todoID)
    const changeFilterActive = (): void => changeFilter('active', todoID)
    const changeFilterComplete = (): void => changeFilter('completed', todoID)

    return <div>
        <h3><EditableSpan titleName={title} onChange={onChangeTodoListTitle}/>
            <button onClick={() => removeTodoList(todoID)}>X</button>
        </h3>
        <div>
            <TodolistForm addItem={addTaskItem}/>
        </div>
        <ul>
            {
                tasks.map(f => {

                    const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>): void => {
                        let newIsDone = e.currentTarget.checked
                        changeCheckbox(f.id, newIsDone, todoID)
                    }

                    const onChangeTitle = (newValue: string): void => changeTaskTitle(f.id, newValue, todoID)


                    return <li key={f.id}><input type="checkbox" checked={f.isDone} onChange={changeCheckboxHandler}/>
                        <EditableSpan titleName={f.title} onChange={onChangeTitle}/>
                        <button onClick={() => removeTask(f.id, todoID)}>X</button>
                    </li>

                })
            }
        </ul>
        <div>
            <button className={filter === 'all' ? 'button' : ''} onClick={changeFilterAll}>All</button>
            <button className={filter === 'active' ? 'button' : ''} onClick={changeFilterActive}>Active</button>
            <button className={filter === 'completed' ? 'button' : ''} onClick={changeFilterComplete}>Completed
            </button>
        </div>
    </div>
}