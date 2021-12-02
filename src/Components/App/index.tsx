import React, {useState} from 'react';
import '../../App.css';

import {v1} from 'uuid';
import {TaskType, Todolist} from "../Todolist";
import {TodolistForm} from "../TodolistForm";
import {TodolistsStateToProps} from "./index.store";

export type FilterType = 'all' | 'active' | 'completed'
type TasksStateType = {
    [key: string]: Array<TaskType>
}

type Props = TodolistsStateToProps

function App({todolists}: Props) {

    let todoListId1 = v1()
    let todoListId2 = v1()

    console.log('todolists', todolists)

    type TodolistType = {
        id: string
        title: string
        filter: FilterType
    }
    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Sql", isDone: true},
            {id: v1(), title: "Mocha", isDone: true},
            {id: v1(), title: "Native", isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
        ]
    })

    function removeTask(id: string, todoListID: string) {
        let todoListTasks = tasks[todoListID] // достали нужный массив ТудуЛиста
        tasks[todoListID] = todoListTasks.filter(t => t.id !== id)//перезаписали  и оттфильтровали
        setTasks({...tasks})//сетаем и перерерисовываем
    }

    function addTask(title: string, todoListID: string) {
        let task = {id: v1(), title: title, isDone: false}
        let todoListTasks = tasks[todoListID] // достали нужный
        tasks[todoListID] = [task, ...todoListTasks] // перезапись
        setTasks({...tasks}) // переррисовка
    }


    function changeCheckbox(id: string, taskIsDone: boolean, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        let task = todoListTasks.find(t => t.id === id) //нашли нужную таску
        if (task) {
            task.isDone = taskIsDone // перезаписываем значение
            setTasks({...tasks})//перерисока
        }
    }


    function changeFilter(value: FilterType, todolistID: string) {
        let todoList = todoLists.find(tl => tl.id === todolistID)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }

    }

    function changeTaskTitle(id: string, newTitle: string, todolistID: string) {
        let todoList = tasks[todolistID]
        let task = todoList.find(f => f.id === id)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const todoList = todoLists.find(f => f.id === id)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(id: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    function addTodoList(title: string) {
        let newTodolistID = v1()
        let newTodoList: TodolistType = {
            id: newTodolistID,
            title: title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({
            ...tasks,
            [newTodolistID]: []
        })
    }

    return (
        <div className="App">
            <TodolistForm addItem={addTodoList}/>
            {todoLists.map(tl => {
                let allTodoListTasks = tasks[tl.id]
                let tasksForTodolist = allTodoListTasks


                if (tl.filter === 'active') {
                    tasksForTodolist = allTodoListTasks.filter(f => f.isDone)

                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = allTodoListTasks.filter(f => !f.isDone)

                }

                return <Todolist title={tl.title}
                                 key={tl.id}
                                 todoID={tl.id}
                                 removeTodoList={removeTodoList}
                                 changeTaskTitle={changeTaskTitle}
                                 tasks={tasksForTodolist}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeCheckbox={changeCheckbox}
                                 filter={tl.filter}
                                 changeTodoListTitle={changeTodoListTitle}
                />
            })}
        </div>
    );
}

export default App;