import {FilterType, TasksStateType} from "../App";
import {TaskType} from "../Todolist";
import {v1} from "uuid";

export type AddTasksActionType = {
    type: "ADD-TASK";
    title: string;
    id: string
};

export type RemoveTaskActionType = {
    type: "REMOVE-TASK";
    id: string;
    todoListID: string
};

export type ChangeTitleTaskActionType = {
    type: "CHANGE-TITLE-TASK";
    newTitle: string;
    id: string;
    todoListID: string
};

// export type ChangeFilterTaskActionType = {
//     type: "CHANGE-FILTER-TASK";
//     filter: FilterType;
//     id: string;
// };

export type ChangeStatusTaskActionType = {
    type: "CHANGE-STATUS-TASK";
    todoLisId: string
    isDone: boolean;
    id: string;
};

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todoListID: string
}

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type ActionsType =
    | AddTasksActionType
    | RemoveTaskActionType
    | ChangeTitleTaskActionType
    // | ChangeFilterTaskActionType
    | ChangeStatusTaskActionType
    | AddTodoListActionType
    | RemoveTodoListActionType


export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {

        case 'ADD-TASK':
            let task: TaskType = {id: v1(), title: action.title, isDone: false}
            let todolist = state[action.id]
            state[action.id] = [task, ...todolist]
            return {...state}

        case "REMOVE-TASK":
            let nedTodo = state[action.todoListID]
            state[action.todoListID] = nedTodo.filter(f => f.id !== action.id)
            return {...state}

        case "CHANGE-STATUS-TASK":
            let statusTodo = state[action.todoLisId].find(f => f.id === action.id)
            if (statusTodo) {
                statusTodo.isDone = action.isDone
            }
            return {...state}

        case "CHANGE-TITLE-TASK":
            let mustTodo = state[action.todoListID].find(f => f.id === action.id)
            if (mustTodo) {
                mustTodo.title = action.newTitle
            }
            return {...state}


        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todoListID]: []
            }
        case "REMOVE-TODOLIST":
            delete state[action.id]
            return {...state}

        default:
            return state
    }


}

export const addTaskAC = (title: string, id: string): AddTasksActionType => {
    return {type: 'ADD-TASK', title: title, id: id}
}

export const removeTaskAC = (id: string, todoListId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", id: id, todoListID: todoListId}
}

export const changeTaskStatusAC = (todolistId: string, id: string, isDone: boolean): ChangeStatusTaskActionType => {
    return {type: "CHANGE-STATUS-TASK", todoLisId: todolistId, id: id, isDone: isDone}
}

export const changeTaskTitleAC = (todolistID: string, id: string, title: string): ChangeTitleTaskActionType => {
    return {type: "CHANGE-TITLE-TASK", todoListID: todolistID, id: id, newTitle: title}
}

export const addTodolistAC = (title: string): AddTodoListActionType => {
    return {type: "ADD-TODOLIST", title: title, todoListID: v1()}
}

export const removeTodolistAC = (id: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: id}
}