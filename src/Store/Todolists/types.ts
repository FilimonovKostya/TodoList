import TYPES from "./action-types";
import {Action} from "redux";

export default interface IAction<T = TYPES, TP = any> extends Action<T> {
    payload: TP;
}