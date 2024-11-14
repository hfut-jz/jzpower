import React, {useState} from "react";
import classNames from "classnames";
import Transition from "../Transition/transition";
import Icon from "../Icon/icon";
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

const Alert: React.FC<AlertProps> = (props) => {
    const {
        className,
        title,
        type = 'default',
        description,
        onClose,
        closable = true, // default value
    } = props;
    const [hide, setHide] = useState(false);

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
        setHide(true);
    };

    const classes = classNames("viking-alert", {
        [`viking-alert-${type}`]: type,
    });

    const titleClasses = classNames("viking-alert-title", {
        "bold-title": description,
    });

    return (
        <Transition timeout={300} in={!hide} animation={"zoom-in-top"}>
            <div className={classes}>
                <span className={titleClasses}>{title}</span>
                {description && <p className="viking-alert-desc">{description}</p>}
                {closable && (
                    <span className={"viking-alert-close"} onClick={handleClose}>
            <Icon icon="times"/>
          </span>
                )}
            </div>
        </Transition>
    );
};
export default Alert;
