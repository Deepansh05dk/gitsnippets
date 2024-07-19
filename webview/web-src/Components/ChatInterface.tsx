import React, { useState, useRef, useEffect } from 'react';

interface ChatInterfaceProps {
    messages: Array<{ type: 'user' | 'ai'; content: string[] }>;
    sendMessage: (message: string) => void;
    handleInsertCommand: (command: string) => void;
    clearStorage: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
    messages,
    sendMessage,
    handleInsertCommand,
    clearStorage,
}) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            sendMessage(input);
            setInput('');
        }
    };
    return (
        <div className="flex flex-col h-screen bg-gray-100 min-w-80" >
            <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
                <h1 className="text-xl font-bold">Chat Interface</h1>
                <button
                    onClick={clearStorage}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                    Clear Chat History
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages?.map((message, index) => (
                    <div
                        key={index}
                    >
                        <div
                            className={`rounded-lg p-3 ${message.type === 'user'
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-800'
                                }`}
                        >
                            {message.content.map((cmd, cmdIndex) => (
                                <div key={cmdIndex} className="mb-2">
                                    <p>{cmd}</p>
                                    {message.type === 'ai' && (
                                        <button
                                            onClick={() => handleInsertCommand(cmd)}
                                            className="mt-2 text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-2 rounded"
                                        >
                                            Insert Command
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
                <div className="flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question..."
                        className="flex-1 p-2 border text-gray-800 border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};