// src/SingleLineNoteContribution.ts

import * as monaco from 'monaco-editor';
import editor = monaco.editor;
import { LineNoteWidget } from './LineNoteWidget'; // 复用之前的 Widget

export class SingleLineNoteContribution implements editor.IEditorContribution {
  public static readonly ID = 'editor.contribution.singleLineNote';

  private _widget: LineNoteWidget | null = null;

  constructor(
    private readonly _editor: editor.ICodeEditor,
    private readonly _lineNumber: number,
  ) {
    // 构造时不做任何事，等待被调用
  }

  // 公开方法，用于显示 Widget
  public show(): void {
    // 如果 Widget 已存在，则不重复创建
    if (this._widget) {
      return;
    }

    this._editor.changeViewZones((accessor) => {
      this._widget = new LineNoteWidget(
        this._editor,
        this._lineNumber,
        () => this.dispose(), // 点击 Dismiss 按钮时，销毁自己
      );
      this._widget.show(accessor);
    });
  }

  // 销毁方法，用于清理
  public dispose(): void {
    if (!this._widget) {
      return;
    }
    this._editor.changeViewZones((accessor) => {
      if (this._widget) {
        this._widget.dispose(accessor);
        this._widget = null;
      }
    });
  }
}
