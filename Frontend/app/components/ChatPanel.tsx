"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

// Matches the history structure our backend expects
export type Message = {
  role: "user" | "model";
  content: string;
};

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatPanel({ messages, onSendMessage, isLoading }: ChatPanelProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-col h-[600px] bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl"
    >
      {/* Chat Header */}
      <div className="bg-zinc-950 border-b border-zinc-800 p-4 flex items-center gap-3">
        <div className="bg-blue-500/20 p-2 rounded-lg">
          <Bot className="text-blue-400" size={20} />
        </div>
        <div>
          <h2 className="text-zinc-100 font-semibold">AI Tutor</h2>
          <p className="text-xs text-zinc-500">Ask questions about the approach or code</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
            <Bot size={48} className="opacity-20" />
            <p className="text-sm">No questions yet. The tutor is ready when you are!</p>
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div className={`shrink-0 p-2 rounded-full h-fit ${msg.role === "user" ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400"}`}>
                  {msg.role === "user" ? <User size={18} /> : <Bot size={18} />}
                </div>
                <div className={`max-w-[80%] rounded-2xl p-4 text-sm ${msg.role === "user" ? "bg-purple-600 text-white rounded-tr-sm" : "bg-zinc-800 text-zinc-200 rounded-tl-sm"}`}>
                  <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-zinc-900 prose-pre:p-2 prose-pre:rounded-md text-inherit">
                    <ReactMarkdown>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {/* Typing Indicator */}
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="shrink-0 p-2 rounded-full h-fit bg-blue-500/20 text-blue-400">
              <Bot size={18} />
            </div>
            <div className="bg-zinc-800 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 bg-zinc-950 border-t border-zinc-800">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for hints or alternative approaches..."
            disabled={isLoading}
            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-zinc-700 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-blue-600"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </div>
      </form>
    </motion.div>
  );
}