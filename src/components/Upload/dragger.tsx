import React, {useState} from "react";
import classNames from "classnames";
import './_style.scss'

interface DraggerProps {
    onFile:(file:FileList)=>void
    children?: React.ReactNode
}
//1.控制其的Dragover事件
//2.确定其究竟是Dragover还是Dragleave事件
//写onDrop函数
 const Dragger: React.FC<DraggerProps> = (props) => {
    const { onFile, children}=props
     const [dragOver,setDragOver]=useState(false)
     const classes=classNames('viking-uploader-dragger',{
         'is-dragover':dragOver
     })
     const handleDragOver=(e:React.DragEvent<HTMLElement>,over:boolean)=>{
        //阻止浏览器的默认行为，即拖拽文件后浏览器不会识别这是一个拖拽区，而preventDefault()会阻止浏览器默认行为
        e.preventDefault()
         setDragOver(over)
     }
     const handleDrop=(e:React.DragEvent<HTMLElement>)=>{
        e.preventDefault()
         setDragOver(false)
         onFile(e.dataTransfer.files)
     }
     return(
         <div
         className={classes}
         onDragOver={(e)=>handleDragOver(e,true)}
         onDragLeave={(e)=>handleDragOver(e,false)}
         onDrop={handleDrop}
         >
             {children}
         </div>
     )
}

export default Dragger