import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from './Todolist';

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
            {id: 1, title: "HTML&CSS", isDone: true},
            {id: 2, title: "JS", isDone: true},
            {id: 3, title: "ReactJS", isDone: false},
            {id: 4, title: "Sql", isDone: true},
            {id: 5, title: "Mocha", isDone: true},
            {id: 6, title: "Native", isDone: false},
        ]
    )

    function removeTask(id: number) {
        setTasks(tasks.filter(d => d.id !== id))
    }

    let [filter, setFilter] = useState<FilterType>('all')

    let tasksForTodolist = tasks


    if (filter === 'active') {
        tasksForTodolist = tasks.filter(f => f.isDone)
       debugger
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(f => !f.isDone)
       debugger
    }

    function changeFilter(value: FilterType) {
        debugger
        setFilter(value)

    }

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasksForTodolist} removeTask={removeTask} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
