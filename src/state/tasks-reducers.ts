import {TasksStateType} from "../App";
import {v1} from "uuid";
import {taskAPI, TaskStatus, TaskType} from "../api/task-api";
import {FilterType, setTodoListsActionType} from "./todolist-reducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type AddTasksActionType = {
    type: "ADD-TASK";
    task: TaskType
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


export type SetTaskActionType = {
    type: 'SET-TASK'
    todoListID: string
    tasks: TaskType[]
}

type ActionsType =
    | AddTasksActionType
    | RemoveTaskActionType
    | ChangeTitleTaskActionType
    | ChangeFilterTaskActionType
    | ChangeStatusTaskActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | setTodoListsActionType
    | SetTaskActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    switch (action.type) {

        case "SET-TASK": {
            const stateCopy = {...state}
            stateCopy[action.todoListID] = action.tasks
            return stateCopy
        }

        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todoLists.forEach(tl => copyState[tl.id] = [])
            return copyState
        }
        case 'ADD-TASK': {
            debugger
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            stateCopy[action.task.todoListId] = [action.task, ...tasks];
            return stateCopy;
        }

        case "REMOVE-TASK":
            let nedTodo = state[action.todoListID]
            state[action.todoListID] = nedTodo.map(f => f)
            state[action.todoListID] = nedTodo.filter(f => f.id !== action.id)
            return {...state}

        case "CHANGE-STATUS-TASK": {
            let todoListTasks = state[action.todoLisId]
            state[action.todoLisId] = todoListTasks
                .map(t => t.id === action.id
                    ? {...t, status: action.status}
                    : t
                )
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

export const addTaskAC = (task: TaskType): AddTasksActionType => {
    return {type: 'ADD-TASK', task}
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

export const setTaskAC = (todoListID: string, tasks: TaskType[]): SetTaskActionType => {
    return {type: "SET-TASK", todoListID, tasks}
}


//THUNK CREATOR
export const setTaskTC = (todoListID: string) => (dispatch: Dispatch) => {
    taskAPI().getTask(todoListID)
        .then(res => {
            const tasks = res.data.items
            dispatch(setTaskAC(todoListID, tasks))
        })

}

export const removeTaskTC = (todoListID: string, taskID: string,) => (dispatch: Dispatch) => {
    taskAPI().deleteTask(todoListID, taskID)
        .then(() => {
            dispatch(removeTaskAC(taskID, todoListID))
        })

}

export const createTaskTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    taskAPI().createTask(todolistID, title)
        .then(res => {

            const task = res.data.data.item
            dispatch(addTaskAC(task))
        })
}

export const changeTaskTitleTC = (todolistID: string, taskID: string, title: string) => (dispatch: Dispatch) => {
    taskAPI().updateTitleTask(todolistID, taskID, title)
        .then(() => {
            dispatch(changeTaskTitleAC(todolistID, taskID, title))
        })
}


export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatus) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
// те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })


        if (task) {
            taskAPI().updateTitleTask(todolistId, taskId, status)
                .then(() => {
                    const action = changeTaskStatusAC(todolistId, taskId, status)
                    dispatch(action)
                })
        }
    }
}
