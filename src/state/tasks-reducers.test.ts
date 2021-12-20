import {
    addTaskAC,
    updateTaskAC,
    removeTaskAC,
    tasksReducer, TasksStateType
} from "./tasks-reducers"
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";


let startState: TasksStateType = {}

beforeEach(() => {

    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS",
                status: TaskStatuses.New,
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
                id: "3",
                title: "React",
                status: TaskStatuses.New,
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
                status: TaskStatuses.New,
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
                id: "3", title: "tea",
                status: TaskStatuses.New,
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

    const action = addTaskAC({
        task: {
            todoListId: "todolistId2",
            title: "juce",
            status: TaskStatuses.New,
            addedDate: "",
            deadline: "",
            description: "",
            order: 0,
            priority: 0,
            startDate: "",
            id: "id exists"
        }
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('Task removed', () => {

    const action = removeTaskAC({id: '2', todoListId: 'todolistId2'});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id !== "2")).toBeTruthy();
})


test('status of specified task should be changed', () => {

    const action = updateTaskAC({
        todolistId: 'todolistId2',
        id: '2',
        model: {
            deadline: '',
            description: '',
            priority: TaskPriorities.Hi,
            startDate: '',
            status: TaskStatuses.New,
            title: 'milk'
        }
    });

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
    expect(endState['todolistId2'][1].title).toBe('milk');
});
