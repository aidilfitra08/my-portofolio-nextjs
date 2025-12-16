"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faTerminal,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function RickRolled() {
  const [currentTime, setCurrentTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Scanlines effect */}
      <div className="scanlines pointer-events-none" />

      {/* Retro grid background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 107, 107, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 107, 107, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative max-w-4xl w-full">
        {/* Terminal-style container */}
        <div className="vintage-card bg-[#1a1a1a] border-2 border-[#ff6b6b] rounded-lg shadow-2xl overflow-hidden crt-effect">
          {/* Terminal header */}
          <div className="border-b-2 border-[#ff6b6b] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff6b6b] animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffb000]"></div>
                <div className="w-3 h-3 rounded-full bg-[#00ff41]"></div>
              </div>
              <span className="text-[#ff6b6b] text-sm font-mono">
                <FontAwesomeIcon icon={faTerminal} className="mr-2" />
                security@system:/unauthorized_access
              </span>
            </div>
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="text-[#ff6b6b] animate-pulse"
            />
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 space-y-6">
            {/* Alert header */}
            <div className="flex items-center gap-4 text-[#ff6b6b] mb-6">
              <FontAwesomeIcon
                icon={faShieldHalved}
                className="text-5xl md:text-6xl animate-pulse"
              />
              <div>
                <div className="text-sm font-mono mb-1">
                  [ERROR CODE: 401_RICKROLLED]
                </div>
                <h1 className="text-3xl md:text-5xl font-bold terminal-glow">
                  ACCESS DENIED
                </h1>
              </div>
            </div>

            {/* Terminal output */}
            <div className="border-2 border-[#ff6b6b] border-opacity-30 rounded p-6 font-mono text-sm space-y-2">
              <div className="text-[#ff6b6b]">
                <span className="text-[#ffb000]">$</span> sudo access
                credentials.db
              </div>
              <div className="dark:text-[#c0c0c0] text-gray-700 pl-4">
                [sudo] password for user: ********
              </div>
              <div className="text-[#ff6b6b] pl-4">⚠ Authentication failed</div>
              <div className="dark:text-[#c0c0c0] text-gray-700 pl-4">
                Redirecting...
              </div>
              <div className="text-accent-green pl-4 animate-pulse mt-4">
                ► Nice try, friend! 😂
              </div>
            </div>

            {/* Message */}
            <div className="border-l-4 border-[#ff6b6b] pl-6 py-4">
              <p className="text-xl md:text-2xl dark:text-[#e0e0e0] text-gray-700 mb-4 font-bold">
                Looking for credentials? 🔐
              </p>
              <p className="dark:text-[#c0c0c0] text-gray-700 leading-relaxed">
                You've triggered our security system. But don't worry, we
                appreciate your curiosity. Here's a classic for your trouble...
              </p>
            </div>

            {/* Rick Roll lyrics in terminal style */}
            <div className="border border-accent-green rounded p-6 font-mono text-sm space-y-2">
              <div className="text-accent-green mb-3">
                <span className="text-[#ffb000]">$</span> cat
                never_gonna_give_you_up.txt
              </div>
              <div className="dark:text-[#00d9ff] text-blue-700 space-y-1 pl-4">
                <p>Never gonna give you up 🎵</p>
                <p>Never gonna let you down 🎵</p>
                <p>Never gonna run around and desert you 🎵</p>
                <p>Never gonna make you cry 🎵</p>
                <p>Never gonna say goodbye 🎵</p>
              </div>
            </div>

            {/* Video embed */}
            <div className="border-2 border-[#ff6b6b] rounded-lg overflow-hidden shadow-lg">
              {mounted && (
                <iframe
                  width="100%"
                  height="400"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full"
                />
              )}
            </div>

            {/* Security footer */}
            <div className="flex items-center justify-between pt-6 border-t border-[#ff6b6b] border-opacity-30">
              <div className="text-sm text-[#999] font-mono">
                <span className="text-[#ff6b6b]">[!]</span> Incident logged at{" "}
                {mounted ? currentTime : "Loading..."}
              </div>
              <div className="text-sm text-accent-green font-mono animate-pulse">
                System Status: TROLLED ✓
              </div>
            </div>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#ff6b6b]"></div>
        <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#ff6b6b]"></div>
        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#ff6b6b]"></div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#ff6b6b]"></div>
      </div>
    </div>
  );
}
