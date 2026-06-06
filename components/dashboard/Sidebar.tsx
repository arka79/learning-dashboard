"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Trophy,
  Settings,
  ChevronLeft,
  Bell,
  GraduationCap,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "My Courses", icon: BookOpen, href: "/courses" },
  { label: "Progress", icon: BarChart2, href: "#" },
  { label: "Achievements", icon: Trophy, href: "#" },
  { label: "Settings", icon: Settings, href: "#" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("Dashboard");

  return (
    <>
      {/* desktop sidebar */}
      <motion.nav
        animate={{ width: collapsed ? 64 : 220 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden lg:flex flex-col h-screen bg-bg-surface border-r border-border shrink-0 overflow-hidden"
      >
        {/* logo area */}
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-border h-[60px]">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shrink-0">
            <GraduationCap size={14} className="text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-display font-bold text-white text-base whitespace-nowrap"
              >
                LearnHub
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* nav links */}
        <div className="flex flex-col gap-1 p-2 flex-1 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActive(item.label)}
                className="relative flex items-center gap-3 px-3 py-2 rounded-lg text-left w-full"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-bg"
                    className="absolute inset-0 rounded-lg bg-accent-purple/10 border border-accent-purple/25"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={17}
                  className={`relative shrink-0 ${isActive ? "text-accent-purple" : "text-gray-500"}`}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`relative text-sm whitespace-nowrap ${
                        isActive ? "text-white font-medium" : "text-gray-400"
                      }`}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        {/* bottom buttons */}
        <div className="p-2 border-t border-border space-y-1">
          <button className="relative flex items-center gap-3 px-3 py-2 rounded-lg w-full text-gray-500 hover:text-gray-300 hover:bg-bg-elevated transition-colors">
            <Bell size={17} />
            <AnimatePresence>
              {!collapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm">
                  Notifications
                </motion.span>
              )}
            </AnimatePresence>
            {/* little red dot */}
            <span className="absolute top-2.5 left-[26px] w-1.5 h-1.5 bg-red-400 rounded-full" />
          </button>

          <button
            onClick={() => setCollapsed((c) => !c)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg w-full text-gray-500 hover:text-gray-300 hover:bg-bg-elevated transition-colors"
          >
            <motion.span animate={{ rotate: collapsed ? 180 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
              <ChevronLeft size={17} />
            </motion.span>
            <AnimatePresence>
              {!collapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm">
                  Collapse
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* mobile bottom nav — kept simple */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-bg-surface border-t border-border flex items-center justify-around px-4 py-2">
        {navItems.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const isActive = active === item.label;
          return (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className="flex flex-col items-center gap-1 py-1 px-3"
            >
              <Icon size={20} className={isActive ? "text-accent-purple" : "text-gray-500"} />
              <span className={`text-[10px] ${isActive ? "text-accent-purple" : "text-gray-500"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
