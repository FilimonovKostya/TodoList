import {v1} from "uuid";
import {todolistAPI, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";


export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todoListID: string
}

export type ChangingTitleTodolistActionType = {
    type: 'CHANGING-TITLE-TODOLIST'
    id: string
    title: string
}

export type ChangingFilterTodolistActionType = {
    type: 'CHANGED-FILTER-TODOLIST'
    id: string
    newFilter: FilterType
}

export type setTodoListsActionType = {
    type: 'SET-TODOLISTS'
    todoLists: TodoListType[]
}

export type FilterType = "all" | "active" | "completed";

export type TodoListDomainType = TodoListType & {
    filter: FilterType
}

export type ActionType =
    RemoveTodoListActionType
    | AddTodolistActionType
    | ChangingTitleTodolistActionType
    | ChangingFilterTodolistActionType
    | setTodoListsActionType

const initialState: Array<TodoListDomainType> = []

export const todoListReducer = (state: Array<TodoListDomainType> = initialState, action: ActionType): Array<TodoListDomainType> => {
    switch (action.type) {

        case "SET-TODOLISTS":
            return action.todoLists.map(tl => ({
                ...tl,
                filter: 'all'
            }))


        case "REMOVE-TODOLIST":
            return state.filter(f => f.id !== action.id)

        case "ADD-TODOLIST" :
            const newTodoList: TodoListDomainType = {id: action.todoListID, title: action.title, filter: "all", addedDate: '', order: 0}
            return [...state, newTodoList]

        case 'CHANGING-TITLE-TODOLIST' :
            let changingTitle = state.find(f => f.id === action.id)
            if (changingTitle) {
                changingTitle.title = action.title
            }
            return [...state]

        case 'CHANGED-FILTER-TODOLIST':
            let todolist = state.find(f => f.id === action.id)
            if (todolist) {
                todolist.filter = action.newFilter
            }
            return [...state]

        default:
            return state
    }
};

export const removeTodoListAC = (todolistID: string): RemoveTodoListActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistID}
}

export const addTodoListAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: title, todoListID: v1()}
}

export const changeTitleTodoListAC = (title: string, id: string): ChangingTitleTodolistActionType => {
    return {type: "CHANGING-TITLE-TODOLIST", title: title, id: id}
}

export const changeFilterTodoListAC = (filter: FilterType, id: string): ChangingFilterTodolistActionType => {
    return {type: "CHANGED-FILTER-TODOLIST", newFilter: filter, id: id}
}

export const setTodoListsAC = (todoLists: TodoListType[]): setTodoListsActionType => {
    return {type: "SET-TODOLISTS", todoLists}
}


//ThunkCreator
export const setTodoListsTC = () => (dispatch: Dispatch) => {
    todolistAPI().getTodoList()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
        })
}

export const removeTodoListTC = (todolistID: string) => (dispatch: Dispatch) => {
    todolistAPI().deleteTodoList(todolistID)
        .then(() => {
            dispatch(removeTodoListAC(todolistID))
        })
}

export const createTodoListTC = (title: string) => (dispatch: Dispatch) => {
    todolistAPI().createTodoList(title)
        .then(() => {
            dispatch(addTodoListAC(title))
        })
}

export const changeTitleTodoListTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI().updateTodolist(todolistID, title)
        .then(() => {
            dispatch(changeTitleTodoListAC(title, todolistID))
        })
}


