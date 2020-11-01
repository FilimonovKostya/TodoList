import {FilterType, TodolistType} from './../App';
import {v1} from 'uuid';
import {addTodoListAC, changeFilterTodoListAC, changeTitleTodoListAC, removeTodoListAC, todoListReducer} from './todolist-reducer';

let todolistID1: string
let todolistID2: string
let startState: Array<TodolistType> = []

beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()
    startState = [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},]
})

test('Todolist should be removed', () => {

    const endState = todoListReducer(startState, removeTodoListAC(todolistID2))

    expect(endState?.length).toBe(1)
    // @ts-ignore
    expect(endState[0].title).toBe('What to learn')

})

test('Should be Added', () => {


    const endState = todoListReducer(startState, addTodoListAC('New Todolist'))

    // @ts-ignore
    expect(endState.length).toBe(3)
    // @ts-ignore
    expect(endState[2].title).toBe('New Todolist')

})


test('Change Title Todolist', () => {

    const endState = todoListReducer(startState, changeTitleTodoListAC('I am changed', todolistID1))

    // @ts-ignore
    expect(endState[0].title).toBe('I am changed')
    // @ts-ignore
    expect(endState.length).toBe(2)
    // @ts-ignore
    expect(endState[1].title).toBe('What to buy')
})


test('Changed filter Todolist', () => {

    const newValue: FilterType = 'completed'


    const endState = todoListReducer(startState, changeFilterTodoListAC('completed', todolistID2))

    // @ts-ignore
    expect(endState[0].filter).toBe('all')
    // @ts-ignore
    expect(endState[1].filter).toBe(newValue)

})