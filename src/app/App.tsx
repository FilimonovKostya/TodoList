import React from "react";
import "./App.css";
import {TaskType} from "../api/task-api";
import {AppBar, Button, Container, IconButton, Toolbar} from "@material-ui/core";
import {TodolistList} from "../features/Todolists/TodolistList";
import MenuIcon from "@material-ui/icons/Menu";

export type FilterType = "all" | "active" | "completed";

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterType;
};

function App() {

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <TodolistList/>
            </Container>
        </div>
    );

}


export default App
