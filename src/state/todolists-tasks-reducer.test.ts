import {addTodolistAC, removeTodolistAC, tasksReducer} from "./tasks-reducers";
import {TasksStateType} from "../components/trash/App";
import {TodoListDomainType, todoListReducer} from "./todolist-reducer";
import {TaskPriorities, TaskStatus} from "../api/task-api";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodoListDomainType> = [];


    const action = addTodolistAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    // @ts-ignore
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoListID);
    expect(idFromTodolists).toBe(action.todoListID);
});


test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
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
                id: "2",
                title: "JS",
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
                id: "3", title: "React",
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
                id: "3", title: "tea", status: TaskStatus.New,
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

    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    // @ts-ignore
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    // @ts-ignore
    expect(endState["todolistId2"]).not.toBeDefined();
});
