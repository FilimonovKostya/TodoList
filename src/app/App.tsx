import React from "react";
import "./App.css";
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar} from "@material-ui/core";
import {TodolistList} from "../features/Todolists/TodolistList";
import MenuIcon from "@material-ui/icons/Menu";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";

export type FilterType = "all" | "active" | "completed";


export type TodolistType = {
    id: string;
    title: string;
    filter: FilterType;
};

function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            <ErrorSnackBar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>
            <Container fixed>
                <TodolistList/>
            </Container>
        </div>
    );

}


export default App
