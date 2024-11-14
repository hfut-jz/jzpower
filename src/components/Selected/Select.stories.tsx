import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Select, { SelectProps } from './select'; // 假设您的 Select 组件路径
import Option from './option'; // 假设 Option 组件路径
import { action } from '@storybook/addon-actions';

// Storybook 配置元数据
const meta: Meta<SelectProps> = {
    title: 'Components/Select', // 在 Storybook 中的路径
    component: Select,
    argTypes: {
        defaultValue: {
            control: 'text',
            description: '默认选中的值',
        },
        placeholder: {
            control: 'text',
            description: '输入框的占位符文本',
        },
        disabled: {
            control: 'boolean',
            description: '是否禁用选择框',
        },
        multiple: {
            control: 'boolean',
            description: '是否支持多选模式',
        },
        onChange: {
            action: 'changed',
            description: '选择项变化时的回调函数',
        },
        onVisibleChange: {
            action: 'visibility changed',
            description: '下拉框显示状态变化时的回调函数',
        },
    },
};

export default meta;

type Story = StoryObj<SelectProps>;

// 默认单选示例
export const DefaultSelect: Story = {
    render: (args) => (
        <Select {...args} onChange={action('changed')} onVisibleChange={action('visibility changed')}>
            <Option value="option1">Option 1</Option>
            <Option value="option2">Option 2</Option>
            <Option value="option3">Option 3</Option>
        </Select>
    ),
    args: {
        placeholder: 'Select an option',
        defaultValue: 'option1',
        multiple: false,
        disabled: false,
    },
};

// 多选示例
export const MultipleSelect: Story = {
    render: (args) => (
        <Select {...args} onChange={action('changed')} onVisibleChange={action('visibility changed')}>
            <Option value="option1">Option 1</Option>
            <Option value="option2">Option 2</Option>
            <Option value="option3">Option 3</Option>
            <Option value="option4">Option 4</Option>
        </Select>
    ),
    args: {
        placeholder: 'Select multiple options',
        multiple: true,
        defaultValue: ['option1', 'option2'],
    },
};

// 禁用状态的 Select
export const DisabledSelect: Story = {
    render: (args) => (
        <Select {...args} onChange={action('changed')} onVisibleChange={action('visibility changed')}>
            <Option value="option1">Option 1</Option>
            <Option value="option2">Option 2</Option>
        </Select>
    ),
    args: {
        placeholder: 'Disabled select',
        disabled: true,
    },
};

// 包含禁用选项的 Select
export const SelectWithDisabledOption: Story = {
    render: (args) => (
        <Select {...args} onChange={action('changed')} onVisibleChange={action('visibility changed')}>
            <Option value="option1">Option 1</Option>
            <Option value="option2" disabled>Disabled Option</Option>
            <Option value="option3">Option 3</Option>
        </Select>
    ),
    args: {
        placeholder: 'Select with disabled option',
        defaultValue: 'option1',
    },
};
