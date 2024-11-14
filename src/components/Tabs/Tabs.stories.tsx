import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Tabs from './tabs';  // 假设您的 Tabs 组件路径是 ../Tabs/tabs
import TabsItem from './tabsItem';  // 假设您的 TabsItem 组件路径是 ../Tabs/tabsItem'
import { TabsProps } from './tabs';
import { action } from '@storybook/addon-actions';

// Storybook 配置元数据
const meta: Meta<TabsProps> = {
    title: 'Components/Tabs', // 在 Storybook 中的路径
    component: Tabs,
    argTypes: {
        defaultIndex: {
            control: 'number',
            description: '默认激活的 Tab 索引',
        },
        type: {
            control: {
                type: 'select',
                options: ['line', 'card'],
            },
            description: 'Tab 样式类型，可选 "line" 或 "card"',
        },
        onSelect: {
            action: 'selected',
            description: '切换 Tab 时触发的回调函数',
        },
    },
};

export default meta;

type Story = StoryObj<TabsProps>;

// 默认 Tabs 示例
export const DefaultTabs: Story = {
    render: (args) => (
        <Tabs {...args} onSelect={action('selected')}>
            <TabsItem label="Tab 1">Content of Tab 1</TabsItem>
            <TabsItem label="Tab 2">Content of Tab 2</TabsItem>
            <TabsItem label="Tab 3">Content of Tab 3</TabsItem>
        </Tabs>
    ),
    args: {
        defaultIndex: '0',
        type: 'line',
    },
};

// 卡片样式 Tabs 示例
export const CardTabs: Story = {
    render: (args) => (
        <Tabs {...args} onSelect={action('selected')}>
            <TabsItem label="Tab A">Content of Tab A</TabsItem>
            <TabsItem label="Tab B">Content of Tab B</TabsItem>
            <TabsItem label="Tab C">Content of Tab C</TabsItem>
        </Tabs>
    ),
    args: {
        defaultIndex: '0',
        type: 'card',
    },
};

// 带有禁用选项的 Tabs 示例
export const DisabledTabs: Story = {
    render: (args) => (
        <Tabs {...args} onSelect={action('selected')}>
            <TabsItem label="Enabled Tab">Content of Enabled Tab</TabsItem>
            <TabsItem label="Disabled Tab" disabled>Content of Disabled Tab</TabsItem>
            <TabsItem label="Another Tab">Content of Another Tab</TabsItem>
        </Tabs>
    ),
    args: {
        defaultIndex: '0',
        type: 'line',
    },
};

// 动态内容 Tabs 示例
export const DynamicTabs: Story = {
    render: (args) => (
        <Tabs {...args} onSelect={action('selected')}>
            <TabsItem label="Tab 1">
                Dynamic Content 1 - This content can be dynamically controlled via props.
            </TabsItem>
            <TabsItem label="Tab 2">
                Dynamic Content 2 - This content can be dynamically controlled via props.
            </TabsItem>
            <TabsItem label="Tab 3" disabled>
                Dynamic Content 3 - This tab is disabled.
            </TabsItem>
        </Tabs>
    ),
    args: {
        defaultIndex: '0',
        type: 'line',
    },
};
