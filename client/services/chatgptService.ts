import { AlgorithmType, ChatMessage } from '../types';
import { getSystemInstruction } from './aiSystem';

const defaultBaseUrl = import.meta.env.DEV ? 'http://localhost:8787' : '';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || defaultBaseUrl;
const normalizedBaseUrl = apiBaseUrl.endsWith('/')
  ? apiBaseUrl.slice(0, -1)
  : apiBaseUrl;
const apiUrl = `${normalizedBaseUrl}/api/chatgpt`;

const mapRole = (role: ChatMessage['role']) => (
  role === 'model' ? 'assistant' : 'user'
);

export const streamChatGptResponse = async (
  history: ChatMessage[],
  currentMessage: string,
  currentAlgo: AlgorithmType,
  frameContext: string = '',
  onChunk: (text: string) => void,
  signal?: AbortSignal
) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal,
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        stream: true,
        messages: [
          { role: 'system', content: getSystemInstruction(currentAlgo, frameContext) },
          ...history.map((msg) => ({
            role: mapRole(msg.role),
            content: msg.text,
          })),
          { role: 'user', content: currentMessage },
        ],
      }),
    });

    if (!response.ok || !response.body) {
      throw new Error(`OpenAI request failed with status ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      if (signal?.aborted) return;
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) continue;
        const payload = trimmed.replace(/^data:\s*/, '');
        if (payload === '[DONE]') return;
        const parsed = JSON.parse(payload);
        const delta = parsed?.choices?.[0]?.delta?.content;
        if (delta) onChunk(delta);
      }
    }
  } catch (error) {
    if (signal?.aborted) return;
    console.error('ChatGPT Error:', error);
    onChunk('\n(I encountered an error connecting to the knowledge base.)');
  }
};
