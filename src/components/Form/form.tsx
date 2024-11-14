import React, { ReactNode, createContext, forwardRef, useImperativeHandle } from 'react'
import { ValidateError } from 'async-validator'
import useStore, { FormState }from './useStore';
import './_style.scss'

export type RenderProps = (form: FormState) => ReactNode
export interface FormProps {
    /**表单名称，会作为表单字段 id 前缀使用 */
    name?: string;
    /**表单默认值，只有初始化以及重置时生效 */
    initialValues?: Record<string, any>;
    children?: ReactNode | RenderProps;
    /**提交表单且数据验证成功后回调事件 */
    onFinish?: (values: Record<string, any>) => void;
    /**提交表单且数据验证失败后回调事件 */
    onFinishFailed?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void;
}
//规定其的类型，以及其传参之后的对子组件的处理,就是为了单单的传子组件而准备的。
export type IFormContext =
    Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'>
    & Pick<FormProps, 'initialValues'>
export type IFormRef = Omit<ReturnType<typeof useStore>, 'fields' | 'dispatch' | 'form'>
export const FormContext = createContext<IFormContext>({} as IFormContext)
export const Form = forwardRef<IFormRef, FormProps>((props, ref) => {
    const { name='viking_form', children, initialValues, onFinish, onFinishFailed } = props
    const { form, fields, dispatch, ...restProps } = useStore(initialValues)
    //取出其的检测方法，以便接下来进行检测
    const { validateField, validateAllFields } = restProps
    useImperativeHandle(ref, () => {
        return {
            ...restProps
        }
    })
    const passedContext: IFormContext = {
        dispatch,
        fields,
        initialValues,
        validateField
    }
    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()
        const { isValid, errors, values } = await validateAllFields()
        //对其进行两者方法的重写，成功算一种方法，失败算一种方法。
        if (isValid && onFinish) {
            onFinish(values)
        } else if(!isValid && onFinishFailed) {
            onFinishFailed(values, errors)
        }
    }
    let childrenNode: ReactNode
    //自定义函数处于函数类型时，需要进行类型转换
    if (typeof children === 'function') {
        childrenNode = children(form)
    } else {
        childrenNode = children
    }
    return (
        <form name={name} className="viking-form" onSubmit={submitForm}>
            <FormContext.Provider value={passedContext}>
                {childrenNode}
            </FormContext.Provider>
        </form>
    )
})

export default Form
