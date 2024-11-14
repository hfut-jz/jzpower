import React, {KeyboardEvent, ChangeEvent, useEffect, useState, createContext} from "react";
import Option from './option.old'
import classNames from "classnames";
import Input from "../Input/input";

export interface SelectProps {
    defaultValue?: string | string[]
    placeholder?: string
    disabled?: boolean
    multiple?: boolean
    onChange: (selectedValue: string, SelectedValues: string[]) => void
    onVisibleChange: (visible: boolean) => void
}

//这种既然放在了AutoComplete中，那么就说明需要useState使用来解决问题


//将onChange函数传过去，然后触发子元素的onClick事件
export interface ISelectProps{
    onChange: (selectedValue: string, SelectedValues: string[]) => void
}
// @ts-ignore
export const SelectContext=createContext<ISelectProps>({onChange:undefined})
const Select: React.FC<SelectProps> = (props) => {



    const {
        defaultValue = '',
        placeholder,
        disabled,
        multiple,
        onChange,
        onVisibleChange
    } = props
    const [OptionValue, setOptionValue] = useState<string>(defaultValue as string)
    const [Optionsvalue, setOptionsValue] = useState<string[]>([])
    const [selected, setSelected] = useState<string>(defaultValue as string)
    //使用一个字符串数组进行描写
    const onOptionClick = (item: string) => {
        setSelected(item)
        if (onChange) {
            onChange(item, Optionsvalue);
        }
    }
    const classes = classNames('viking-select', {
        'is-disabled': disabled
    })
    //使用useEffect完成监听
    useEffect(() => {
        if (Optionsvalue.length > 0) {
            onVisibleChange(true)
        } else {
            onVisibleChange(false)
            console.log('没有合适的选项，不能正确显示。')
        }
    }, [Optionsvalue]);
    //在进行选择时在input框中进行显示
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setOptionValue(value)
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const key = e.key
        switch (key) {
            case 'w':
                break
            case 's':
                break
            case 'enter':
        }
    }
    const passedContext={
        onChange:onOptionClick
    }
    //与Options完成联动
    return (
        <SelectContext.Provider value={passedContext}>
        //记住可以在这里使用classes
        <ul className={classes}>
            <Input
                onChange={handleChange}
                value={OptionValue}
                onKeyDown={handleKeyDown}>
            </Input>
            {
                Optionsvalue && Optionsvalue.map(item => {
                    return (
                        <div>
                            <Option
                                disabled={disabled}
                                value={item}>
                                {item}
                            </Option>
                        </div>
                    )
                })
            }
        </ul>
        </SelectContext.Provider>
    )

}
export default Select