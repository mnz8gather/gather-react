import * as monaco from 'monaco-editor';
import React, { useEffect, useRef, useState } from 'react';
import { LineTipWidget } from './LineTipWidgetV2';

// 定义组件的 Props
interface MonacoEditorWithNoteProps {
  value: string;
  language: string;
  noteLine?: number; // 行号是可选的
}

const MonacoEditorWithNote: React.FC<MonacoEditorWithNoteProps> = ({ value, language, noteLine }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const lineTipRef = useRef<LineTipWidget | null>(null);

  // Effect 用于创建和销毁 Editor 实例
  useEffect(() => {
    if (containerRef.current && !editorRef.current) {
      const editor = monaco.editor.create(containerRef.current, {
        value,
        language,
        theme: 'vs-dark',
        automaticLayout: true,
      });
      editorRef.current = editor;
    }

    return () => {
      lineTipRef.current?.dispose();
      lineTipRef.current = null;
      editorRef.current?.dispose();
      editorRef.current = null;
    };
  }, []); // 空依赖数组确保只执行一次

  // Effect 用于处理 noteLine prop 的变化
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    // 1. 清理旧的 Contribution
    lineTipRef.current?.dispose();
    lineTipRef.current = null;

    // 2. 如果提供了有效的 noteLine，则创建新的 Contribution 并显示它
    if (noteLine && noteLine > 0) {
      // 确保行号在模型范围内
      const model = editor.getModel();
      if (model && noteLine <= model.getLineCount()) {
        const lineTipWidget = new LineTipWidget(editor, noteLine);
        lineTipRef.current = lineTipWidget;
      }
    }
  }, [noteLine]); // 当 noteLine prop 变化时，重新运行此 effect

  return <div ref={containerRef} style={{ height: '100%', width: '100%', border: '1px solid grey' }} />;
};

const initialCode = [
  'function helloWorld() {',
  '    // This is line 2',
  '}',
  '',
  'class MyClass {',
  '    // This is line 6',
  '    constructor() {',
  '        this.value = 42;',
  '    }',
  '}',
].join('\n');

function App() {
  // 使用 state 来动态控制 noteLine
  const [targetLine, setTargetLine] = useState<number | undefined>(6);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ padding: '10px', background: '#333', color: 'white' }}>
        <label>Show Note Above Line: </label>
        <input
          type='number'
          value={targetLine || ''}
          onChange={(e) => setTargetLine(e.target.value ? parseInt(e.target.value, 10) : undefined)}
          placeholder='Enter line number'
        />
        <button onClick={() => setTargetLine(2)}>Line 2</button>
        <button onClick={() => setTargetLine(6)}>Line 6</button>
        <button onClick={() => setTargetLine(undefined)}>Clear</button>
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        <MonacoEditorWithNote value={initialCode} language='javascript' noteLine={targetLine} />
      </div>
    </div>
  );
}
