import {createStore} from "redux";
import allReducers, {StoreType} from "./reducers";

const store: StoreType = createStore(allReducers)

export default store