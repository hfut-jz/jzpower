import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { jsx, jsxs } from 'react/jsx-runtime';
import classNames from 'classnames';
import React, { createContext, useState, useMemo, Children, useContext, forwardRef, useEffect, useRef, useReducer, useImperativeHandle } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import Schema from 'async-validator';
import mapValues from 'lodash-es/mapValues';
import each from 'lodash-es/each';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var Button = function (props) {
    var _a;
    //对props进行解构
    var _b = props.btnType, btnType = _b === void 0 ? 'default' : _b, className = props.className, _c = props.disabled, disabled = _c === void 0 ? false : _c, size = props.size, children = props.children, href = props.href, restProps = __rest(props, ["btnType", "className", "disabled", "size", "children", "href"]);
    var classes = classNames('btn', className, (_a = {},
        _a["btn-".concat(btnType)] = btnType,
        _a["btn-".concat(size)] = size,
        _a['disabled'] = (btnType === 'link') && disabled,
        _a));
    if (btnType === 'link') {
        return (jsx("a", __assign({ className: classes, href: href }, restProps, { children: children })));
    }
    else {
        //通过classname来添加本来组件中所没有的属性。
        return (jsx("button", __assign({ className: classes, disabled: disabled }, restProps, { children: children })));
    }
};

//传递了默认值index为0
var MenuContext = createContext({ index: '0' });
var Menu = function (_a) {
    var className = _a.className, _b = _a.mode, mode = _b === void 0 ? 'horizontal' : _b, style = _a.style, children = _a.children, _c = _a.defaultIndex, defaultIndex = _c === void 0 ? '0' : _c, onSelect = _a.onSelect, _d = _a.defaultOpenSubMenus, defaultOpenSubMenus = _d === void 0 ? [] : _d;
    var _e = useState(defaultIndex), currentActive = _e[0], setActive = _e[1];
    var classes = classNames('viking-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    });
    var handleClick = function (index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = useMemo(function () { return ({
        index: currentActive,
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    }); }, [currentActive, mode, defaultOpenSubMenus, handleClick]);
    var renderChildren = function () {
        return Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                // MenuItem的index是子菜单的index
                return React.cloneElement(childElement, {
                    index: index.toString()
                });
            }
            else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        });
    };
    //现在一般要不然没有子组件的就是children来传递内容，有子组件的那么就是用render来传递。
    return (jsx("ul", __assign({ className: classes, style: style, "data-testid": "test-menu" }, { children: jsx(MenuContext.Provider, __assign({ value: passedContext }, { children: renderChildren() })) })));
};

var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, className = props.className, style = props.style, children = props.children;
    var context = useContext(MenuContext);
    var classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    });
    var handleClick = function () {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index);
        }
    };
    return (jsx("li", __assign({ className: classes, style: style, onClick: handleClick }, { children: children })));
};
MenuItem.displayName = 'MenuItem';

var Icon = function (props) {
    var _a;
    var theme = props.theme, className = props.className, restProps = __rest(props, ["theme", "className"]);
    var classes = classNames('viking-icon', className, (_a = {},
        _a["icon-".concat(theme)] = theme,
        _a));
    return (jsx(FontAwesomeIcon, __assign({ className: classes }, restProps)));
};

var Transition = function (props) {
    var animation = props.animation, wrapper = props.wrapper, children = props.children, classNames = props.classNames, _a = props.unmountOnExit, unmountOnExit = _a === void 0 ? true : _a, _b = props.appear, appear = _b === void 0 ? true : _b, restProps = __rest(props, ["animation", "wrapper", "children", "classNames", "unmountOnExit", "appear"]);
    return (jsx(CSSTransition, __assign({ classNames: classNames ? classNames : animation, unmountOnExit: unmountOnExit, appear: appear }, restProps, { children: wrapper ? jsx("div", { children: children }) : children })));
};

var SubMenu = function (_a) {
    var index = _a.index, title = _a.title, children = _a.children, className = _a.className;
    var context = useContext(MenuContext);
    //使用类型断言将其断言为数组
    var openedSubMenus = context.defaultOpenSubMenus;
    var isOpend = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
    var _b = useState(isOpend), menuOpen = _b[0], setOpen = _b[1];
    //这里的className是自定义的，不是原生的，意思是样式还是要看className传入的是什么
    var classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    });
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    var hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: function (e) { handleMouse(e, true); },
        onMouseLeave: function (e) { handleMouse(e, false); }
    } : {};
    var renderChildren = function () {
        var subMenuClasses = classNames('viking-submenu', {
            'menu-opened': menuOpen
        });
        //这里的subMenu一样需要childComponents进行传递。
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: "".concat(index, "-").concat(i) // 确保每个子MenuItem的index独特且不同于SubMenu本身的index
                });
            }
            else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component");
            }
        });
        return (jsx(Transition, __assign({ in: menuOpen, timeout: 300, animation: 'zoom-in-top' }, { children: jsx("ul", __assign({ className: subMenuClasses }, { children: childrenComponent })) })));
    };
    return (jsxs("li", __assign({ className: classes }, hoverEvents, { children: [jsxs("div", __assign({ className: "submenu-title" }, clickEvents, { children: [title, jsx(Icon, { icon: "angle-down", className: "arrow-icon" })] })), renderChildren()] }), index));
};
SubMenu.displayName = 'SubMenu';

var TransMenu = Menu;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * // 这样引用
 * import { Input } from 'vikingship'
 * ~~~
 *
 * 支持 HTMLInput 的所有基本属性
 */
var Input = forwardRef(function (props, ref) {
    var _a;
    var disabled = props.disabled, size = props.size, icon = props.icon, prepend = props.prepend, append = props.append, style = props.style, restProps = __rest(props, ["disabled", "size", "icon", "prepend", "append", "style"]);
    var cnames = classNames('viking-input-wrapper', (_a = {},
        _a["input-size-".concat(size)] = size,
        _a['is-disabled'] = disabled,
        _a['input-group'] = prepend || append,
        _a['input-group-append'] = !!append,
        _a['input-group-prepend'] = !!prepend,
        _a));
    //区分其到底是受控组件还是不是受控组件
    var fixControlledValue = function (value) {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    };
    if ('value' in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value);
    }
    return (jsxs("div", __assign({ className: cnames, style: style }, { children: [prepend && jsx("div", __assign({ className: "viking-input-group-prepend" }, { children: prepend })), icon && jsx("div", __assign({ className: "icon-wrapper" }, { children: jsx(Icon, { icon: icon, title: "title-".concat(icon) }) })), jsx("input", __assign({ ref: ref, className: "viking-input-inner", disabled: disabled }, restProps)), append && jsx("div", __assign({ className: "viking-input-group-append" }, { children: append }))] })));
});

function useDebounce(value, delay) {
    if (delay === void 0) { delay = 300; }
    var _a = useState(value), debouncedValue = _a[0], setDebouncedValue = _a[1];
    useEffect(function () {
        var handler = window.setTimeout(function () {
            setDebouncedValue(value);
        }, delay);
        return function () { return clearTimeout(handler); };
    }, [value, delay]);
    return debouncedValue;
}

function useClickOutSide(ref, handler) {
    useEffect(function () {
        var listener = function (event) {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener('click', listener);
        return function () {
            document.removeEventListener('click', listener);
        };
    }, [ref, handler]);
}

var AutoComplete = function (props) {
    var value = props.value, fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, onChange = props.onChange, renderOption = props.renderOption, restProps = __rest(props, ["value", "fetchSuggestions", "onSelect", "onChange", "renderOption"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    var _e = useState(false), showDropdown = _e[0], setShowDropdown = _e[1];
    var debouncedValue = useDebounce(inputValue);
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    useClickOutSide(componentRef, function () {
        setSuggestions([]);
        setShowDropdown(false);
    });
    useEffect(function () {
        if (debouncedValue && triggerSearch.current) {
            var results = fetchSuggestions === null || fetchSuggestions === void 0 ? void 0 : fetchSuggestions(debouncedValue);
            setSuggestions([]);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                    setShowDropdown(data.length > 0);
                });
            }
            else {
                setSuggestions(results);
                setShowDropdown(results.length > 0);
            }
        }
        else {
            setShowDropdown(false);
        }
        setHighlightIndex(-1);
    }, [debouncedValue]);
    var highlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length)
            index = suggestions.length - 1;
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.key) {
            case "Enter":
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case "ArrowUp":
                highlight(highlightIndex - 1);
                break;
            case "ArrowDown":
                highlight(highlightIndex + 1);
                break;
            case "Escape":
                setShowDropdown(false);
                break;
        }
    };
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        if (onChange)
            onChange(e);
        triggerSearch.current = true;
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        setShowDropdown(false);
        if (onSelect)
            onSelect(item);
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateSuggestions = function () {
        return (jsx(Transition, __assign({ in: showDropdown || loading, animation: "zoom-in-top", timeout: 300 }, { children: jsxs("ul", __assign({ className: "viking-suggestion-list" }, { children: [loading && (jsx("div", __assign({ className: "suggstions-loading-icon" }, { children: jsx(Icon, { icon: "spinner", spin: true }) }))), suggestions.map(function (item, index) {
                        var cnames = classNames("suggestion-item", {
                            "is-active": index === highlightIndex,
                        });
                        return (jsx("li", __assign({ className: cnames, onClick: function () { return handleSelect(item); } }, { children: renderTemplate(item) }), index));
                    })] })) })));
    };
    return (jsxs("div", __assign({ className: "viking-auto-complete", ref: componentRef }, { children: [jsx(Input, __assign({ value: inputValue }, restProps, { onChange: handleChange, onKeyDown: handleKeyDown })), generateSuggestions()] })));
};

var Progress = function (props) {
    var _a = props.percent, percent = _a === void 0 ? 30 : _a, _b = props.strokeHeight, strokeHeight = _b === void 0 ? 15 : _b, _c = props.showText, showText = _c === void 0 ? true : _c, styles = props.styles, _d = props.theme, theme = _d === void 0 ? 'primary' : _d;
    return (jsx("div", __assign({ className: "viking-progress-bar", style: styles }, { children: jsx("div", __assign({ className: "viking-progress-bar-outer", style: { height: strokeHeight } }, { children: jsx("div", __assign({ className: "viking-progress-bar-inner color-".concat(theme), style: { width: "".concat(percent, "%") } }, { children: showText && jsxs("span", __assign({ className: "inner-text" }, { children: [percent, "%"] })) })) })) })));
};

library.add(fas);
var UploadList = function (props) {
    var fileList = props.fileList, onRemove = props.onRemove;
    return (jsx("ul", __assign({ className: "viking-upload-list" }, { children: fileList.map(function (item) {
            return (jsxs("li", __assign({ className: 'viking-upload-list-item' }, { children: [jsxs("span", __assign({ className: "file-name file-name-".concat(item.status) }, { children: [jsx(Icon, { icon: "file-alt", theme: 'secondary' }), item.name] })), jsxs("span", __assign({ className: "file-status" }, { children: [(item.status === 'uploading' || item.status === 'ready') && jsx(Icon, { icon: "spinner", spin: true, theme: "primary" }), item.status === 'success' && jsx(Icon, { icon: "check-circle", theme: "success" }), item.status === 'error' && jsx(Icon, { icon: "times-circle", theme: "danger" })] })), jsx("span", __assign({ className: "file-actions" }, { children: jsx(Icon, { icon: "times", onClick: function () { onRemove(item); } }) })), jsx(Progress, { percent: item.precent || 0 })] }), item.uid));
        }) })));
};

//1.控制其的Dragover事件
//2.确定其究竟是Dragover还是Dragleave事件
//写onDrop函数
var Dragger = function (props) {
    var onFile = props.onFile, children = props.children;
    var _a = useState(false), dragOver = _a[0], setDragOver = _a[1];
    var classes = classNames('viking-uploader-dragger', {
        'is-dragover': dragOver
    });
    var handleDragOver = function (e, over) {
        //阻止浏览器的默认行为，即拖拽文件后浏览器不会识别这是一个拖拽区，而preventDefault()会阻止浏览器默认行为
        e.preventDefault();
        setDragOver(over);
    };
    var handleDrop = function (e) {
        e.preventDefault();
        setDragOver(false);
        onFile(e.dataTransfer.files);
    };
    return (jsx("div", __assign({ className: classes, onDragOver: function (e) { return handleDragOver(e, true); }, onDragLeave: function (e) { return handleDragOver(e, false); }, onDrop: handleDrop }, { children: children })));
};

// 上传组件
var Upload = function (props) {
    var beforeUpload = props.beforeUpload, action = props.action, onSuccess = props.onSuccess, onError = props.onError, onProgress = props.onProgress; props.onComplete; props.fieldName; var onChange = props.onChange, onRemove = props.onRemove, defaultFileList = props.defaultFileList, accept = props.accept, multiple = props.multiple, _b = props.name, name = _b === void 0 ? 'file' : _b, headers = props.headers, data = props.data, withCredentials = props.withCredentials, drag = props.drag, children = props.children;
    var fileInput = useRef(null);
    //上传文件列表函数
    var updateFileList = function (uploadFile, updateObj) {
        setFileList(function (prevList) {
            if (prevList === void 0) { prevList = []; }
            return prevList.map(function (file) {
                return file.uid === uploadFile.uid
                    ? __assign(__assign({}, file), updateObj) : file;
            });
        });
    };
    var _c = useState(defaultFileList || []), fileList = _c[0], setFileList = _c[1];
    // 上传文件函数
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            //利用beforeUpdate对文件做预处理
            if (!beforeUpload) {
                post(file);
            }
            else {
                //将文件进行分类，分类为Promise对象，或者直接返回文件
                var result = beforeUpload(file);
                if (result instanceof Promise) {
                    result.then(function (processedFile) { return post(processedFile); });
                }
                else if (result) {
                    post(file);
                }
            }
        });
    };
    //接下来进行自定义文件类型的上传
    var post = function (file) {
        var _file = {
            uid: Date.now().toString(),
            size: file.size,
            name: file.name,
            status: 'ready',
            raw: file,
            precent: 0
        };
        setFileList(function (prevList) {
            return __spreadArray(__spreadArray([], prevList, true), [_file], false);
        });
        var formData = new FormData();
        formData.append(name || 'file', file); // 使用自定义文件字段名
        if (data) {
            // 添加自定义参数
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            headers: __assign(__assign({}, headers), { "Content-Type": "multipart/form-data" }),
            withCredentials: withCredentials,
            //axios自带的方法
            onUploadProgress: function (e) {
                if (e.total) {
                    var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                    if (percentage < 100) {
                        updateFileList(_file, { status: "uploading", precent: percentage });
                        if (onProgress)
                            onProgress(percentage, _file);
                    }
                }
            },
        })
            .then(function (resp) {
            updateFileList(_file, { status: "success", response: resp.data });
            if (onSuccess)
                onSuccess(resp.data, file);
            if (onChange) {
                onChange(file);
            }
        })
            .catch(function (err) {
            updateFileList(_file, { status: "error", error: err });
            if (onError)
                onError(err, file);
            if (onChange) {
                onChange(file);
            }
        });
    };
    // 处理文件变化
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files)
            return;
        uploadFiles(files);
        if (fileInput.current)
            fileInput.current.value = "";
    };
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    // 模拟点击上传按钮
    var handleClick = function () { var _a; return (_a = fileInput.current) === null || _a === void 0 ? void 0 : _a.click(); };
    console.log(fileList);
    return (jsxs("div", __assign({ className: "viking-upload-component" }, { children: [jsxs("div", __assign({ className: "viking-upload-input", style: { display: 'inline-block' }, onClick: handleClick }, { children: [jsx(Button, __assign({ btnType: 'primary' }, { children: "\u70B9\u51FB\u4E0A\u4F20\uFF0C\u6216\u8005\u62D6\u62FD\u8FDB\u884C\u4E0A\u4F20" })), drag ?
                        jsx(Dragger, __assign({ onFile: function (files) {
                                uploadFiles(files);
                            } }, { children: children })) :
                        children, jsx("input", { className: "viking-file-input", style: { display: 'none' }, ref: fileInput, onChange: handleFileChange, type: "file", accept: accept, multiple: multiple })] })), jsx("input", { className: "viking-file-input", style: { display: "none" }, ref: fileInput, onChange: handleFileChange, type: "file", accept: accept, multiple: multiple }), jsx(UploadList, { fileList: fileList, onRemove: handleRemove })] })));
};

var Alert = function (props) {
    var _a;
    props.className; var title = props.title, _b = props.type, type = _b === void 0 ? 'default' : _b, description = props.description, onClose = props.onClose, _c = props.closable, closable = _c === void 0 ? true : _c;
    var _d = useState(false), hide = _d[0], setHide = _d[1];
    var handleClose = function () {
        if (onClose) {
            onClose();
        }
        setHide(true);
    };
    var classes = classNames("viking-alert", (_a = {},
        _a["viking-alert-".concat(type)] = type,
        _a));
    var titleClasses = classNames("viking-alert-title", {
        "bold-title": description,
    });
    return (jsx(Transition, __assign({ timeout: 300, in: !hide, animation: "zoom-in-top" }, { children: jsxs("div", __assign({ className: classes }, { children: [jsx("span", __assign({ className: titleClasses }, { children: title })), description && jsx("p", __assign({ className: "viking-alert-desc" }, { children: description })), closable && (jsx("span", __assign({ className: "viking-alert-close", onClick: handleClose }, { children: jsx(Icon, { icon: "times" }) })))] })) })));
};

var TabsContext = createContext({ index: '0', onSelect: undefined });
var Tabs = function (props) {
    var children = props.children; props.className; var onSelect = props.onSelect, _a = props.defaultIndex, defaultIndex = _a === void 0 ? '0' : _a, type = props.type;
    var _b = useState(defaultIndex), currentActive = _b[0], setActive = _b[1];
    var handleClick = function (selectedIndex) {
        //一般都是这样，使用index来显示显式的id并做高亮处理。
        setActive(selectedIndex);
        if (onSelect) {
            onSelect(selectedIndex);
        }
    };
    //将被选中的以及其的内联进行传递，源码中将handleClick放在源文件中处理了。
    var passedContext = {
        index: currentActive,
        onSelect: handleClick
    };
    var tabsClasses = classNames('viking-tabs-nav', {
        'nav-line': type === "line",
        'nav-card': type === 'card'
    });
    var renderChildren = function () {
        return Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'TabsItem') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                });
            }
            else {
                console.error('Warning: Tabs has a child which is not a TabsItem', child);
            }
        });
    };
    return (jsx("div", __assign({ className: "viking-tabs-nav" }, { children: jsx("ul", __assign({ className: tabsClasses }, { children: jsx(TabsContext.Provider, __assign({ value: passedContext }, { children: renderChildren() })) })) })));
};

var TabsItem = function (props) {
    var disabled = props.disabled, index = props.index, className = props.className, children = props.children;
    var context = useContext(TabsContext);
    var handleClick = function () {
        if (context.onSelect && !disabled && index) {
            context.onSelect(index);
        }
    };
    var classes = classNames('viking-tabs-nav-item', className, {
        'disabled': disabled,
        'is-active': context.index === index
    });
    return (jsx("li", __assign({ onClick: handleClick, className: classes }, { children: children })));
};
TabsItem.displayName = 'TabsItem';

var TransTabs = Tabs;
TransTabs.Item = TabsItem;

var SelectContext = createContext({ selectedValues: [] });
var Select = function (props) {
    var defaultValue = props.defaultValue, _a = props.placeholder, placeholder = _a === void 0 ? '请选择' : _a, children = props.children, multiple = props.multiple, _b = props.name, name = _b === void 0 ? 'viking-select' : _b, disabled = props.disabled, onChange = props.onChange, onVisibleChange = props.onVisibleChange;
    var inputRef = useRef(null);
    var containerRef = useRef(null);
    var containerWidth = useRef(0);
    var _c = useState(Array.isArray(defaultValue) ? defaultValue : []), selectedValues = _c[0], setSelectedValues = _c[1];
    var _d = useState(false), menuOpen = _d[0], setMenuOpen = _d[1];
    var _e = useState(typeof defaultValue === 'string' ? defaultValue : ''), inputValue = _e[0], setInputValue = _e[1];
    var handleOptionClick = function (value) {
        var updatedValues = [value];
        if (multiple) {
            updatedValues = selectedValues.includes(value)
                ? selectedValues.filter(function (v) { return v !== value; })
                : __spreadArray(__spreadArray([], selectedValues, true), [value], false);
            setSelectedValues(updatedValues);
        }
        else {
            setMenuOpen(false);
            setInputValue(value);
            updatedValues = [value];
        }
        if (onChange) {
            onChange(value, updatedValues);
        }
    };
    useEffect(function () {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.placeholder = multiple && selectedValues.length > 0 ? '' : placeholder || '';
        }
    }, [selectedValues, multiple, placeholder]);
    useEffect(function () {
        if (containerRef.current) {
            containerWidth.current = containerRef.current.getBoundingClientRect().width;
        }
    });
    useClickOutSide(containerRef, function () {
        setMenuOpen(false);
        if (onVisibleChange && menuOpen) {
            onVisibleChange(false);
        }
    });
    //给其传在父组件已经规定好的函数并且保证正确
    var passedContext = {
        onSelect: handleOptionClick,
        selectedValues: selectedValues,
        multiple: multiple,
    };
    var handleClick = function (e) {
        e.preventDefault();
        if (!disabled) {
            setMenuOpen(!menuOpen);
            if (onVisibleChange) {
                onVisibleChange(!menuOpen);
            }
        }
    };
    var generateOptions = function () {
        return React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === 'Option') {
                return React.cloneElement(childElement, { index: "select-".concat(i) });
            }
            else {
                console.error('Warning: Select has a child which is not an Option component');
            }
        });
    };
    var containerClass = classNames('viking-select', {
        'menu-is-open': menuOpen,
        'is-disabled': disabled,
        'is-multiple': multiple,
    });
    return (jsxs("div", __assign({ className: containerClass, ref: containerRef }, { children: [jsx("div", __assign({ className: "viking-select-input", onClick: handleClick }, { children: jsx(Input, { ref: inputRef, placeholder: placeholder, value: inputValue, readOnly: true, icon: "angle-down", disabled: disabled, name: name }) })), jsx(SelectContext.Provider, __assign({ value: passedContext }, { children: jsx(Transition, __assign({ in: menuOpen, animation: "zoom-in-top", timeout: 300 }, { children: jsx("ul", __assign({ className: "viking-select-dropdown" }, { children: generateOptions() })) })) })), multiple && (jsx("div", __assign({ className: "viking-selected-tags", style: { maxWidth: containerWidth.current - 32 } }, { children: selectedValues.map(function (value, index) { return (jsxs("span", __assign({ className: "viking-tag" }, { children: [value, jsx(Icon, { icon: "times", onClick: function () { return handleOptionClick(value); } })] }), "tag-".concat(index))); }) })))] })));
};

var Option = function (_a) {
    var value = _a.value, label = _a.label, disabled = _a.disabled, children = _a.children;
    var _b = useContext(SelectContext), onSelect = _b.onSelect, selectedValues = _b.selectedValues, multiple = _b.multiple;
    var isSelected = selectedValues.includes(value);
    var classes = classNames('viking-select-item', {
        'is-disabled': disabled,
        'is-selected': isSelected,
    });
    var handleClick = function (e) {
        e.preventDefault();
        if (onSelect && !disabled) {
            onSelect(value);
        }
    };
    return (jsxs("li", __assign({ className: classes, onClick: handleClick }, { children: [children || label || value, multiple && isSelected && jsx(Icon, { icon: "check" })] })));
};
Option.displayName = 'Option';

var TransSelect = Select;
TransSelect.Option = Option;

//react中自定义的reducer，再等会自己用到的useStore中进行存储
function fieldsReducer(state, action) {
    var _a, _b, _c;
    switch (action.type) {
        case 'addField':
            return __assign(__assign({}, state), (_a = {}, _a[action.name] = __assign({}, action.value), _a));
        case 'updateValue':
            return __assign(__assign({}, state), (_b = {}, _b[action.name] = __assign(__assign({}, state[action.name]), { value: action.value }), _b));
        case 'updateValidateResult':
            var _d = action.value, isValid = _d.isValid, errors = _d.errors;
            return __assign(__assign({}, state), (_c = {}, _c[action.name] = __assign(__assign({}, state[action.name]), { isValid: isValid, errors: errors }), _c));
        default:
            return state;
    }
}
function useStore(initialValues) {
    var _this = this;
    // form state
    var _a = useState({ isValid: true, isSubmitting: false, errors: {} }), form = _a[0], setForm = _a[1];
    var _b = useReducer(fieldsReducer, {}), fields = _b[0], dispatch = _b[1];
    //现在可以取出方法并且对表单实例对象进行操作
    var getFieldValue = function (key) {
        return fields[key] && fields[key].value;
    };
    var getFieldsValue = function () {
        return mapValues(fields, function (item) { return item.value; });
    };
    var setFieldValue = function (name, value) {
        if (fields[name]) {
            dispatch({ type: 'updateValue', name: name, value: value });
        }
    };
    var resetFields = function () {
        if (initialValues) {
            each(initialValues, function (value, name) {
                if (fields[name]) {
                    dispatch({ type: 'updateValue', name: name, value: value });
                }
            });
        }
    };
    var transfromRules = function (rules) {
        return rules.map(function (rule) {
            if (typeof rule === 'function') {
                var calledRule = rule({ getFieldValue: getFieldValue });
                return calledRule;
            }
            else {
                return rule;
            }
        });
    };
    //单个输入框的检测工作，使用async-validator完成检测
    var validateField = function (name) { return __awaiter(_this, void 0, void 0, function () {
        var _a, value, rules, afterRules, descriptor, valueMap, validator, isValid, errors, e_1, err;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = fields[name], value = _a.value, rules = _a.rules;
                    afterRules = transfromRules(rules);
                    descriptor = (_b = {},
                        _b[name] = afterRules,
                        _b);
                    valueMap = (_c = {},
                        _c[name] = value,
                        _c);
                    validator = new Schema(descriptor);
                    isValid = true;
                    errors = [];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, validator.validate(valueMap)];
                case 2:
                    _d.sent();
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _d.sent();
                    isValid = false;
                    err = e_1;
                    console.log('e', err.errors);
                    console.log('fields', err.fields);
                    errors = err.errors;
                    return [3 /*break*/, 5];
                case 4:
                    console.log('errors', isValid);
                    dispatch({ type: 'updateValidateResult', name: name, value: { isValid: isValid, errors: errors } });
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var validateAllFields = function () { return __awaiter(_this, void 0, void 0, function () {
        var isValid, errors, valueMap, descriptor, validator, e_2, err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    isValid = true;
                    errors = {};
                    valueMap = mapValues(fields, function (item) { return item.value; });
                    descriptor = mapValues(fields, function (item) { return transfromRules(item.rules); });
                    validator = new Schema(descriptor);
                    setForm(__assign(__assign({}, form), { isSubmitting: true }));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, validator.validate(valueMap)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    e_2 = _a.sent();
                    isValid = false;
                    err = e_2;
                    errors = err.fields;
                    each(fields, function (value, name) {
                        // errors 中有对应的 key'
                        //更新表单中的错误类型
                        if (errors[name]) {
                            var itemErrors = errors[name];
                            dispatch({ type: 'updateValidateResult', name: name, value: { isValid: false, errors: itemErrors } });
                        }
                        else if (value.rules.length > 0 && !errors[name]) {
                            dispatch({ type: 'updateValidateResult', name: name, value: { isValid: true, errors: [] } });
                        }
                        //  有对应的 rules，并且没有 errors
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setForm(__assign(__assign({}, form), { isSubmitting: false, isValid: isValid, errors: errors }));
                    return [2 /*return*/, {
                            isValid: isValid,
                            errors: errors,
                            values: valueMap
                        }];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return {
        fields: fields,
        dispatch: dispatch,
        form: form,
        validateField: validateField,
        getFieldValue: getFieldValue,
        validateAllFields: validateAllFields,
        getFieldsValue: getFieldsValue,
        setFieldValue: setFieldValue,
        resetFields: resetFields,
    };
}

var FormContext = createContext({});
var Form = forwardRef(function (props, ref) {
    var _a = props.name, name = _a === void 0 ? 'viking_form' : _a, children = props.children, initialValues = props.initialValues, onFinish = props.onFinish, onFinishFailed = props.onFinishFailed;
    var _b = useStore(initialValues), form = _b.form, fields = _b.fields, dispatch = _b.dispatch, restProps = __rest(_b, ["form", "fields", "dispatch"]);
    //取出其的检测方法，以便接下来进行检测
    var validateField = restProps.validateField, validateAllFields = restProps.validateAllFields;
    useImperativeHandle(ref, function () {
        return __assign({}, restProps);
    });
    var passedContext = {
        dispatch: dispatch,
        fields: fields,
        initialValues: initialValues,
        validateField: validateField
    };
    var submitForm = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, isValid, errors, values;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    e.stopPropagation();
                    return [4 /*yield*/, validateAllFields()
                        //对其进行两者方法的重写，成功算一种方法，失败算一种方法。
                    ];
                case 1:
                    _a = _b.sent(), isValid = _a.isValid, errors = _a.errors, values = _a.values;
                    //对其进行两者方法的重写，成功算一种方法，失败算一种方法。
                    if (isValid && onFinish) {
                        onFinish(values);
                    }
                    else if (!isValid && onFinishFailed) {
                        onFinishFailed(values, errors);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var childrenNode;
    //自定义函数处于函数类型时，需要进行类型转换
    if (typeof children === 'function') {
        childrenNode = children(form);
    }
    else {
        childrenNode = children;
    }
    return (jsx("form", __assign({ name: name, className: "viking-form", onSubmit: submitForm }, { children: jsx(FormContext.Provider, __assign({ value: passedContext }, { children: childrenNode })) })));
});

var FormItem = function (props) {
    var _a = props, label = _a.label, children = _a.children, name = _a.name, _b = _a.valuePropName, valuePropName = _b === void 0 ? 'value' : _b, _c = _a.trigger, trigger = _c === void 0 ? 'onChange' : _c, _d = _a.validateTrigger, validateTrigger = _d === void 0 ? 'onBlur' : _d, _e = _a.getValueFromEvent, getValueFromEvent = _e === void 0 ? function (e) { return e.target.value; } : _e, rules = _a.rules;
    var _f = useContext(FormContext), dispatch = _f.dispatch, fields = _f.fields, initialValues = _f.initialValues, validateField = _f.validateField;
    var rowClass = classNames('viking-row', {
        'viking-row-no-label': !label
    });
    useEffect(function () {
        var value = (initialValues && initialValues[name]) || '';
        dispatch({ type: 'addField', name: name, value: { label: label, name: name, value: value, rules: rules || [], errors: [], isValid: true } });
    }, []);
    // 获取store 对应的 value
    var fieldState = fields[name];
    var value = fieldState && fieldState.value;
    var errors = fieldState && fieldState.errors;
    var isRequired = rules === null || rules === void 0 ? void 0 : rules.some(function (rule) { return (typeof rule !== 'function') && rule.required; });
    var hasError = errors && errors.length > 0;
    var labelClass = classNames({
        'viking-form-item-required': isRequired
    });
    var itemClass = classNames('viking-form-item-control', {
        'viking-form-item-has-error': hasError
    });
    var onValueUpdate = function (e) {
        var value = getValueFromEvent(e);
        console.log('new value', value);
        dispatch({ type: 'updateValue', name: name, value: value });
    };
    var onValueValidate = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateField(name)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    // 1 手动的创建一个属性列表，需要有 value 以及 onChange 属性
    var controlProps = {};
    controlProps[valuePropName] = value;
    controlProps[trigger] = onValueUpdate;
    if (rules) {
        controlProps[validateTrigger] = onValueValidate;
    }
    // 2 获取 children 数组的第一个元素
    var childList = React.Children.toArray(children);
    // 没有子组件
    if (childList.length === 0) {
        console.error('No child element found in Form.Item, please provide one form component');
    }
    // 子组件大于一个
    if (childList.length > 1) {
        console.warn('Only support one child element in Form.Item, others will be omitted');
    }
    // 不是 ReactElement 的子组件
    if (!React.isValidElement(childList[0])) {
        console.error('Child component is not a valid React Element');
    }
    var child = childList[0];
    // 3 cloneElement，混合这个child 以及 手动的属性列表
    var returnChildNode = React.cloneElement(child, __assign(__assign({}, child.props), controlProps));
    return (jsxs("div", __assign({ className: rowClass }, { children: [label &&
                jsx("div", __assign({ className: 'viking-form-item-label' }, { children: jsx("label", __assign({ title: label, className: labelClass }, { children: label })) })), jsxs("div", __assign({ className: 'viking-form-item' }, { children: [jsx("div", __assign({ className: itemClass }, { children: returnChildNode })), hasError &&
                        jsx("div", __assign({ className: 'viking-form-item-explain' }, { children: jsx("span", { children: errors[0].message }) }))] }))] })));
};

var TransForm = Form;
TransForm.Item = FormItem;

library.add(fas);

export { Alert, AutoComplete, Button, TransForm as Form, Icon, Input, TransMenu as Menu, Progress, TransSelect as Select, TransTabs as Tabs, Transition, Upload };
