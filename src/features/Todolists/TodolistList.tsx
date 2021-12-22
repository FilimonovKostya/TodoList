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

type PropsType = {
    demo?: boolean
}

export const TodolistList = ({demo = false}: PropsType) => {

    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(setTodoListsTC())
    }, [dispatch])

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        const thunk = removeTaskTC({todoListID, taskID})
        dispatch(thunk)
    }, [dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(createTaskTC({title, todolistId}))
    }, [dispatch])

    const changeStatus = useCallback((taskId: string, todolistId: string, status: TaskStatuses) => {
        // dispatch(updateTaskTC(taskId, todolistId, {status}))
        dispatch(updateTaskTC({taskId, todolistId, domainModule: {status}}))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterType, todolistID: string) => {
        dispatch(changeFilterTodoListAC({filter: value, id: todolistID}))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, todolistId: string, title: string) => {

        // dispatch(updateTaskTC(id, todolistID, {title}))
        dispatch(updateTaskTC({taskId, todolistId, domainModule: {title}}))
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

    if (!isLoggedIn) {
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
                                          changeTodoListTitle={changeTodoListTitle}
                                          demo={demo}
                                />
                            </Paper>
                        </Grid>
                    )
                })
            }
        </Grid>
    </>


}