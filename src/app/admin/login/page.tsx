"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setAuthToken, verifyCredentials, getAuthMode } from "@/lib/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser, faTerminal } from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const fullText = "admin_access";

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Verify credentials based on environment
      const isValid = await verifyCredentials(username, password);

      if (isValid) {
        // Set auth token
        const token = btoa(`${username}:${Date.now()}`);
        setAuthToken(token);
        router.push("/admin/dashboard");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred during login");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8] dark:bg-[#0d0d0d] text-[#2a2a2a] dark:text-[#e0e0e0] font-mono flex items-center justify-center p-4">
      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none z-40 opacity-[0.03]">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black to-transparent animate-pulse"></div>
      </div>

      {/* Grid background */}
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

      <div className="relative z-10 w-full max-w-md">
        {/* Login Card */}
        <div className="vintage-card dark:bg-[#1a1a1a] rounded-lg p-8 border-2 border-accent-green shadow-2xl crt-effect">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 text-accent-green mb-4">
              <FontAwesomeIcon icon={faTerminal} className="text-2xl" />
              <span className="text-xl font-bold">ADMIN PORTAL</span>
            </div>
            <div className="text-sm text-[#c0c0c0] font-mono">
              <span className="text-[#ffb000]">$</span> {typedText}
              <span className="animate-pulse">▊</span>
            </div>
            {/* Environment Badge
            <div className="mt-3">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  getAuthMode() === "development"
                    ? "bg-[#ffb000] bg-opacity-20 text-[#ffb000]"
                    : "bg-accent-green bg-opacity-20 text-accent-green"
                }`}
              >
                {getAuthMode() === "development" ? "DEV MODE" : "PRODUCTION"}
              </span>
            </div> */}
          </div>

          {/* Terminal header */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-accent-green border-opacity-30">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff6b6b]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffb000]"></div>
              <div className="w-3 h-3 rounded-full bg-accent-green"></div>
            </div>
            <span className="text-accent-green text-xs ml-2">
              authentication
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Input */}
            <div>
              <label className="text-sm text-accent-green mb-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-[#f5f1e8] dark:bg-[#0a0a0a] border-2 border-accent-green text-[#2a2a2a] dark:text-[#e0e0e0] rounded font-mono text-sm focus:outline-none focus:border-[#00d9ff] focus:shadow-lg focus:shadow-[#00d9ff]/50 transition-all duration-200"
                placeholder="admin"
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="text-sm text-accent-green mb-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faLock} className="w-4 h-4" />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-[#f5f1e8] dark:bg-[#0a0a0a] border-2 border-accent-green text-[#2a2a2a] dark:text-[#e0e0e0] rounded font-mono text-sm focus:outline-none focus:border-[#00d9ff] focus:shadow-lg focus:shadow-[#00d9ff]/50 transition-all duration-200"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded bg-[#ff6b6b] bg-opacity-20 border-l-4 border-[#ff6b6b]">
                <p className="text-white text-sm flex items-center gap-2">
                  <span className="font-bold">✗</span> {error}
                </p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-accent-green text-[#0a0a0a] font-bold rounded hover:shadow-lg hover:shadow-accent-green/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed terminal-glow flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="inline-block animate-spin">⟳</span>
                  Authenticating...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faLock} className="w-4 h-4" />
                  Enter Portal
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-accent-green border-opacity-30 text-center">
            <p className="text-xs text-[#a0a0a0]">
              <span className="text-accent-green">»</span> Secure admin access
            </p>
            {getAuthMode() === "development" && (
              <p className="text-xs text-[#a0a0a0] mt-2">
                Default credentials:{" "}
                <span className="text-[#ffb000]">admin</span> /
                <span className="text-[#ffb000]"> password</span>
              </p>
            )}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="mt-8 text-center text-xs text-[#a0a0a0] space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></div>
            <span>System ready</span>
            <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
