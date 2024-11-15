import React from "react";
export interface SelectProps {
    defaultValue?: string | string[];
    placeholder?: string;
    disabled?: boolean;
    multiple?: boolean;
    onChange: (selectedValue: string, SelectedValues: string[]) => void;
    onVisibleChange: (visible: boolean) => void;
}
export interface ISelectProps {
    onChange: (selectedValue: string, SelectedValues: string[]) => void;
}
export declare const SelectContext: React.Context<ISelectProps>;
declare const Select: React.FC<SelectProps>;
export default Select;
