import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import AutoComplete, { AutoCompleteProps, DataSourceType } from "./autoComplete";

// 定义静态建议项的示例
const sampleSuggestions = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape"];

// 模拟 fetchSuggestions 函数，返回符合条件的静态建议项
const mockFetchSuggestions = (query: string): DataSourceType[] => {
    return sampleSuggestions
        .filter(name => name.toLowerCase().includes(query.toLowerCase()))
        .map(name => ({ value: name }));
};

// 自定义渲染函数，用于自定义展示建议项
const renderOption = (item: DataSourceType) => {
    return <h2 style={{ color: "blue" }}>{item.value}</h2>;
};

// 异步获取 GitHub 用户的建议项
const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
        .then(res => res.json())
        .then(({ items }) => {
            return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }));
        });
};

// Meta 配置
const meta: Meta<AutoCompleteProps> = {
    title: "Components/AutoComplete",
    component: AutoComplete,
    argTypes: {
        fetchSuggestions: {
            description: "获取建议项的回调函数，接收输入的字符串并返回建议列表",
            control: false,
        },
        onSelect: {
            action: "selected",
            description: "当选中某个建议项时的回调函数",
        },
        placeholder: {
            control: "text",
            description: "输入框的占位符",
        },
    },
};

export default meta;

type Story = StoryObj<AutoCompleteProps>;

// 默认的 AutoComplete Story，使用静态的建议项
export const Default: Story = {
    render: (args) => (
        <AutoComplete
            {...args}
            fetchSuggestions={mockFetchSuggestions}
            renderOption={renderOption}
            onSelect={(item) => alert(`You selected: ${item.value}`)}
        />
    ),
    args: {
        placeholder: "输入水果名称...",
    },
};

// 使用异步请求的 AutoComplete Story
export const AsyncFetch: Story = {
    render: (args) => (
        <AutoComplete
            {...args}
            fetchSuggestions={handleFetch}
            renderOption={(item) => {
                const itemWithGithub = item as DataSourceType<{ login: string; url: string }>;
                return (
                    <>
                        <b>用户名: {itemWithGithub.value}</b>
                        <span style={{ display: "block" }}>GitHub URL: {itemWithGithub.url}</span>
                    </>
                );
            }}
            onSelect={(item) => alert(`Selected GitHub user: ${item.value}`)}
        />
    ),
    args: {
        placeholder: "输入 GitHub 用户名试试...",
    },
};

// 没有建议项的 AutoComplete Story
export const NoSuggestions: Story = {
    render: (args) => (
        <AutoComplete
            {...args}
            fetchSuggestions={() => []} // 返回空数组，模拟没有建议项的情况
            placeholder="输入内容无匹配结果"
        />
    ),
    args: {
        placeholder: "Type to search, but no results!",
    },
};

// 自定义模板的 AutoComplete Story
AsyncFetch.storyName = "支持异步搜索";
Default.storyName = "基本的搜索";
NoSuggestions.storyName = "无建议项的情况";
