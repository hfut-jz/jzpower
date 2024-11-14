import React, {ChangeEvent, useRef, useState} from "react";
import Button from "../Button/button";
import axios from "axios";
import {object} from "prop-types";
import {UploadList} from "./uploadlist";
import './_style.scss'
import Dragger from "./dragger";

export type UploadFileStatus = "ready" | "uploading" | "success" | "error";
//对文件的类型做出自定义
export interface UploadFile {
    uid?:string,
    size?:number,
    name?:string,
    status?:UploadFileStatus,
    precent?: number,
    raw?:File,
    response?: any,
    error?: any
}
// 定义上传组件的属性接口
//1.需要补全生命周期
//2.需要添加自定义文件字段名
export interface UploadProps {
    defaultFileList?: UploadFile[];
    beforeUpload?:(file:File)=>boolean | Promise<File>
    action: string;
    onProgress?: (percentage: number, file: UploadFile) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onComplete?: () => void; // 可选：在所有文件上传完成后触发的回调
    fieldName?: string; // 自定义文件字段名
    onChange?:(file:File)=>void
    onRemove?:(file:UploadFile)=>void
    accept?: string;
    multiple?: boolean;
    headers?:{[key:string]:any}
    name?: string;
    data?:{[key:string]:any}
    withCredentials?: boolean;
    drag?: boolean;
    children?: React.ReactNode;
}

// 上传组件
const Upload: React.FC<UploadProps> = (props) => {
    const { beforeUpload,
        action,
        onSuccess,
        onError,
        onProgress,
        onComplete,
        fieldName = "file",
        onChange,
        onRemove,
        defaultFileList,
        accept,
        multiple,
        name='file',
        headers,
        data,
        withCredentials,
        drag,
        children} = props;
    const fileInput = useRef<HTMLInputElement>(null);
    //上传文件列表函数
    const updateFileList = (uploadFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList((prevList=[]) =>
            prevList.map(file =>
                file.uid === uploadFile.uid
                    ? { ...file, ...updateObj }
                    : file
            )
        );
    };

    const [fileList,setFileList]=useState<UploadFile[]>(defaultFileList||[])

    // 上传文件函数
    const uploadFiles = (files: FileList) => {
        const postFiles = Array.from(files);
        postFiles.forEach((file) => {
            //利用beforeUpdate对文件做预处理
            if (!beforeUpload){
                post(file)
            }
            else {
                //将文件进行分类，分类为Promise对象，或者直接返回文件
                const result=beforeUpload(file)
                if(result instanceof Promise){
                    result.then(processedFile=>post(processedFile))
                }
                else if(result){
                    post(file)
                }
            }
        });
    };
    //接下来进行自定义文件类型的上传
    const post=(file:File)=>{
        let _file:UploadFile={
            uid:Date.now().toString(),
            size:file.size,
            name:file.name,
            status:'ready',
            raw:file,
            precent:0
        }
        setFileList(prevList=>{
            return [...prevList,_file]
        })

        const formData = new FormData();
        formData.append(name || 'file', file); // 使用自定义文件字段名
        if(data){
            // 添加自定义参数
            Object.keys(data).forEach(key=>{
                formData.append(key, data[key])
            })
        }
        axios.post(action, formData, {
            headers: {
                //将headers作为自定义参数上传，继续增强了自定一行
                ...headers,
                "Content-Type": "multipart/form-data" },
            withCredentials,
            //axios自带的方法
            onUploadProgress: (e) => {
                if (e.total) {
                    let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                    if (percentage < 100) {
                        updateFileList(_file, { status: "uploading", precent: percentage })
                        if(onProgress) onProgress(percentage, _file);
                    }
                }
            },
        })
            .then((resp) => {
                updateFileList(_file, { status: "success", response: resp.data });
                if (onSuccess) onSuccess(resp.data, file);
                if(onChange){onChange(file)}
            })
            .catch((err) => {
                updateFileList(_file, { status: "error", error: err });
                if (onError) onError(err, file);
                if(onChange){onChange(file)}
            })
    }
    // 处理文件变化
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        uploadFiles(files);
        if (fileInput.current) fileInput.current.value = "";
    };
    const handleRemove = (file: UploadFile) => {
        setFileList((prevList) => {
            return prevList.filter(item => item.uid !== file.uid)
        })
        if (onRemove) {
            onRemove(file)
        }
    }
    // 模拟点击上传按钮
    const handleClick = () => fileInput.current?.click();
    console.log(fileList)
    return (
        <div className="viking-upload-component">
            <div className="viking-upload-input"
                 style={{display: 'inline-block'}}
                 onClick={handleClick}>
                <Button btnType={'primary'}>
                    点击上传，或者拖拽进行上传
                </Button>
                {drag ?
                    <Dragger onFile={(files) => {
                        uploadFiles(files)
                    }}>
                        {children}
                    </Dragger> :
                    children
                }
                <input
                    className="viking-file-input"
                    style={{display: 'none'}}
                    ref={fileInput}
                    onChange={handleFileChange}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                />
            </div>
            <input
                className="viking-file-input"
                style={{display: "none"}}
                ref={fileInput}
                onChange={handleFileChange}
                type="file"
                accept={accept}
                multiple={multiple}
            />
            <UploadList fileList={fileList}
                        onRemove={handleRemove}></UploadList>
        </div>

    );
};

export default Upload;
