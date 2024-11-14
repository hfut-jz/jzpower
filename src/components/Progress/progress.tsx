import React from "react";
import {ThemeProps} from '../Icon/icon'
import './_style.scss'
export interface ProgressProps {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: ThemeProps
}
const Progress: React.FC<ProgressProps> = (props) => {
    const {percent=30, strokeHeight=15, showText=true, styles, theme='primary'} = props
    return (
        <div className="viking-progress-bar" style={styles}>
            <div className="viking-progress-bar-outer" style={{height:strokeHeight}}>
                <div className={`viking-progress-bar-inner color-${theme}`}
                    style={{width:`${percent}%`}}>
                    {showText && <span className="inner-text">{percent}%</span>}
                </div>
            </div>
        </div>
    )
}
export default Progress