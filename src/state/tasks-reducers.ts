import {taskAPI} from "../api/task-api";
import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "./todolist-reducer";
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

export const createTaskTC = createAsyncThunk('tasks/createTask', (payload: { title: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    return taskAPI().createTask(payload.todolistId, payload.title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                return {task}
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error.message, thunkAPI.dispatch)
        })
})


export const updateTaskTC = createAsyncThunk('tasks/updateTask', (payload: { taskId: string, todolistId: string, domainModule: UpdateDomainTaskModelType }, thunkAPI) => {

    const state = thunkAPI.getState()

    // @ts-ignore
    const task = state.tasks[payload.todolistId].find((t: any) => t.id === payload.taskId)

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
        ...payload.domainModule
    }

    if (task) {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        taskAPI().updateTask(payload.todolistId, payload.taskId, {...apiModel})
            .then((res) => {
                if (res.data.resultCode === 0) {
                    thunkAPI.dispatch(updateTaskAC({todolistId: payload.todolistId, id: payload.taskId, model: {...apiModel}}))
                    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    if (res.data.messages.length) {
                        thunkAPI.dispatch(setAppErrorAC({error: res.data.messages[0]}))
                    } else {
                        thunkAPI.dispatch(setAppErrorAC({error: 'Some error occurred'}))
                    }
                    thunkAPI.dispatch(setAppStatusAC({status: 'failed'}))
                }
            })
            .catch(error => {
                handleServerNetworkError(error.message, thunkAPI.dispatch)
            })
    }
})


const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
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
            .addCase(createTaskTC.fulfilled, ((state, action) => {
                if (action.payload?.task) {
                    const tasks = state[action.payload.task.todoListId]
                    tasks.unshift(action.payload.task)
                }

            }))

    }
})

export const tasksReducer = slice.reducer
export const {updateTaskAC} = slice.actions

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
