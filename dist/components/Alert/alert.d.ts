import React from "react";
import './_style.scss';
export type AlertType = "success" | "defeat" | "default" | "warning";
export interface AlertProps {
    title?: string;
    className?: string;
    description?: string;
    type?: AlertType;
    onClose?: () => void;
    closable?: boolean;
}
declare const Alert: React.FC<AlertProps>;
export default Alert;
