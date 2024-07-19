import axios from 'axios';

const API_KEY = 'your-openai-api-key';
const API_URL = 'https://aiforcause.deepnight.tech/openai/';

export async function callLLMApi(query: string): Promise<string[]> {
    try {
        const response = await axios.post(API_URL, {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a Git expert. Respond only with Git commands, no explanations. Separate multiple commands with commas.If you cannot generate a valid Git command for the query, respond with exactly 'Not a valid git command'."
                },
                {
                    role: "user",
                    content: query
                }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const content = response.data.choices[0].message.content;
        return content.split(',').map((cmd: string) => cmd.trim());
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return ["Error: Unable to process your request."];
    }
}