import React, {useCallback} from 'react';
import {FilterType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {Task} from "./Task";


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

export const Todolist = React.memo((props: PropsType) => {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoID)
    }, [props.addTask, props.todoID])

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.todoID, newTitle)
    }, [props.todoID, props.changeTodoListTitle])

    const changeFilterAll = useCallback(() => props.changeFilter('all', props.todoID), [props.changeFilter, props.todoID])
    const changeFilterActive = useCallback(() => props.changeFilter('active', props.todoID), [props.changeFilter, props.todoID])
    const changeFilterComplete = useCallback(() => props.changeFilter('completed', props.todoID), [props.changeFilter, props.todoID])

    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter((f) => f.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter((f) => !f.isDone);
    }


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
                tasksForTodolist.map(f => <Task task={f}
                                                changeCheckbox={props.changeCheckbox}
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

