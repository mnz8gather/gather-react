import * as monaco from 'monaco-editor';

export class LineNoteWidget {
  public readonly domNode: HTMLDivElement;
  private _viewZoneId: string | null = null;
  private _contentWidget: monaco.editor.IContentWidget;
  // 新增：标记widget是否已显示
  private _isVisible: boolean = false;
  // 新增：缓存位置计算结果
  private _cachedPosition: monaco.editor.IContentWidgetPosition | null = null;

  constructor(
    private readonly _editor: monaco.editor.ICodeEditor,
    public readonly lineNumber: number,
  ) {
    // 延迟创建DOM节点，只在需要时创建
    this.domNode = this._createDomNode();
    this._contentWidget = this._createContentWidget();
  }

  // 新增：创建优化的DOM节点
  private _createDomNode(): HTMLDivElement {
    const div = document.createElement('div');
    // 设置基本样式，避免布局抖动
    div.style.cssText = `
      position: absolute;
      z-index: 10;
      pointer-events: auto;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    `;
    return div;
  }

  private _createContentWidget(): monaco.editor.IContentWidget {
    return {
      getId: () => `line.note.widget.${this.lineNumber}`,
      getDomNode: () => this.domNode,
      getPosition: () => {
        // 缓存位置计算结果
        if (!this._cachedPosition) {
          this._cachedPosition = {
            position: { lineNumber: this.lineNumber, column: 1 },
            preference: [monaco.editor.ContentWidgetPositionPreference.ABOVE],
          };
        }
        return this._cachedPosition;
      },
    };
  }

  public show(accessor: monaco.editor.IViewZoneChangeAccessor): void {
    if (this._isVisible) return; // 避免重复显示

    const viewZone: monaco.editor.IViewZone = {
      afterLineNumber: this.lineNumber - 1,
      heightInLines: 1.8,
      domNode: document.createElement('div'),
    };
    this._viewZoneId = accessor.addZone(viewZone);
    this._editor.addContentWidget(this._contentWidget);

    // 添加淡入效果
    requestAnimationFrame(() => {
      this.domNode.style.opacity = '1';
    });

    this._isVisible = true;
  }

  public dispose(accessor: monaco.editor.IViewZoneChangeAccessor): void {
    if (!this._isVisible) return; // 避免重复销毁

    // 立即移除ViewZone和ContentWidget，因为accessor只在changeViewZones回调中有效
    if (this._viewZoneId) {
      accessor.removeZone(this._viewZoneId);
      this._viewZoneId = null;
    }
    this._editor.removeContentWidget(this._contentWidget);

    // 添加淡出效果（仅视觉效果，不影响功能）
    this.domNode.style.opacity = '0';

    this._isVisible = false;
    this._cachedPosition = null; // 清除缓存
  }

  // 新增：检查widget是否可见
  public get isVisible(): boolean {
    return this._isVisible;
  }

  // 新增：更新行号（如果需要重用widget）
  public updateLineNumber(newLineNumber: number): void {
    if (this.lineNumber !== newLineNumber) {
      (this as any).lineNumber = newLineNumber;
      this._cachedPosition = null; // 清除位置缓存
    }
  }
}
