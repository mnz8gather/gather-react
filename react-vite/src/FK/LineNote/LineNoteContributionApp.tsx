// src/App.tsx
import React, { useState, useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import { LineNoteContribution } from './LineNoteContribution';

// 从上一个示例中复用这些类型和组件
// import LineNoteComponent from './LineNoteComponent';
// import { LineNoteWidget } from './LineNoteWidget';

// 定义 Portal 类型
type PortalMap = Map<number, React.ReactPortal>;

const initialCode = [
  'function helloWorld() {',
  '    console.log("Hello, world!"); // @note',
  '}',
  '',
  'class MyClass {',
  '    constructor() { // @note',
  '        this.value = 42;',
  '    }',
  '}',
]
  .join('\n')
  // 创建多了会卡，卡的原因是：创建了很多 ContentWidget ViewZone 等元素
  .repeat(10);

function App() {
  // 用于存放 React Portals 的状态
  const [portals, setPortals] = useState<PortalMap>(new Map());

  // Ref 指向将要容纳 Monaco Editor 的 div 元素
  const editorContainerRef = useRef<HTMLDivElement>(null);

  // Ref 用于持有 editor 和 contribution 实例，防止它们在重渲染时被重新创建
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const contributionRef = useRef<LineNoteContribution | null>(null);

  // useEffect 负责创建和销毁 editor 实例
  useEffect(() => {
    // 确保只在组件挂载时执行一次
    if (editorContainerRef.current && !editorRef.current) {
      const editor = monaco.editor.create(editorContainerRef.current, {
        value: initialCode,
        language: 'javascript',
        theme: 'vs-dark',
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true, // 关键：让编辑器在容器大小变化时自动调整布局
      });

      editorRef.current = editor;

      // 实例化我们的 Contribution
      contributionRef.current = new LineNoteContribution(editor, setPortals);
    }

    // 返回一个清理函数，它将在组件卸载时被调用
    return () => {
      if (editorRef.current) {
        // 销毁 Contribution
        contributionRef.current?.dispose();
        contributionRef.current = null;

        // 销毁 Editor 实例
        editorRef.current.dispose();
        editorRef.current = null;
      }
    };
  }, []); // 空依赖数组意味着这个 effect 只运行一次

  return (
    // position: 'relative' 是必须的，因为 Monaco 的一些浮动元素（如提示框）会基于它定位
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      {/* 这是 Monaco Editor 的容器 */}
      <div ref={editorContainerRef} style={{ height: '100%', width: '100%' }} />

      {/* 渲染所有活动的 Portals */}
      {Array.from(portals.values())}
    </div>
  );
}

export default App;
