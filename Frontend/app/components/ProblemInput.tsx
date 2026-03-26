"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Loader2, ArrowRight } from "lucide-react";

interface ProblemInputProps {
  onSolve: (url: string) => void;
  isLoading: boolean;
}

export default function ProblemInput({ onSolve, isLoading }: ProblemInputProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) onSolve(url.trim());
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto mb-8"
    >
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
        <div className="relative flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-2 shadow-2xl">
          <div className="pl-4 pr-3 text-zinc-400">
            <Code2 size={20} />
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a LeetCode or Codeforces URL here..."
            required
            disabled={isLoading}
            className="flex-1 bg-transparent text-zinc-100 placeholder-zinc-500 focus:outline-none py-3"
          />
          <button
            type="submit"
            disabled={isLoading || !url}
            className="ml-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-zinc-200 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Solving...
              </>
            ) : (
              <>
                Analyze <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}