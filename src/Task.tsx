import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from "@material-ui/icons/Delete";
import {TaskStatus, TaskType} from "./api/task-api";
import {changeTaskTitleTC, updateTaskStatusTC} from "./state/tasks-reducers";
import {useDispatch} from "react-redux";

export type TaskPropsType = {
    changeCheckbox: (id: string, status: TaskStatus, todoListID: string) => void
    removeTask: (id: string, todoListID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListID: string) => void
    todoID: string
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {
    const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDone = e.currentTarget.checked
        // props.changeCheckbox(props.task.id, newIsDone ? TaskStatus.Completed : TaskStatus.New, props.todoID)
        dispatch(updateTaskStatusTC(props.task.id, props.todoID, newIsDone ? TaskStatus.Completed : TaskStatus.New))
    }

    const dispatch = useDispatch()

    const onChangeTitle = useCallback((newValue: string) => {
        // props.changeTaskTitle(props.task.id, newValue, props.todoID)
        dispatch(changeTaskTitleTC(props.todoID, props.task.id, newValue))

    }, [props.task.id, props.todoID, props.changeTaskTitle])


    return <div key={props.task.id}><Checkbox checked={props.task.status === TaskStatus.Completed} onChange={changeCheckboxHandler}/>
        <EditableSpan title={props.task.title} onChange={onChangeTitle}/>
        <IconButton aria-label="delete">
            <DeleteIcon onClick={() => props.removeTask(props.task.id, props.todoID)}/>
        </IconButton>
    </div>
})