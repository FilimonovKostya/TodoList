import {FilterType, TodolistType} from "./../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    newTitle: string
}

export type ChangingTitleTodolistActionType = {
    type: 'CHANGING-TITLE-TODOLIST'
    id: string
    title: string
}

export type ChangingFilterTodolistActionType = {
    type: 'CHANGED-FILTER-TODOLIST'
    id: string
    newFilter: FilterType
}

type ActionType = RemoveTodoListActionType | AddTodolistActionType | ChangingTitleTodolistActionType | ChangingFilterTodolistActionType

export const todoListReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(f => f.id !== action.id)

        case "ADD-TODOLIST" :
            const newTodoList: TodolistType = {id: v1(), title: action.newTitle, filter: "all"}
            return [...state, newTodoList]

        case 'CHANGING-TITLE-TODOLIST' :
            let changingTitle = state.find(f => f.id === action.id)
            if (changingTitle) {
                changingTitle.title = action.title
            }
            return [...state]

        case 'CHANGED-FILTER-TODOLIST':
            let todolist = state.find(f => f.id === action.id)
            if (todolist) {
                todolist.filter = action.newFilter
            }
            return [...state]
    }
};

export const removeTodoListAC = (todolistID:string):RemoveTodoListActionType => {
    return  {type: "REMOVE-TODOLIST", id: todolistID}
}

export const addTodoListAC = (title:string):AddTodolistActionType => {
    return {type: "ADD-TODOLIST", newTitle:title}
}

export const changeTitleTodoListAC = (title:string, id:string): ChangingTitleTodolistActionType => {
    return  {type: "CHANGING-TITLE-TODOLIST", title: title, id: id}
}

export const changeFilterTodoListAC = (filter:FilterType, id:string):ChangingFilterTodolistActionType => {
    return  {type: "CHANGED-FILTER-TODOLIST", newFilter: filter, id:id}
}