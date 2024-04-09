import { useRef, useState, useEffect, useCallback } from 'react';
import * as monaco from 'monaco-editor';
import styles from './MonacoEditor.Customized.module.scss';

/**
 * monaco-editor 定制化一些样式
 * 通过 defineTheme 定义主题，配置行号区域颜色
 * 通过 css 样式覆盖的方式，调整滚动条样式
 */
export default function MonacoEditorCustomized() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const editorInstance = monaco.editor.create(editorRef.current, {
      value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
      language: 'typescript',
      theme: 'MonacoEditorCustomizedTheme',
      minimap: { enabled: false },
      scrollbar: {
        alwaysConsumeMouseWheel: false,
        horizontalScrollbarSize: 8,
        horizontalSliderSize: 8,
        verticalScrollbarSize: 8,
        verticalSliderSize: 8,
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
    <div className={styles.MonacoEditorCustomized}>
      <button onClick={insertTextAtCursor('\n// hello\n')}>插入一段代码</button>
      <div style={{ minHeight: '300px', paddingTop: '20px' }} ref={editorRef} />
    </div>
  );
}

monaco.editor.defineTheme('MonacoEditorCustomizedTheme', {
  base: 'vs',
  inherit: true,
  rules: [],
  colors: {
    // 行号区域背景色
    'editorGutter.background': '#f0f0f0',
  },
});
