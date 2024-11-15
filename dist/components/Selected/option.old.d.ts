import React from "react";
export interface OptionProps {
    index?: string;
    value: string;
    label?: string;
    disabled?: boolean;
    children: React.ReactNode;
}
declare const Option: React.FC<OptionProps>;
export default Option;
