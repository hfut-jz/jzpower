import React, { Children, createContext, FunctionComponentElement, useState } from "react";
import classNames from "classnames";
import { TabsItemProps } from "./tabsItem";
import './_style.scss'

type SelectedCallBack = (selectedIndex: string) => void;

type tabsTypes='card'|'line'

export interface TabsProps {
    children?: React.ReactNode;
    disabled?: boolean;
    className?: string;
    onSelect?: SelectedCallBack;
    defaultIndex?: string;
    type:tabsTypes
}
//这是必须要传的，否则样式无法正确显示。
interface ITabsContext {
    index: string;
    onSelect?: SelectedCallBack;
}

export const TabsContext = createContext<ITabsContext>({ index: '0', onSelect: undefined });

const Tabs: React.FC<TabsProps> = (props) => {
    const {
        children,
        className,
        onSelect,
        defaultIndex = '0',
        type
    } = props;

    const [currentActive, setActive] = useState(defaultIndex);

    const handleClick = (selectedIndex: string) => {
        //一般都是这样，使用index来显示显式的id并做高亮处理。
        setActive(selectedIndex);
        if (onSelect) {
            onSelect(selectedIndex);
        }
    };
    //将被选中的以及其的内联进行传递，源码中将handleClick放在源文件中处理了。
    const passedContext: ITabsContext = {
        index: currentActive,
        onSelect: handleClick
    };

    const tabsClasses = classNames('viking-tabs-nav',{
        'nav-line':type==="line",
        'nav-card':type==='card'
    } );

    const renderChildren = () => {
        return Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<TabsItemProps>;
            const { displayName } = childElement.type;
            if (displayName === 'TabsItem') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                });
            } else {
                console.error('Warning: Tabs has a child which is not a TabsItem', child);
            }
        });
    };

    return (
        <div className="viking-tabs-nav">
            {/*必须要加上这层，要不然显示会错误。*/}
            <ul className={tabsClasses}>
                <TabsContext.Provider value={passedContext}>
                    {renderChildren()}
                </TabsContext.Provider>
            </ul>
        </div>
    );
};

export default Tabs;
