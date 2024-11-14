import React, { FC, useContext, ReactNode } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/icon';
import { SelectContext } from './select';
import './_style.scss'

export interface SelectOptionProps {
    index?: string;
    value: string;
    label?: string;
    disabled?: boolean;
    children?: ReactNode;
}

export const Option: FC<SelectOptionProps> = ({ value, label, disabled, children }) => {
    const { onSelect, selectedValues, multiple } = useContext(SelectContext);
    const isSelected = selectedValues.includes(value);

    const classes = classNames('viking-select-item', {
        'is-disabled': disabled,
        'is-selected': isSelected,
    });

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onSelect && !disabled) {
            onSelect(value);
        }
    };

    return (
        <li className={classes} onClick={handleClick}>
            {children || label || value}
            {multiple && isSelected && <Icon icon="check" />}
        </li>
    );
};

Option.displayName = 'Option';

export default Option;
