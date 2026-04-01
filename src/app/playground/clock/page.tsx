"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExpand,
  faCompress,
  faArrowLeft,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function ClockPage() {
  const [time, setTime] = useState<Date | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  // Memoized time formatting for better performance
  const formattedTime = useMemo(() => {
    if (!time) return "00:00:00";
    return time.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }, [time]);

  const formattedDate = useMemo(() => {
    if (!time) return "";
    return time.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [time]);

  const milliseconds = useMemo(() => {
    if (!time) return "000";
    return String(time.getMilliseconds()).padStart(3, "0");
  }, [time]);

  useEffect(() => {
    setMounted(true);
    setTime(new Date());

    // Use requestAnimationFrame for better performance
    let animationFrameId: number;
    let lastUpdate = Date.now();

    const updateTime = () => {
      const now = Date.now();
      // Update every 10ms for smooth milliseconds display
      if (now - lastUpdate >= 10) {
        setTime(new Date());
        lastUpdate = now;
      }
      animationFrameId = requestAnimationFrame(updateTime);
    };

    animationFrameId = requestAnimationFrame(updateTime);

    // Check fullscreen state changes
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    // Hide controls after 3 seconds of inactivity
    let controlsTimeout: NodeJS.Timeout;
    const handleUserActivity = () => {
      setShowControls(true);
      clearTimeout(controlsTimeout);
      controlsTimeout = setTimeout(() => {
        if (isFullscreen) {
          setShowControls(false);
        }
      }, 3000);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("touchstart", handleUserActivity);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(controlsTimeout);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("touchstart", handleUserActivity);
    };
  }, [isFullscreen]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.log("Fullscreen not supported:", error);
    }
  }, [isFullscreen]);

  if (!mounted) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#f5f5f0] dark:bg-[#0a0a0a]">
        <div className="text-neutral-900 dark:text-accent-green text-2xl font-mono animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          height: 100vh;
          height: 100dvh;
        }

        @media (display-mode: standalone) {
          body {
            height: 100vh;
            height: 100dvh;
          }
        }

        /* Hide scrollbar */
        ::-webkit-scrollbar {
          display: none;
        }

        /* Prevent text selection */
        .clock-display {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>

      <main
        className="h-dvh w-screen flex flex-col items-center justify-center overflow-hidden inset-0 bg-[#f5f5f0] dark:bg-[#0a0a0a] relative"
        style={{
          minHeight: "100dvh",
          touchAction: "manipulation",
        }}
      >
        {/* Scanlines effect */}
        <div className="scanlines pointer-events-none opacity-30" />

        {/* Retro grid background */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 65, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 65, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Controls - fade in/out */}
        <div
          className={`absolute top-0 left-0 right-0 z-10 transition-opacity duration-500 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center justify-between p-4 md:p-6 bg-linear-to-b from-[#f5f5f0] dark:from-[#0a0a0a] to-transparent">
            {/* Back button */}
            <Link
              href="/playground"
              className="group inline-flex items-center gap-2 px-3 py-2 border-2 border-neutral-900 dark:border-accent-green bg-white dark:bg-[#1a1a1a] font-mono text-xs md:text-sm transition-all hover:bg-neutral-900 dark:hover:bg-accent-green hover:text-white dark:hover:text-[#0a0a0a]"
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-neutral-900 dark:text-accent-green group-hover:text-white dark:group-hover:text-[#0a0a0a]"
              />
              <span className="text-neutral-900 dark:text-accent-green group-hover:text-white dark:group-hover:text-[#0a0a0a] hidden sm:inline">
                BACK
              </span>
            </Link>

            {/* Fullscreen button */}
            <button
              onClick={toggleFullscreen}
              className="group inline-flex items-center gap-2 px-3 py-2 border-2 border-neutral-900 dark:border-accent-green font-mono text-xs md:text-sm transition-all hover:bg-neutral-900 dark:hover:bg-accent-green hover:text-white dark:hover:text-[#0a0a0a] cursor-pointer"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              <FontAwesomeIcon
                icon={isFullscreen ? faCompress : faExpand}
                className="text-neutral-900 dark:text-accent-green group-hover:text-white dark:group-hover:text-[#0a0a0a]"
              />
              <span className="text-neutral-900 dark:text-accent-green group-hover:text-white dark:group-hover:text-[#0a0a0a] hidden sm:inline">
                {isFullscreen ? "EXIT" : "FULLSCREEN"}
              </span>
            </button>
          </div>
        </div>

        {/* Clock Display */}
        <div className="clock-display text-center relative z-0 px-4">
          {/* Terminal header */}
          <div className="flex items-center justify-center gap-3 mb-6 md:mb-8">
            <FontAwesomeIcon
              icon={faClock}
              className="text-2xl md:text-3xl text-neutral-900 dark:text-accent-green terminal-glow animate-pulse"
            />
            <div className="text-sm md:text-base font-mono text-neutral-600 dark:text-[#999]">
              <span className="text-[#ffb000]">$</span> ./clock --realtime
            </div>
          </div>

          {/* Main time display */}
          <div className="relative mb-4 md:mb-6">
            {/* Glow effect background */}
            <div className="absolute inset-0 blur-3xl opacity-20 bg-neutral-900 dark:bg-accent-green rounded-full" />

            <h1 className="relative text-6xl sm:text-7xl md:text-9xl lg:text-[12rem] font-mono font-bold tracking-wider text-neutral-900 dark:text-accent-green terminal-glow leading-none">
              {formattedTime}
            </h1>
          </div>

          {/* Milliseconds display */}
          <div className="text-2xl md:text-4xl font-mono text-[#ffb000] mb-6 md:mb-8 tabular-nums">
            .{milliseconds}
          </div>

          {/* Date display */}
          <div className="vintage-card inline-block px-6 py-3 md:px-8 md:py-4 border-2 border-neutral-900 dark:border-accent-green bg-white dark:bg-[#1a1a1a] bg-opacity-90 dark:bg-opacity-50 backdrop-blur-sm">
            <p className="text-sm md:text-lg font-mono text-neutral-700 dark:text-[#c0c0c0] tracking-wide">
              <span className="text-neutral-900 dark:text-accent-green">[</span>
              {formattedDate}
              <span className="text-neutral-900 dark:text-accent-green">]</span>
            </p>
          </div>

          {/* System info */}
          <div className="mt-8 md:mt-12 text-xs md:text-sm font-mono text-neutral-500 dark:text-[#666] space-y-1">
            <p>
              <span className="text-neutral-900 dark:text-accent-green">►</span>{" "}
              SYSTEM_TIME: UTC
              {time
                ? `${time.getTimezoneOffset() / -60 >= 0 ? "+" : ""}${
                    time.getTimezoneOffset() / -60
                  }`
                : ""}
            </p>
            <p>
              <span className="text-neutral-900 dark:text-accent-green">►</span>{" "}
              PRECISION: 10ms
            </p>
            <p className="opacity-50 mt-4">
              {showControls
                ? "Controls visible"
                : "Move mouse to show controls"}
            </p>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-neutral-900 dark:border-accent-green opacity-50 pointer-events-none" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-neutral-900 dark:border-accent-green opacity-50 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-neutral-900 dark:border-accent-green opacity-50 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-neutral-900 dark:border-accent-green opacity-50 pointer-events-none" />
      </main>
    </>
  );
}
