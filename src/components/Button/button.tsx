import React from "react";
import './_style.scss'; // 导入样式文件
import classNames from 'classnames'
/*
听课总结：1.写btnType
2.写btnSize
3.写一个interface规定类型
4.写出主体react组件并且使用props进行数据的接收
* */

export type ButtonSize='lg'|'sm'
export type ButtonType='primary'|'secondary'|'success'|'info'|'warning'|'dark'|'light'|'danger'|'link'|'default'
//实际上并没有使用到classnames，主要使用到的是btnType来规定按钮的样式。
interface BaseButtonProps{
    className?:string;
    disabled?:boolean;
    size?:ButtonSize;
    btnType?:ButtonType;
    children:React.ReactNode
    href?:string
}
//使用一个泛型规定了之后的全部都是BaseButtonProps
//设计一个将原生react元素和自定义组件进行组合
//实际上后面的很多东西都是组合属性
//这里的children是React.ReactNode类型，可以便于传递很多的类型
type NativeButtonProps=BaseButtonProps&React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps=BaseButtonProps&React.AnchorHTMLAttributes<HTMLElement>

export type ButtonProps=Partial<NativeButtonProps&AnchorButtonProps>
const Button:React.FC<ButtonProps>=(props)=>{
    //对props进行解构
    const {
        btnType='default',
        className,
        disabled=false,
        size,
        children,
        href,
        ...restProps
    }=props
    const classes=classNames('btn',className,{
        [`btn-${btnType}`]:btnType,
        [`btn-${size}`]:size,
        'disabled':(btnType==='link')&&disabled
    })
    if(btnType==='link'){
        return(
            <a
                className={classes}
                href={href}
                {...restProps}>
                {children}
            </a>
        )

    }else{
        //通过classname来添加本来组件中所没有的属性。
        return(
            <button
            className={classes}
            disabled={disabled}
            {...restProps}
            >
                {children}
            </button>
        )
    }

}

export default Button