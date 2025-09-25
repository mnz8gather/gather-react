import * as monaco from 'monaco-editor';
import { createPortal } from 'react-dom';
import React from 'react';
import { LineNoteWidget } from './LineNoteWidget';
import LineNoteComponent from './LineNoteComponent';

type PortalMap = Map<number, React.ReactPortal>;

export class LineNoteContribution implements monaco.editor.IEditorContribution {
  public static readonly ID = 'editor.contribution.lineNote';

  private _widgets = new Map<number, LineNoteWidget>();
  private _disposables: monaco.IDisposable[] = [];

  constructor(
    private readonly _editor: monaco.editor.ICodeEditor,
    private readonly _setPortals: React.Dispatch<React.SetStateAction<PortalMap>>,
  ) {
    this._disposables.push(this._editor.onDidChangeModelContent(() => this.updateWidgets()));
    this.updateWidgets();
  }

  public updateWidgets(): void {
    const model = this._editor.getModel();
    if (!model) return;

    const newWidgetLines = new Set<number>();
    for (let i = 1; i <= model.getLineCount(); i++) {
      if (model.getLineContent(i).includes('// @note')) {
        newWidgetLines.add(i);
      }
    }

    this._editor.changeViewZones((accessor) => {
      const linesToRemove = new Set<number>();
      this._widgets.forEach((widget, lineNumber) => {
        if (!newWidgetLines.has(lineNumber)) {
          widget.dispose(accessor);
          linesToRemove.add(lineNumber);
        }
      });
      linesToRemove.forEach((line) => this._widgets.delete(line));

      newWidgetLines.forEach((lineNumber) => {
        if (!this._widgets.has(lineNumber)) {
          const widget = new LineNoteWidget(this._editor, lineNumber);
          widget.show(accessor);
          this._widgets.set(lineNumber, widget);
        }
      });
    });

    // ** 核心：同步 React Portals **
    this._setPortals(
      new Map(
        Array.from(this._widgets.entries()).map(([lineNumber, widget]) => [
          lineNumber,
          createPortal(<LineNoteComponent onDismiss={() => this.removeNote(lineNumber)} />, widget.domNode),
        ]),
      ),
    );
  }

  private removeNote(lineNumber: number): void {
    const model = this._editor.getModel();
    if (!model) return;

    const lineContent = model.getLineContent(lineNumber);
    this._editor.executeEdits(LineNoteContribution.ID, [
      {
        range: new monaco.Range(lineNumber, 1, lineNumber, lineContent.length + 1),
        text: lineContent.replace('// @note', '// note removed'),
      },
    ]);
  }

  public dispose(): void {
    this._editor.changeViewZones((accessor) => {
      this._widgets.forEach((widget) => widget.dispose(accessor));
      this._widgets.clear();
    });
    this._setPortals(new Map()); // 清空 Portals
    this._disposables.forEach((d) => d.dispose());
  }
}
