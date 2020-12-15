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
    task: {id: '1', isDone: true, title: 'Css'},
    todoID: 'todolistId1',

}

export const TaskIsNotDoneExample = Template.bind({})
TaskIsNotDoneExample.args = {
    ...baseArg,
    task: {id: '2', isDone: false, title: 'JS'},
    todoID: 'todolistId2',
}