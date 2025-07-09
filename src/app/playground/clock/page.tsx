"use client";

import { useEffect, useState } from "react";

export default function ClockPage() {
  const [time, setTime] = useState<string>(() => formatTime(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="h-dvh w-screen flex items-center justify-center overflow-hidden fixed inset-0">
      <h1 className="md:text-9xl text-5xl font-mono tracking-widest select-none">
        {time}
      </h1>
    </main>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour12: false });
}
