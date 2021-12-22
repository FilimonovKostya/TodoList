import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import DeleteIcon from "@material-ui/icons/Delete";
import {updateTaskTC,} from "../../../../state/tasks-reducers";
import {useDispatch} from "react-redux";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";

export type TaskPropsType = {
    changeCheckbox: (id: string, todoListID: string, status: TaskStatuses) => void
    removeTask: (id: string, todoListID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListID: string) => void
    todoID: string
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {
    const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDone = e.currentTarget.checked
        dispatch(updateTaskTC({taskId: props.task.id, todolistId: props.todoID, domainModule: {status: newIsDone ? TaskStatuses.Completed : TaskStatuses.New}}))
    }

    const dispatch = useDispatch()

    const onChangeTitle = useCallback((newValue: string) => {
        dispatch(updateTaskTC({taskId: props.task.id, todolistId: props.todoID, domainModule: {title: newValue}}))

    }, [props.task.id, props.todoID, props.changeTaskTitle])


    return <div key={props.task.id}><Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={changeCheckboxHandler}/>
        <EditableSpan title={props.task.title} onChange={onChangeTitle}/>
        <IconButton aria-label="delete">
            <DeleteIcon onClick={() => props.removeTask(props.task.id, props.todoID)}/>
        </IconButton>
    </div>
})