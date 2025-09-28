import * as monaco from 'monaco-editor';
import { useEffect, useRef } from 'react';

const MAX_LINES = 20;

function App() {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const editorInstance = monaco.editor.create(editorRef.current, {
      value: ['function x() {', '\tconsole.log("Hello world!");', '}', '\n'].join('\n').repeat(4),
      // value: ['function x() {', '\tconsole.log("Hello world!");', '}', '\n'].join('\n').repeat(6),
      language: 'typescript',
      theme: 'vs-dark',
      minimap: { enabled: false },
      scrollbar: {
        alwaysConsumeMouseWheel: false,
      },
    });

    const lineCount = editorInstance.getModel()?.getLineCount();
    const lineHeight = editorInstance.getOption(monaco.editor.EditorOption.lineHeight);
    // 20 行内，有多少行，展示多少行，超过 20 行，只展示 20 行
    if (typeof lineCount === 'number' && lineCount < MAX_LINES) {
      const contentHeight = editorInstance.getContentHeight();
      // 另外一种，根据 px 设置：高度在 200 到 500
      // const contentHeight = Math.min(500, Math.max(200, editor.getContentHeight()));
      editorInstance.layout({ width: editorInstance.getLayoutInfo().width, height: contentHeight });
    } else {
      const targetHeight = lineHeight * MAX_LINES;
      editorInstance.layout({ width: editorInstance.getLayoutInfo().width, height: targetHeight });
    }

    editorInstance.onDidChangeModelContent(() => {
      console.debug('输出值', editorInstance?.getValue?.());
    });

    return () => {
      console.debug('editor dispose id', editorInstance.getModel()?.id);
      editorInstance?.dispose();
    };
  }, []);

  return (
    <div>
      <h1 style={{ margin: '20px', textAlign: 'center' }}>Monaco Editor 最简单演示</h1>
      <div ref={editorRef} />
    </div>
  );
}

export default App;
