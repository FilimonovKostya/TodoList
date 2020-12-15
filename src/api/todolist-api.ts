import Axios from "axios";


type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}


type ResponseType<D> = {
    resultCode: number
    messages: string[]
    data: D
}

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
            return instance.post<ResponseType<{item: TodoListType}>>(``, {title})
        },
        getTodoList() {
            return instance.get<Array<TodoListType>>(``)
        }
    }
}





