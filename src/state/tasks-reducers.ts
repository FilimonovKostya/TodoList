import {taskAPI} from "../api/task-api";
import {addTodoListAC, FilterType, removeTodoListAC, setTodoListsAC} from "./todolist-reducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

// type ActionsType =
//     | ReturnType<typeof setTodoListsAC>
//     | ReturnType<typeof addTaskAC>
//     | ReturnType<typeof removeTaskAC>
//     | ReturnType<typeof updateTaskAC>
//     | ReturnType<typeof addTodoListAC>
//     | ReturnType<typeof removeTodolistAC>
//     | ReturnType<typeof changeFilterTaskAC>
//     | ReturnType<typeof setTaskAC>
//
// type ToolkitActionType = ReturnType<typeof setAppStatusAC>
//     | ReturnType<typeof setAppErrorAC>

const initialState: TasksStateType = {}

// export const tasksReducer = (state: TasksStateType = initialState, action: any): TasksStateType => {
//     switch (action.type) {
//         case "SET-TASK":
//             return {...state, [action.todoListID]: action.tasks}
//         case setTodoListsAC.type: {
//             const copyState = {...state}
//             action.payload.todoLists.forEach((tl: any) => copyState[tl.id] = [])
//             return copyState
//         }
//         case 'ADD-TASK':
//             return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
//         case "REMOVE-TASK":
//             return {...state, [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.id)}
//         case "UPDATE-TASK":
//             return {
//                 ...state,
//                 [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ? {...t, ...action.model} : t)
//             }
//         case addTodoListAC.type:
//             return {...state, [action.payload.todoList.id]: []}
//         case removeTodoListAC.type:
//             delete state[action.payload.todolistID]
//             return {...state}
//         default:
//             return state
//     }
// }

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTaskAC: (state, action: PayloadAction<{ todoListID: string, tasks: Array<TaskType> }>) => {
            return {...state, [action.payload.todoListID]: action.payload.tasks}
        },
        addTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }
        },
        removeTaskAC: (state, action: PayloadAction<{ id: string, todoListId: string }>) => {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(t => t.id !== action.payload.id)
            }
        },
        updateTaskAC: (state, action: PayloadAction<{ todolistId: string, id: string, model: UpdateDomainTaskModelType }>) => {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.id ? {...t, ...action.payload.model} : t)
            }
        },
        changeTaskTitleAC: (state, action: PayloadAction<{ todolistID: string, id: string, title: string }>) => {
        },
        changeFilterTaskAC: (state, action: PayloadAction<{ id: string, todolistID: string, newFilter: FilterType }>) => {
        },
        removeTodolistAC: (state, action: PayloadAction<{ id: string }>) => {
        },
    }
})

export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const removeTaskAC = (id: string, todoListId: string) => ({
    type: "REMOVE-TASK",
    id: id,
    todoListID: todoListId
} as const)
export const updateTaskAC = (todolistId: string, id: string, model: UpdateDomainTaskModelType) => ({
    type: "UPDATE-TASK",
    todolistId,
    id,
    model
} as const)
export const changeTaskTitleAC = (todolistID: string, id: string, title: string) => ({
    type: "CHANGE-TITLE-TASK",
    todolistID,
    id,
    title
} as const)
// export const addTodolistAC = (title: string) => ({type: "ADD-TODOLIST", title, todoListID: v1()} as const)
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const changeFilterTaskAC = (id: string, todolistID: string, newFilter: FilterType) => ({
    type: "CHANGE-FILTER-TASK",
    todolistID,
    id,
    newFilter
} as const)
export const setTaskAC = (todoListID: string, tasks: Array<TaskType>) => ({
    type: "SET-TASK",
    todoListID,
    tasks
} as const)


//THUNK CREATOR
export const setTaskTC = (todoListID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    taskAPI().getTask(todoListID)
        .then(res => {
            const tasks = res.data.items
            dispatch(setTaskAC(todoListID, tasks))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })

}
export const removeTaskTC = (todoListID: string, taskID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    taskAPI().deleteTask(todoListID, taskID)
        .then(() => {
            dispatch(removeTaskAC(taskID, todoListID))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })

}
export const createTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    taskAPI().createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(addTaskAC(task))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error.message, dispatch)
        })
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (taskId: string, todolistId: string, domainModule: UpdateDomainTaskModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
        throw  new Error('Task not found')
    }
    const apiModel: UpdateDomainTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...domainModule
    }

    if (task) {
        dispatch(setAppStatusAC({status: 'loading'}))
        taskAPI().updateTask(todolistId, taskId, {...apiModel})
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(todolistId, taskId, {...apiModel}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setAppErrorAC({error: res.data.messages[0]}))
                    } else {
                        dispatch(setAppErrorAC({error: 'Some error occurred'}))
                    }
                    dispatch(setAppStatusAC({status: 'failed'}))
                }
            })
            .catch(error => {
                handleServerNetworkError(error.message, dispatch)
            })
    }

}