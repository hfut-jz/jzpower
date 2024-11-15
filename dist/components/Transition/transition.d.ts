import React, { ReactNode } from "react";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
type AnimateName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';
type TransitionProps = CSSTransitionProps & {
    animation: AnimateName;
    wrapper?: boolean;
    children?: ReactNode;
};
declare const Transition: React.FC<TransitionProps>;
export default Transition;
