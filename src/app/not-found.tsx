"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f5f1e8] dark:bg-[#0d0d0d] text-[#2a2a2a] dark:text-[#e0e0e0] font-mono relative overflow-hidden">
      {/* Vintage scanline effect overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black to-transparent animate-pulse"></div>
      </div>

      {/* Terminal-style container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-3xl w-full">
          {/* Terminal Header */}
          <div className="border-2 border-[#4caf50] dark:border-[#00ff41] rounded-t-lg bg-[#1a1a1a] dark:bg-[#0a0a0a] p-3 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-[#00ff41] text-sm ml-4">
              terminal@portfolio:~$
            </span>
          </div>

          {/* Terminal Body */}
          <div className="border-2 border-t-0 border-[#4caf50] dark:border-[#00ff41] rounded-b-lg bg-[#1a1a1a] dark:bg-[#0a0a0a] p-6 md:p-8 shadow-2xl">
            <div className="space-y-4">
              {/* ASCII Art 404 */}
              <pre className="text-[#00ff41] text-xs md:text-sm overflow-x-auto">
                {`
  ██╗  ██╗ ██████╗ ██╗  ██╗
  ██║  ██║██╔═████╗██║  ██║
  ███████║██║██╔██║███████║
  ╚════██║████╔╝██║╚════██║
       ██║╚██████╔╝     ██║
       ╚═╝ ╚═════╝      ╚═╝
`}
              </pre>

              {/* Error Messages */}
              <div className="space-y-2 text-[#00ff41]">
                <p className="flex items-center gap-2">
                  <span className="text-red-500">[ERROR]</span>
                  <span className="typing-animation">Page Not Found</span>
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <span className="text-yellow-500">[WARNING]</span>
                  <span>The requested resource does not exist</span>
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <span className="text-blue-500">[INFO]</span>
                  <span>Redirecting to home in {countdown}s...</span>
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-[#00ff41] opacity-30 my-4"></div>

              {/* Navigation Options */}
              <div className="space-y-3">
                <p className="text-[#00ff41] text-sm">$ Available commands:</p>
                <div className="space-y-2 ml-4">
                  <Link
                    href="/"
                    className="block text-[#00d9ff] hover:text-[#00ff41] transition-colors duration-200 text-sm group"
                  >
                    <span className="mr-2 text-[#00ff41]">›</span>
                    <span className="underline-offset-4 group-hover:underline">
                      cd /home
                    </span>
                    <span className="ml-2 text-gray-500 text-xs">
                      (Return to homepage)
                    </span>
                  </Link>
                  <Link
                    href="/playground"
                    className="block text-[#00d9ff] hover:text-[#00ff41] transition-colors duration-200 text-sm group"
                  >
                    <span className="mr-2 text-[#00ff41]">›</span>
                    <span className="underline-offset-4 group-hover:underline">
                      cd /playground
                    </span>
                    <span className="ml-2 text-gray-500 text-xs">
                      (Explore projects)
                    </span>
                  </Link>
                  <button
                    onClick={() => router.back()}
                    className="block text-[#00d9ff] hover:text-[#00ff41] transition-colors duration-200 text-sm group w-full text-left"
                  >
                    <span className="mr-2 text-[#00ff41]">›</span>
                    <span className="underline-offset-4 group-hover:underline">
                      cd ..
                    </span>
                    <span className="ml-2 text-gray-500 text-xs">
                      (Go back)
                    </span>
                  </button>
                </div>
              </div>

              {/* Terminal Cursor */}
              <div className="flex items-center gap-1 mt-6">
                <span className="text-[#00ff41]">$</span>
                <span className="inline-block w-2 h-4 bg-[#00ff41] animate-pulse ml-1"></span>
              </div>
            </div>
          </div>

          {/* Vintage corner decorations */}
          <div className="absolute -top-8 -left-8 w-16 h-16 border-l-2 border-t-2 border-[#4caf50] dark:border-[#00ff41] opacity-20 pointer-events-none"></div>
          <div className="absolute -bottom-8 -right-8 w-16 h-16 border-r-2 border-b-2 border-[#4caf50] dark:border-[#00ff41] opacity-20 pointer-events-none"></div>
        </div>
      </div>

      {/* Background grid pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default NotFound;
