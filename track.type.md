## 

[TS 中箭头函数如何重载](https://juejin.cn/post/7236634852829052983)
[TypeScript 函数重载 -> 箭头函数方式 报错处理](https://juejin.cn/post/7331726355799687220)

## Element HTMLElement Node difference

Node -> Element -> HTMLElement ->

[DOM Manipulation](https://www.typescriptlang.org/docs/handbook/dom-manipulation.html)

[What's the difference between `HTMLElement` and `Element`?](https://stackoverflow.com/questions/6581680/whats-the-difference-between-htmlelement-and-element)

[Element vs. ReactElement vs. HTMLElement vs. Node Confusion in TypeScript and React](https://betterprogramming.pub/typescript-reactjs-the-element-vs-reactelement-vs-htmlelement-vs-node-confusion-6cda21315ddd)

理解 ahooks useEventListener

## react ref

LegacyRef ElementRef ComponentRef

RefCallback RefObject MutableRefObject

RefAttributes

## 具有重载的构造函数，如何获取它的参数类型

[ConstructorParameters<T> cannot get correct types of overloaded constructor](https://github.com/microsoft/TypeScript/issues/37079)
[24275](https://github.com/microsoft/TypeScript/issues/24275)

## `React.CSSProperties` 和 `React.HTMLProps<HTMLDivElement>`

`React.CSSProperties` 是一个 TypeScript 类型，代表可以传递给 React 元素的`style`属性的样式对象，以 JavaScript 对象的形式定义 CSS 属性。

另一方面，`React.HTMLProps<HTMLDivElement>`是针对`div`元素的 props 的 TypeScript 类型，包括所有对于`div`有效的 HTML 属性，如`id`、`className`和`style`，以及你可能添加的任何自定义属性。

简而言之，`React.CSSProperties`关注于样式，而`React.HTMLProps<HTMLDivElement>`涵盖`div`的所有可能 HTML 属性。

## `React.HTMLProps<HTMLDivElement>` `React.HTMLAttributes<HTMLDivElement>` 区别

`React.HTMLProps<HTMLDivElement>`提供了适用于HTML `div` 元素的所有属性，包括标准的HTML属性和React特定的属性，如`ref`和`key`。

而`React.HTMLAttributes<HTMLDivElement>`则专注于HTML `div` 元素可接受的标准HTML属性，不包括React特有的属性。

简而言之，`HTMLProps`提供了更广泛的属性支持，包括React特有的属性，而`HTMLAttributes`仅限于那些适用于HTML元素的属性。

## div ref 和 class 组件 ref 是一个类型吗

虽然两者都使用 `ref` 属性，但它们的类型是根据所引用的对象而定：

- **类组件的 `ref`**：引用的是组件实例，可以访问组件的所有公开成员。
- **DOM元素的 `ref`**：直接引用的是 DOM 节点，可以调用任何标准的 DOM 方法和属性。

这种区分在使用 TypeScript 编写React应用时尤为重要，因为正确的类型注解有助于捕获类型错误，并在编译时提供自动完成和接口文档。在实际开发中，明确 `ref` 的类型能有效帮助管理组件间的交互，提高代码的健壮性和可维护性。

## React JSX type

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
