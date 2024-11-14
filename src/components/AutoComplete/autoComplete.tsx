import React, { ChangeEvent, useEffect, useState, KeyboardEvent, useRef } from "react";
import Input, { InputProps } from "../Input/input";
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutSide from "../../hooks/useClickOutSide";
import classNames from "classnames";
import Transition from "../Transition/transition";
import './_style.scss'

interface DataSourceObject {
    value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions?: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => React.ReactElement;
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
    const { value,
        fetchSuggestions,
        onSelect,
        onChange,
        renderOption,
        ...restProps } = props;

    const [inputValue, setInputValue] = useState(value as string);
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
    const [loading, setLoading] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(-1);
    const [showDropdown, setShowDropdown] = useState(false);

    const debouncedValue = useDebounce(inputValue);
    const triggerSearch = useRef(false);
    const componentRef = useRef<HTMLDivElement>(null);
    useClickOutSide(componentRef, () => {
        setSuggestions([]);
        setShowDropdown(false);
    });

    useEffect(() => {
        if (debouncedValue && triggerSearch.current) {
            const results = fetchSuggestions?.(debouncedValue);
            setSuggestions([]);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(data => {
                    setLoading(false);
                    setSuggestions(data);
                    setShowDropdown(data.length > 0);
                });
            } else {
                setSuggestions(results as DataSourceType[]);
                setShowDropdown((results as DataSourceType[]).length > 0);
            }
        } else {
            setShowDropdown(false);
        }
        setHighlightIndex(-1);
    }, [debouncedValue]);

    const highlight = (index: number) => {
        if (index < 0) index = 0;
        if (index >= suggestions.length) index = suggestions.length - 1;
        setHighlightIndex(index);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case "Enter":
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case "ArrowUp":
                highlight(highlightIndex - 1);
                break;
            case "ArrowDown":
                highlight(highlightIndex + 1);
                break;
            case "Escape":
                setShowDropdown(false);
                break;
            default:
                break;
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value);
        if (onChange) onChange(e);
        triggerSearch.current = true;
    };

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value);
        setShowDropdown(false);
        if (onSelect) onSelect(item);
        triggerSearch.current = false;
    };

    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value;
    };

    const generateSuggestions = () => {
        return (
            <Transition in={showDropdown || loading} animation="zoom-in-top" timeout={300}>
                <ul className="viking-suggestion-list">
                    {loading && (
                        <div className="suggstions-loading-icon">
                            <Icon icon="spinner" spin />
                        </div>
                    )}
                    {suggestions.map((item, index) => {
                        const cnames = classNames("suggestion-item", {
                            "is-active": index === highlightIndex,
                        });
                        return (
                            <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                                {renderTemplate(item)}
                            </li>
                        );
                    })}
                </ul>
            </Transition>
        );
    };

    return (
        <div className="viking-auto-complete" ref={componentRef}>
            <Input
                value={inputValue}
                {...restProps}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            {generateSuggestions()}
        </div>
    );
};

export default AutoComplete;
