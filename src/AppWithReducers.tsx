// import React, {useReducer, useState} from "react";
// import "./App.css";
// import {Todolist} from "./Todolist";
// import {v1} from "uuid";
// import {AddItemForm} from "./AddItemForm";
// import {
//     AppBar,
//     Button,
//     Container,
//     Grid,
//     IconButton,
//     Toolbar,
//     Typography,
// } from "@material-ui/core";
// import MenuIcon from "@material-ui/icons/Menu";
// import Paper from "@material-ui/core/Paper";
// import {
//     addTodoListAC,
//     changeFilterTodoListAC,
//     changeTitleTodoListAC,
//     removeTodoListAC,
//     todoListReducer
// } from "./state/todolist-reducer";
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducers";
// import { TaskStatus, TaskPriorities} from "./api/task-api";
//
// export type FilterType = "all" | "active" | "completed";
//
// export type TodolistType = {
//     id: string;
//     title: string;
//     filter: FilterType;
// };
//
// function AppWithReducers() {
//     let todoListId1 = v1();
//     let todoListId2 = v1();
//
//     let [todoLists, dispatchTodoList] = useReducer(todoListReducer, [
//         {id: todoListId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
//         {id: todoListId2, title: "What to buy", filter: "all", addedDate: '', order: 0},
//     ]);
//
//     let [tasks, dispatchTasks] = useReducer(tasksReducer, {
//         [todoListId1]: [
//             {
//                 id: v1(),
//                 title: "HTML&CSS",
//                 status: TaskStatus.Completed,
//                 todoListId: todoListId1,
//                 addedDate: '',
//                 startDate: '',
//                 deadline: '',
//                 order: 0,
//                 priority: TaskPriorities.Low,
//                 description: ''
//             },
//             {
//                 id: v1(),
//                 title: "JS",
//                 status: TaskStatus.Completed,
//                 todoListId: todoListId1,
//                 addedDate: '',
//                 startDate: '',
//                 deadline: '',
//                 order: 0,
//                 priority: TaskPriorities.Low,
//                 description: ''
//             },
//             {
//                 id: v1(),
//                 title: "ReactJS",
//                 status: TaskStatus.Completed,
//                 todoListId: todoListId1,
//                 addedDate: '',
//                 startDate: '',
//                 deadline: '',
//                 order: 0,
//                 priority: TaskPriorities.Low,
//                 description: ''
//             },
//             {
//                 id: v1(),
//                 title: "Sql",
//                 status: TaskStatus.Completed,
//                 todoListId: todoListId1,
//                 addedDate: '',
//                 startDate: '',
//                 deadline: '',
//                 order: 0,
//                 priority: TaskPriorities.Low,
//                 description: ''
//             },
//             {
//                 id: v1(),
//                 title: "Mocha",
//                 status: TaskStatus.Completed,
//                 todoListId: todoListId1,
//                 addedDate: '',
//                 startDate: '',
//                 deadline: '',
//                 order: 0,
//                 priority: TaskPriorities.Low,
//                 description: ''
//             },
//             {
//                 id: v1(),
//                 title: "Native",
//                 status: TaskStatus.Completed,
//                 todoListId: todoListId1,
//                 addedDate: '',
//                 startDate: '',
//                 deadline: '',
//                 order: 0,
//                 priority: TaskPriorities.Low,
//                 description: ''
//             },
//         ],
//         [todoListId2]: [
//             {
//                 id: v1(),
//                 title: "Milk",
//                 status: TaskStatus.Completed,
//                 todoListId: todoListId1,
//                 addedDate: '',
//                 startDate: '',
//                 deadline: '',
//                 order: 0,
//                 priority: TaskPriorities.Low,
//                 description: ''
//             },
//             {
//                 id: v1(), title: "Bread", status: TaskStatus.Completed,
//                 todoListId: todoListId1,
//                 addedDate: '',
//                 startDate: '',
//                 deadline: '',
//                 order: 0,
//                 priority: TaskPriorities.Low,
//                 description: ''
//             },
//         ],
//     });
//
//
//     function removeTask(id: string, todoListID: string) {
//         dispatchTasks(removeTaskAC(id, todoListID))
//     }
//
//     function addTask(title: string, todoListID: string) {
//         dispatchTasks(addTaskAC(title, todoListID))
//     }
//
//     function changeCheckbox(id: string, status: TaskStatus, todoListID: string) {
//         dispatchTasks(changeTaskStatusAC(todoListID, id, status))
//     }
//
//     function changeFilter(value: FilterType, todolistID: string) {
//         dispatchTodoList(changeFilterTodoListAC(value, todolistID))
//     }
//
//     function changeTaskTitle(id: string, newTitle: string, todolistID: string) {
//         dispatchTasks(changeTaskTitleAC(todolistID, id, newTitle))
//     }
//
//     function changeTodoListTitle(id: string, newTitle: string) {
//         dispatchTodoList(changeTitleTodoListAC(newTitle, id))
//     }
//
//     function removeTodoList(id: string) {
//         dispatchTodoList(removeTodoListAC(id))
//     }
//
//     function addTodoList(title: string) {
//         const action = addTodoListAC(title)
//         dispatchTodoList(action)
//         dispatchTasks(action)
//     }
//
//
//     return (
//         <div className="App">
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                         <MenuIcon/>
//                     </IconButton>
//                     <Typography variant="h6">News</Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container style={{padding: "10px"}}>
//                     <AddItemForm addItem={addTodoList}/>
//                 </Grid>
//                 <Grid container spacing={3}>
//                     {todoLists.map((tl) => {
//                         let allTodoListTasks = tasks[tl.id];
//                         let tasksForTodolist = allTodoListTasks;
//
//                         if (tl.filter === "active") {
//                             tasksForTodolist = allTodoListTasks.filter((f) => f.status = TaskStatus.New);
//                         }
//                         if (tl.filter === "completed") {
//                             tasksForTodolist = allTodoListTasks.filter((f) => f.status = TaskStatus.Completed);
//                         }
//
//                         return (
//                             <Grid item>
//                                 <Paper style={{padding: "10px"}}>
//                                     <Todolist
//                                         title={tl.title}
//                                         key={tl.id}
//                                         todoID={tl.id}
//                                         removeTodoList={removeTodoList}
//                                         changeTaskTitle={changeTaskTitle}
//                                         tasks={tasksForTodolist}
//                                         removeTask={removeTask}
//                                         changeFilter={changeFilter}
//                                         addTask={addTask}
//                                         changeCheckbox={changeCheckbox}
//                                         filter={tl.filter}
//                                         changeTodoListTitle={changeTodoListTitle}
//                                     />
//                                 </Paper>
//                             </Grid>
//                         );
//                     })}
//                 </Grid>
//             </Container>
//         </div>
//     )
// }
//
// export default AppWithReducers;

export {}
