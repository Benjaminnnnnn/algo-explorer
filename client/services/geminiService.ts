
import { GoogleGenAI } from "@google/genai";
import { AlgorithmType, ChatMessage } from "../types";
import { getSystemInstruction } from "./aiSystem";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const streamGeminiResponse = async (
  history: ChatMessage[],
  currentMessage: string,
  currentAlgo: AlgorithmType,
  frameContext: string = "",
  onChunk: (text: string) => void
) => {
  if (!apiKey) {
    onChunk("Error: API Key is missing. Please check your environment configuration.");
    return;
  }

  try {
    const geminiHistory = history.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemInstruction(currentAlgo, frameContext),
      },
      history: geminiHistory,
    });

    const result = await chat.sendMessageStream({ message: currentMessage });

    for await (const chunk of result) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    onChunk("\n(I encountered an error connecting to the knowledge base.)");
  }
};
