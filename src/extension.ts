import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const previousLineDisposable = vscode.commands.registerCommand(
    "extension.generateCode",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document = editor.document;
        const position = editor.selection.active;

        if (position.line > 0) {
          const previousLine = document.lineAt(position.line - 1).text;
          editor.edit((editBuilder) => {
            editBuilder.insert(position, previousLine);
          });
        }
      }
    }
  );

  context.subscriptions.push(previousLineDisposable);
}
