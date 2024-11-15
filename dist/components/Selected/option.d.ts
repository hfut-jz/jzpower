import { FC, ReactNode } from 'react';
import './_style.scss';
export interface SelectOptionProps {
    index?: string;
    value: string;
    label?: string;
    disabled?: boolean;
    children?: ReactNode;
}
export declare const Option: FC<SelectOptionProps>;
export default Option;
