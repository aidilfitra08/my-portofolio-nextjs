"use client";

import { useEffect, useState } from "react";

export default function ClockPage() {
  const [time, setTime] = useState<string>(() => formatTime(new Date()));
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    // Force fullscreen on mobile by scrolling to hide address bar
    const hideAddressBar = () => {
      setTimeout(() => {
        window.scrollTo(0, 1);
      }, 500);
    };

    // Check fullscreen state changes
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    // Hide address bar on load and orientation change
    hideAddressBar();
    window.addEventListener("orientationchange", hideAddressBar);
    window.addEventListener("resize", hideAddressBar);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("orientationchange", hideAddressBar);
      window.removeEventListener("resize", hideAddressBar);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleTouch = async () => {
    try {
      if (!isFullscreen) {
        // Enter fullscreen
        await document.documentElement.requestFullscreen();
      } else {
        // Exit fullscreen
        await document.exitFullscreen();
      }
    } catch (error) {
      console.log("Fullscreen not supported or failed:", error);
      // Fallback: try to hide address bar
      window.scrollTo(0, 1);
    }
  };

  return (
    <>
      {/* Add viewport meta tag for fullscreen */}
      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          height: 100vh;
          height: 100dvh;
        }

        /* PWA fullscreen styles */
        @media (display-mode: standalone) {
          body {
            height: 100vh;
            height: 100dvh;
          }
        }
      `}</style>

      <main
        className="h-dvh w-screen flex items-center justify-center overflow-hidden fixed inset-0 bg-black text-white cursor-pointer"
        style={{
          minHeight: "100dvh",
          touchAction: "manipulation",
          userSelect: "none",
          WebkitUserSelect: "none",
          WebkitTouchCallout: "none",
        }}
        onClick={handleTouch}
        onTouchStart={handleTouch}
      >
        <div className="text-center">
          <h1 className="md:text-9xl text-5xl font-mono tracking-widest select-none">
            {time}
          </h1>
          <p className="text-sm opacity-50 mt-4 md:text-base">
            {isFullscreen ? "Tap to exit fullscreen" : "Tap for fullscreen"}
          </p>
        </div>
      </main>
    </>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour12: false });
}
