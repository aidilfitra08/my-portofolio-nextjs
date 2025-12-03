"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTerminal,
  faCode,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

export default function PortofolioHeader() {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Computer Science Graduate";

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <header
      className="relative py-12 md:py-20 px-4 overflow-hidden"
      id="about-me"
    >
      {/* Retro grid background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Main content */}
          <div className="space-y-6">
            {/* Terminal-style prompt */}
            <div className="flex items-center gap-2 text-accent-green dark:text-accent-green mb-4">
              <FontAwesomeIcon icon={faTerminal} className="text-xl" />
              <span className="text-sm">~/portfolio $</span>
              <span className="text-sm animate-pulse">
                cat introduction.txt
              </span>
            </div>

            {/* Main heading with vintage typewriter aesthetic */}
            <div className="space-y-3">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block text-[#1a1a1a] dark:text-[#e0e0e0]">
                  Hello,
                </span>
                <span className="block mt-2">
                  <span className="text-[#1a1a1a] dark:text-[#e0e0e0]">
                    I am{" "}
                  </span>
                  <span className="text-accent-green dark:text-accent-green terminal-glow">
                    Aidil
                  </span>
                </span>
              </h1>

              {/* Typewriter effect */}
              <div className="text-xl md:text-2xl text-[#ffb000] dark:text-[#ffb000] font-medium min-h-8 flex items-center gap-1">
                <FontAwesomeIcon icon={faCode} className="text-lg" />
                <span>{typedText}</span>
                <span
                  className={`${
                    showCursor ? "opacity-100" : "opacity-0"
                  } transition-opacity`}
                >
                  ▊
                </span>
              </div>
            </div>

            {/* Description with vintage card style */}
            <div className="vintage-card dark:bg-[#1a1a1a] border-l-4 border-accent-green p-6 rounded-r-lg shadow-lg">
              <p className="text-base md:text-lg leading-relaxed text-[#2a2a2a] dark:text-[#c0c0c0]">
                <span className="text-accent-green font-bold">&gt;&gt;</span>{" "}
                I&apos;m a Computer Science graduate with experience in{" "}
                <span className="text-[#00d9ff] dark:text-[#00d9ff] font-semibold">
                  backend
                </span>
                ,{" "}
                <span className="text-[#00d9ff] dark:text-[#00d9ff] font-semibold">
                  web
                </span>
                , and{" "}
                <span className="text-[#00d9ff] dark:text-[#00d9ff] font-semibold">
                  mobile development
                </span>
                . Skilled in technologies like CodeIgniter, Flutter, Node.js,
                React, Golang, MySQL, and MongoDB.
              </p>
            </div>

            {/* Location tag */}
            <div className="flex items-center gap-2 text-sm text-[#2a2a2a] dark:text-[#a0a0a0]">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-[#ff6b6b]"
              />
              <span>Indonesia</span>
            </div>
          </div>

          {/* Right side - Retro terminal display */}
          <div className="hidden lg:block">
            <div className="vintage-card dark:bg-[#0a0a0a] border-2 border-accent-green rounded-lg p-6 shadow-2xl crt-effect">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-accent-green border-opacity-30">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff6b6b]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffb000]"></div>
                  <div className="w-3 h-3 rounded-full bg-accent-green"></div>
                </div>
                <span className="text-accent-green text-sm ml-2">
                  terminal@aidil
                </span>
              </div>

              {/* Terminal content */}
              <div className="space-y-2 text-sm font-mono">
                <div className="text-accent-green">
                  <span className="text-[#ffb000]">$</span> whoami
                </div>
                <div className="text-[#c0c0c0] pl-4">Aidil Fitra</div>

                <div className="text-accent-green mt-3">
                  <span className="text-[#ffb000]">$</span> ls skills/
                </div>
                <div className="text-[#c0c0c0] pl-4 grid grid-cols-2 gap-2">
                  <span>• Node.js</span>
                  <span>• React.js</span>
                  <span>• Next.js</span>
                  <span>• Golang</span>
                  <span>• Flutter</span>
                  <span>• MySQL</span>
                  <span>• MongoDB</span>
                </div>

                <div className="text-accent-green mt-3">
                  <span className="text-[#ffb000]">$</span> cat status.txt
                </div>
                <div className="text-[#00d9ff] pl-4">
                  ► Ready for new challenges
                  <br />
                  ► Open to collaboration
                  <br />► Building the future
                </div>

                <div className="text-accent-green mt-3 flex items-center gap-2">
                  <span className="text-[#ffb000]">$</span>
                  <span className="animate-pulse">▊</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
