import React from "react";
import { InputProps } from "../Input/input";
import './_style.scss';
interface DataSourceObject {
    value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions?: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => React.ReactElement;
}
declare const AutoComplete: React.FC<AutoCompleteProps>;
export default AutoComplete;
