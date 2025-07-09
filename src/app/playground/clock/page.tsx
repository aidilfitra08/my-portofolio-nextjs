"use client";

import { useEffect, useState } from "react";

export default function ClockPage() {
  const [time, setTime] = useState<string>(() => formatTime(new Date()));

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

    // Hide address bar on load and orientation change
    hideAddressBar();
    window.addEventListener("orientationchange", hideAddressBar);
    window.addEventListener("resize", hideAddressBar);

    return () => {
      clearInterval(interval);
      window.removeEventListener("orientationchange", hideAddressBar);
      window.removeEventListener("resize", hideAddressBar);
    };
  }, []);

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
        className="h-dvh w-screen flex items-center justify-center overflow-hidden fixed inset-0 bg-black text-white"
        style={{
          minHeight: "100dvh",
          touchAction: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
          WebkitTouchCallout: "none",
        }}
      >
        <h1 className="md:text-9xl text-5xl font-mono tracking-widest select-none">
          {time}
        </h1>
      </main>
    </>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour12: false });
}
