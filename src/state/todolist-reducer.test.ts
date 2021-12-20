import {v1} from 'uuid';
import {
    addTodoListAC,
    changeFilterTodoListAC,
    changeTitleTodoListAC,
    FilterType,
    removeTodoListAC,
    TodoListDomainType,
    todoListReducer
} from './todolist-reducer';

let todolistID1: string
let todolistID2: string
let startState: Array<TodoListDomainType> = []

beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()

    startState = [
        {id: todolistID1, addedDate: '', entityStatus: "idle", filter: "all", order: 0, title: 'test'},
        {id: todolistID2, addedDate: '', entityStatus: "idle", filter: "all", order: 0, title: 'What to learn'}
    ]
})

test('Todolist should be removed', () => {

    const endState = todoListReducer(startState, removeTodoListAC({todolistID: todolistID1}))

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe('What to learn')

})

test('Should be Added', () => {

    const endState = todoListReducer(startState, addTodoListAC({
        todoList: {
            id: '1',
            title: 'New Todolist',
            addedDate: '',
            order: 0
        }
    }))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('New Todolist')

})


test('Change Title Todolist', () => {

    const endState = todoListReducer(startState, changeTitleTodoListAC({title: 'I am changed', id: todolistID1}))

    expect(endState[0].title).toBe('I am changed')
    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe('What to learn')
})


test('Changed filter Todolist', () => {

    const newValue: FilterType = 'completed'

    const endState = todoListReducer(startState, changeFilterTodoListAC({filter: 'completed', id:todolistID2}))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newValue)

})