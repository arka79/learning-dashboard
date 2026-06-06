"use client";

import { motion } from "framer-motion";
import { Flame, Zap } from "lucide-react";

interface HeroTileProps {
  name?: string;
  streak?: number;
  xp?: number;
  level?: number;
}

export default function HeroTile({
  name = "Alex",
  streak = 12,
  xp = 3840,
  level = 7,
}: HeroTileProps) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <motion.article
      whileHover={{ scale: 1.008 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative rounded-xl overflow-hidden bg-bg-surface border border-border shadow-card"
    >
      {/* gradient top bar — like every dribbble shot has one of these */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-purple via-accent-blue to-accent-green" />

      {/* subtle bg gradient, not too crazy */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
        {/* greeting */}
        <div>
          <p className="text-xs text-gray-500 mb-1">{greeting} 👋</p>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-white">
            Welcome back, <span className="text-accent-purple">{name}</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1.5">
            You have 3 lessons left to complete this week.
          </p>

          <div className="flex items-center gap-3 mt-4">
            <button className="px-4 py-2 rounded-lg bg-accent-purple text-white text-sm font-medium hover:bg-violet-400 transition-colors">
              Continue learning
            </button>
            <button className="px-4 py-2 rounded-lg border border-border text-gray-400 text-sm hover:text-white hover:border-gray-500 transition-colors">
              Browse courses
            </button>
          </div>
        </div>

        {/* stats — just two lil cards */}
        <div className="flex gap-3 shrink-0">
          <div className="flex items-center gap-2.5 bg-bg-elevated border border-border rounded-xl px-4 py-3">
            <Flame size={18} className="text-orange-400" />
            <div>
              <p className="font-display font-bold text-white text-lg leading-none">{streak}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">day streak</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-bg-elevated border border-border rounded-xl px-4 py-3">
            <Zap size={18} className="text-accent-blue" />
            <div>
              <p className="font-display font-bold text-white text-lg leading-none">{xp.toLocaleString()}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">total XP</p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
