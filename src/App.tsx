import React, {useState} from "react";
import "./App.css";
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    Toolbar,
    Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Paper from "@material-ui/core/Paper";
import {TaskPriorities, TaskStatus, TaskType} from "./api/task-api";
import {FilterType, TodoListDomainType} from "./state/todolist-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>;
};


function App() {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListDomainType>>([
        {id: todoListId1, title: "What to learn", filter: 'all', order: 0, addedDate: ''},
        {id: todoListId2, title: "What to buy", filter: 'all', order: 0, addedDate: ''},
    ]);

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatus.Completed,
                todoListId: todoListId1,
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(),
                title: "JavaScript",
                status: TaskStatus.Completed,
                todoListId: todoListId1,
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(),
                title: "TypeScript",
                status: TaskStatus.Completed,
                todoListId: todoListId1,
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },

        ],
        [todoListId2]: [
            {
                id: v1(),
                title: "Bootstrap 4",
                status: TaskStatus.Completed,
                todoListId: todoListId2,
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(),
                title: "Node JS",
                status: TaskStatus.Completed,
                todoListId: todoListId2,
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(),
                title: "Angular",
                status: TaskStatus.Completed,
                todoListId: todoListId2,
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
        ],
    });

    function removeTask(id: string, todoListID: string) {
        let todoListTasks = tasks[todoListID]; // достали нужный массив ТудуЛиста
        tasks[todoListID] = todoListTasks.filter((t) => t.id !== id); //перезаписали  и оттфильтровали
        setTasks({...tasks}); //сетаем и перерерисовываем
    }

    function addTask(title: string, todoListID: string) {
        let task: TaskType = {
            id: v1(),
            title: title,
            status: TaskStatus.New,
            todoListId: todoListID,
            addedDate: '',
            startDate: '',
            deadline: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''
        };
        let todoListTasks = tasks[todoListID]; // достали нужный
        tasks[todoListID] = [task, ...todoListTasks]; // перезапись
        setTasks({...tasks}); // переррисовка
    }

    function changeCheckbox(id: string, status: TaskStatus, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find((t) => t.id === id); //нашли нужную таску
        if (task) {
            task.status = status; // перезаписываем значение
            setTasks({...tasks}); //перерисока
        }
    }

    function changeFilter(value: FilterType, todolistID: string) {
        let todoList = todoLists.find((tl) => tl.id === todolistID);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todolistID: string) {
        let todoList = tasks[todolistID];
        let task = todoList.find((f) => f.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({...tasks});
        }
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const todoList = todoLists.find((f) => f.id === id);
        if (todoList) {
            todoList.title = newTitle;
            setTodoLists([...todoLists]);
        }
    }


    function removeTodoList(id: string) {
        setTodoLists(todoLists.filter((tl) => tl.id !== id));
        delete tasks[id];
        setTasks({...tasks});
    }

    function addTodoList(title: string) {
        let newTodolistID = v1();
        let newTodoList: TodoListDomainType = {
            id: newTodolistID,
            title: title,
            filter: "all",
            addedDate: '',
            order: 0
        };

        setTodoLists([...todoLists, newTodoList]);

        setTasks({
            ...tasks,
            [newTodolistID]: [],
        });
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">News</Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map((tl) => {
                        let allTodoListTasks = tasks[tl.id];
                        let tasksForTodolist = allTodoListTasks;

                        if (tl.filter === "active") {
                            tasksForTodolist = allTodoListTasks.filter((f) => f.status === TaskStatus.New);
                        }
                        if (tl.filter === "completed") {
                            tasksForTodolist = allTodoListTasks.filter((f) => f.status === TaskStatus.Completed);
                        }

                        return (
                            <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        title={tl.title}
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
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
