import React, {useEffect} from "react";
import "./App.css";
import {AppBar, Button, Container, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import {TodolistList} from "../features/Todolists/TodolistList";
import {Login} from "../features/Login/Login";
import {logoutTC} from "../features/Login/authReducer";

type PropsType = {
    demo?: boolean
}

export type FilterType = "all" | "active" | "completed";

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterType;
};

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const handleClick = () => {
        history.push("/");
    }

    const onClickHandler = () => dispatch(logoutTC())

    return (
        <div className="App">
            <ErrorSnackBar/>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant={"h6"} onClick={handleClick}>
                        TodoLists
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={onClickHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route exact path={'/'} render={() => <TodolistList demo={demo}/>}/>
                    <Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>
        </div>
    );

}


export default App
