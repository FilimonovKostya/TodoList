import {taskAPI} from "../api/task-api";
import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "./todolist-reducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

const initialState: TasksStateType = {}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todoListID: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await taskAPI().getTask(todoListID)
    const tasks = res.data.items
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))

    return {todoListID, tasks}
})

export const removeTaskTC = createAsyncThunk('tasks/removeTask', (payload: { todoListID: string, taskID: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    return taskAPI().deleteTask(payload.todoListID, payload.taskID)
        .then(() => {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {id: payload.taskID, todoListId: payload.todoListID}
        })
})


const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
            const tasks = state[action.payload.task.todoListId]
            tasks.unshift(action.payload.task)

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
            .addCase(fetchTasks.fulfilled, ((state, action) => {
                state[action.payload.todoListID] = action.payload.tasks
            }))
            .addCase(removeTaskTC.fulfilled, ((state, action) => {
                const tasks = state[action.payload.todoListId]
                const index = tasks.findIndex(el => el.id === action.payload.id)
                tasks.splice(index, 1)
            }))

    }
})

export const tasksReducer = slice.reducer
export const {updateTaskAC, addTaskAC} = slice.actions


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
