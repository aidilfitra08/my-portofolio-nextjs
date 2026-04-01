"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faGift,
  faStar,
  faTrophy,
  faRocket,
  faHeart,
  faBolt,
  faCrown,
  // faSparkles,
} from "@fortawesome/free-solid-svg-icons";

export default function EasterEggPlayground() {
  const [points, setPoints] = useState<number>(0);
  const [foundEggs, setFoundEggs] = useState<Set<string>>(new Set());
  const [showCongrats, setShowCongrats] = useState<boolean>(false);
  const [congratsMessage, setCongratsMessage] = useState<string>("");
  const [secretSequence, setSecretSequence] = useState<string>("");
  const [showHiddenButton, setShowHiddenButton] = useState<boolean>(false);
  const [clicks, setClicks] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const konami = useRef<string>("");
  const lastClickTime = useRef<number>(0);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const addEgg = (eggId: string, eggPoints: number = 1) => {
    if (!foundEggs.has(eggId)) {
      const newFoundEggs = new Set(foundEggs);
      newFoundEggs.add(eggId);
      setFoundEggs(newFoundEggs);
      const newPoints = points + eggPoints;
      setPoints(newPoints);

      // Check for milestones
      if (newPoints === 3) {
        showCongratsPopup("🎉 Wow! You found 3 eggs! Keep exploring!");
      } else if (newPoints === 5) {
        showCongratsPopup(
          "🌟 Amazing! 5 eggs found! You're getting good at this!",
        );
      } else if (newPoints === 8) {
        showCongratsPopup(
          "🏆 MASTER EGG HUNTER! You found all 8 Easter eggs! 🎊",
        );
      }
    }
  };

  const showCongratsPopup = (message: string) => {
    setCongratsMessage(message);
    setShowCongrats(true);
    setTimeout(() => setShowCongrats(false), 4000);
  };

  // Easter Egg 1: Secret keystroke word "EASTER" (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      const newSequence = (secretSequence + e.key.toUpperCase()).slice(-6);
      setSecretSequence(newSequence);

      if (newSequence === "EASTER") {
        addEgg("keystroke");
        setSecretSequence("");
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [secretSequence, foundEggs, isMobile]);

  // Easter Egg 2: Konami Code (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const konamiCode =
      "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRight";

    const handleKonami = (e: KeyboardEvent) => {
      konami.current += e.key;
      konami.current = konami.current.slice(-konamiCode.length);

      if (konami.current === konamiCode) {
        addEgg("konami", 2);
        konami.current = "";
      }
    };

    window.addEventListener("keydown", handleKonami);
    return () => window.removeEventListener("keydown", handleKonami);
  }, [foundEggs, isMobile]);

  // Easter Egg 3: Triple click on title
  const handleTitleClick = () => {
    const now = Date.now();
    if (now - lastClickTime.current < 500) {
      setClicks((prev) => prev + 1);
      if (clicks + 1 === 3) {
        addEgg("triple-click");
        setClicks(0);
      }
    } else {
      setClicks(1);
    }
    lastClickTime.current = now;
  };

  // Easter Egg 4: Hover zone that reveals hidden button
  const handleHoverZone = () => {
    if (!showHiddenButton) {
      setShowHiddenButton(true);
    }
  };

  // Easter Egg 5: Click hidden button
  const handleHiddenButton = () => {
    addEgg("hidden-button");
  };

  // Easter Egg 6: Long press on emoji (mobile friendly)
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);

  const handleEmojiPressStart = () => {
    const timer = setTimeout(() => {
      addEgg("long-press");
    }, 2000);
    setPressTimer(timer);
  };

  const handleEmojiPressEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  // Easter Egg 7: Click corner sparkle
  const handleSparkleClick = () => {
    addEgg("corner-sparkle");
  };

  // Easter Egg 8: Find the invisible button
  const handleInvisibleClick = () => {
    addEgg("invisible");
  };

  return (
    <main className="min-h-screen bg-[#f5f5f0] dark:bg-[#0a0a0a] py-16 px-4 relative">
      {/* Scanlines effect */}
      <div className="scanlines pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        {/* Back button */}
        <Link
          href="/playground"
          className="group inline-flex items-center gap-3 mb-8 px-4 py-2 border-2 border-neutral-900 dark:border-accent-green bg-white dark:bg-[#1a1a1a] font-mono text-sm transition-all hover:translate-x-1 hover:-translate-y-1 relative"
        >
          <div className="absolute inset-0 border-2 border-neutral-900 dark:border-accent-green translate-x-1 translate-y-1 -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-neutral-900 dark:text-accent-green group-hover:animate-pulse"
          />
          <span className="text-neutral-900 dark:text-[#e0e0e0] font-bold tracking-wide">
            <span className="text-neutral-500 dark:text-accent-green">[</span>
            PLAYGROUND_MENU
            <span className="text-neutral-500 dark:text-accent-green">]</span>
          </span>
        </Link>
        {/* Header */}
        <div className="mb-12 border-b-2 border-neutral-300 dark:border-accent-green pb-4">
          <div className="flex items-center gap-3 mb-2">
            <FontAwesomeIcon
              icon={faGift}
              className="text-2xl text-neutral-900 dark:text-accent-green terminal-glow"
            />
            <h1
              ref={titleRef}
              onClick={handleTitleClick}
              className="text-4xl font-mono font-bold text-neutral-900 dark:text-[#e0e0e0] tracking-tight cursor-pointer hover:scale-105 transition-transform select-none"
            >
              [EASTER_EGG_HUNT]
            </h1>
          </div>
          <p className="text-sm font-mono text-neutral-500 dark:text-[#999] mt-2">
            <span className="text-[#ffb000]">$</span> ./find_hidden_eggs.sh
            --interactive
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 border-2 border-neutral-300 dark:border-accent-green bg-white dark:bg-[#1a1a1a]">
            <FontAwesomeIcon icon={faTrophy} className="text-yellow-500" />
            <span className="font-mono font-bold text-neutral-900 dark:text-[#e0e0e0]">
              SCORE: {points} / 8
            </span>
          </div>
        </div>

        {/* Floating decorations */}
        <div className="absolute top-4 left-4 animate-bounce">
          <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-2xl" />
        </div>
        <div className="absolute bottom-4 right-4 animate-pulse">
          <FontAwesomeIcon icon={faHeart} className="text-red-400 text-2xl" />
        </div>

        {/* Easter Egg 7: Corner sparkle */}
        <button
          onClick={handleSparkleClick}
          className="absolute top-4 right-4 text-neutral-900 dark:text-accent-green hover:text-yellow-400 transition-colors"
          aria-label="Sparkle"
        >
          <FontAwesomeIcon icon={faStar} className="text-2xl" />
        </button>

        <div className="text-center mb-8">
          {!isMobile && (
            <p className="text-neutral-600 dark:text-[#999] text-sm font-mono">
              💡 Hint: Try typing "EASTER" or clicking around...
            </p>
          )}
          {isMobile && (
            <p className="text-neutral-600 dark:text-[#999] text-sm font-mono">
              💡 Mobile Mode: Some keyboard eggs are disabled, but you can still
              find all eggs!
            </p>
          )}
        </div>

        {/* Playground area */}
        <div className="border-2 border-neutral-300 dark:border-accent-green bg-white dark:bg-[#1a1a1a] p-8 shadow-2xl vintage-card">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {/* Easter Egg 3: Triple click hint */}
            <div className="border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-6 text-center">
              <FontAwesomeIcon
                icon={faRocket}
                className="text-4xl text-blue-500 mx-auto mb-2"
              />
              <p className="font-semibold text-neutral-900 dark:text-[#e0e0e0] text-sm font-mono">
                Triple click the title!
              </p>
            </div>

            {/* Easter Egg 6: Long press emoji */}
            <div
              onMouseDown={handleEmojiPressStart}
              onMouseUp={handleEmojiPressEnd}
              onMouseLeave={handleEmojiPressEnd}
              onTouchStart={handleEmojiPressStart}
              onTouchEnd={handleEmojiPressEnd}
              className="border-2 border-green-500 bg-green-50 dark:bg-green-900/20 p-6 text-center cursor-pointer active:scale-95 transition-transform"
            >
              <FontAwesomeIcon
                icon={faGift}
                className="text-4xl text-green-500 mb-2"
              />
              <p className="font-semibold text-neutral-900 dark:text-[#e0e0e0] text-sm font-mono">
                Hold me for 2s!
              </p>
            </div>

            {/* Regular card */}
            <div className="border-2 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-6 text-center">
              <FontAwesomeIcon
                icon={faBolt}
                className="text-4xl text-purple-500 mx-auto mb-2"
              />
              <p className="font-semibold text-neutral-900 dark:text-[#e0e0e0] text-sm font-mono">
                Keep exploring!
              </p>
            </div>

            {/* Regular card */}
            <div className="border-2 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-6 text-center">
              <FontAwesomeIcon
                icon={faGift}
                className="text-4xl text-pink-500 mx-auto mb-2"
              />
              <p className="font-semibold text-neutral-900 dark:text-[#e0e0e0] text-sm font-mono">
                8 eggs hidden!
              </p>
            </div>
          </div>

          {/* Easter Egg 4 & 5: Hover zone and hidden button */}
          <div className="relative h-32 border-2 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 mb-8 overflow-hidden">
            <div
              onMouseEnter={handleHoverZone}
              className="absolute left-1/4 top-0 w-1/4 h-full cursor-help"
              title="Hover here..."
            />
            {showHiddenButton && (
              <button
                onClick={handleHiddenButton}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 hover:bg-yellow-300 text-gray-800 font-bold font-mono py-3 px-6 border-2 border-yellow-600 shadow-lg animate-bounce"
              >
                🎉 You found me!
              </button>
            )}
            <div className="flex items-center justify-center h-full text-center p-4">
              <p className="text-lg font-mono text-neutral-900 dark:text-[#e0e0e0]">
                There's something hidden in this box... try hovering around the
                left side! 🤔
              </p>
            </div>
          </div>

          {/* Easter Egg 8: Invisible button */}
          <div className="relative h-24 border-2 border-orange-500 bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
            <p className="font-mono text-lg text-neutral-900 dark:text-[#e0e0e0]">
              One more egg is hiding somewhere on this page... 👀
            </p>
            <button
              onClick={handleInvisibleClick}
              className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 opacity-0 hover:opacity-100 hover:bg-white/20 rounded-full transition-opacity cursor-pointer"
              aria-label="Hidden button"
            />
          </div>

          {/* Egg collection display */}
          <div className="mt-8 pt-6 border-t-2 border-neutral-300 dark:border-accent-green">
            <h3 className="text-neutral-900 dark:text-[#e0e0e0] text-xl font-bold font-mono mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faCrown} className="text-yellow-500" />
              Eggs Found: {foundEggs.size} / 8
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className={`aspect-square border-2 flex items-center justify-center text-3xl ${
                    i < foundEggs.size
                      ? "border-accent-green bg-green-50 dark:bg-green-900/20 animate-pulse"
                      : "border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800"
                  }`}
                >
                  {i < foundEggs.size ? "🥚" : "❓"}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 border-2 border-neutral-300 dark:border-accent-green bg-neutral-100 dark:bg-[#1a1a1a] p-6 vintage-card">
          <h3 className="font-bold font-mono text-lg mb-3 text-neutral-900 dark:text-accent-green">
            🔍 Easter Egg Hints:
          </h3>
          <ul className="space-y-2 text-sm font-mono text-neutral-700 dark:text-[#999]">
            <li>• Try typing secret words...</li>
            <li>• Click things multiple times</li>
            <li>• Hold down on interesting items</li>
            <li>• Hover over suspicious areas</li>
            <li>• Look in the corners</li>
            <li>• Some buttons might be invisible...</li>
            {!isMobile && <li>• Try arrow key sequences (↑↑↓↓←→←→)</li>}
          </ul>
        </div>
      </div>

      {/* Congrats popup */}
      {showCongrats && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="border-4 border-accent-green bg-white dark:bg-[#1a1a1a] shadow-2xl p-8 max-w-md animate-bounce pointer-events-auto">
            <div className="text-center">
              <div className="text-6xl mb-4">🎊</div>
              <p className="text-2xl font-bold font-mono text-neutral-900 dark:text-accent-green">
                {congratsMessage}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
