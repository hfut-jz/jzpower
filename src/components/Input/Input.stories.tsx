// Input.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Input, { InputProps } from './input';

export default {
    title: 'Components/Input',
    component: Input,
    argTypes: {
        disabled: { control: 'boolean' },
        size: {
            control: { type: 'select' },
            options: ['lg', 'sm'],
        },
        prepend: { control: 'text' },
        append: { control: 'text' },
        className: { control: 'text' },
        onChange: { action: 'changed' },
    },

} as Meta<InputProps>;

type Story = StoryObj<InputProps>;

export const Default: Story = {
    args: {
        placeholder: 'Default Input',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        placeholder: 'Disabled Input',
    },
};

export const WithSize: Story = {
    args: {
        size: 'lg',
        placeholder: 'Large Input',
    },
};

export const WithPrependAndAppend: Story = {
    args: {
        prepend: 'https://',
        append: '.com',
        placeholder: 'Website',
    },
};

