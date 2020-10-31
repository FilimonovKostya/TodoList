import {FilterType, TodolistType} from './../App';
import {v1} from 'uuid';
import {addTodoListAC, changeFilterTodoListAC, changeTitleTodoListAC, removeTodoListAC, todoListReducer} from './todolist-reducer';


test('Todolist should be removed', () => {
    const todolistID1 = v1()
    const todolistID2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ]


    const endState = todoListReducer(startState, removeTodoListAC(todolistID2))

    expect(endState?.length).toBe(1)
    // @ts-ignore
    expect(endState[0].title).toBe('What to learn')

})

test('Should be Added', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()

    const startState: Array<TodolistType> = [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ]

    const endState = todoListReducer(startState, addTodoListAC('New Todolist'))

    // @ts-ignore
    expect(endState.length).toBe(3)
    // @ts-ignore
    expect(endState[2].title).toBe('New Todolist')

})


test('Change Title Todolist', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()

    const startState: Array<TodolistType> = [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ]

    const endState = todoListReducer(startState, changeTitleTodoListAC('I am changed',todoListID1 ))

    // @ts-ignore
    expect(endState[0].title).toBe('I am changed')
    // @ts-ignore
    expect(endState.length).toBe(2)
    // @ts-ignore
    expect(endState[1].title).toBe('What to buy')
})


test('Changed filter Todolist', () => {
   const todoListID1 = v1()
   const todoListID2 = v1()
   const startState: Array<TodolistType> = [
      {id: todoListID1, title: "What to learn", filter: "all"},
      {id: todoListID2, title: "What to buy", filter: "all"},
   ]
   const newValue:FilterType = 'completed'



   const endState = todoListReducer(startState, changeFilterTodoListAC('completed', todoListID2))

   // @ts-ignore
   expect(endState[0].filter).toBe('all')
   // @ts-ignore
    expect(endState[1].filter).toBe(newValue)

})