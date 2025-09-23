import * as monaco from 'monaco-editor';

class CodeLensViewZone implements monaco.editor.IViewZone {
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
    if (this._lastHeight === undefined) {
      this._lastHeight = height;
    } else if (this._lastHeight !== height) {
      this._lastHeight = height;
      this._onHeight();
    }
  }

  isVisible(): boolean {
    return this._lastHeight !== 0 && this.domNode.hasAttribute('monaco-visible-view-zone');
  }
}

class LineNoteContentWidget implements monaco.editor.IContentWidget {
  private static _idPool: number = 0;

  private readonly _id: string;
  private readonly _domNode: HTMLElement;
  private readonly _editor: monaco.editor.ICodeEditor;

  private _widgetPosition?: monaco.editor.IContentWidgetPosition;

  constructor(editor: monaco.editor.ICodeEditor, line: number) {
    this._editor = editor;
    this._id = `widget.lineNote-${LineNoteContentWidget._idPool++}`;

    this.updatePosition(line);

    this._domNode = document.createElement('span');
    this._domNode.className = `codelens-decoration`;
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

export class LineNoteWidget {
  private readonly _editor: monaco.editor.ICodeEditor;
  private readonly _viewZone: CodeLensViewZone;
  private readonly _viewZoneId: string;

  private _contentWidget?: LineNoteContentWidget;

  constructor(
    editor: monaco.editor.ICodeEditor,
    viewZoneChangeAccessor: monaco.editor.IViewZoneChangeAccessor,
    line: number,
    heightInPx: number,
    updateCallback: () => void,
  ) {
    this._editor = editor;
    this._viewZone = new CodeLensViewZone(line, heightInPx, updateCallback);
    this._viewZoneId = viewZoneChangeAccessor.addZone(this._viewZone);
  }

  dispose(viewZoneChangeAccessor?: monaco.editor.IViewZoneChangeAccessor): void {
    viewZoneChangeAccessor?.removeZone(this._viewZoneId);
    if (this._contentWidget) {
      this._editor.removeContentWidget(this._contentWidget);
      this._contentWidget = undefined;
    }
  }
}
