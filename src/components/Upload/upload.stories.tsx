// Upload.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Upload, {UploadFile, UploadProps} from './upload';
import { action } from '@storybook/addon-actions';
const defaultFileList: UploadFile[] = [
    { uid: '1', size: 1234, name: 'log.txt', status: 'uploading', precent: 30 },
    { uid: '2', size: 2345, name: 'log.txt', status: 'success', response: 'Server Error 500', },
    { uid: '3', size: 3456, name: 'log.txt', status: 'error', error: 'Some error' },
]



// 配置 Storybook 元数据
const meta: Meta<UploadProps> = {
    title: 'Components/Upload',  // 在 Storybook 中的显示路径
    component: Upload,
    argTypes: {
        action: {
            control: 'text',
            description: '上传文件的 URL 地址',
        },
        onProgress: {
            action: 'progress',
            description: '上传进度的回调',
        },
        onSuccess: {
            action: 'success',
            description: '上传成功的回调',
        },
        onError: {
            action: 'error',
            description: '上传失败的回调',
        },
        onChange: {
            action: 'change',
            description: '文件状态改变时的回调',
        },
        beforeUpload: {
            action: 'beforeUpload',
            description: '上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。'
        }
    },
};

export default meta;

type Story = StoryObj<UploadProps>;

const AlertDocs=(file:File):boolean=>{
    if(file.size>1024*1024*1024){
        alert('文件太大了')
        return false
    }
    else{
        alert('上传进行中')
        return true
    }

}
const filePromise=(file:File):Promise<File>=>{
    const newFile=new File([file],'newName',{type:file.type})
    return Promise.resolve(newFile)
}

// 创建一个默认的 Upload 示例
export const SimpleUpload: Story = {
    render: (args) =>
        <Upload {...args}
                beforeUpload={AlertDocs}
                onRemove={action('remove')}
                defaultFileList={defaultFileList}
                onChange={action('changed')}
                accept='.jpg'
                multiple={true}
                name={'fileName'}
                data={{'key':'value'}}
                headers={{'X-powered-By':'viking'}}
                drag={true}/>,
    args: {
        action: 'https://jsonplaceholder.typicode.com/posts/',
    },
};
