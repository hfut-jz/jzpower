import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Form, { FormProps } from "./form";
import Item from "./formItem";
import Input from "../Input/input";
import Button from "../Button/button";
import { CustomRule } from "./useStore";
//todo 明天写完剩下的组件，并且完成对于form组件的更改
const meta: Meta<FormProps> = {
    title: "Components/Form",
    component: Form,
    decorators: [
        (Story) => (
            <div style={{ width: "550px" }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        docs: {
            source: {
                type: "code",
            },
        },
    },
};
export default meta;

type Story = StoryObj<FormProps>;

const confirmRules: CustomRule[] = [
    { type: "string", required: true, min: 3, max: 8 },
    ({ getFieldValue }) => ({
        asyncValidator(rule, value) {
            return new Promise((resolve, reject) => {
                if (value !== getFieldValue("password")) {
                    reject("The two passwords that you entered do not match!");
                }
                setTimeout(resolve, 1000);
            });
        },
    }),
];

// 基本的登录表单
export const BasicForm: Story = {
    render: (args) => (
        <Form {...args}>
            <Item label="用户名" name="name" rules={[{ type: "string", required: true, min: 3 }]}>
                <Input />
            </Item>
            <Item label="密码" name="password" rules={[{ type: "string", required: true, min: 3, max: 8 }]}>
                <Input type="password" />
            </Item>
            <div className="viking-form-submit-area">
                <Button type="submit" btnType="primary">
                    登陆
                </Button>
            </div>
        </Form>
    ),
};

// 注册表单，支持多种 FormItem 组件
