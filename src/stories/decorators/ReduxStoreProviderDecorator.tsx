import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../state/tasks-reducers";
import {todoListReducer} from "../../state/todolist-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", order: 0, addedDate: '', entityStatus: "idle"},
        {id: "todolistId2", title: "What to buy", filter: "all", order: 0, addedDate: '', entityStatus: "idle"}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS",
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(), title: "JS",
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk",
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(), title: "React Book",
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            }
        ]
    },
    app: {
        status: "idle",
        error: '',
        isInitialized:false
    },
    auth: {
        isLoggedIn: false
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)


export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
)