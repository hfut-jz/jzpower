import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import AutoComplete, {AutoCompleteProps, DataSourceType} from "./autoComplete";
// 模拟 fetchSuggestions 函数，返回符合条件的建议
const sampleSuggestions = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape"];

//todo：还有bug需要改，还未完成。
//利用已有的东西来获得数据
const mockFetchSuggestions = (query: string): DataSourceType[] => {
    return sampleSuggestions.filter(name=>name.includes(query)).map(name=>({value:name}));
};
//在获取数据之后可以对其进行自定义展示。
const renderOption=(item:DataSourceType)=>{
    return(
        <h2>
            {item.value}
        </h2>
    )
}
//通过异步请求来获得数据
const handleFetch=(query:string)=>{
    return fetch(`https://api.github.com/search/users?q=${query}`)
        .then(res=>res.json())
        .then(({ items }) => {
            return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
        })
}
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

// 默认的 AutoComplete Story
export const Default: Story = {
    render: (args) => (
        <AutoComplete
            {...args}
            renderOption={renderOption}
            fetchSuggestions={handleFetch}
            onSelect={(item) => alert(`You selected: ${item}`)}
        />
    ),
    args: {
        placeholder: "Type to search...",
    },
};

// 没有建议项的 AutoComplete Story
export const NoSuggestions: Story = {
    render: (args) => (
        <AutoComplete
            {...args}
            fetchSuggestions={() => []
            } // 返回空数组，模拟没有建议项的情况
        />
    ),
    args: {
        placeholder: "Type to search, but no results!",
    },
};
