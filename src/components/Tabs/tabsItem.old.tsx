import React from "react";
import {useContext} from "react";
import {TabsContext} from "./tabs.old";
import classNames from "classnames";

export interface TabsItemProps {
    //这里的label属性是必传的
    label: string
    disabled?: boolean,
    index?: string
    className?: string
    children:React.ReactNode
}

const TabsItem: React.FC<TabsItemProps> = (props) => {
    const {
        label,
        disabled,
        index,
        className,
        children
    } = props
    const context = useContext(TabsContext)
    //对context进行解构
    //对点击到的事件进行高亮
    const handleClick = () => {
        if (context.onSelect && !disabled && typeof index === "string") {
            //将其做高亮处理
            context.onSelect(index)
        }
    }
    const classes = classNames('viking-tabs-nav-item', className, {
        'disabled': disabled,
        'is-active':context.index===index
    })
    return (
        <div className="viking-tabs-nav-item">
            <li onClick={handleClick}
                className={classes}>
                {children}
            </li>
        </div>
    )
}
export default TabsItem