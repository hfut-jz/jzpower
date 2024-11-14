import React, {useContext} from "react";
import {ISelectProps, SelectContext} from "./select.old";

export interface OptionProps{
    index?:string
    value:string
    label?:string
    disabled?:boolean
    children:React.ReactNode
}
const Option:React.FC<OptionProps>=(props)=>{
    const OptionContext=useContext(SelectContext)
    const {
        index,
        value,
        label,
        disabled,
        children,
    }=props
    const SingelOption=value
    //填充函数
    //1.
    return(
        <li >
            {children}
        </li>
    )

}
export default Option