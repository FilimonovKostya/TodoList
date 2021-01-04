import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType, store} from "../../state/store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../state/tasks-reducers";
import {todoListReducer} from "../../state/todolist-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatus} from "../../api/task-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", order: 0, addedDate: ''},
        {id: "todolistId2", title: "What to buy", filter: "all", order: 0, addedDate: ''}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS",
                status: TaskStatus.Completed,
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
                status: TaskStatus.Completed,
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
                status: TaskStatus.Completed,
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
                status: TaskStatus.Completed,
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
        error: ''
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)


export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
)