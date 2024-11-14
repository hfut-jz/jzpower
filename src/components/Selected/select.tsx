import React, { FC, useState, createContext, useRef, FunctionComponentElement, useEffect, ReactNode } from 'react';
import classNames from 'classnames';
import Input from '../Input/input';
import Icon from '../Icon/icon';
import useClickOutside from '../../hooks/useClickOutSide';
import Transition from '../Transition/transition';
import { SelectOptionProps } from './option';
import './_style.scss'

export interface SelectProps {
    defaultValue?: string | string[];
    placeholder?: string;
    disabled?: boolean;
    multiple?: boolean;
    name?: string;
    onChange?: (selectedValue: string, selectedValues: string[]) => void;
    onVisibleChange?: (visible: boolean) => void;
    children?: ReactNode;
}

export interface ISelectContext {
    onSelect?: (value: string) => void;
    selectedValues: string[];
    multiple?: boolean;
}

export const SelectContext = createContext<ISelectContext>({ selectedValues: [] });

export const Select: FC<SelectProps> = (props) => {
    const {
        defaultValue,
        placeholder='请选择',
        children,
        multiple,
        name='viking-select',
        disabled,
        onChange,
        onVisibleChange,
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const containerWidth = useRef(0);

    const [selectedValues, setSelectedValues] = useState<string[]>(Array.isArray(defaultValue) ? defaultValue : []);
    const [menuOpen, setMenuOpen] = useState(false);
    const [inputValue, setInputValue] = useState(typeof defaultValue === 'string' ? defaultValue : '');

    const handleOptionClick = (value: string) => {
        let updatedValues = [value];
        if (multiple) {
            updatedValues = selectedValues.includes(value)
                ? selectedValues.filter((v) => v !== value)
                : [...selectedValues, value];
            setSelectedValues(updatedValues);
        } else {
            setMenuOpen(false);
            setInputValue(value);
            updatedValues = [value];
        }
        if (onChange) {
            onChange(value, updatedValues);
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.placeholder = multiple && selectedValues.length > 0 ? '' : placeholder || '';
        }
    }, [selectedValues, multiple, placeholder]);

    useEffect(() => {
        if (containerRef.current) {
            containerWidth.current = containerRef.current.getBoundingClientRect().width;
        }
    });

    useClickOutside(containerRef, () => {
        setMenuOpen(false);
        if (onVisibleChange && menuOpen) {
            onVisibleChange(false);
        }
    });
    //给其传在父组件已经规定好的函数并且保证正确
    const passedContext: ISelectContext = {
        onSelect: handleOptionClick,
        selectedValues,
        multiple,
    };

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!disabled) {
            setMenuOpen(!menuOpen);
            if (onVisibleChange) {
                onVisibleChange(!menuOpen);
            }
        }
    };

    const generateOptions = () => {
        return React.Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<SelectOptionProps>;
            if (childElement.type.displayName === 'Option') {
                return React.cloneElement(childElement, { index: `select-${i}` });
            } else {
                console.error('Warning: Select has a child which is not an Option component');
            }
        });
    };

    const containerClass = classNames('viking-select', {
        'menu-is-open': menuOpen,
        'is-disabled': disabled,
        'is-multiple': multiple,
    });

    return (
        <div className={containerClass} ref={containerRef}>
            <div className="viking-select-input" onClick={handleClick}>
                <Input
                    ref={inputRef}
                    placeholder={placeholder}
                    value={inputValue}
                    readOnly
                    icon="angle-down"
                    disabled={disabled}
                    name={name}
                />
            </div>
            <SelectContext.Provider value={passedContext}>
                <Transition in={menuOpen} animation="zoom-in-top" timeout={300}>
                    <ul className="viking-select-dropdown">{generateOptions()}</ul>
                </Transition>
            </SelectContext.Provider>
            {multiple && (
                <div className="viking-selected-tags" style={{ maxWidth: containerWidth.current - 32 }}>
                    {selectedValues.map((value, index) => (
                        <span className="viking-tag" key={`tag-${index}`}>
              {value}
                            <Icon icon="times" onClick={() => handleOptionClick(value)} />
            </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Select;
