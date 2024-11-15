import React from "react";
type SelectedCallBack = (selectedIndex: string) => void;
export interface TabProps {
    children?: React.ReactNode;
    disabled?: boolean;
    className?: string;
    onSelect?: SelectedCallBack;
    defaultIndex?: string;
}
interface ITabsItemProps {
    index: string;
    onSelect?: SelectedCallBack;
}
export declare const TabsContext: React.Context<ITabsItemProps>;
declare const Tabs: React.FC<TabProps>;
export default Tabs;
