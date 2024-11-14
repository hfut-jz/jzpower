import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Button, {ButtonType} from './button'; // 确保导入你的 Button 组件

describe('Button 组件测试', () => {
    it('应渲染默认按钮', () => {
        render(<Button>xxx</Button>);

        const element = screen.getByText('xxx'); // 使用 screen.getByText 简化获取元素

        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('BUTTON'); // toBe 代替 toEqual 更符合断言习惯
        expect(element).toHaveClass('btn btn-default');
    });
    it('应渲染禁用状态的按钮', () => {
        render(<Button disabled>Disabled Button</Button>);

        const element = screen.getByText('Disabled Button');

        expect(element).toBeDisabled(); // 使用 toBeDisabled 检查按钮是否禁用

        // 测试禁用按钮不能触发事件
        fireEvent.click(element);
        expect(element).not.toHaveClass('active');
    });
});
