import * as monaco from 'monaco-editor';

export class LineNoteWidget {
  public readonly domNode: HTMLDivElement;
  private _viewZoneId: string | null = null;
  private _contentWidget: monaco.editor.IContentWidget;

  constructor(
    private readonly _editor: monaco.editor.ICodeEditor,
    public readonly lineNumber: number,
  ) {
    this.domNode = document.createElement('div');
    this._contentWidget = this._createContentWidget();
  }

  private _createContentWidget(): monaco.editor.IContentWidget {
    return {
      getId: () => `line.note.widget.${this.lineNumber}`,
      getDomNode: () => this.domNode,
      getPosition: () => ({
        position: { lineNumber: this.lineNumber, column: 1 },
        preference: [monaco.editor.ContentWidgetPositionPreference.ABOVE],
      }),
    };
  }

  public show(accessor: monaco.editor.IViewZoneChangeAccessor): void {
    const viewZone: monaco.editor.IViewZone = {
      afterLineNumber: this.lineNumber - 1,
      heightInLines: 1.8,
      domNode: document.createElement('div'),
    };
    this._viewZoneId = accessor.addZone(viewZone);
    this._editor.addContentWidget(this._contentWidget);
  }

  public dispose(accessor: monaco.editor.IViewZoneChangeAccessor): void {
    if (this._viewZoneId) {
      accessor.removeZone(this._viewZoneId);
      this._viewZoneId = null;
    }
    this._editor.removeContentWidget(this._contentWidget);
  }
}
