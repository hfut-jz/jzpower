import React, { useContext } from "react";
import classNames from "classnames";
import { TabsContext } from "./tabs";
import './_style.scss'

export interface TabsItemProps {
    label: string;
    disabled?: boolean;
    index?: string;
    className?: string;
    children: React.ReactNode;
}

const TabsItem: React.FC<TabsItemProps> = (props) => {
    const {
        disabled,
        index,
        className,
        children
    } = props;

    const context = useContext(TabsContext);

    const handleClick = () => {
        if (context.onSelect && !disabled && index) {
            context.onSelect(index);
        }
    };

    const classes = classNames('viking-tabs-nav-item', className, {
        'disabled': disabled,
        'is-active': context.index === index
    });

    return (
        <li onClick={handleClick} className={classes}>
            {children}
        </li>
    );
};

TabsItem.displayName = 'TabsItem';

export default TabsItem;
