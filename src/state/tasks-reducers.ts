import {v1} from "uuid";
import {taskAPI, TaskStatus, TaskType} from "../api/task-api";
import {FilterType, setTodoListsAC} from "./todolist-reducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {TasksStateType} from "../app/App";
import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";

type ActionsType =
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof changeFilterTaskAC>
    | ReturnType<typeof setTaskAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "SET-TASK":
            return {...state, [action.todoListID]: action.tasks}
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todoLists.forEach(tl => copyState[tl.id] = [])
            return copyState
        }
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case "REMOVE-TASK":
            return {...state, [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.id)}
        case "CHANGE-STATUS-TASK":
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ? {...t, status: action.status} : t)
            }
        case "CHANGE-TITLE-TASK":
            return {
                ...state, [action.todolistID]: state[action.todolistID].map(t => t.id === action.id ? {...t, title: action.title} : t)

            }
        case "ADD-TODOLIST":
            return {
                ...state, [action.todoListID]: []
            }
        case "REMOVE-TODOLIST":
            delete state[action.id]
            return {...state}
        default:
            return state
    }
}

export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)

export const removeTaskAC = (id: string, todoListId: string) => ({type: "REMOVE-TASK", id: id, todoListID: todoListId} as const)

export const changeTaskStatusAC = (todolistId: string, id: string, status: TaskStatus) => ({type: "CHANGE-STATUS-TASK", todolistId, id, status} as const)

export const changeTaskTitleAC = (todolistID: string, id: string, title: string) => ({type: "CHANGE-TITLE-TASK", todolistID, id, title} as const)

export const addTodolistAC = (title: string) => ({type: "ADD-TODOLIST", title, todoListID: v1()} as const)

export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)

export const changeFilterTaskAC = (id: string, todolistID: string, newFilter: FilterType) => ({type: "CHANGE-FILTER-TASK", todolistID, id, newFilter} as const)

export const setTaskAC = (todoListID: string, tasks: TaskType[]) => ({type: "SET-TASK", todoListID, tasks} as const)


//THUNK CREATOR
export const setTaskTC = (todoListID: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    taskAPI().getTask(todoListID)
        .then(res => {
            const tasks = res.data.items
            dispatch(setTaskAC(todoListID, tasks))
            dispatch(setAppStatusAC('succeeded'))
        })

}

export const removeTaskTC = (todoListID: string, taskID: string,) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    taskAPI().deleteTask(todoListID, taskID)
        .then(() => {
            dispatch(removeTaskAC(taskID, todoListID))
            dispatch(setAppStatusAC('succeeded'))
        })

}

export const createTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    taskAPI().createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(addTaskAC(task))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC('Some error occurred'))
                }
                dispatch(setAppStatusAC('failed'))
            }
        })
}


export const changeTaskTitleTC = (todolistID: string, taskID: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    taskAPI().updateTitleTask(todolistID, taskID, title)
        .then((res) => {

                dispatch(changeTaskTitleAC(todolistID, taskID, title))
                dispatch(setAppStatusAC('succeeded'))


        })
}

export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatus) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
// те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })


        if (task) {
            dispatch(setAppStatusAC('loading'))
            taskAPI().updateTitleTask(todolistId, taskId, status)
                .then(() => {
                    const action = changeTaskStatusAC(todolistId, taskId, status)
                    dispatch(action)
                    dispatch(setAppStatusAC('succeeded'))
                })
        }
    }
}
