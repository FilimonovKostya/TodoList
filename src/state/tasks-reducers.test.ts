import {
    addTaskAC,
    addTodolistAC,
    changeFilterTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./tasks-reducers"
import {TasksStateType} from "../App";
import {TaskPriorities, TaskStatus} from "../api/task-api";

let startState: TasksStateType = {}

beforeEach(() => {

    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS",
                status: TaskStatus.New,
                todoListId: 'todolistId1',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },

            {
                id: "2", title: "JS",
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
                id: "3",
                title: "React",
                status: TaskStatus.New,
                todoListId: 'todolistId1',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread",
                status: TaskStatus.New,
                todoListId: 'todolistId2',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: "2", title: "milk",
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
                id: "3", title: "tea",
                status: TaskStatus.New,
                todoListId: 'todolistId2',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            }
        ]
    };
})

test('New Add Task', () => {


    const endState = tasksReducer(startState, addTaskAC('New Add Task', 'todolistId2'))

    // @ts-ignore
    expect(endState['todolistId2'].length).toBe(4)
    // @ts-ignore
    expect(endState['todolistId2'][0].title).toBe('New Add Task')
    // @ts-ignore
    expect(endState['todolistId2'][1].title).toBe('bread')
    // @ts-ignore
    expect(endState['todolistId2'][2].title).toBe('milk')
})

test('Task removed', () => {

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    // @ts-ignore
    expect(endState["todolistId1"].length).toBe(3);
    // @ts-ignore
    expect(endState["todolistId2"].length).toBe(2);
    // @ts-ignore
    expect(endState["todolistId2"].every(t => t.id !== "2")).toBeTruthy();
})


test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC('todolistId2', "2", TaskStatus.New);

    const endState = tasksReducer(startState, action)

    // @ts-ignore
    expect(endState['todolistId2'].length).toBe(3);
    // @ts-ignore
    expect(endState['todolistId2'][1].status).toBe(TaskStatus.New);
    // @ts-ignore
    expect(endState['todolistId2'][1].title).toBe('milk');
});

test('Task title was changed', () => {


    const endState = tasksReducer(startState, changeTaskTitleAC('todolistId1', '3', 'Redux'))

    // @ts-ignore
    expect(endState['todolistId1'].length).toBe(3)
    // @ts-ignore
    expect(endState['todolistId1'][0].title).toBe('CSS')
    // @ts-ignore
    expect(endState['todolistId1'][1].title).toBe('JS')
    // @ts-ignore
    expect(endState['todolistId1'][2].title).toBe('Redux')

})


test('new array should be added when new todolist is added', () => {


    const action = addTodolistAC("new todolist");

    const endState = tasksReducer(startState, action)


    // @ts-ignore
    const keys = Object.keys(endState);
    // @ts-ignore
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    // @ts-ignore
    expect(endState[newKey]).toEqual([]);
});


test('Changed filter Task', () => {

    const endState = tasksReducer(startState, changeFilterTaskAC('1', 'todolistId2', 'completed'))

    expect(endState['todolistId2'][1].status).toBe(TaskStatus.Completed)

})