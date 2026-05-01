"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "../_lib/context";

export default function ThemeSwitch() {
  const {isDark, setIsDark}=useUser()
  const [mounted, setMounted] = useState(false);

  // Read from localStorage AFTER mount
  useEffect(() => {
    const stored = localStorage.getItem("dark-mode");
    if (stored === "true") {
      setIsDark(true);
    }
    setMounted(true);
  }, []);

  // Apply `.dark` + persist
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    localStorage.setItem("dark-mode", String(isDark));
  }, [isDark, mounted]);

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <label data-tour="themeToggle" className="relative flex items-center cursor-pointer">
      {/* Hidden checkbox */}
      <input
        type="checkbox"
        className="peer sr-only"
        checked={isDark}
        onChange={(e) => {
          const nextDark = e.target.checked

          setIsDark(e.target.checked)
          localStorage.setItem("dark", String(nextDark))
        }}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      />

      {/* Toggle background */}
      <div
        className={`w-[56px] h-[24px] rounded-full overflow-hidden shadow-inner transition-colors duration-500 ease-[cubic-bezier(0,-0.02,0.4,1.25)]
          ${isDark ? "bg-[#1D1F2C]" : "bg-[#3D7EAE]"}`}
      >
        {/* Knob */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-[28px] h-[28px] flex items-center justify-center rounded-full bg-white/10
            shadow-[inset_0_0_0_28px_rgba(255,255,255,0.1)]
            transition-all duration-300 ease-[cubic-bezier(0,-0.02,0.35,1.17)]
            ${isDark ? "left-[calc(100%-14px-6px)]" : "left-[-4px]"}`}
        >
          <div
            className={`w-[18px] h-[18px] rounded-full transition-all duration-500 ease-[cubic-bezier(0,-0.02,0.4,1.25)]
              ${isDark
                ? "bg-[#C4C9D1] shadow-[inset_1px_1px_rgba(254,255,239,0.61),inset_0_-1px_#969696]"
                : "bg-[#ECCA2F] shadow-[inset_1px_1px_rgba(254,255,239,0.61),inset_0_-1px_#a1872a]"
              }`}
          />
        </div>
      </div>
    </label>
  );
}
