import { useRef, useState, useEffect, useCallback } from 'react';
import * as monaco from 'monaco-editor';

export default function MonacoEditor() {
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
      console.log('text');
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

        editor.pushUndoStop(); // 可选：在插入后添加一个撤销点

        editor.focus(); // 将焦点返回到编辑器
      }
    },
    [editor], // 依赖于editor实例
  );
  return (
    <>
      <button onClick={insertTextAtCursor('\n// hello\n')}>插入一段代码</button>
      <div style={{ minHeight: '300px', paddingTop: '20px' }} ref={editorRef} />
    </>
  );
}
