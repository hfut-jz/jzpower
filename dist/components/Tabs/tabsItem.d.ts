import React from "react";
import './_style.scss';
export interface TabsItemProps {
    label: string;
    disabled?: boolean;
    index?: string;
    className?: string;
    children: React.ReactNode;
}
declare const TabsItem: React.FC<TabsItemProps>;
export default TabsItem;
