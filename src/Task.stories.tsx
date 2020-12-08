import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';

import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";

export default {
    title: 'Todolist/Task',
    component: Task,
} as Meta;

const removeCallBack = action('Remove button inside Task clicked')
const changeStatusCallBack = action('Status changed inside Task ')
const changeTitleCallBack = action('Title changed insied Task ')

const Template: Story<TaskPropsType> = (args) => <Task {...args}/>

const baseArg = {
    removeTask: removeCallBack,
    changeTaskStatus: changeStatusCallBack,
    changeTaskTitle: changeTitleCallBack
}

export const TaskIsDoneExample = Template.bind({})
TaskIsDoneExample.args = {
   ...baseArg,
    task: {id: '1', isDone: true, title: 'Css'},
    todoID: 'todolistId1'
}

export const TaskIsNotDoneExample = Template.bind({})
TaskIsNotDoneExample.args = {
    ...baseArg,
    task: {id: '2', isDone: false, title: 'JS'},
    todoID: 'todolistId2'
}