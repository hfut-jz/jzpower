import React from "react";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import './_style.scss';
export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'dark' | 'light' | 'danger';
export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps;
}
declare const Icon: React.FC<IconProps>;
export default Icon;
