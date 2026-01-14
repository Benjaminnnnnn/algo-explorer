import { HelpCircle, Send, Sparkles } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { streamGeminiResponse } from "../services/geminiService";
import { AlgorithmType, ChatMessage, Frame } from "../types";

interface GeminiChatProps {
  currentAlgo: AlgorithmType;
  currentFrame: Frame | null;
}

const GeminiChat: React.FC<GeminiChatProps> = ({
  currentAlgo,
  currentFrame,
}) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting when algo changes
  const messageCounterRef = useRef(0);
  const buildMessageId = () => {
    messageCounterRef.current += 1;
    return `${Date.now()}-${messageCounterRef.current}`;
  };

  useEffect(() => {
    setMessages([
      {
        id: buildMessageId(),
        role: "model",
        text: `Hello! I'm your AI tutor. I can explain how **${currentAlgo}** works, analyze its time complexity, or help you understand the current visualization step. Ask me anything!`,
        timestamp: Date.now(),
      },
    ]);
  }, [currentAlgo]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (manualInput?: string) => {
    const textToSend = manualInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: buildMessageId(),
      role: "user",
      text: textToSend,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Prepare history for API
    const history = messages.map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

    // Construct Context from current Frame
    let contextStr = "";
    if (currentFrame) {
      contextStr = `
Current Visualization Step:
- Type: ${currentFrame.type}
- Description: ${currentFrame.description}
${
  currentFrame.type === "array"
    ? `- Array State: [${currentFrame.array.join(", ")}]
- Pointers: Mid=${currentFrame.mid}, Left=${currentFrame.left}, Right=${
        currentFrame.right
      }`
    : ""
}
${
  currentFrame.type === "grid"
    ? `- Visiting Node: ${
        currentFrame.current
          ? `[${currentFrame.current[0]}, ${currentFrame.current[1]}]`
          : "None"
      }`
    : ""
}
${currentFrame.type === "linked-list" ? `- Current Action on List.` : ""}
      `.trim();
    }

    const modelMsgId = buildMessageId();
    let accumulatedText = "";

    setMessages((prev) => [
      ...prev,
      { id: modelMsgId, role: "model", text: "", timestamp: Date.now() },
    ]);

    await streamGeminiResponse(
      history,
      userMsg.text,
      currentAlgo,
      contextStr,
      (chunk) => {
        accumulatedText += chunk;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === modelMsgId ? { ...m, text: accumulatedText } : m
          )
        );
      }
    );

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-white border-l border-slate-200 w-full lg:w-96 shadow-xl z-20">
      <div className="bg-gradient-to-r from-brand-700 to-brand-600 p-4 flex items-center shadow-md justify-between">
        <div className="flex items-center">
          <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full mr-3 shadow-inner ring-1 ring-white/20">
            <Sparkles className="text-brand-100 w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm tracking-wide">
              AI Tutor
            </h3>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 scrollbar-hide">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-sm shadow-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-brand-600 text-white rounded-br-none shadow-brand-500/20"
                  : "bg-white text-slate-700 border border-slate-200 rounded-bl-none shadow-slate-200"
              }`}
            >
              {msg.role === "model" ? (
                <div className="prose prose-sm max-w-none prose-violet break-words prose-p:my-1 prose-headings:my-2 prose-code:bg-slate-100 prose-code:text-brand-600 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ) : (
                <p>{msg.text}</p>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        {/* Context Suggestion */}
        {currentFrame && (
          <button
            onClick={() => handleSend("Explain the current step.")}
            disabled={isLoading}
            className="mb-3 w-full flex items-center justify-center space-x-2 text-xs font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 py-2 rounded-lg transition-colors border border-brand-200"
          >
            <HelpCircle size={14} />
            <span>Explain current step</span>
          </button>
        )}

        <div className="flex items-center bg-slate-50 rounded-full px-2 py-2 border border-slate-200 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 transition-all shadow-sm">
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400 ml-3"
            placeholder="Ask about this algorithm..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isLoading}
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="ml-2 p-2 bg-brand-600 rounded-full text-white hover:bg-brand-700 disabled:opacity-50 disabled:hover:bg-brand-600 transition-all transform active:scale-95 shadow-md shadow-brand-500/20"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiChat;
