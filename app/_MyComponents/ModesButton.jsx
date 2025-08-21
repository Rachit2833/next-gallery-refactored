import React from "react";

export default function ThemeSwitch({ isDark, setIsDark }) {
  return (
    <label className="relative flex items-center cursor-pointer">
      {/* Hidden checkbox */}
      <input
        type="checkbox"
        className="peer sr-only"
        checked={isDark}
        onChange={(e) => {
          const darkMode = e.target.checked;
          setIsDark(darkMode);
          localStorage.setItem("dark", darkMode.toString());
        }}
        tabIndex={0}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      />

      {/* Toggle background */}
      <div
        className={`w-[56px] h-[24px] rounded-full overflow-hidden shadow-inner transition-colors duration-500 ease-[cubic-bezier(0,-0.02,0.4,1.25)]
          ${isDark ? "bg-[#1D1F2C]" : "bg-[#3D7EAE]"}`}
      >
        {/* Sun/Moon container */}
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 w-[28px] h-[28px] flex items-center justify-center rounded-full bg-white/10 shadow-[inset_0_0_0_28px_rgba(255,255,255,0.1)] transition-all duration-300 ease-[cubic-bezier(0,-0.02,0.35,1.17)]
            ${isDark ? "left-[calc(100%-14px-6px)]" : "left-[-4px]"}`}
        >
          {/* Sun/Moon */}
          <div
            className={`w-[18px] h-[18px] rounded-full transition-all duration-500 ease-[cubic-bezier(0,-0.02,0.4,1.25)]
              ${isDark ? "bg-[#C4C9D1] shadow-[inset_1px_1px_rgba(254,255,239,0.61),inset_0_-1px_#969696]" : "bg-[#ECCA2F] shadow-[inset_1px_1px_rgba(254,255,239,0.61),inset_0_-1px_#a1872a]"}`}
          ></div>
        </div>
      </div>
    </label>
  );
}
