# Git Command Chat VS Code Extension

## Project Overview

GitSnippet Chat is an innovative Visual Studio Code extension that revolutionizes the way developers interact with Git. By leveraging the power of AI, this extension provides an intuitive chat interface for executing Git commands, making version control more accessible and efficient than ever before.

### Key Features

- **AI-Powered Git Assistant**: Communicate with an AI expert to get the right Git commands for your needs.
- **Natural Language Processing**: Simply describe what you want to do, and the AI will suggest the appropriate Git commands.
- **Command Execution**: Execute suggested Git commands directly from the chat interface.
- **Persistent Chat History**: Your conversation history is saved, allowing you to refer back to previous commands and explanations.
- **Clear Chat Functionality**: Easily clear your chat history when needed.

## Demo

[\[Insert link to screen recording of the project here\]](https://drive.google.com/file/d/1U1PrBtOULFnIUv297vUf4MHjKKTlqZPj/view?usp=sharing)

## Challenges Faced and Solutions

### Initial Setup

In the initial setup phase, I encountered several challenges:

1. **Webview Integration**: Integrating a React-based webview into a VS Code extension required a deep dive into VS Code's extension API and webview communication protocols.

2. **State Management**: Implementing persistent state management between the extension and webview proved to be complex, especially when dealing with message history.

3. **AI Integration**: Connecting the extension to an AI service and handling the response format required careful consideration of asynchronous operations and error handling.

### Solutions

To overcome these challenges, I:

1. Thoroughly studied VS Code's documentation and example projects, which helped in understanding the intricacies of webview integration.

2. Implemented a robust state management system using VS Code's `globalState` API, ensuring seamless data persistence across sessions.

3. Developed a flexible AI communication layer that could handle various response formats and gracefully manage API calls.

## Setup and Usage

To get started with the Git Command Chat extension:

1. Clone this repository to your local machine.

2. Navigate to the `webview` folder and build the React app:

   ```
   cd webview
   npm install
   npm run build
   ```

3. Open the project in Visual Studio Code.

4. Add your OpenAI key to the src/llmservice.ts file.

5. Press F5 to start the extension in debug mode.

6. Once the extension is running, you can access the Git Command Chat from the VS Code activity bar.

## Technologies Used

- Visual Studio Code Extension API
- React
- TypeScript
- Tailwind CSS
- OpenAI API (or similar AI service)

## Acknowledgements

- [VS Code Extension Documentation](https://code.visualstudio.com/api/get-started/your-first-extension)
- [\[Any other resources or tutorials you found helpful\]](https://dev.to/rakshit47/create-vs-code-extension-with-react-typescript-tailwind-1ba6)

---
