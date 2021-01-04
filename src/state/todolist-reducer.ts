import {v1} from "uuid";
import {todolistAPI, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";

export type FilterType = "all" | "active" | "completed";

export type TodoListDomainType = TodoListType & {
    filter: FilterType
}

export type ActionType =
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTitleTodoListAC>
    | ReturnType<typeof changeFilterTodoListAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>

const initialState: Array<TodoListDomainType> = []

export const todoListReducer = (state: Array<TodoListDomainType> = initialState, action: ActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.todoLists.map(tl => ({...tl, filter: 'all'}))
        case "REMOVE-TODOLIST":
            return state.filter(f => f.id !== action.todolistID)
        case "ADD-TODOLIST" :
            const newTodoList: TodoListDomainType = {id: action.todoListID, title: action.title, filter: "all", addedDate: '', order: 0}
            return [...state, newTodoList]
        case 'CHANGING-TITLE-TODOLIST' :
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGED-FILTER-TODOLIST':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return state
    }
};

export const removeTodoListAC = (todolistID: string) => ({type: "REMOVE-TODOLIST", todolistID} as const)

export const addTodoListAC = (title: string) => ({type: "ADD-TODOLIST", title, todoListID: v1()} as const)

export const changeTitleTodoListAC = (title: string, id: string) => ({type: "CHANGING-TITLE-TODOLIST", title, id} as const)

export const changeFilterTodoListAC = (filter: FilterType, id: string) => ({type: "CHANGED-FILTER-TODOLIST", filter, id} as const)

export const setTodoListsAC = (todoLists: TodoListType[]) => ({type: "SET-TODOLISTS", todoLists} as const)


//ThunkCreator
export const setTodoListsTC = () => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI().getTodoList()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const removeTodoListTC = (todolistID: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI().deleteTodoList(todolistID)
        .then(() => {
            dispatch(removeTodoListAC(todolistID))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const createTodoListTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI().createTodoList(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoListAC(title))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC('Some Error'))
                }
                dispatch(setAppStatusAC('failed'))
            }
        })
}

export const changeTitleTodoListTC = (todolistID: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI().updateTodolist(todolistID, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTitleTodoListAC(title, todolistID))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC('Some Error'))
                }
                dispatch(setAppStatusAC('failed'))
            }
        })
}


