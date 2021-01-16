import Axios from "axios";
import {ResponseType, TaskType} from './todolist-api'
import {UpdateDomainTaskModelType} from "../state/tasks-reducers";

type ResponseTaskType = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}

type UpdateTaskType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}


const instance = Axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a918abd3-e56d-4f51-9680-86b073810b9f'
    }
})


export const taskAPI = () => {
    return {
        getTask(todoListID: string) {
            return instance.get<ResponseTaskType>(`${todoListID}/tasks`)
        },
        createTask(todolistID: string, title: string) {
            return instance.post<ResponseType<{ item: TaskType }>>(`${todolistID}/tasks`, {title})
        },
        deleteTask(todolistID: string, taskID: string) {
            return instance.delete(`${todolistID}/tasks/${taskID}`)
        },
        updateTask(todolistID: string, taskID: string, model: UpdateDomainTaskModelType) {
            debugger
            return instance.put<ResponseType<{ item: UpdateTaskType }>>(`${todolistID}/tasks/${taskID}`, model)
        }
    }
}