"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";
import ProblemInput from "./components/ProblemInput";
import ComplexityCard from "./components/ComplexityCard";
import CodeViewer from "./components/CodeViewer";
import ChatPanel, { Message } from "./components/ChatPanel";
import FloatingLines from "./components/FloatingLines"; // Ensure this path matches where you saved the file!

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [problemData, setProblemData] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // 1. Calls the FastAPI /solve endpoint
  const handleSolve = async (url: string) => {
    setIsLoading(true);
    setProblemData(null);
    setMessages([]);

    try {
      const res = await fetch("https://dsa-tutor-agent.onrender.com/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) throw new Error("Failed to solve problem");

      const data = await res.json();
      setProblemData(data);
      
      // Seed the chat with an initial greeting from the AI Tutor
      setMessages([
        {
          role: "model",
          content: `Hello! I've analyzed **${data.problem_title}**. The optimal approach runs in **${data.complexity.time}** time.\n\nI've left detailed comments in the C++ code, but what part of the logic would you like me to explain first?`
        }
      ]);
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend. Is your FastAPI server running?");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Calls the FastAPI /chat endpoint
  const handleSendMessage = async (userMessage: string) => {
    if (!problemData) return;

    // Instantly show the user's message in the UI
    const newMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(newMessages);
    setIsChatLoading(true);

    try {
      const res = await fetch("https://dsa-tutor-agent.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problem_title: problemData.problem_title,
          problem_description: problemData.problem_description,
          cpp_solution: problemData.cpp_solution,
          user_message: userMessage,
          chat_history: messages,
        }),
      });

      if (!res.ok) throw new Error("Chat failed");

      const data = await res.json();
      
      // Add the AI's reply to the chat
      setMessages([...newMessages, { role: "model" as const, content: data.reply }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-purple-500/30 overflow-hidden">
      
      {/* 🌌 THE ANIMATED BACKGROUND 🌌 */}
      <div className="absolute inset-0 z-0">
        <FloatingLines 
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={[14, 14, 14]}   
          lineDistance={[5, 5, 5]}   
          bendRadius={5}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
          linesGradient={["#8b5cf6", "#3b82f6"]} 
          topWavePosition="20%"
          middleWavePosition="50%"
        />
        {/* Dark gradient overlay to ensure text remains readable. pointer-events-none lets the mouse pass through to the animation! */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/80 to-zinc-950 pointer-events-none"></div>
      </div>

      {/* 🚀 THE FOREGROUND CONTENT 🚀 */}
      <div className="relative z-10 p-4 md:p-8 lg:p-12 max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 pt-8"
        >
          <div className="inline-flex items-center justify-center p-4 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl mb-2 backdrop-blur-md bg-opacity-80">
            <BrainCircuit className="text-purple-500" size={36} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 text-transparent bg-clip-text drop-shadow-lg">
            DSA Agent & Tutor
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg drop-shadow-md">
            Paste a LeetCode or Codeforces URL. The AI will write an optimized C++ solution, analyze complexity, and tutor you through the approach.
          </p>
        </motion.div>

        {/* The Input Bar */}
        <ProblemInput onSolve={handleSolve} isLoading={isLoading} />

        {/* The Results Dashboard (Only shows when data is ready) */}
        {problemData && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Column: Problem Details, Complexity, and Code */}
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
                 <h2 className="text-2xl font-bold mb-4 text-zinc-100">{problemData.problem_title}</h2>
                 {/* Quick scrollable area for the problem description */}
                 <div className="prose prose-invert max-w-none text-sm text-zinc-400 h-48 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                    {problemData.problem_description}
                 </div>
              </div>
              
              <ComplexityCard 
                time={problemData.complexity.time}
                space={problemData.complexity.space}
                explanation={problemData.complexity.explanation}
              />
              
              <CodeViewer code={problemData.cpp_solution} />
            </div>

            {/* Right Column: The AI Tutor Chat (Sticky so it stays in view) */}
            <div className="lg:col-span-5 sticky top-8">
              <ChatPanel 
                messages={messages} 
                onSendMessage={handleSendMessage} 
                isLoading={isChatLoading} 
              />
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}