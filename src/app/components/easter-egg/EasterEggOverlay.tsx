"use client";

import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEgg, faXmark, faTerminal } from "@fortawesome/free-solid-svg-icons";

const SECRET = "easteregg";

export function EasterEggOverlay() {
  const [open, setOpen] = useState(false);
  const bufferRef = useRef("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (!e.key || e.key.length !== 1) return;

      bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(
        -SECRET.length
      );

      if (bufferRef.current === SECRET) {
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      {/* glow */}
      {open && (
        <div className="absolute inset-0 blur-3xl bg-accent-green/30 dark:bg-accent-green/25 rounded-full opacity-70 animate-pulse" />
      )}

      <div
        className={`pointer-events-auto transform transition-all duration-300 ${
          open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        <div className="relative w-80 max-w-[90vw] border-2 border-neutral-900 dark:border-accent-green bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* header */}
          <div className="flex items-center justify-between px-3 py-2 border-b-2 border-neutral-300 dark:border-accent-green bg-neutral-100/80 dark:bg-[#111]/80">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faTerminal}
                className="text-neutral-900 dark:text-accent-green"
              />
              <span className="text-xs font-mono font-bold text-neutral-900 dark:text-[#e0e0e0] tracking-wider">
                [EASTER_EGG]
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-neutral-600 dark:text-[#bbb] hover:text-neutral-900 dark:hover:text-accent-green transition-colors"
              aria-label="Close easter egg"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          {/* body */}
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm font-mono text-neutral-900 dark:text-[#e0e0e0]">
              <FontAwesomeIcon
                icon={faEgg}
                className="text-[#ffb000] drop-shadow-sm"
              />
              <span className="font-bold text-accent-green">
                CONGRATS, OPERATOR.
              </span>
            </div>
            <p className="text-xs font-mono text-neutral-700 dark:text-[#c0c0c0] leading-relaxed">
              You discovered the hidden sequence:{" "}
              <span className="text-accent-green font-semibold">easteregg</span>
              . Welcome to the vintage-futuristic club.
            </p>
          </div>

          {/* accent corners */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-neutral-900 dark:border-accent-green" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-neutral-900 dark:border-accent-green" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-neutral-900 dark:border-accent-green" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-neutral-900 dark:border-accent-green" />
        </div>
      </div>
    </div>
  );
}
