const readline = require('readline');
const Groq = require('groq-sdk');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const groqInstance = new Groq({
    apiKey: "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"
});

async function start(query: string) {
    const chatCompletion = await getGroqChatCompletion(query);
    // Print the completion returned by the LLM.
    return chatCompletion.choices[0]?.message?.content || "";
}

async function getGroqChatCompletion(query: string) {
    return groqInstance.chat.completions.create({
        messages: [
            {
                role: "user",
                content: query
            }
        ],
        model: "llama3-8b-8192"
    });
}

async function test(query: string): Promise<void> {
    try {
        const result = await start(query);
        console.log("Response:", result);
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        rl.close();  // Ensure readline closes after async operations are complete
    }
}

rl.question("Enter the prompt: ", (answer: string) => {
    test(answer);
});
