import TYPES from './action-types'
import IAction from "./types";

export const getTodolists = (): IAction<TYPES.TODOLISTS_GET> => ({
    type: TYPES.TODOLISTS_GET,
    payload: {}
})

export const changeTodolistTitle = (): IAction<TYPES.TODOLISTS_CHANGE_TITLE> => ({
    type: TYPES.TODOLISTS_CHANGE_TITLE,
    payload: {}
})

export const changeTodolistStatus = (): IAction<TYPES.TODOLISTS_CHANGE_STATUS> => ({
    type: TYPES.TODOLISTS_CHANGE_STATUS,
    payload: {}
})

