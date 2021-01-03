import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import {action} from "@storybook/addon-actions";
import {EditableSpan, EditableSpanPropsType} from "./EditableSpan";

export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChange: {
            description: 'Changed value editable span'
        },
        value:{
            defaultValue:'Default value',
            description:'Start value to editable span'
        }
    },
} as Meta;


const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args}/>


export const EditableSpanExample = Template.bind({})
EditableSpanExample.args = {
    onChange: action('Value changed'),
    title: 'Some text'
}