- `React.CSSProperties` 和 `React.HTMLProps<HTMLDivElement>`

  `React.CSSProperties` 是一个 TypeScript 类型，代表可以传递给 React 元素的`style`属性的样式对象，以 JavaScript 对象的形式定义 CSS 属性。另一方面，`React.HTMLProps<HTMLDivElement>`是针对`div`元素的 props 的 TypeScript 类型，包括所有对于`div`有效的 HTML 属性，如`id`、`className`和`style`，以及你可能添加的任何自定义属性。简而言之，`React.CSSProperties`关注于样式，而`React.HTMLProps<HTMLDivElement>`涵盖`div`的所有可能 HTML 属性。

- `React.HTMLProps<HTMLDivElement>` `React.HTMLAttributes<HTMLDivElement>` 区别

  `React.HTMLProps<HTMLDivElement>`提供了适用于HTML `div` 元素的所有属性，包括标准的HTML属性和React特定的属性，如`ref`和`key`。而`React.HTMLAttributes<HTMLDivElement>`则专注于HTML `div` 元素可接受的标准HTML属性，不包括React特有的属性。简而言之，`HTMLProps`提供了更广泛的属性支持，包括React特有的属性，而`HTMLAttributes`仅限于那些适用于HTML元素的属性。
