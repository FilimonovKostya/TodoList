import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../../../api/todolist-api";

export default {
    title: 'Todolist/Task',
    component: Task,
} as Meta;


const removeCallBack = action('Remove task on button')
const changeStatusCallBack = action('Status was changed')
const changeTitleCallBack = action('Title was changed')

const Template: Story<TaskPropsType> = (args) => <Task {...args}/>

const baseArg = {
    removeTask: removeCallBack,
    changeCheckbox: changeStatusCallBack,
    changeTaskTitle: changeTitleCallBack
}

export const TaskIsDoneExample = Template.bind({})
TaskIsDoneExample.args = {
    ...baseArg,
    task: {
        id: '1',
        status: TaskStatuses.Completed,
        title: 'Css',
        todoListId: 'todolistId1',
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''
    },
    todoID: 'todolistId1',


}

export const TaskIsNotDoneExample = Template.bind({})
TaskIsNotDoneExample.args = {
    ...baseArg,
    task: {
        id: '2',
        status: TaskStatuses.New,
        title: 'JS',
        todoListId: 'todolistId2',
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''
    },
    todoID: 'todolistId2',
}