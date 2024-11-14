import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Button, { ButtonProps } from '../Button/button';
import { action } from '@storybook/addon-actions';

// Meta 配置，用于描述 Button 组件的故事
const meta: Meta<ButtonProps> = {
    title: 'Components/Button', // Storybook中的路径
    component: Button,
    argTypes: {
        btnType: {
            control: {
                type: 'select',
                options: [
                    'primary',
                    'secondary',
                    'success',
                    'info',
                    'warning',
                    'dark',
                    'light',
                    'danger',
                    'link',
                    'default',
                ],
            },
        },
        size: {
            control: {
                type: 'select',
                options: ['lg', 'sm'],
            },
        },
        disabled: {
            control: {
                type: 'boolean',
            },
        },
        href: {
            control: {
                type: 'text',
            },
        },
    },
};

export default meta;

type Story = StoryObj<ButtonProps>;

// Primary Button 示例
export const Primary: Story = {
    render: (args) => <Button {...args} onClick={action('clicked')}>Primary Button</Button>,
    args: {
        btnType: 'primary',
    },
};

// Secondary Button 示例
export const Secondary: Story = {
    render: (args) => <Button {...args}>Secondary Button</Button>,
    args: {
        btnType: 'secondary',
    },
};

// Link Button 示例
export const LinkButton: Story = {
    render: (args) => <Button {...args}>Link Button</Button>,
    args: {
        btnType: 'link',
        href: 'https://example.com',
    },
};

// Large Button 示例
export const Large: Story = {
    render: (args) => <Button {...args}>Large Button</Button>,
    args: {
        size: 'lg',
    },
};

// Small Button 示例
export const Small: Story = {
    render: (args) => <Button {...args}>Small Button</Button>,
    args: {
        size: 'sm',
    },
};

// Disabled Button 示例
export const Disabled: Story = {
    render: (args) => <Button {...args}>Disabled Button</Button>,
    args: {
        btnType: 'primary',
        disabled: true,
    },
};
