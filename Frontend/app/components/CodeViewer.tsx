"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeViewerProps {
  code: string;
}

export default function CodeViewer({ code }: CodeViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl mb-8"
    >
      {/* Mac-style Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-950 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Terminal className="text-zinc-400" size={18} />
          <span className="text-sm font-medium text-zinc-300">C++ Solution</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors bg-zinc-800/50 hover:bg-zinc-800 px-2 py-1 rounded-md"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </div>

      {/* Syntax Highlighted Code */}
      <div className="text-sm font-mono overflow-x-auto">
        <SyntaxHighlighter
          language="cpp"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "1.5rem",
            background: "transparent",
          }}
          showLineNumbers={true}
          wrapLines={true}
        >
          {code || "// Waiting for AI to generate solution..."}
        </SyntaxHighlighter>
      </div>
    </motion.div>
  );
}