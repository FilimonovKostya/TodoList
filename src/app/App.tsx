import React, {useEffect} from "react";
import "./App.css";
import {AppBar, Button, CircularProgress, Container, IconButton, LinearProgress, Toolbar} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {Route, Switch, Redirect} from "react-router-dom";
import {TodolistList} from "../features/Todolists/TodolistList";
import {Login} from "../features/Login/Login";
import {logoutTC} from "../features/Login/authReducer";

export type FilterType = "all" | "active" | "completed";


export type TodolistType = {
    id: string;
    title: string;
    filter: FilterType;
};

function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    const onClickHandler = () => dispatch(logoutTC())

    return (
        <div className="App">
            <ErrorSnackBar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    {isLoggedIn && <Button color="inherit" onClick={onClickHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistList/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>
        </div>
    );

}


export default App
