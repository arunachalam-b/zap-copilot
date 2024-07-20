import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const disposableAutoGenerateInstruction = vscode.commands.registerCommand(
    "extension.generateCode",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document = editor.document;
        const position = editor.selection.active;

        if (position.line > 0) {
          const autoGenerateInstruction = document
            .lineAt(position.line - 1)
            .text?.trim();

          // We need to find langugage. Because each language has it's own syntax for comments
          if (autoGenerateInstruction.startsWith("//")) {
            const prompt = autoGenerateInstruction.split("//")?.[1]?.trim();
            if (!prompt) {
              vscode.window.showErrorMessage(
                "Please enter a valid prompt (Eg. Write a function to find the sum of 2 numbers)"
              );
            }
            const url = `https://api.restful-api.dev/objects/7?prompt=${prompt}`;

            try {
              const response = await fetch(url);
              const data = await response.json();

              vscode.window.showInformationMessage(
                `API Response: ${JSON.stringify(data)}`
              );
            } catch (error: any) {
              vscode.window.showErrorMessage(
                `API Call Failed: ${error?.message}`
              );
            }
          } else {
            vscode.window.showErrorMessage(
              "Please enter the prompt as a single line comments (Supports only JS now)"
            );
          }

          // editor.edit((editBuilder) => {
          //   editBuilder.insert(position, autoGenerateInstruction);
          // });
        }
      }
    }
  );

  context.subscriptions.push(disposableAutoGenerateInstruction);
}
