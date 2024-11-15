import React from "react";
export interface TabsItemProps {
    label: string;
    disabled?: boolean;
    index?: string;
    className?: string;
    children: React.ReactNode;
}
declare const TabsItem: React.FC<TabsItemProps>;
export default TabsItem;
