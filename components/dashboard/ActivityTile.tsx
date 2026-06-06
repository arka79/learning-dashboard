"use client";

import { motion } from "framer-motion";

// generate 15 weeks of fake activity
function generateActivity() {
  const data = [];
  const today = new Date();
  for (let i = 104; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const r = Math.random();
    data.push({
      date: d.toISOString().split("T")[0],
      count: r < 0.4 ? 0 : r < 0.65 ? 1 : r < 0.82 ? 2 : r < 0.93 ? 3 : 4,
    });
  }
  return data;
}

const days = generateActivity();
const activeDays = days.filter(d => d.count > 0).length;

// github-style green levels — i like this better than cyan tbh
const levels = [
  "#1c2333", // 0 — empty
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
];

export default function ActivityTile() {
  return (
    <motion.article
      whileHover={{ scale: 1.008 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="rounded-xl bg-bg-surface border border-border shadow-card"
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-white text-sm">Activity</h2>
          <span className="text-xs text-gray-500 font-mono">{activeDays} days active</span>
        </div>

        {/* the graph — just like github lol */}
        <div className="flex gap-[3px]">
          {Array.from({ length: 15 }).map((_, week) => (
            <div key={week} className="flex flex-col gap-[3px]">
              {days.slice(week * 7, week * 7 + 7).map((day, di) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (week * 7 + di) * 0.005 }}
                  title={`${day.date}: ${day.count} sessions`}
                  style={{ backgroundColor: levels[day.count] }}
                  className="w-3 h-3 rounded-sm cursor-pointer hover:ring-1 hover:ring-white/20 transition-all"
                />
              ))}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-1 mt-3">
          <span className="text-[10px] text-gray-600">less</span>
          {levels.map((bg, i) => (
            <div key={i} style={{ backgroundColor: bg }} className="w-2.5 h-2.5 rounded-sm border border-white/5" />
          ))}
          <span className="text-[10px] text-gray-600">more</span>
        </div>
      </div>
    </motion.article>
  );
}
