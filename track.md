- vite-react
  - alpha # 无依赖
  - paradigms # 编写范式
  - scene
    - xxx.sample
  - layouts # umi 布局目录
  - services # 接口
  - pages # 页面

## vite-plugin-monaco-editor

总的来说，vite-plugin-monaco-editor 插件在 Vite 项目中集成 monaco-editor 时，提供了以下便利：

自动配置：自动处理 monaco-editor 的 Web Worker 配置，无需手动设置。
性能优化：允许定制构建，只包括必要的 monaco-editor 模块和语言支持，以优化加载时间和性能。
开发体验：结合 Vite 的快速重载和模块热替换（HMR），提升开发效率。
易用性：提供简单的配置选项，使得在 Vite 项目中使用 monaco-editor 变得更加容易。

## uuid

用于生成符合 RFC 4122 标准的 UUIDs（通用唯一标识符）。它支持 UUID 的多个版本，包括 v1（时间戳）、v4（随机）、v3（基于命名空间的 MD5 哈希）、v5（基于命名空间的 SHA-1 哈希）。

### 注意事项

- UUID v1 基于时间戳和机器 MAC 地址生成，因此可能会泄露关于何时以及在哪台机器上生成的信息。
- UUID v4 完全基于随机数，提供很高的隐私性，但也意味着完全随机，没有任何内在的意义。
- UUID v3 和 v5 使用散列算法（分别是 MD5 和 SHA-1）和命名空间，可以根据相同的输入和命名空间多次生成相同的 UUID。

## prettier markdown

[使用 ESLint 自动在 Markdown 中英文之间添加空格](https://icekylin.online/whitespace)
[#11597](https://github.com/prettier/prettier/pull/11597)
[#6385](https://github.com/prettier/prettier/issues/6385)

由于经过讨论 3.x 以上版本的 [Prettier](https://prettier.io/) 已经不再对 Markdown 中的中英文之间添加空格 [#11597](https://github.com/prettier/prettier/pull/11597)，故寻求新的解决方案。

`Lint Markdown` 就是这样一个基于 Node.js 的工具，它的部分默认规则遵守 [中文技术文档的写作规范](https://github.com/ruanyf/document-style-guide)。本文将介绍基于 `Lint Markdown` 的 [ESLint](https://eslint.org/) 插件 [`@lint-md/eslint-plugin`](https://github.com/lint-md/eslint-plugin)，它可以检查并修复 Markdown 文档的排版问题。

## antd

[我想给 Ant Design icons 加入 JSDoc 预览，来讨论一下?](https://juejin.cn/post/7348797898492330018)
[feat: JsDoc supports preview](https://github.com/ant-design/ant-design-icons/pull/635)
