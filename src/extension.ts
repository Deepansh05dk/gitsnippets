import * as vscode from 'vscode';
import { callLLMApi } from './llmservice';
import { json } from 'stream/consumers';

export function activate(context: vscode.ExtensionContext) {

	// context.subscriptions.push(webview);
	const provider = new GitCommandChatViewProvider(context);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(GitCommandChatViewProvider.viewType, provider)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('gitCommandChat.insertCommand', (command: string) => {
			const terminal = vscode.window.activeTerminal || vscode.window.createTerminal();
			terminal.show();
			terminal.sendText(command);
		})
	);
}


class GitCommandChatViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = 'gitCommandChat.chatView';

	private _view?: vscode.WebviewView;

	constructor(private readonly _context: vscode.ExtensionContext) { }

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		this._view = webviewView;

		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [this._context.extensionUri]
		};

		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

		webviewView.webview.onDidReceiveMessage(async (data: { type: string; message: string; }) => {
			switch (data.type) {
				case 'sendMessage':
					const response = await callLLMApi(data.message);
					webviewView.webview.postMessage({ type: 'receiveMessage', message: response });
					break;
				case 'insertCommand':
					vscode.commands.executeCommand('gitCommandChat.insertCommand', data.message);
					break;
				case 'saveMessages':
					const Messages: string | undefined = this._context.globalState.get('savedMessages');
					if (Messages) {
						this._context.globalState.update('savedMessages', JSON.stringify([...JSON.parse(Messages), JSON.parse(data.message)]));
					}
					else {
						this._context.globalState.update('savedMessages', JSON.stringify([JSON.parse(data.message)]));
					}
					console.log(this._context.globalState.get('savedMessages'));
					break;
				case 'getMessages':
					const savedMessages: string | undefined = this._context.globalState.get('savedMessages');
					if (savedMessages) {
						webviewView.webview.postMessage({ type: 'loadedMessages', message: JSON.parse(savedMessages) });
					}
					break;
				case 'clearMessages':
					this._context.globalState.update('savedMessages', undefined);
					break;
			}
		});
	}

	private _getHtmlForWebview(webview: vscode.Webview) {
		let scriptSrc = webview.asWebviewUri(vscode.Uri.joinPath(this._context.extensionUri, "webview", "dist", "assets", "index.js"));
		let cssSrc = webview.asWebviewUri(vscode.Uri.joinPath(this._context.extensionUri, "webview", "dist", "assets", "index.css"));

		return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Git Command Chat</title>
				<link rel="stylesheet" href="${cssSrc}" />
            </head>
            <body>
                <div id="root"></div >
            <script>
                const vscode = acquireVsCodeApi();
            </script>
			<script type="module" src="${scriptSrc}"></script>
			</body>
		</html>`;
	}
}

export function deactivate() { }
