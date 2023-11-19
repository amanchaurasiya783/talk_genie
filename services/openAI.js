import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

// OpenAI configurations
const OpenAI_API_KEY = process.env.OpenAI_API_KEY;
const openAI = new OpenAI({
    apiKey: OpenAI_API_KEY,
});

async function handleChatGPTresponse(question) {
    try {
        const response = await openAI.completions.create({
            model: 'text-davinci-002',
            prompt: question,
            max_tokens: 50,
            temperature: 0,
        });

        return response.choices[0].text;
    } catch (error) {
        console.log('Error at openAI fetch response : ', error.code, " ", error.message);
        return ('Error at openAI fetch response : ', error.code, " ", error.message);
    }
}

export default handleChatGPTresponse;