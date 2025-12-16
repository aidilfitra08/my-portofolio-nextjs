"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faXmark,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

export function HoloHelp() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Holographic glow effect */}
      <div className="absolute inset-0 blur-3xl bg-accent-green/40 dark:bg-accent-green/30 rounded-full opacity-70 animate-pulse pointer-events-none scale-150" />

      {/* Phone-shaped button with endless rotation */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative w-14 h-20 rounded-xl border-3 border-neutral-900 dark:border-accent-green bg-linear-to-br from-white/90 to-neutral-100/90 dark:from-[#0a0a0a]/90 dark:to-[#1a1a1a]/90 backdrop-blur-md shadow-2xl hover:scale-105 transition-transform animate-rotate-slow overflow-hidden"
        style={{
          boxShadow: open
            ? "0 0 30px rgba(0, 255, 65, 0.6), inset 0 0 20px rgba(0, 255, 65, 0.2)"
            : "0 10px 40px rgba(0, 0, 0, 0.3)",
        }}
        aria-expanded={open}
        aria-label="Open holographic help"
      >
        {/* Phone notch */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-neutral-800 dark:bg-neutral-700 rounded-full" />

        {/* Screen glow */}
        <div className="absolute inset-2 rounded-lg bg-linear-to-br from-accent-green/20 to-transparent dark:from-accent-green/30 dark:to-transparent animate-pulse" />

        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center text-2xl text-neutral-900 dark:text-accent-green">
          <FontAwesomeIcon icon={faCircleQuestion} className="drop-shadow-lg" />
        </div>

        {/* Scan line effect */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="h-full w-full animate-scan-vertical bg-linear-to-b from-transparent via-accent-green/50 to-transparent" />
        </div>
      </button>

      {/* Holographic projection beam */}
      {open && (
        <div className="absolute bottom-full right-0 mb-4 w-1 h-24 origin-bottom">
          <div className="absolute inset-0 bg-linear-to-t from-accent-green/60 via-accent-green/30 to-transparent blur-sm animate-pulse" />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-accent-green/80 via-accent-green/40" /> */}
        </div>
      )}

      {/* Holographic panel */}
      <div
        className={`absolute bottom-[120px] right-0 w-80 max-w-[85vw] origin-bottom-right transition-all duration-500 ${
          open
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-8 scale-90 pointer-events-none"
        }`}
        style={{
          perspective: "1000px",
          transform: open ? "rotateX(0deg)" : "rotateX(-15deg)",
        }}
      >
        <div
          className="relative rounded-2xl border-2 border-accent-green/60 dark:border-accent-green bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-2xl shadow-2xl overflow-hidden"
          style={{
            boxShadow:
              "0 0 40px rgba(0, 255, 65, 0.4), inset 0 0 30px rgba(0, 255, 65, 0.1)",
          }}
        >
          {/* Hologram grid pattern */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <div
              className="h-full w-full animate-grid-flow"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,255,65,0.4) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,255,65,0.4) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
              }}
            />
          </div>

          {/* Glitch effect overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
            <div className="h-full w-full animate-glitch bg-linear-to-r from-transparent via-accent-green/50 to-transparent" />
          </div>

          {/* Header */}
          <div className="relative flex items-center justify-between px-4 py-3 border-b-2 border-accent-green/50 dark:border-accent-green bg-linear-to-r from-neutral-100/90 to-neutral-50/90 dark:from-[#111]/90 dark:to-[#0a0a0a]/90">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              <span className="text-xs font-mono font-bold text-neutral-900 dark:text-[#e0e0e0] tracking-wider">
                [HOLO_CONSOLE_v2.1]
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-neutral-600 dark:text-[#bbb] hover:text-neutral-900 dark:hover:text-accent-green transition-all hover:rotate-90 duration-300"
              aria-label="Close holographic help"
            >
              <FontAwesomeIcon icon={faXmark} className="text-sm" />
            </button>
          </div>

          {/* Content */}
          <div className="relative p-4 space-y-3 text-xs font-mono text-neutral-800 dark:text-[#c0c0c0]">
            {/* Floating particles effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-1 bg-accent-green/50 rounded-full animate-float-1" />
              <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-accent-green/40 rounded-full animate-float-2" />
              <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-accent-green/30 rounded-full animate-float-3" />
            </div>

            <div className="relative bg-white/50 dark:bg-[#1a1a1a]/50 border border-accent-green/30 rounded p-3 backdrop-blur-sm">
              <p className="flex items-start gap-2">
                <span className="text-accent-green">►</span>
                <span>
                  Navigate experiments via the list. Each uses the vintage
                  terminal theme with light/dark support.
                </span>
              </p>
            </div>

            <div className="relative bg-white/50 dark:bg-[#1a1a1a]/50 border border-accent-green/30 rounded p-3 backdrop-blur-sm">
              <p className="flex items-start gap-2">
                <span className="text-accent-green">►</span>
                <span>
                  Hover items to see the holographic outline. Click to open a
                  playground.
                </span>
              </p>
            </div>

            {/* <div className="relative bg-white/50 dark:bg-[#1a1a1a]/50 border border-accent-green/30 rounded p-3 backdrop-blur-sm">
              <p className="flex items-start gap-2">
                <span className="text-accent-green">►</span>
                <span>
                  Need more? Visit the{" "}
                  <a
                    className="inline-flex items-center gap-1 text-accent-green hover:text-[#00ff41] underline decoration-dotted transition-colors"
                    href="https://your-domain.com/docs"
                    target="_blank"
                    rel="noreferrer"
                  >
                    docs page
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      size="xs"
                    />
                  </a>
                </span>
              </p>
            </div> */}

            {/* Status bar */}
            <div className="pt-2 border-t border-accent-green/30 flex items-center justify-between text-[10px] text-neutral-600 dark:text-[#888]">
              <span>UPLINK: STABLE</span>
              <span className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                ONLINE
              </span>
            </div>
          </div>

          {/* Corner accent lights */}
          <div className="absolute top-0 left-0 w-2 h-2 bg-accent-green/60 blur-sm" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-accent-green/60 blur-sm" />
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-accent-green/60 blur-sm" />
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-accent-green/60 blur-sm" />
        </div>
      </div>
    </div>
  );
}
