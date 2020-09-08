import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from './Todolist';
import {v1} from 'uuid';

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Sql", isDone: true},
            {id: v1(), title: "Mocha", isDone: true},
            {id: v1(), title: "Native", isDone: false},
        ]
    )


    function removeTask(id: string) {
        setTasks(tasks.filter(d => d.id !== id))
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false}
        let newAddTask = [task, ...tasks]
        setTasks(newAddTask)

    }

    function changeStatus(isDone: boolean, id:string) {
        let task = tasks.find(t => t.id = id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    let [filter, setFilter] = useState<FilterType>('all')

    let tasksForTodolist = tasks


    if (filter === 'active') {
        tasksForTodolist = tasks.filter(f => f.isDone)

    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(f => !f.isDone)

    }

    function changeFilter(value: FilterType) {

        setFilter(value)

    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
            />
        </div>
    );
}

export default App;
