import * as monaco from 'monaco-editor';
import { useEffect, useRef } from 'react';

const SAMPLE_CODE = `// 违反规则: 指针运算导致数据界限
void unsafe_copy(char* src) {
    char dest[10];
    strcpy(dest, src); // 触发TS 17961规则ADV-01
}`;

interface LightCodeEditorProps {
  width?: number;
  height?: number;
  code?: string;
}

const LightCodeEditor: React.FC<LightCodeEditorProps> = ({ width = 800, height = 300, code = SAMPLE_CODE }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    // 创建编辑器实例
    const editorInstance = monaco.editor.create(editorRef.current, {
      value: code,
      language: 'cpp',
      theme: 'vs', // 明亮主题
      fontSize: 14,
      fontFamily: 'Consolas, "Courier New", monospace',
      lineNumbers: 'on',
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      wordWrap: 'off',
      lineDecorationsWidth: 10,
      lineNumbersMinChars: 2,
      glyphMargin: false,
      folding: false,
      selectOnLineNumbers: true,
      matchBrackets: 'always',
      scrollbar: {
        alwaysConsumeMouseWheel: false,
        vertical: 'auto',
        horizontal: 'auto',
        verticalScrollbarSize: 8,
        horizontalScrollbarSize: 8,
      },
      renderLineHighlight: 'line',
      cursorBlinking: 'blink',
      cursorStyle: 'line',
      renderWhitespace: 'none',
      contextmenu: true,
      mouseWheelZoom: false,
      smoothScrolling: true,
      cursorSmoothCaretAnimation: 'on',
      renderControlCharacters: false,
      bracketPairColorization: {
        enabled: true,
      },
    });

    editorInstanceRef.current = editorInstance;

    // 设置编辑器尺寸
    editorInstance.layout({ width, height });

    // 窗口大小变化时自动调整
    const handleResize = () => {
      editorInstance.layout();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      editorInstance.dispose();
    };
  }, [width, height, code]);

  return (
    <div
      style={{
        border: '1px solid #d1d9e0',
        borderRadius: '6px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        paddingBottom: '8px',
      }}
    >
      {/* 标题栏 */}
      <div
        style={{
          background: '#f4f4f4',
          color: '#24292f',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: '500',
          borderBottom: '1px solid #d1d5db',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
        }}
      >
        <span>典型检测场景示例:</span>
        <div
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          {/* 模拟窗口控制按钮 */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#ff5f57',
              }}
            />
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#ffbd2e',
              }}
            />
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#28ca42',
              }}
            />
          </div>
        </div>
      </div>

      {/* 编辑器容器 */}
      <div
        ref={editorRef}
        style={{
          width,
          height,
          backgroundColor: '#ffffff',
        }}
      />
    </div>
  );
};

export default LightCodeEditor;
