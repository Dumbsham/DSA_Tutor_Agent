"use client";

import { motion } from "framer-motion";
import { Clock, HardDrive, Zap } from "lucide-react";

interface ComplexityCardProps {
  time: string;
  space: string;
  explanation: string;
}

export default function ComplexityCard({ time, space, explanation }: ComplexityCardProps) {
  // These variants control the waterfall animation effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 } // Delays each child card by 0.15s
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-4 mb-8"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Time Complexity Card */}
        <motion.div variants={itemVariants} className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-blue-400" size={24} />
            <h3 className="text-zinc-400 font-medium">Time Complexity</h3>
          </div>
          <p className="text-3xl font-bold text-zinc-100 font-mono tracking-tight">{time}</p>
        </motion.div>

        {/* Space Complexity Card */}
        <motion.div variants={itemVariants} className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex items-center gap-3 mb-2">
            <HardDrive className="text-purple-400" size={24} />
            <h3 className="text-zinc-400 font-medium">Space Complexity</h3>
          </div>
          <p className="text-3xl font-bold text-zinc-100 font-mono tracking-tight">{space}</p>
        </motion.div>
      </div>

      {/* Breakdown Explanation */}
      <motion.div variants={itemVariants} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="text-yellow-400" size={20} />
          <h3 className="text-zinc-200 font-semibold">Complexity Breakdown</h3>
        </div>
        <p className="text-zinc-400 leading-relaxed text-sm whitespace-pre-wrap">
          {explanation}
        </p>
      </motion.div>
    </motion.div>
  );
}