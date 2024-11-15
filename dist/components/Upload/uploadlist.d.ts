import React from "react";
import { UploadFile } from "./upload";
import './_style.scss';
export interface UploadListProps {
    fileList: UploadFile[];
    onRemove: (_file: UploadFile) => void;
}
export declare const UploadList: React.FC<UploadListProps>;
