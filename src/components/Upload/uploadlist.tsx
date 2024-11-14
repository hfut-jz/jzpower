import React from "react";
import {UploadFile} from "./upload";
import Icon from "../Icon/icon";
import './_style.scss'
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import Progress from "../Progress/progress";
library.add(fas)


//支持其进行多选来上传，同时也将其改为一个自定义文件的数组，来支持多种方式的上传。
export interface UploadListProps {
    fileList: UploadFile[]
    onRemove: (_file: UploadFile) => void
}

export const UploadList: React.FC<UploadListProps> = (props) => {
    const {fileList, onRemove} = props
    return (
        <ul className="viking-upload-list">
            {
                fileList.map((item) => {
                    return (
                        <li className={'viking-upload-list-item'} key={item.uid}>
                            <span className={`file-name file-name-${item.status}`}>
                                <Icon icon="file-alt" theme={'secondary'}></Icon>
                                {item.name}
                            </span>
                            <span className="file-status">
                                {(item.status === 'uploading' || item.status === 'ready') && <Icon icon="spinner" spin theme="primary"/>}
                                {item.status === 'success' && <Icon icon="check-circle" theme="success"/>}
                                {item.status === 'error' && <Icon icon="times-circle" theme="danger"/>}
                            </span>
                            <span className="file-actions">
                                <Icon icon="times" onClick={() => {onRemove(item)}}/>
                            </span>
                            <Progress percent={item.precent||0} />
                        </li>

                    )
                })
            }
        </ul>
    )
}