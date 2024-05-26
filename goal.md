# 文档整理

## 文档工具

1. procomponents
2. umi-request
3. antd
4. ahooks useAntdTable
5. markdown 整理
6. tool 整理
7. antd table scene
   1. columns
   2. Resize columns
8. antd form scene
   1. rules
   2. custom controls
      1. table
9. review
10. content window mecha
    1. form modal mecha
11. type gather
12. ResizeBox
13. react-resizable re-resizable
14. DropdownSortButton 系列检查
15. antd table scroll to row, border display
16. JSX 变量标签是否可以行 为什么使用 renderProp 不是 变量接收组件。 (为什么是 React.ReactElement 不是 React.ComponentType) 找下旧的代码
17. ComponentType ReactElement ReactNode
18. render function 还是 ComponentType

```
Display: React.ComponentType<{ item: DesignerValue }>;
componentRender: (item: DesignerValue) => React.ReactElement;
```

JSX.Element Element === ReactElement

JSX.Element

React.ElementType

React.ComponentType

```
type ElementType<P = any> =
  | {
      [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K] ? K : never;
    }[keyof JSX.IntrinsicElements]
  | ComponentType<P>;

type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;
```
