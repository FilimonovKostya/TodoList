import {todolistAPI, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type FilterType = "all" | "active" | "completed";

export type TodoListDomainType = TodoListType & {
    filter: FilterType
    entityStatus: RequestStatusType
}

const initialState: Array<TodoListDomainType> = []


const slice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        setTodoListsAC: (state, action: PayloadAction<{ todoLists: TodoListType[] }>) => {
            return action.payload.todoLists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        },
        addTodoListAC: (state, action: PayloadAction<{ todoList: TodoListType }>) => {
            state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'})
        },
        removeTodoListAC: (state, action: PayloadAction<{ todolistID: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistID)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        changeTitleTodoListAC: (state, action: PayloadAction<{ title: string, id: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeFilterTodoListAC: (state, action: PayloadAction<{ filter: FilterType, id: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC: (state, action: PayloadAction<{ entifyStatus: RequestStatusType, todoID: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoID)
            state[index].entityStatus = action.payload.entifyStatus
        },
    }
})

export const todoListReducer = slice.reducer
export const {addTodoListAC, changeFilterTodoListAC, changeTitleTodoListAC, changeTodolistEntityStatusAC, removeTodoListAC, setTodoListsAC} = slice.actions

//ThunkCreator
export const setTodoListsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI().getTodoList()
        .then(res => {
            dispatch(setTodoListsAC({todoLists: res.data}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const removeTodoListTC = (todolistID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({entifyStatus: 'loading', todoID: todolistID}))
    todolistAPI().deleteTodoList(todolistID)
        .then(() => {
            dispatch(removeTodoListAC({todolistID}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const createTodoListTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI().createTodoList(title)
        .then((res) => {
            if (res.data.resultCode === 0) {

                dispatch(addTodoListAC({todoList: res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC({error: res.data.messages[0]}))
                } else {
                    dispatch(setAppErrorAC({error: 'Some Error'}))
                }
                dispatch(setAppStatusAC({status: 'failed'}))
            }
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppStatusAC({status: 'failed'}))
        })
}
export const changeTitleTodoListTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI().updateTodolist(todolistID, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTitleTodoListAC({title, id: todolistID}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC({error: res.data.messages[0]}))
                } else {
                    dispatch(setAppErrorAC({error: 'Some Error'}))
                }
                dispatch(setAppStatusAC({status: 'failed'}))
            }
        })
}


