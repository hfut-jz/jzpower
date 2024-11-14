import React, {
    FC,
    useState,
    createContext,
    CSSProperties,
    ReactNode,
    useMemo,
    Children,
    FunctionComponentElement
} from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'
import './_style.scss'

type MenuMode = 'horizontal' | 'vertical'
export interface MenuProps {
    /**默认 active 的菜单项的索引值 */
    defaultIndex?: string;
    className?: string;
    /**菜单类型 横向或者纵向 */
    mode?: MenuMode;
    style?: CSSProperties;
    /**点击菜单项触发的回调函数 */
    onSelect?: (selectedIndex: string) => void;
    /**设置子菜单的默认打开 只在纵向模式下生效 */
    defaultOpenSubMenus?: string[];
    children?: ReactNode;
}
//在这里规定了子组件的menuItem以及subMenuItem的类型
interface IMenuContext {
    index: string;
    onSelect?: (selectedIndex: string) => void;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
//传递了默认值index为0
export const MenuContext = createContext<IMenuContext>({ index: '0' })

export const Menu: FC<MenuProps> = ({
                                        className,
                                        mode = 'horizontal',
                                        style,
                                        children,
                                        defaultIndex = '0',
                                        onSelect,
                                        defaultOpenSubMenus = []
                                    }) => {
    const [currentActive, setActive] = useState(defaultIndex)
    const classes = classNames('viking-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    })

    const handleClick = (index: string) => {
        setActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }

    const passedContext: IMenuContext = useMemo(
        () => ({
            index: currentActive,
            onSelect: handleClick,
            mode,
            defaultOpenSubMenus,
        }),
        [currentActive, mode, defaultOpenSubMenus, handleClick]
    )

    const renderChildren = () => {
        return Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                // MenuItem的index是子菜单的index
                return React.cloneElement(childElement, {
                    index: index.toString()
                })
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem component")
            }
        })
    }
    //现在一般要不然没有子组件的就是children来传递内容，有子组件的那么就是用render来传递。
    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

export default Menu
