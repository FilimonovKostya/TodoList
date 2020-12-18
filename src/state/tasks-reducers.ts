import {TasksStateType} from "../App";
import {v1} from "uuid";
import {TaskPriorities, TaskStatus, TaskType} from "../api/task-api";
import {FilterType} from "./todolist-reducer";

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

export type ChangeFilterTaskActionType = {
    type: "CHANGE-FILTER-TASK";
    filter: FilterType;
    id: string;
    todoListID: string
};

export type ChangeStatusTaskActionType = {
    type: "CHANGE-STATUS-TASK";
    todoLisId: string
    status: TaskStatus;
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
    | ChangeFilterTaskActionType
    | ChangeStatusTaskActionType
    | AddTodoListActionType
    | RemoveTodoListActionType


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    switch (action.type) {

        case 'ADD-TASK':
            let task: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatus.Completed,
                todoListId: action.id,
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            }
            let todolist = state[action.id]
            state[action.id] = [task, ...todolist]
            return {...state}

        case "REMOVE-TASK":
            let nedTodo = state[action.todoListID]
            state[action.todoListID] = nedTodo.map(f => f)
            state[action.todoListID] = nedTodo.filter(f => f.id !== action.id)
            return {...state}

        case "CHANGE-STATUS-TASK": {
            let todoListTasks = state[action.todoLisId]
            state[action.todoLisId] = todoListTasks
                .map(t => t.id === action.id
                    ? {...t, isDone: action.status}
                    : t)
            return {...state}
        }
        case "CHANGE-TITLE-TASK": {
            let todolistTasks = state[action.todoListID]
            state[action.todoListID] = todolistTasks
                .map(t => t.id === action.id
                    ? {...t, title: action.newTitle}
                    : t)
            return ({...state})
        }

        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todoListID]: []
            }
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

export const changeTaskStatusAC = (todolistId: string, id: string, status: TaskStatus): ChangeStatusTaskActionType => {
    return {type: "CHANGE-STATUS-TASK", todoLisId: todolistId, id: id, status: status}
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

export const changeFilterTaskAC = (id: string, todolistID: string, newFilter: FilterType): ChangeFilterTaskActionType => {
    return {type: "CHANGE-FILTER-TASK", todoListID: todolistID, id: id, filter: newFilter}
}