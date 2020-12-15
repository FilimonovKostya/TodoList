import Axios from "axios";

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

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
            return instance.post(`${todolistID}/tasks`, {title})
        },
        deleteTask(todolistID: string, taskID: string) {
            return instance.delete(`${todolistID}/tasks/${taskID}`)
        },
        updateTitleTask(todolistID: string, taskID: string, title: string) {
            return instance.put<UpdateTaskType>(`${todolistID}/tasks/${taskID}`, {title})
        }
    }
}