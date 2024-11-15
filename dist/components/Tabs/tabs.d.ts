import React from "react";
import './_style.scss';
type SelectedCallBack = (selectedIndex: string) => void;
type tabsTypes = 'card' | 'line';
export interface TabsProps {
    children?: React.ReactNode;
    disabled?: boolean;
    className?: string;
    onSelect?: SelectedCallBack;
    defaultIndex?: string;
    type: tabsTypes;
}
interface ITabsContext {
    index: string;
    onSelect?: SelectedCallBack;
}
export declare const TabsContext: React.Context<ITabsContext>;
declare const Tabs: React.FC<TabsProps>;
export default Tabs;
