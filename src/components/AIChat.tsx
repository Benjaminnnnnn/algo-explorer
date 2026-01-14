import { HelpCircle, Send, Sparkles } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { streamChatGptResponse } from "../services/chatgptService";
import { streamGeminiResponse } from "../services/geminiService";
import { AlgorithmType, ChatMessage, Frame } from "../types";

type AIProvider = "gemini" | "chatgpt";

interface AIChatProps {
  currentAlgo: AlgorithmType;
  currentFrame: Frame | null;
}

const providerLabels: Record<AIProvider, string> = {
  gemini: "Gemini",
  chatgpt: "ChatGPT",
};

const AIChat: React.FC<AIChatProps> = ({ currentAlgo, currentFrame }) => {
  const [provider, setProvider] = useState<AIProvider>(() => {
    try {
      const saved = localStorage.getItem("algo-explorer:ai-chat:provider");
      return saved === "gemini" ? "gemini" : "chatgpt";
    } catch {
      return "chatgpt";
    }
  });
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isRestored, setIsRestored] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const ignoreChunksRef = useRef(false);
  const messageCounterRef = useRef(0);
  const [panelWidth, setPanelWidth] = useState(384);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartWidthRef = useRef(0);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);

  const buildMessageId = () => {
    messageCounterRef.current += 1;
    return `${Date.now()}-${messageCounterRef.current}`;
  };

  const storageKeyBase = useMemo(
    () => `algo-explorer:ai-chat:${provider}:${currentAlgo}`,
    [provider, currentAlgo]
  );

  useEffect(() => {
    setIsRestored(false);
    try {
      const storedMessages = localStorage.getItem(`${storageKeyBase}:messages`);
      const storedDraft = localStorage.getItem(`${storageKeyBase}:draft`);

      const greeting: ChatMessage = {
        id: buildMessageId(),
        role: "model",
        text: `Hello! I'm your AI tutor (${providerLabels[provider]}). I can explain how **${currentAlgo}** works, analyze its time complexity, or help you understand the current visualization step. Ask me anything!`,
        timestamp: Date.now(),
      };

      if (storedMessages) {
        const parsed = JSON.parse(storedMessages);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        } else {
          setMessages([greeting]);
        }
      } else {
        setMessages([greeting]);
      }

      setInput(storedDraft ?? "");
      setIsRestored(true);
    } catch (error) {
      console.warn("Failed to restore chat session:", error);
      setIsRestored(true);
    }
  }, [storageKeyBase, currentAlgo, provider]);

  useEffect(() => {
    try {
      localStorage.setItem("algo-explorer:ai-chat:provider", provider);
    } catch (error) {
      console.warn("Failed to persist provider:", error);
    }
  }, [provider]);

  useEffect(() => {
    if (!isRestored) return;
    try {
      localStorage.setItem(
        `${storageKeyBase}:messages`,
        JSON.stringify(messages)
      );
    } catch (error) {
      console.warn("Failed to persist chat messages:", error);
    }
  }, [messages, storageKeyBase, isRestored]);

  useEffect(() => {
    try {
      localStorage.setItem(`${storageKeyBase}:draft`, input);
    } catch (error) {
      console.warn("Failed to persist draft input:", error);
    }
  }, [input, storageKeyBase, isRestored]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      setPanelWidth((prev) => Math.max(280, Math.min(520, prev)));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const delta = dragStartXRef.current - event.clientX;
      const nextWidth = dragStartWidthRef.current + delta;
      setPanelWidth(Math.max(280, Math.min(520, nextWidth)));
    };

    const handleMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleResizeMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return;
    isDraggingRef.current = true;
    dragStartXRef.current = event.clientX;
    dragStartWidthRef.current = panelWidth;
  };

  const getContextString = () => {
    if (!currentFrame) return "";
    return `
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
  };

  const streamResponse = async (
    history: ChatMessage[],
    textToSend: string,
    contextStr: string,
    onChunk: (text: string) => void
  ) => {
    if (provider === "gemini") {
      await streamGeminiResponse(
        history,
        textToSend,
        currentAlgo,
        contextStr,
        onChunk
      );
      return;
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    await streamChatGptResponse(
      history,
      textToSend,
      currentAlgo,
      contextStr,
      onChunk,
      controller.signal
    );
  };

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
    ignoreChunksRef.current = false;

    const history = messages;
    const contextStr = getContextString();

    const modelMsgId = buildMessageId();
    let accumulatedText = "";
    setMessages((prev) => [
      ...prev,
      { id: modelMsgId, role: "model", text: "", timestamp: Date.now() },
    ]);

    await streamResponse(history, userMsg.text, contextStr, (chunk) => {
      if (ignoreChunksRef.current) return;
      accumulatedText += chunk;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === modelMsgId ? { ...m, text: accumulatedText } : m
        )
      );
    });

    setIsLoading(false);
    abortControllerRef.current = null;
  };

  const handleStop = () => {
    ignoreChunksRef.current = true;
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setIsLoading(false);
  };

  return (
    <div
      className="relative flex flex-col h-full min-h-0 bg-white border-l border-slate-200 w-full shadow-xl z-20"
      style={isDesktop ? { width: panelWidth } : undefined}
    >
      {isDesktop && (
        <div
          className="absolute left-0 top-0 h-full w-1.5 cursor-col-resize hover:bg-brand-100/70"
          onMouseDown={handleResizeMouseDown}
          aria-hidden="true"
        />
      )}
      <div className="bg-white p-4 flex items-center shadow-sm justify-between border-b border-slate-200">
        <div className="flex items-center">
          <div className="bg-brand-50 p-2 rounded-full mr-3 shadow-inner ring-1 ring-brand-100">
            <Sparkles className="text-brand-600 w-5 h-5" />
          </div>
          <div>
            <h3 className="text-slate-900 font-bold text-sm tracking-wide">
              AI Tutor
            </h3>
            <p className="text-slate-500 text-xs font-medium">
              {providerLabels[provider]}
            </p>
          </div>
        </div>
        <div className="flex items-center bg-slate-100 rounded-full p-1 ring-1 ring-slate-200">
          {(["gemini", "chatgpt"] as AIProvider[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setProvider(option)}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                provider === option
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {providerLabels[option]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 bg-slate-50/50 scrollbar-hide">
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
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400 ml-3"
            placeholder="Ask about this algorithm..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isLoading}
          />
          {isLoading ? (
            <button
              onClick={handleStop}
              className="ml-2 px-3 py-1.5 bg-white rounded-full text-xs font-semibold text-brand-600 border border-brand-200 hover:bg-brand-50 transition-all shadow-sm"
            >
              Stop
            </button>
          ) : (
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="ml-2 p-2 bg-brand-600 rounded-full text-white hover:bg-brand-700 disabled:opacity-50 disabled:hover:bg-brand-600 transition-all transform active:scale-95 shadow-md shadow-brand-500/20"
            >
              <Send size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIChat;
