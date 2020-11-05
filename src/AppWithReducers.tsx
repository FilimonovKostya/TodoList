import React, {useReducer, useState} from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
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
import {
  addTodoListAC,
  changeFilterTodoListAC,
  changeTitleTodoListAC,
  removeTodoListAC,
  todoListReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducers";

export type FilterType = "all" | "active" | "completed";
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};


export type TodolistType = {
    id: string;
    title: string;
    filter: FilterType;
  };

function AppWithReducers() {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let [todoLists, dispatchTodoList] = useReducer(todoListReducer,[
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "all" },
  ]);

  // let [tasks, setTasks] = useState<TasksStateType>({
  //   [todoListId1]: [
  //     { id: v1(), title: "HTML&CSS", isDone: true },
  //     { id: v1(), title: "JS", isDone: true },
  //     { id: v1(), title: "ReactJS", isDone: false },
  //     { id: v1(), title: "Sql", isDone: true },
  //     { id: v1(), title: "Mocha", isDone: true },
  //     { id: v1(), title: "Native", isDone: false },
  //   ],
  //   [todoListId2]: [
  //     { id: v1(), title: "Milk", isDone: true },
  //     { id: v1(), title: "Bread", isDone: false },
  //   ],
  // });


  let [tasks, dispatchTasks] = useReducer(tasksReducer,{
    [todoListId1]:[
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Sql", isDone: true },
      { id: v1(), title: "Mocha", isDone: true },
      { id: v1(), title: "Native", isDone: false },
    ],
    [todoListId2]:[
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Bread", isDone: false },
    ],
  });


  function removeTask(id: string, todoListID: string) {
    dispatchTasks(removeTaskAC(id, todoListID))
  }

  function addTask(title: string, todoListID: string) {
   dispatchTasks(addTaskAC(title, todoListID))
  }

  function changeCheckbox(id: string, taskIsDone: boolean, todoListID: string) {
   dispatchTasks(changeTaskStatusAC(todoListID, id, taskIsDone))
  }

  function changeFilter(value: FilterType, todolistID: string) {
    dispatchTodoList(changeFilterTodoListAC(value, todolistID))
  }

  function changeTaskTitle(id: string, newTitle: string, todolistID: string) {
    dispatchTasks(changeTaskTitleAC(todolistID,id, newTitle))
  }

  function changeTodoListTitle(id: string, newTitle: string) {
    dispatchTodoList(changeTitleTodoListAC(newTitle, id))
  }

  function removeTodoList(id: string) {
    dispatchTodoList(removeTodoListAC(id))
  }

  function addTodoList(title: string) {
    const action = addTodoListAC(title)
    dispatchTodoList(action)
    dispatchTasks(action)
  }



  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "10px" }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={3}>
          {todoLists.map((tl) => {
            let allTodoListTasks = tasks[tl.id];
            let tasksForTodolist = allTodoListTasks;

            if (tl.filter === "active") {
              tasksForTodolist = allTodoListTasks.filter((f) => f.isDone);
            }
            if (tl.filter === "completed") {
              tasksForTodolist = allTodoListTasks.filter((f) => !f.isDone);
            }

            return (
              <Grid item>
                <Paper style={{ padding: "10px" }}>
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
  )
}

export default AppWithReducers;
