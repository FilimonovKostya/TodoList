import App from "./App";
import {Meta, Story} from "@storybook/react";

import React from "react";
import {ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";


export default {
    title: 'Todolist/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as Meta

const Template: Story = () =>  <App/>

export const AppExample = Template.bind({})
AppExample.args = {}