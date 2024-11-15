import React from "react";
import './_style.scss';
interface DraggerProps {
    onFile: (file: FileList) => void;
    children?: React.ReactNode;
}
declare const Dragger: React.FC<DraggerProps>;
export default Dragger;
