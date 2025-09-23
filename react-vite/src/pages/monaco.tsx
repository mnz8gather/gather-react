import { useSize } from 'ahooks';
import * as monaco from 'monaco-editor';
import { createRoot } from 'react-dom/client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GeneralTab } from '@/shared/GeneralTab';
import styles from '@/style/monaco.customized.module.scss';

const items = [
  {
    key: 'sample',
    label: '示例',
  },
  {
    key: 'ViewZoneWithContentWidget',
    label: 'ViewZoneWithContentWidget',
  },
  {
    key: 'ContentWidget',
    label: 'ContentWidget',
  },
  {
    key: 'ViewZone',
    label: 'ViewZone',
  },
  {
    key: 'CodeLens',
    label: 'CodeLens',
  },
  {
    key: 'customized',
    label: '定制化样式',
  },
  {
    key: 'resize',
    label: '自适应',
  },
];

// monaco.languages.registerHoverProvider
export function MonacoPage() {
  const [current, setCurrent] = useState('sample');
  return (
    <GeneralTab title='Monaco' items={items} value={current} onChange={setCurrent}>
      {current === 'sample' ? <MonacoEditor /> : null}
      {current === 'ViewZoneWithContentWidget' ? <ViewZoneWithContentWidget /> : null}
      {current === 'ContentWidget' ? <ContentWidget /> : null}
      {current === 'ViewZone' ? <ViewZone /> : null}
      {current === 'CodeLens' ? <CodeLens /> : null}
      {current === 'customized' ? <EditorCustomized /> : null}
      {current === 'resize' ? <EditorResize /> : null}
    </GeneralTab>
  );
}

/**
 * 为什么不直接在 `ViewZone` 的 `domNode` 里渲染所有内容呢？
 *
 * 1. **定位和布局的限制**: `ViewZone` 的 `domNode` 被严格限制在它所占据的行空间内，并且受到编辑器滚动和渲染机制的复杂影响。在其中进行复杂的 CSS 布局（尤其是需要溢出或精确定位时）会非常困难。
 * 2. **事件处理**: `ContentWidget` 作为 Monaco Editor 的一等公民，能更好地处理焦点、鼠标事件，并与编辑器的其他部分（如命令面板）集成。
 * 3. **性能和虚拟化**: Monaco Editor 对 `ContentWidget` 的渲染和销毁有专门的优化。而 `ViewZone` 的 `domNode` 如果过于复杂，可能会影响编辑器的滚动性能。
 *
 */
function ViewZoneWithContentWidget() {
  const editorRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div style={{ padding: '20px', backgroundColor: '#1e1e1e', color: 'white' }}>
        <h1>ViewZone ContentWidget 结合使用</h1>
        <div ref={editorRef} style={{ minHeight: '300px', border: '1px solid #555' }} />
      </div>
    </>
  );
}

function ContentWidget() {
  const editorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (editorRef.current) {
      const editor = monaco.editor.create(editorRef.current, {
        value: '// ... (代码内容)\n'.repeat(10),
        language: 'javascript',
        theme: 'vs-dark',
      });

      const widgetDomNode = document.createElement('div');
      widgetDomNode.style.backgroundColor = '#2a2d33';
      widgetDomNode.innerText = '111111111111';
      widgetDomNode.onclick = () => {
        console.debug('ContentWidget clicked!');
        alert('You clicked the ContentWidget!');
      };
      const deployLineNumber = 9;

      const CustomWidget: monaco.editor.IContentWidget = {
        getId: () => 'custom.widget',
        getDomNode: () => widgetDomNode,
        getPosition: () => ({
          position: { lineNumber: deployLineNumber, column: 1 },
          preference: [monaco.editor.ContentWidgetPositionPreference.ABOVE],
        }),
      };

      editor.addContentWidget(CustomWidget);

      return () => {
        console.debug('editor dispose id', editor.getModel()?.id);
        editor.dispose();
      };
    }
  }, []);
  return (
    <>
      <div style={{ padding: '20px', backgroundColor: '#1e1e1e', color: 'white' }}>
        <h1>Content Widget</h1>
        <div ref={editorRef} style={{ minHeight: '300px', border: '1px solid #555' }} />
      </div>
    </>
  );
}

function ViewZone() {
  const editorRef = useRef<HTMLDivElement>(null);
  // 使用 useRef 来保存 zoneId，以便在组件卸载时移除它
  const viewZoneIdRef = useRef<string | null>(null);

  useEffect(() => {
    let editor: monaco.editor.IStandaloneCodeEditor | null = null;
    if (editorRef.current) {
      editor = monaco.editor.create(editorRef.current, {
        value: [
          '// 1. Some code here',
          '// 2. More code',
          '// 3. Almost there',
          '// 4. A special line that needs an action',
          '// 5. Code continues below',
          '// 6. ...',
        ].join('\n'),
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true,
      });

      // --- ViewZone 实现 ---

      // 1. 创建要显示的 DOM 节点
      const viewZoneDomNode = document.createElement('div');
      viewZoneDomNode.style.zIndex = '1'; // without this, the webview is not interactive
      // 给它一个背景色以示区分
      viewZoneDomNode.style.backgroundColor = '#2a2d33';
      viewZoneDomNode.innerText = '🚀 Execute Special Action';
      viewZoneDomNode.onclick = () => {
        console.debug('ViewZone clicked!');
        alert('You clicked the ViewZone!');
      };

      // 2. 使用 changeViewZones 来添加 ViewZone
      editor.changeViewZones((accessor) => {
        const viewZone: monaco.editor.IViewZone = {
          domNode: viewZoneDomNode,
          afterLineNumber: 4,
          heightInLines: 1,
          // 可选：当点击这个区域时，不要让编辑器获得焦点
          // suppressMouseDown: true,
        };

        // 添加 zone 并保存返回的 ID
        const zoneId = accessor.addZone(viewZone);
        viewZoneIdRef.current = zoneId;
        console.debug('ViewZone added with ID:', zoneId);
      });
    }

    // --- 清理函数 ---
    return () => {
      if (editor && viewZoneIdRef.current) {
        // 在组件卸载时，使用保存的 ID 来移除 ViewZone
        editor.changeViewZones((accessor) => {
          accessor.removeZone(viewZoneIdRef.current!);
          console.debug('ViewZone removed with ID:', viewZoneIdRef.current);
        });
      }
      console.debug('editor dispose id', editor?.getModel()?.id);
      editor?.dispose();
    };
  }, []);
  return (
    <>
      <div style={{ padding: '20px', backgroundColor: '#1e1e1e', color: 'white' }}>
        <h1>ViewZone 示例 (不遮挡代码)</h1>
        <p>在第 4 行和第 5 行之间，插入了一个专属的 UI 区域。不设置 zIndex 不生效</p>
        <div ref={editorRef} style={{ minHeight: '300px', border: '1px solid #555' }} />
      </div>
    </>
  );
}

/**
 * [VS Code Codicons 官方列表, CodeLens 所有可用的图标及其名称](https://microsoft.github.io/vscode-codicons/dist/codicon.html)
 */
function CodeLens() {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorWithCodeLensRef = useRef<HTMLDivElement>(null);
  // 使用 useRef 来持有需要特殊处理的 model URI 集合
  const modelsWithCodeLensRef = useRef<Set<string>>(new Set());
  // 使用 useRef 来保存 provider 的注册信息，以便后续注销
  const providerRef = useRef<monaco.IDisposable | null>(null);

  useEffect(() => {
    if (!providerRef.current) {
      providerRef.current = monaco.languages.registerCodeLensProvider('*', {
        provideCodeLenses: function (model, token) {
          if (!modelsWithCodeLensRef.current.has(model.uri.toString())) {
            return null;
          }
          const lenses = [];
          const lines = model.getLinesContent();

          // 扫描文档，找到目标位置
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.includes('console')) {
              const range = {
                startLineNumber: i + 1,
                startColumn: 1,
                endLineNumber: i + 1,
                endColumn: 1,
              };
              lenses.push({
                range: range,
                command: {
                  id: 'codicon-vscode',
                  title: `$(vscode) 使用 codicon 的图标`,
                  // 可以传递参数给命令
                  arguments: ['console 所在行', { line: i + 1 }],
                },
              });
              lenses.push({
                range: range,
                command: {
                  id: 'run-all-scripts',
                  title: '▷ Run All Scripts',
                },
              });
              // 找到后就退出循环，避免重复添加
              break;
            }
          }

          return {
            lenses: lenses,
            // dispose 方法用于清理
            dispose: () => {},
          };
        },
        // resolveCodeLens 是可选的，用于在需要时才解析命令，可以提升性能
        // 这里为了简单，直接在 provideCodeLenses 中定义了 command
        resolveCodeLens: function (model, codeLens, token) {
          return codeLens;
        },
      });
    }

    // 注册命令
    const codiconVscodeCommand = monaco.editor.registerCommand('codicon-vscode', function (accessor, ...args) {
      // accessor 可以用来访问编辑器服务，args 是从 CodeLens 传递过来的参数
      alert(`执行 Debug 命令！\n参数: ${JSON.stringify(args)}`);
    });
    const runAllScriptsCommand = monaco.editor.registerCommand('run-all-scripts', function () {
      alert('执行 "Run All Scripts" 命令！');
    });

    // 组件卸载时，注销 provider
    return () => {
      providerRef.current?.dispose();
      providerRef.current = null;
      codiconVscodeCommand.dispose();
      runAllScriptsCommand.dispose();
    };
    // 空依赖数组，确保只执行一次
  }, []);

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }
    if (!editorWithCodeLensRef.current) {
      return;
    }

    const editorInstance = monaco.editor.create(editorRef.current, {
      value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
      language: 'typescript',
      theme: 'vs-dark',
      minimap: { enabled: false },
      scrollbar: {
        alwaysConsumeMouseWheel: false,
      },
      codeLens: true,
    });

    const editorWithCodeLensInstance = monaco.editor.create(editorWithCodeLensRef.current, {
      value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
      language: 'typescript',
      theme: 'vs-dark',
      minimap: { enabled: false },
      scrollbar: {
        alwaysConsumeMouseWheel: false,
      },
      codeLens: true,
    });

    const model = editorWithCodeLensInstance.getModel();

    if (model) {
      modelsWithCodeLensRef.current.add(model?.uri.toString());
    }

    return () => {
      console.debug('editor dispose id', editorInstance.getModel()?.id);
      console.debug('editor dispose id', editorWithCodeLensInstance.getModel()?.id);
      editorInstance?.dispose();
      editorWithCodeLensInstance?.dispose();
    };
  }, []);

  return (
    <>
      <h1>CodeLens</h1>
      <p>在第一个编辑器，console 所在行显示带图标的 CodeLens</p>
      <div style={{ minHeight: '300px', paddingTop: '20px' }} ref={editorWithCodeLensRef} />
      <div style={{ minHeight: '300px', paddingTop: '20px' }} ref={editorRef} />
    </>
  );
}

/**
 * monaco-editor 使用方式
 *
 * 获取编辑器的值：通过 onDidChangeModelContent 调用 editorInstance.getValue
 *
 * insertTextAtCursor 方法是在光标后插入一段文本
 */
function MonacoEditor() {
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
      console.debug('输出值', editorInstance?.getValue?.());
    });

    return () => {
      console.debug('editor dispose id', editorInstance.getModel()?.id);
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

/**
 * monaco-editor 自适应大小
 * 方法: editor.layout
 * 需要设置容器的 width height
 *
 * editor.layout() 不传参数意味着编辑器会根据其当前的 DOM 容器计算新的布局
 * editor.layout({width: newWidth, height: newHeight}) 传入具体的宽高值，来精确控制编辑器的布局更新
 */
function EditorResize() {
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
      console.debug('输出值', editorInstance?.getValue?.());
    });

    return () => {
      console.debug('editor dispose id', editorInstance.getModel()?.id);
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

/**
 * monaco-editor 定制化一些样式
 * 通过 defineTheme 定义主题，配置行号区域颜色
 * 通过 css 样式覆盖的方式，调整滚动条样式
 */
function EditorCustomized() {
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
      console.debug('输出值', editorInstance?.getValue?.());
    });

    return () => {
      console.debug('editor dispose id', editorInstance.getModel()?.id);
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
