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
import {createTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from "../../state/tasks-reducers";
import {Grid} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import Paper from "@material-ui/core/Paper";
import {Todolist} from "./Todolist/Todolist";
import {FilterType} from "../../app/App";
import {TaskStatuses} from "../../api/todolist-api";
import {RequestStatusType} from "../../app/app-reducer";
import {Redirect} from "react-router-dom";

export const TodolistList = () => {

    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(setTodoListsTC())
    }, [dispatch])

    const removeTask = useCallback((id: string, todoListID: string) => {
        const thunk = removeTaskTC(todoListID, id)
        dispatch(thunk)
    }, [dispatch])

    const addTask = useCallback((todoListID: string, title: string) => {
        dispatch(createTaskTC(todoListID, title))
    }, [dispatch])

    const changeStatus = useCallback((id: string, todoListID: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(id, todoListID, {status}))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterType, todolistID: string) => {
        dispatch(changeFilterTodoListAC(value, todolistID))
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, todolistID: string, title: string) => {
        debugger
        dispatch(updateTaskTC(id, todolistID, {title}))
    }, [dispatch])

    const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTitleTodoListTC(id, newTitle))
    }, [dispatch])

    const removeTodoList = useCallback((id: string) => {
        dispatch(removeTodoListTC(id))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodoListTC(title))
    }, [dispatch])

    if(!isLoggedIn){
        return <Redirect to={'/login'}/>
    }

    return <>
        <Grid style={{padding: '15px'}}>
            <AddItemForm addItem={addTodoList} disabled={status === 'loading'}/>
        </Grid>
        <Grid container={true} spacing={5}>
            {
                todoLists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]
                    return (

                        <Grid item={true} key={tl.id}> {/* //ячейки*/}
                            <Paper style={{padding: '15px'}} elevation={3}>
                                <Todolist entifyStatus={tl.entityStatus}
                                          title={tl.title}
                                          tasks={allTodolistTasks}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeStatus={changeStatus}
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