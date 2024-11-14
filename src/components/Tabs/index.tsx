import React, {FC} from "react";
import {TabProps} from "./tabs.old";
import TabsItem, {TabsItemProps} from "./tabsItem";
import Tabs from "./tabs";

export type ITabsComponents=FC<TabProps>&{
    Item:FC<TabsItemProps>
}
const TransTabs=Tabs as ITabsComponents
TransTabs.Item=TabsItem
export default TransTabs