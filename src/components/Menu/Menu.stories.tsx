import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Menu, { MenuProps } from "./menu";
import SubMenu from "./submenu";
import MenuItem from "./menuItem";

// @ts-ignore
const meta: Meta<MenuProps> = {
    title: "Components/Menu",
    component: Menu,
    argTypes: {
        defaultIndex: {
            control: "text",
            description: "默认选中的菜单项索引值",
        },
        mode: {
            control: {
                type: "select",
                options: ["horizontal", "vertical"],
            },
            description: "菜单模式，可选 horizontal 或 vertical",
        },
        onSelect: {
            action: "selected",
            description: "当选中菜单项时的回调函数",
        },

    },
};

export default meta;

type Story = StoryObj<MenuProps>;

export const Default: Story = {
    render: (args) => (
        <Menu {...args}>
            <MenuItem index="0">菜单项 1</MenuItem>
            <SubMenu index="1" title="子菜单">
                <MenuItem index="1-0">子菜单项 1</MenuItem>
                <MenuItem index="1-1">子菜单项 2</MenuItem>
            </SubMenu>
            <MenuItem index="2">菜单项 2</MenuItem>
        </Menu>
    ),
    args: {
        defaultIndex: "0",
        mode: "horizontal",
        defaultOpenSubMenus: [],
    },
};
export const Vertical: Story = {
    render: (args) => (
        <Menu {...args} mode={"vertical"}>
            <MenuItem index="0">菜单项 1</MenuItem>
            <SubMenu index="1" title="子菜单">
                <MenuItem index="1-0">子菜单项 1</MenuItem>
                <MenuItem index="1-1">子菜单项 2</MenuItem>
            </SubMenu>
            <MenuItem>菜单项2</MenuItem>
        </Menu>
    ),
    args: {
        defaultIndex: "0",
        mode: "vertical",
        defaultOpenSubMenus: [],
    },
}