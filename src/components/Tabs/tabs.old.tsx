import React, {Children, createContext, FunctionComponentElement, useState} from "react";
import {TabsItemProps} from "./tabsItem.old";


//使用selected规定泛型函数来对以后重写的函数进行约束
type SelectedCallBack=(selectedIndex:string)=>void
export interface TabProps{
    children?:React.ReactNode;
    disabled?:boolean;
    className?:string;
    onSelect?:SelectedCallBack,
    defaultIndex?:string
}
//对tabsItem传参
interface ITabsItemProps{
    index:string,
    onSelect?:SelectedCallBack
}
//传递的信息
export const TabsContext=createContext<ITabsItemProps>({'index':'0'})

const Tabs:React.FC<TabProps>=(props)=>{
    const {children,
        className,
        onSelect,
        defaultIndex='1'}=props
    //规定其的类型，以及其传参之后的对子组件的处理
    const [currentActive,setActive]=useState(defaultIndex)

    const handleClick=(selectedIndex:string)=>{
        setActive(selectedIndex)
        if(onSelect){
            onSelect(selectedIndex)
        }
    }
    const passedContext={
        index:currentActive,
        onSelect:handleClick
    }
    const renderChildren=()=>{
        return Children.map(children,(child,index)=>{
            const childElement=child as FunctionComponentElement<TabsItemProps>
            const {displayName}=childElement.type
            if(displayName==='tabsItem'){
                return React.cloneElement(childElement,{
                    index:index.toString()
                })
            }else{
                console.error('Warning, Tab has a child which is not TabItem')
            }
        })
    }
    return(
        <ul className={'viking-tabs-nav'}>
            <TabsContext.Provider value={passedContext}>
                {renderChildren()}
            </TabsContext.Provider>
        </ul>
    )
}
export default Tabs