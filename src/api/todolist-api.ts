import Axios from "axios";

const instance = Axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {
        'API-KEY': 'a918abd3-e56d-4f51-9680-86b073810b9f'
    }
})

export const todolistAPI = () => {
    return {
        updateTodolist(todolistID: string, title: string) {
            return instance.put<ResponseType<{}>>(`/${todolistID}`, {title})
        },
        deleteTodoList(todolistID: string) {
            return instance.delete<ResponseType<{}>>(`/${todolistID}`)
        },
        createTodoList(title: string) {
            return instance.post<ResponseType<{ item: TodoListType }>>(``, {title})
        },
        getTodoList() {
            return instance.get<Array<TodoListType>>(``)
        }
    }
}

//Types
export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title:string
    description:string
    status:TaskStatuses
    priority:TaskPriorities
    startDate:string
    deadline:string
}
