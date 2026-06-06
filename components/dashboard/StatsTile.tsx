"use client";

import { motion } from "framer-motion";
import { Clock, TrendingUp, Award, Target } from "lucide-react";

// honestly just hardcoded these, would fetch from db in prod
const stats = [
  { label: "Hours this week", value: "14.5h", icon: Clock, color: "text-accent-blue" },
  { label: "Avg. quiz score", value: "91%", icon: TrendingUp, color: "text-accent-green" },
  { label: "Certificates", value: "3", icon: Award, color: "text-accent-orange" },
  { label: "Goals this month", value: "8/10", icon: Target, color: "text-accent-purple" },
];

export default function StatsTile() {
  return (
    <motion.article
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="rounded-xl bg-bg-surface border border-border shadow-card"
    >
      <div className="p-5">
        <h2 className="font-display font-semibold text-white text-sm mb-4">This Week</h2>
        <div className="space-y-3">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Icon size={14} className={s.color} />
                  <span>{s.label}</span>
                </div>
                <span className="font-display font-semibold text-white text-sm">{s.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
}
