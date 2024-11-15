import React from "react";
import './_style.scss';
export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'dark' | 'light' | 'danger' | 'link' | 'default';
interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
declare const Button: React.FC<ButtonProps>;
export default Button;
