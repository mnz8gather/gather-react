import { Space } from 'antd';
import * as monaco from 'monaco-editor';
import { CopyOutlined, DownOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from '@/style/markeup.module.less';

const SAMPLE_CODE = `// 违反规则: 指针运算导致数据界限
void unsafe_copy(char* src) {
    char dest[10];
    strcpy(dest, src); // 触发TS 17961规则ADV-01
}`;

const MAX_LINES = 20;

interface ThemeToggleEditorProps {
  isDark?: boolean;
}

export function ThemeToggleEditor(props: ThemeToggleEditorProps) {
  const { isDark } = props;
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const resizeHeight = useCallback(() => {
    const editorInstance = editorInstanceRef.current;
    if (editorInstance) {
      const lineCount = editorInstance.getModel()?.getLineCount();
      const lineHeight = editorInstance.getOption(monaco.editor.EditorOption.lineHeight);
      if (typeof lineCount === 'number' && lineCount < MAX_LINES) {
        const contentHeight = editorInstance.getContentHeight();
        editorInstance.layout({ width: editorInstance.getLayoutInfo().width, height: contentHeight });
      } else {
        const targetHeight = lineHeight * MAX_LINES;
        editorInstance.layout({ width: editorInstance.getLayoutInfo().width, height: targetHeight });
      }
    }
  }, []);

  const toggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (editorInstanceRef.current) {
      const editorDom = editorInstanceRef.current.getDomNode();
      if (editorDom) {
        editorDom.style.display = newCollapsedState ? 'none' : 'block';
        resizeHeight();
      }
    }
  };

  useEffect(() => {
    if (!editorRef.current) return;

    const editorInstance = monaco.editor.create(editorRef.current, {
      theme: isDark ? 'vs-dark' : 'vs',
      value: SAMPLE_CODE,
      language: 'cpp',
      overviewRulerLanes: 0,
      overviewRulerBorder: false,
      scrollBeyondLastLine: false,
      minimap: { enabled: false },
    });

    editorInstanceRef.current = editorInstance;

    resizeHeight();

    return () => {
      editorInstance.dispose();
    };
  }, []);

  useEffect(() => {
    monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs');
  }, [isDark]);

  return (
    <div
      className={styles.panel}
      style={{
        paddingBottom: isCollapsed ? '0' : '16px',
      }}
    >
      <div
        className={styles.tool}
        style={{
          marginBottom: isCollapsed ? '0' : '16px',
        }}
      >
        <div>典型检测场景示例:</div>
        <div className={styles.right}>
          <Space size='middle'>
            <DownOutlined
              onClick={toggleCollapse}
              style={{
                transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            <CopyOutlined />
          </Space>
        </div>
      </div>
      <div ref={editorRef} />
    </div>
  );
}
