import React, {useCallback, useEffect} from "react";
import "./App.css";
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography,} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Paper from "@material-ui/core/Paper";
import {changeFilterTodoListAC, changeTitleTodoListTC, createTodoListTC, removeTodoListTC, setTodoListsTC, TodoListDomainType,} from "./state/todolist-reducer";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskTC, removeTaskAC} from "./state/tasks-reducers";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatus, TaskType} from "./api/task-api";

export type FilterType = "all" | "active" | "completed";

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};


export type TodolistType = {
    id: string;
    title: string;
    filter: FilterType;
};

function AppWithRedux() {

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
        // dispatch(changeTitleTodoListAC(newTitle, id))
        dispatch(changeTitleTodoListTC(newTitle, id))
    }, [dispatch])


    const removeTodoList = useCallback((id: string) => {
        // dispatch(removeTodoListAC(id))
        dispatch(removeTodoListTC(id))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        // dispatch(addTodoListAC(title))
        dispatch(createTodoListTC(title))
    }, [dispatch])


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">News</Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map((tl) => {
                        let allTodoListTasks = tasks[tl.id];
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        title={tl.title}
                                        key={tl.id}
                                        todoID={tl.id}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        tasks={allTodoListTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeCheckbox={changeCheckbox}
                                        filter={tl.filter}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux
