import TYPES from "./action-types";
import {Action} from "redux";

export type TodolistsState = {
    id:string
    title:string
    filter: string
}

export default interface IAction<T = TYPES, TP = any> extends Action<T> {
    payload: TP;
}