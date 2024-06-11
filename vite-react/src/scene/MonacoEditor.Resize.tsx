import { useRef, useState, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import { useSize } from 'ahooks';

/**
 * monaco-editor 自适应大小
 * 方法: editor.layout
 * 需要设置容器的 width height
 *
 * editor.layout() 不传参数意味着编辑器会根据其当前的 DOM 容器计算新的布局
 * editor.layout({width: newWidth, height: newHeight}) 传入具体的宽高值，来精确控制编辑器的布局更新
 */
export function MonacoEditorResize() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const size = useSize(editorRef);

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

  useEffect(() => {
    if (!editor) return;
    // 自适应
    editor.layout();
  }, [size, editor]);

  return <div style={{ width: '100%', height: '100%' }} ref={editorRef} />;
}
