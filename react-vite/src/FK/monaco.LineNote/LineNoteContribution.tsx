import React from 'react';
import * as monaco from 'monaco-editor';
import { createPortal } from 'react-dom';
import { LineNoteWidget } from './LineNoteWidget';
import LineNoteComponent from './LineNoteComponent';

type PortalMap = Map<number, React.ReactPortal>;

export class LineNoteContribution implements monaco.editor.IEditorContribution {
  public static readonly ID = 'editor.contribution.lineNote';

  private _widgets = new Map<number, LineNoteWidget>();
  private _disposables: monaco.IDisposable[] = [];
  private _allNoteLines = new Set<number>();
  private _visibleRange: { startLine: number; endLine: number } | null = null;
  private _updateTimer: NodeJS.Timeout | null = null;

  constructor(
    private readonly _editor: monaco.editor.ICodeEditor,
    private readonly _setPortals: React.Dispatch<React.SetStateAction<PortalMap>>,
  ) {
    this._disposables.push(this._editor.onDidChangeModelContent(() => this.scheduleUpdate()));
    this._disposables.push(this._editor.onDidScrollChange(() => this.scheduleUpdate()));
    this._disposables.push(this._editor.onDidLayoutChange(() => this.scheduleUpdate()));

    this.updateWidgets();
  }

  private scheduleUpdate(): void {
    if (this._updateTimer) {
      clearTimeout(this._updateTimer);
    }
    this._updateTimer = setTimeout(() => {
      this.updateWidgets();
    }, 100);
  }

  private getVisibleRange(): { startLine: number; endLine: number } | null {
    try {
      const visibleRanges = this._editor.getVisibleRanges();
      if (visibleRanges.length === 0) return null;

      const range = visibleRanges[0];
      return {
        startLine: Math.max(1, range.startLineNumber - 5),
        endLine: Math.min(this._editor.getModel()?.getLineCount() || 0, range.endLineNumber + 5),
      };
    } catch (error) {
      console.warn('Failed to get visible range:', error);
      return null;
    }
  }

  private scanAllNoteLines(): void {
    const model = this._editor.getModel();
    if (!model) return;

    this._allNoteLines.clear();
    for (let i = 1; i <= model.getLineCount(); i++) {
      if (model.getLineContent(i).includes('// @note')) {
        this._allNoteLines.add(i);
      }
    }
  }

  public updateWidgets(): void {
    const model = this._editor.getModel();
    if (!model) return;

    this.scanAllNoteLines();

    const newVisibleRange = this.getVisibleRange();
    if (!newVisibleRange) return;

    const visibleNoteLines = new Set<number>();
    for (const lineNumber of this._allNoteLines) {
      if (lineNumber >= newVisibleRange.startLine && lineNumber <= newVisibleRange.endLine) {
        visibleNoteLines.add(lineNumber);
      }
    }

    this._editor.changeViewZones((accessor) => {
      const linesToRemove = new Set<number>();
      this._widgets.forEach((widget, lineNumber) => {
        if (!visibleNoteLines.has(lineNumber)) {
          widget.dispose(accessor);
          linesToRemove.add(lineNumber);
        }
      });
      linesToRemove.forEach((line) => this._widgets.delete(line));

      visibleNoteLines.forEach((lineNumber) => {
        if (!this._widgets.has(lineNumber)) {
          const widget = new LineNoteWidget(this._editor, lineNumber);
          widget.show(accessor);
          this._widgets.set(lineNumber, widget);
        }
      });
    });

    this._visibleRange = newVisibleRange;

    this._setPortals(
      new Map(
        Array.from(this._widgets.entries()).map(([lineNumber, widget]) => [
          lineNumber,
          createPortal(<LineNoteComponent onDismiss={() => this.removeNote(lineNumber)} />, widget.domNode),
        ]),
      ),
    );
  }

  public getStats(): { total: number; visible: number } {
    return {
      total: this._allNoteLines.size,
      visible: this._widgets.size,
    };
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
    this._setPortals(new Map());
    this._disposables.forEach((d) => d.dispose());
  }
}
