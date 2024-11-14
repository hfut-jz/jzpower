import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Alert, { AlertProps } from './alert';
import { action } from '@storybook/addon-actions';

// 配置 Storybook 元数据
const meta: Meta<AlertProps> = {
    title: 'Components/Alert',
    component: Alert,
    argTypes: {
        closable: {
            control: 'boolean',
            description: '是否可以关闭警告框',
        },
        type: {
            control: {
                type: 'select',
                options: ['success', 'defeat', 'default', 'warning'],
            },
            description: '警告框的类型，不同场景使用不同类型',
        },
        title: {
            control: 'text',
            description: '警告框的标题',
        },
        description: {
            control: 'text',
            description: '警告框的描述文字',
        },
        onClose: {
            action: 'closed',
            description: '关闭警告框时的回调函数',
        },
    },
};

export default meta;

type Story = StoryObj<AlertProps>;

// 创建一个默认的 Alert 示例
export const SimpleAlert: Story = {
    render: (args) => (
        <Alert
            {...args}
    onClose={action('closed')}
/>
),
args: {
    title: 'Alert Title',
        description: 'This is an alert message.',
        type: 'default',
        closable: true,
},
};

export const SuccessAlert: Story = {
    render: (args) => (
        <Alert
            {...args}
    onClose={action('closed')}
/>
),
args: {
    title: 'Success Alert',
        description: 'This is a success message.',
        type: 'success',
        closable: true,
},
};

export const WarningAlert: Story = {
    render: (args) => (
        <Alert
            {...args}
    onClose={action('closed')}
/>
),
args: {
    title: 'Warning Alert',
        description: 'This is a warning message.',
        type: 'warning',
        closable: true,
},
};

export const WithoutDescriptionAlert: Story = {
    render: (args) => (
        <Alert
            {...args}
    onClose={action('closed')}
/>
),
args: {
    title: 'Title Only Alert',
        type: 'default',
        closable: true,
},
};
