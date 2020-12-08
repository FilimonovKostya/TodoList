import AppWithRedux from "./AppWithRedux";
import {Meta, Story} from "@storybook/react";

import React from "react";
import {ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorator";


export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta

const Template: Story = () =>  <AppWithRedux/>

export const AppWithReduxExample = Template.bind({})
AppWithReduxExample.args = {}