import { QuizQuestion, Level, Language, ChatMessage } from "../types";
import { QUESTIONS } from "../data/questions";
import { GoogleGenAI } from "@google/genai";

// Shuffle array helper
const shuffle = <T>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

export const getGameSessionQuestions = (level: Level, count: number = 10): QuizQuestion[] => {
  // Filter questions by level
  const pool = QUESTIONS.filter(q => q.difficulty === level);
  
  // Shuffle and take 'count'
  const shuffled = shuffle([...pool]);
  return shuffled.slice(0, count);
};

// Dr. $mart AI Advisor
export const getAiAdvisorResponse = async (
  history: ChatMessage[], 
  language: Language
): Promise<string> => {
  try {
    // API Key Handling
    let apiKey = '';
    try {
      // @ts-ignore
      if (typeof process !== 'undefined' && process.env) {
        // @ts-ignore
        apiKey = process.env.API_KEY || '';
      }
    } catch (e) {
      console.warn("Process env access failed");
    }

    if (!apiKey) {
      return language === Language.EN 
        ? "I am currently offline. Please configure your API_KEY in the .env file." 
        : "我暫時離線。請配置您的 API 金鑰。";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // 1. Prepare History
    // We must exclude the *last* message from history, because we send it as the new trigger message.
    // Also, map 'assistant' role to 'model' for Gemini.
    const pastMessages = history.slice(0, -1);
    const currentMessage = history[history.length - 1];

    const formattedHistory = pastMessages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    // 2. Define Persona
    const systemPrompt = `
      You are Dr. $mart, a friendly and knowledgeable financial advisor specifically for tertiary students in Hong Kong.
      Your goal is to help students manage money, understand student loans (TSFS/NLSPS), MPF, savings, and basic investing.
      
      Guidelines:
      1. Keep your answers concise (under 80 words) and encouraging.
      2. Use specific Hong Kong terminology (e.g., "Octopus card", "MPF", "Grant/Loan").
      3. If the user speaks English, reply in English.
      4. If the user speaks Chinese, reply in Traditional Chinese.
      5. Do not give financial advice on specific stocks.
    `;

    // 3. Create Chat Session (The robust way)
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: 300,
      },
      history: formattedHistory
    });

    // 4. Send the new message
    const result = await chat.sendMessage({ message: currentMessage.text });
    return result.text || (language === Language.EN ? "I'm thinking..." : "我在思考中...");

  } catch (error) {
    console.error("Gemini AI Error:", error);
    return language === Language.EN 
      ? "I'm having trouble connecting to the server. Please try again."
      : "連線錯誤，請重試。";
  }
};