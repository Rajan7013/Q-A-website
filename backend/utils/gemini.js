import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateResponse(prompt, conversationHistory = []) {
  try {
    // Use Gemini 2.5 Flash model (updated for document-first responses)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 4096,  // Increased for comprehensive answers
      }
    });

    // Start chat with history
    const chat = model.startChat({
      history: conversationHistory,
      generationConfig: {
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to generate AI response: ' + error.message);
  }
}

export async function analyzeDocument(documentText, query) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Analyze the following document and answer the question.

Document content:
${documentText.substring(0, 10000)} // Limit to first 10k chars

Question: ${query}

Provide a clear, well-formatted answer based on the document content.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error('Document analysis error:', error);
    throw new Error('Failed to analyze document');
  }
}