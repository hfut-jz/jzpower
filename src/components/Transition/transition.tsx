//完成alert组件的显示效果

import React,{ReactNode} from "react";
import {CSSTransition} from 'react-transition-group'
import {CSSTransitionProps} from "react-transition-group/CSSTransition";

type AnimateName= 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'
type TransitionProps=CSSTransitionProps &{
    animation:AnimateName,
    wrapper?:boolean,
    children?:ReactNode
}
const Transition:React.FC<TransitionProps>=(props)=>{
    const {animation,
        wrapper,
        children,
        classNames,
        unmountOnExit=true,
        appear=true,
        ...restProps}=props
    return(
        <CSSTransition classNames={classNames?classNames:animation} unmountOnExit={unmountOnExit} appear={appear} { ...restProps}>
            {wrapper?<div>{children}</div>:children}
        </CSSTransition>
    )
}
export default Transition