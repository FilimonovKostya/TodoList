import {taskAPI} from "../api/task-api";
import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "./todolist-reducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTaskAC: (state, action: PayloadAction<{ todoListID: string, tasks: Array<TaskType> }>) => {
            state[action.payload.todoListID] = action.payload.tasks
        },
        addTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
            const tasks = state[action.payload.task.todoListId]
            tasks.unshift(action.payload.task)

        },
        removeTaskAC: (state, action: PayloadAction<{ id: string, todoListId: string }>) => {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(el => el.id === action.payload.id)
            tasks.splice(index, 1)

        },
        updateTaskAC: (state, action: PayloadAction<{ todolistId: string, id: string, model: UpdateDomainTaskModelType }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(el => el.id === action.payload.id)
            tasks[index] = {...tasks[index], ...action.payload.model}
        },
    },
    extraReducers: builder => {
        builder
            .addCase(setTodoListsAC, ((state, action) => {
                action.payload.todoLists.forEach(tl => state[tl.id] = [])
            }))
            .addCase(addTodoListAC, (state, action) => {
                state[action.payload.todoList.id] = []
            })
            .addCase(removeTodoListAC, (state, action) => {
                delete state[action.payload.todolistID]
            })

    }
})

export const tasksReducer = slice.reducer
export const {updateTaskAC, setTaskAC, removeTaskAC, addTaskAC} = slice.actions


//THUNK CREATOR
export const setTaskTC = (todoListID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    taskAPI().getTask(todoListID)
        .then(res => {
            const tasks = res.data.items
            dispatch(setTaskAC({todoListID, tasks}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })

}
export const removeTaskTC = (todoListID: string, taskID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    taskAPI().deleteTask(todoListID, taskID)
        .then(() => {
            dispatch(removeTaskAC({id: taskID, todoListId: todoListID}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })

}
export const createTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    taskAPI().createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(addTaskAC({task}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const updateTaskTC = (taskId: string, todolistId: string, domainModule: UpdateDomainTaskModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const state = getState()
    // @ts-ignore
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
                    dispatch(updateTaskAC({todolistId, id: taskId, model: {...apiModel}}))
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


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
