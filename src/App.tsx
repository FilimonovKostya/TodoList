import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from './Todolist';
import {v1} from 'uuid';

export type FilterType = 'all' | 'active' | 'completed'
type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todoListId1 = v1()
    let todoListId2 = v1()

    type TodolistType = {
        id: string
        title: string
        filter: FilterType
    }
    let [todoLists, setTodoList] = useState<Array<TodolistType>>([
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
        tasks[todoListID] = todoListTasks.filter( t => t.id !== id)//перезаписали  и оттфильтровали
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
        let task = todoListTasks.find(t=> t.id === id) //нашли нужную таску
        if(task){
            task.isDone = taskIsDone // перезаписываем значение
            setTasks({...tasks})//перерисока
        }
    }


    function changeFilter(value: FilterType, todolistID: string) {
        let todoList = todoLists.find(tl => tl.id === todolistID)
        if (todoList) {
            todoList.filter = value
            setTodoList([...todoLists])
        }

    }

    function removeTodoList(id:string){
        setTodoList(todoLists.filter(tl=> tl.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    return (
        <div className="App">
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

                                 tasks={tasksForTodolist}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeCheckbox={changeCheckbox}
                                 filter={tl.filter}
                />
            })}
        </div>
    );
}

export default App;
