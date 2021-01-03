import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {
    changeFilterTodoListAC,
    changeTitleTodoListTC,
    createTodoListTC,
    removeTodoListTC,
    setTodoListsTC,
    TodoListDomainType
} from "../../state/todolist-reducer";
import React, {useCallback, useEffect} from "react";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskTC, removeTaskAC} from "../../state/tasks-reducers";
import {TaskStatus} from "../../api/task-api";
import {Grid} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import Paper from "@material-ui/core/Paper";
import {Todolist} from "./Todolist/Todolist";
import {FilterType, TasksStateType} from "../../app/App";

export const TodolistList = () => {

    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTodoListsTC())
    }, [dispatch])

    const removeTask = useCallback((id: string, todoListID: string) => {
        const thunk = removeTaskAC(id, todoListID)
        dispatch(thunk)
    }, [dispatch])

    const addTask = useCallback((todoListID: string, title: string) => {
        dispatch(createTaskTC(todoListID, title))
    }, [dispatch])

    const changeCheckbox = useCallback((id: string, status: TaskStatus, todoListID: string) => {
        dispatch(changeTaskStatusAC(todoListID, id, status))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterType, todolistID: string) => {
        dispatch(changeFilterTodoListAC(value, todolistID))
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistID: string) => {
        dispatch(changeTaskTitleAC(todolistID, id, newTitle))
    }, [dispatch])

    const changeTodoListTitle = useCallback((newTitle: string, id: string) => {
        dispatch(changeTitleTodoListTC(newTitle, id))
    }, [dispatch])

    const removeTodoList = useCallback((id: string) => {
        dispatch(removeTodoListTC(id))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodoListTC(title))
    }, [dispatch])

    return <>
        <Grid style={{padding: '15px'}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container={true} spacing={5}>
            {
                todoLists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]
                    return (

                        <Grid item={true} key={tl.id}> {/* //ячейки*/}
                            <Paper style={{padding: '15px'}} elevation={3}>
                                <Todolist title={tl.title}
                                          tasks={allTodolistTasks}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeCheckbox={changeCheckbox}
                                          todoID={tl.id}
                                          filter={tl.filter}
                                          removeTodoList={removeTodoList}
                                          changeTaskTitle={changeTaskTitle}
                                          changeTodoListTitle={changeTodoListTitle}/>
                            </Paper>
                        </Grid>
                    )
                })
            }
        </Grid>
    </>


}