import {combineReducers, createStore, applyMiddleware} from 'redux';
import {tasksReducer} from "./tasks-reducers";
import {todoListReducer} from "./todolist-reducer";
import thunk from "redux-thunk";
import {appReducer} from "../app/app-reducer";
import {authReducer} from "../features/Login/authReducer";
import {configureStore} from "@reduxjs/toolkit";

// объединяя reducer-ы с помощью combineReducers,


// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer,
    app: appReducer,
    auth: authReducer
})
// непосредственно создаём store
// export const store = createStore(rootReducer, applyMiddleware(thunk));

//Redux Toolkit
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;