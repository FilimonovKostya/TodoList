import React, {useCallback} from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography,} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Paper from "@material-ui/core/Paper";
import {
    addTodoListAC,
    changeFilterTodoListAC,
    changeTitleTodoListAC,
    removeTodoListAC,
    todoListReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducers";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

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

    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((id: string, todoListID: string) => {
        dispatch(removeTaskAC(id, todoListID))
    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }, [dispatch])

    const changeCheckbox = useCallback((id: string, taskIsDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(todoListID, id, taskIsDone))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterType, todolistID: string) => {
        dispatch(changeFilterTodoListAC(value, todolistID))
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistID: string) => {
        dispatch(changeTaskTitleAC(todolistID, id, newTitle))
    }, [dispatch])

    const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTitleTodoListAC(newTitle, id))
    }, [dispatch])

    const removeTodoList = useCallback((id: string) => {
        dispatch(removeTodoListAC(id))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
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
                        let tasksForTodolist = allTodoListTasks;

                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        title={tl.title}
                                        key={tl.id}
                                        todoID={tl.id}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        tasks={tasksForTodolist}
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
