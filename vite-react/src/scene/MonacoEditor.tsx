import { useRef, useState, useEffect, useCallback } from 'react';
import * as monaco from 'monaco-editor';

/**
 * monaco-editor 使用方式
 *
 * 获取编辑器的值：通过 onDidChangeModelContent 调用 editorInstance.getValue
 *
 * insertTextAtCursor 方法是在光标后插入一段文本
 */
export function MonacoEditor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const editorInstance = monaco.editor.create(editorRef.current, {
      value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
      language: 'typescript',
      theme: 'vs-dark',
      minimap: { enabled: false },
      scrollbar: {
        alwaysConsumeMouseWheel: false,
      },
    });

    setEditor(editorInstance);

    editorInstance.onDidChangeModelContent(() => {
      console.log('输出值', editorInstance?.getValue?.());
    });

    return () => {
      editorInstance?.dispose();
    };
  }, []);

  const insertTextAtCursor = useCallback(
    (text: string) => () => {
      if (!editor) return;

      const selection = editor.getSelection();
      if (selection) {
        const range = new monaco.Range(selection.startLineNumber, selection.startColumn, selection.endLineNumber, selection.endColumn);

        editor.executeEdits('', [
          {
            range: range,
            text: text,
            forceMoveMarkers: true,
          },
        ]);

        // 可选：在插入后添加一个撤销点
        editor.pushUndoStop();

        // 将焦点返回到编辑器
        editor.focus();
      }
    },
    // 依赖于editor实例
    [editor],
  );
  return (
    <>
      <button onClick={insertTextAtCursor('\n// hello\n')}>插入一段代码</button>
      <div style={{ minHeight: '300px', paddingTop: '20px' }} ref={editorRef} />
    </>
  );
}
