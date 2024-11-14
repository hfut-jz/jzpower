import React, {ChangeEvent, useEffect, useState, KeyboardEvent, useRef} from "react";
import Input, {InputProps} from "../Input/input";
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
import useClickOutSide from "../../hooks/useClickOutSide";
import classNames from "classnames";
import './_style.scss'

interface DataSourceObject{
    value:string
}
//这种联合类型使得其包含了所有的种类
export type DataSourceType<T ={}>=T&DataSourceObject
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions?: (str:string) => DataSourceType[] |Promise<DataSourceType[]>
    onSelect?: (item: DataSourceType) => void
    renderOption?:(item: DataSourceType)=>React.ReactElement
}
//没有需要自己规定的样式，因此不需要加上 className,使用renderOption自定以渲染模板
//单单使用string类型是不完美的，使用泛型使得可用类型增多。
const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
    const { value,
        fetchSuggestions,
        onSelect,
        onChange,
        renderOption,
        ...restProps}=props

    //重写函数并且得到其写的value值
    const [InputValue,setInputValue]=useState(value as string)
    const [suggestion,setSuggestion]=useState<DataSourceType[]>([])
    const [loading,setLoading]=useState(false)
    const [highlightIndex,setHighlightIndex]=useState(-1)
    const DebouncedValue=useDebounce(InputValue)
    const triggerSearch=useRef(false)
    const componentRef=useRef<HTMLDivElement>(null)
    useClickOutSide(componentRef,()=>{setSuggestion([])})

    //使用useEffect来防抖节流
    const highlight=(index:number)=>{
        if(index<0)index=0
        if(index>=suggestion.length){
            index=suggestion.length-1
        }
        setHighlightIndex(index)
    }
    //增添其的键盘事件,直接使用onKeyDown进行
    const handleKeyDown=(e:KeyboardEvent<HTMLInputElement>)=>{
        switch (e.key){
            case "enter":
                if(suggestion[highlightIndex]){
                    handleSelect(suggestion[highlightIndex])
                }
                break;
            case 'w':highlight(highlightIndex-1)
                break;
            case 's':highlight(highlightIndex+1)
                break;
            case 'a':break;
            case 'd':break;
            case 'esc':
                setSuggestion([])
        }
    }
    useEffect(() => {
        if(InputValue){
            const results=fetchSuggestions?.(InputValue)
            if(results instanceof Promise){
                setLoading(true)
                results.then(data=>{
                    setLoading(false)
                    setSuggestion(data)
                })
            }
            else{setSuggestion(results as DataSourceType[])}
            console.log('results:',results)
        }else{
            setSuggestion([])
        }
    }, [DebouncedValue]);
    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const value=e.target.value.trim()
        setInputValue(value)
        console.log('current input:',value)
    }
    //得到了，之后就是对其分析并且返回一个包含该结果的数组

    const renderTemplate=(item:DataSourceType)=>{
        return renderOption?renderOption(item):item.value
    }
    //遍历属性并且将属性的结果给展现出来
    const generateSuggestions=()=>{
        return (
            <ul>
                {suggestion.map((item,index)=>
                    <li key={index} onClick={()=>handleSelect}>
                        {renderTemplate(item)
                        }
                    </li>)}
            </ul>
        )
    }
    //把函数也当成一个属性，这个的作用就是重写函数变得更加简单而已。
    const handleSelect=(item:DataSourceType)=>{
        setInputValue(item.value)
        setSuggestion([])
        if(onSelect){
            onSelect(item)
        }
    }

    //一般的默认状态都是这样的进行处理的。
    return(
        <div>
            <Input  value={InputValue}
                    {...restProps}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
            />
            {loading &&<ul><Icon icon="spinner" spin/></ul>}
            {suggestion.length>0 && generateSuggestions()}
        </div>
    )
}
export default AutoComplete