// src/App.tsx
import React, { useState, useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import { LineNoteContribution } from './LineNoteContribution';
import LineNotePerformanceMonitor from './LineNotePerformanceMonitor';

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
  '',
  '// 更多测试数据来展示优化效果',
  'function testFunction1() { // @note',
  '    return "test1";',
  '}',
  '',
  'function testFunction2() { // @note',
  '    return "test2";',
  '}',
  '',
  'function testFunction3() { // @note',
  '    return "test3";',
  '}',
  '',
  'const data = {',
  '    prop1: "value1", // @note',
  '    prop2: "value2", // @note',
  '    prop3: "value3"  // @note',
  '};',
]
  .join('\n')
  // 创建更多内容来测试虚拟化效果
  .repeat(20);

function App() {
  // 用于存放 React Portals 的状态
  const [portals, setPortals] = useState<PortalMap>(new Map());
  // 新增：性能监控开关
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(true);

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
        // 新增：优化滚动性能
        smoothScrolling: true,
        cursorSmoothCaretAnimation: 'on',
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
      {/* 性能监控开关 */}
      <button
        onClick={() => setShowPerformanceMonitor(!showPerformanceMonitor)}
        style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          zIndex: 1001,
          padding: '5px 10px',
          backgroundColor: '#007acc',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          fontSize: '12px',
        }}
      >
        {showPerformanceMonitor ? '隐藏' : '显示'} 性能监控
      </button>

      {/* 这是 Monaco Editor 的容器 */}
      <div ref={editorContainerRef} style={{ height: '100%', width: '100%' }} />

      {/* 渲染所有活动的 Portals */}
      {Array.from(portals.values())}

      {/* 性能监控组件 */}
      <LineNotePerformanceMonitor contribution={contributionRef.current} enabled={showPerformanceMonitor} />
    </div>
  );
}

export default App;
