import * as monaco from 'monaco-editor';

class LineTipContentWidget implements monaco.editor.IContentWidget {
  private static _idPool: number = 0;

  private readonly _id: string;
  private readonly _domNode: HTMLElement;
  private readonly _editor: monaco.editor.ICodeEditor;

  private _widgetPosition?: monaco.editor.IContentWidgetPosition;

  constructor(editor: monaco.editor.ICodeEditor, line: number) {
    this._editor = editor;
    this._id = `widget.lineTip-${LineTipContentWidget._idPool++}`;

    this.updatePosition(line);

    this._domNode = document.createElement('span');
    this._domNode.className = `codelens-decoration`;
    this._domNode.innerHTML = `
      <div class="my-custom-widget-content">
        <span>📌 <strong>Note:</strong> This is a native HTML element.</span>
        <button class="dismiss-btn">Dismiss</button>
      </div>
    `;
  }

  getId(): string {
    return this._id;
  }

  getDomNode(): HTMLElement {
    return this._domNode;
  }

  updatePosition(line: number): void {
    const column = this._editor.getModel()?.getLineFirstNonWhitespaceColumn(line) ?? 1;
    this._widgetPosition = {
      position: { lineNumber: line, column: column },
      preference: [monaco.editor.ContentWidgetPositionPreference.ABOVE],
    };
  }

  getPosition(): monaco.editor.IContentWidgetPosition | null {
    return this._widgetPosition || null;
  }
}

class LineTipViewZone implements monaco.editor.IViewZone {
  readonly suppressMouseDown: boolean;
  readonly domNode: HTMLElement;

  afterLineNumber: number;
  /**
   * We want that this view zone, which reserves space for a code lens appears
   * as close as possible to the next line, so we use a very large value here.
   */
  readonly afterColumn = 1 << 30;
  heightInPx: number;

  private _lastHeight?: number;
  private readonly _onHeight: () => void;

  constructor(afterLineNumber: number, heightInPx: number, onHeight: () => void) {
    this.afterLineNumber = afterLineNumber;
    this.heightInPx = heightInPx;
    this._onHeight = onHeight;
    this.suppressMouseDown = true;
    this.domNode = document.createElement('div');
  }

  onComputedHeight(height: number): void {
    console.debug('AQUILA C4C73774E3D94605B6DD1BCB4A4509A7 height', height);
    if (this._lastHeight === undefined) {
      this._lastHeight = height;
    } else if (this._lastHeight !== height) {
      this._lastHeight = height;
      this._onHeight();
    }
  }
}

export class LineTipWidget {
  private readonly _editor: monaco.editor.ICodeEditor;
  private readonly _line: number;

  private readonly _viewZone: LineTipViewZone;
  private _contentWidget?: monaco.editor.IContentWidget;
  private _viewZoneId?: string;

  constructor(editor: monaco.editor.ICodeEditor, line: number) {
    this._editor = editor;
    this._line = line;

    this._contentWidget = new LineTipContentWidget(this._editor, this._line);
    console.debug('AQUILA E2A3982E448D4178B22C22DCD58DCE40', this._contentWidget.getId());
    this._viewZone = new LineTipViewZone(this._line - 1, 0, () => this._onZoneHeightChanged);

    this._editor.changeViewZones((accessor) => {
      this._viewZoneId = accessor.addZone(this._viewZone);
    });

    this._editor.addContentWidget(this._contentWidget);
    setTimeout(() => this._onZoneHeightChanged(), 0);
  }

  private _onZoneHeightChanged(): void {
    const domNode = this?._contentWidget?.getDomNode();
    if (!domNode) {
      return;
    }

    const height = domNode.getBoundingClientRect().height;

    if (this._viewZone.heightInPx === height) {
      return;
    }

    this._editor.changeViewZones((accessor) => {
      if (this._viewZoneId) {
        this._viewZone.heightInPx = height;
        accessor.layoutZone(this._viewZoneId);
      }
    });
  }

  public dispose(): void {
    this._editor.changeViewZones((accessor) => {
      if (this._viewZoneId) {
        accessor.removeZone(this._viewZoneId);
        this._viewZoneId = undefined;
      }
    });
    if (this._contentWidget) {
      this._editor.removeContentWidget(this._contentWidget);
      this._contentWidget = undefined;
    }
  }
}
