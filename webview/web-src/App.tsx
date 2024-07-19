import React, { useState, useEffect, useCallback } from 'react';
import { ChatInterface } from './Components/ChatInterface';

// Declare the vscode type
interface VSCode {
  postMessage(message: { type: string; message: string | string[]; }): void;
}

declare const vscode: VSCode;

type chatMessage = Array<{ type: 'user' | 'ai', content: string[] }>

export const App: React.FC = () => {
  const [messages, setMessages] = useState<chatMessage>([]);

  useEffect(() => {
    vscode.postMessage({ type: 'getMessages', message: '' });

    const messageListener = (event: MessageEvent) => {
      const message: { type: string, message: string[] | chatMessage } = event.data;
      switch (message.type) {
        case 'receiveMessage':
          if (Array.isArray(message.message)) {
            setMessages(prev => [...prev, { type: 'ai', content: message.message as string[] }]);
            vscode.postMessage({ type: 'saveMessages', message: JSON.stringify({ type: 'ai', content: message.message }) });
          }
          break;
        case 'loadedMessages':
          if (Array.isArray(message.message)) {
            setMessages(message.message as chatMessage);
          }
          break;
      }
    };

    window.addEventListener('message', messageListener);

    return () => {
      window.removeEventListener('message', messageListener);
    };
  }, []);

  const sendMessage = useCallback((message: string) => {
    const newMessages: chatMessage = [...messages, { type: 'user', content: [message] }];
    setMessages(newMessages);
    vscode.postMessage({ type: 'sendMessage', message });
    vscode.postMessage({ type: 'saveMessages', message: JSON.stringify({ type: 'user', content: [message] }) });
  }, [messages]);

  const handleInsertCommand = useCallback((command: string) => {
    if (command !== 'Not a valid git command') vscode.postMessage({ type: 'insertCommand', message: command });


  }, []);

  const clearStorage = useCallback(() => {
    vscode.postMessage({ type: 'clearMessages', message: '' });
    setMessages([])
  }, []);
  return (
    <div className="app">
      <ChatInterface
        messages={messages}
        sendMessage={sendMessage}
        handleInsertCommand={handleInsertCommand}
        clearStorage={clearStorage}
      />
    </div>
  );
};