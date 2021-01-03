import {v1} from "uuid";
import {todolistAPI, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";

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

const initialState: Array<TodoListDomainType> = []

export const todoListReducer = (state: Array<TodoListDomainType> = initialState, action: ActionType): Array<TodoListDomainType> => {
    switch (action.type) {

        case "SET-TODOLISTS":
            return action.todoLists.map(tl => ({
                ...tl,
                filter: 'all'
            }))

        case "REMOVE-TODOLIST":
            return state.filter(f => f.id !== action.todolistID)

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
                todolist.filter = action.filter
            }
            return [...state]

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


