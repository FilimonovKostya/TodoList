import IAction, {TodolistsState} from "./types";
import TYPES from "./action-types";
import {v1} from "uuid";


const initState: TodolistsState[] = [
    {id: v1(), title: 'What to learn', filter: 'all'},
    {id: v1(), title: 'What to buy', filter: 'all'}
]

export const TodoListReducer = (state = initState, action: IAction): TodolistsState[] => {
    switch (action.type) {
        case TYPES.TODOLISTS_GET:
            return state

        default:
            return state
    }
}