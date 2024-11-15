import { FC } from "react";
import { TabProps } from "./tabs.old";
import { TabsItemProps } from "./tabsItem";
export type ITabsComponents = FC<TabProps> & {
    Item: FC<TabsItemProps>;
};
declare const TransTabs: ITabsComponents;
export default TransTabs;
