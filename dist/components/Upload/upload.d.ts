import React from "react";
import './_style.scss';
export type UploadFileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
    uid?: string;
    size?: number;
    name?: string;
    status?: UploadFileStatus;
    precent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    defaultFileList?: UploadFile[];
    beforeUpload?: (file: File) => boolean | Promise<File>;
    action: string;
    onProgress?: (percentage: number, file: UploadFile) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onComplete?: () => void;
    fieldName?: string;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void;
    accept?: string;
    multiple?: boolean;
    headers?: {
        [key: string]: any;
    };
    name?: string;
    data?: {
        [key: string]: any;
    };
    withCredentials?: boolean;
    drag?: boolean;
    children?: React.ReactNode;
}
declare const Upload: React.FC<UploadProps>;
export default Upload;
