"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Code2, Cpu, Database, Globe, Layers, Palette, Shield, Zap, BookOpen, Binary,
} from "lucide-react";
import type { Course } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  Code2, Cpu, Database, Globe, Layers, Palette, Shield, Zap, BookOpen, Binary,
};

// each card gets a different accent — picked these manually
const accents = [
  { color: "text-accent-purple", bar: "bg-accent-purple", bg: "bg-accent-purple/10", border: "border-accent-purple/20" },
  { color: "text-accent-blue",   bar: "bg-accent-blue",   bg: "bg-accent-blue/10",   border: "border-accent-blue/20" },
  { color: "text-accent-green",  bar: "bg-accent-green",  bg: "bg-accent-green/10",  border: "border-accent-green/20" },
  { color: "text-accent-orange", bar: "bg-accent-orange", bg: "bg-accent-orange/10", border: "border-accent-orange/20" },
];

interface CourseCardProps {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const Icon = iconMap[course.icon_name] ?? BookOpen;
  const accent = accents[index % accents.length];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isInView) {
      // small delay so you can actually see the animation
      const t = setTimeout(() => setProgress(course.progress), 200 + index * 100);
      return () => clearTimeout(t);
    }
  }, [isInView, course.progress, index]);

  return (
    <motion.article
      ref={ref}
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="rounded-xl bg-bg-surface border border-border shadow-card hover:shadow-card-hover hover:border-gray-600 transition-colors cursor-pointer"
    >
      <div className="p-5">
        {/* icon */}
        <div className={`w-9 h-9 rounded-lg ${accent.bg} border ${accent.border} flex items-center justify-center mb-4`}>
          <Icon size={18} className={accent.color} />
        </div>

        <h3 className="font-display font-semibold text-white text-sm mb-1 leading-snug">
          {course.title}
        </h3>

        {/* show module count, idk just looks better */}
        <p className="text-xs text-gray-500 mb-4">
          {course.progress < 30 ? "Just started" : course.progress < 70 ? "In progress" : "Almost done"} · {course.progress}%
        </p>

        {/* progress bar */}
        <div>
          <div className="h-2 bg-bg-hover rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${accent.bar}`}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>
          <div className="flex justify-between mt-1.5 text-[11px] text-gray-600">
            <span className="font-mono">{progress}% done</span>
            <span className="font-mono">{100 - progress}% left</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
