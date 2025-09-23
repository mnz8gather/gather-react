import * as monaco from 'monaco-editor';
import editor = monaco.editor;

export class LineNoteWidget {
  public readonly domNode: HTMLDivElement;
  private _viewZoneId: string | null = null;
  private _contentWidget: editor.IContentWidget;

  constructor(
    private readonly _editor: editor.ICodeEditor,
    public readonly lineNumber: number,
    // --- ↓↓↓ 改动：在构造函数中接收 onDismiss 回调 ↓↓↓ ---
    onDismiss: () => void,
  ) {
    // --- ↓↓↓ 改动：在这里直接构建完整的 DOM 结构 ↓↓↓ ---
    this.domNode = document.createElement('div');

    // 设置节点的 HTML 内容
    this.domNode.innerHTML = `
      <div class="my-custom-widget-content">
        <span>📌 <strong>Note:</strong> This is a native HTML element.</span>
        <button class="dismiss-btn">Dismiss</button>
      </div>
    `;

    // 直接为节点和其子元素应用样式
    // 外部容器样式
    this.domNode.style.background = 'var(--monaco-editor-background, #1e1e1e)';
    this.domNode.style.width = 'max-content';
    // this.domNode.style.width = '100%';

    // 内部内容样式 (模仿之前的 React 组件样式)
    const content = this.domNode.querySelector<HTMLDivElement>('.my-custom-widget-content')!;
    content.style.backgroundColor = '#2e4a69';
    content.style.border = '1px solid #4a76a8';
    content.style.padding = '8px';
    content.style.borderRadius = '4px';
    content.style.fontFamily = 'sans-serif';
    content.style.fontSize = '13px';
    content.style.color = '#cce5ff';
    content.style.display = 'flex';
    content.style.alignItems = 'center';
    content.style.gap = '10px';
    content.style.boxSizing = 'border-box';

    // 按钮样式
    const button = this.domNode.querySelector<HTMLButtonElement>('.dismiss-btn')!;
    button.style.backgroundColor = '#007bff';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.padding = '4px 8px';
    button.style.borderRadius = '3px';
    button.style.cursor = 'pointer';
    button.style.marginLeft = 'auto';

    // --- ↓↓↓ 改动：为按钮添加点击事件监听器 ↓↓↓ ---
    button.addEventListener('click', (e) => {
      e.stopPropagation(); // 阻止事件冒泡
      onDismiss();
    });

    this._contentWidget = this._createContentWidget();
  }

  // 这个方法及之后的方法基本不变
  private _createContentWidget(): editor.IContentWidget {
    return {
      getId: () => `line.note.widget.${this.lineNumber}`,
      getDomNode: () => this.domNode,
      getPosition: () => ({
        position: { lineNumber: this.lineNumber, column: 1 },
        preference: [editor.ContentWidgetPositionPreference.ABOVE],
      }),
      allowEditorOverflow: true,
    };
  }

  public show(accessor: editor.IViewZoneChangeAccessor): void {
    const viewZone: editor.IViewZone = {
      afterLineNumber: this.lineNumber - 1,
      heightInLines: 1.8,
      domNode: document.createElement('div'),
    };
    this._viewZoneId = accessor.addZone(viewZone);
    this._editor.addContentWidget(this._contentWidget);
  }

  public dispose(accessor: editor.IViewZoneChangeAccessor): void {
    if (this._viewZoneId) {
      accessor.removeZone(this._viewZoneId);
      this._viewZoneId = null;
    }
    this._editor.removeContentWidget(this._contentWidget);
  }
}
