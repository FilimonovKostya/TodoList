import {todolistAPI, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../app/app-reducer";

export type FilterType = "all" | "active" | "completed";


export type TodoListDomainType = TodoListType & {
    filter: FilterType
    entityStatus: RequestStatusType
}

export type ActionType =
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTitleTodoListAC>
    | ReturnType<typeof changeFilterTodoListAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

type ToolkitActionType = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>

const initialState: Array<TodoListDomainType> = []

export const todoListReducer = (state: Array<TodoListDomainType> = initialState, action: ActionType & ToolkitActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        case "REMOVE-TODOLIST":
            return state.filter(f => f.id !== action.todolistID)
        case "ADD-TODOLIST" :
            return [{...action.todoList, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGING-TITLE-TODOLIST' :
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGED-FILTER-TODOLIST':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-ENTIFY-STATUS":
            return state.map(tl => tl.id === action.todoID ? {...tl, entityStatus: action.entifyStatus} : tl)
        default:
            return state
    }
};

//Actions
export const removeTodoListAC = (todolistID: string) => ({type: "REMOVE-TODOLIST", todolistID} as const)
export const addTodoListAC = (todoList: TodoListType) => ({type: "ADD-TODOLIST", todoList} as const)
export const changeTitleTodoListAC = (title: string, id: string) => ({
    type: "CHANGING-TITLE-TODOLIST",
    title,
    id
} as const)
export const changeFilterTodoListAC = (filter: FilterType, id: string) => ({
    type: "CHANGED-FILTER-TODOLIST",
    filter,
    id
} as const)
export const setTodoListsAC = (todoLists: TodoListType[]) => ({type: "SET-TODOLISTS", todoLists} as const)
export const changeTodolistEntityStatusAC = (entifyStatus: RequestStatusType, todoID: string) => ({
    type: 'CHANGE-TODOLIST-ENTIFY-STATUS',
    entifyStatus,
    todoID
} as const)

//ThunkCreator
export const setTodoListsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI().getTodoList()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const removeTodoListTC = (todolistID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC('loading', todolistID))
    todolistAPI().deleteTodoList(todolistID)
        .then(() => {
            dispatch(removeTodoListAC(todolistID))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const createTodoListTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI().createTodoList(title)
        .then((res) => {
            if (res.data.resultCode === 0) {

                dispatch(addTodoListAC(res.data.data.item))
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
                dispatch(changeTitleTodoListAC(title, todolistID))
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


