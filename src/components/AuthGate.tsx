"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faSignOut,
  faSpinner,
  faArrowLeft,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

interface AuthGateProps {
  children: React.ReactNode;
}

type MeResponse = {
  id: string;
  email: string;
  name: string | null;
  approved: boolean;
};

const API_BASE =
  process.env.NEXT_PUBLIC_REST_API_URL || "http://localhost:3002";
const TOKEN_KEY = "user_auth_token";

export default function AuthGate({ children }: AuthGateProps) {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [approved, setApproved] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "register">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const existing =
      typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    if (!existing) {
      setLoading(false);
      return;
    }
    setToken(existing);
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/me`, {
          headers: { Authorization: `Bearer ${existing}` },
        });
        if (!res.ok) throw new Error("Token invalid");
        const me = (await res.json()) as MeResponse;
        setApproved(me.approved);
      } catch (e: any) {
        setToken(null);
        localStorage.removeItem(TOKEN_KEY);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setServerError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      if (data.approved === false) {
        console.log("Account not approved");
        setApproved(false);
        setToken(null);
        localStorage.removeItem(TOKEN_KEY);
      } else if (data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        setApproved(true);
      }
    } catch (err: any) {
      const errorMsg = err.message || "Login failed";
      if (
        errorMsg.includes("Failed to fetch") ||
        errorMsg.includes("NetworkError")
      ) {
        setServerError("Auth server is offline. Please try again later.");
      } else {
        setError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setServerError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setMode("login");
    } catch (err: any) {
      const errorMsg = err.message || "Registration failed";
      if (
        errorMsg.includes("Failed to fetch") ||
        errorMsg.includes("NetworkError")
      ) {
        setServerError("Auth server is offline. Please try again later.");
      } else {
        setError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setApproved(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] dark:bg-[#0a0a0a] flex items-center justify-center relative">
        <div className="scanlines pointer-events-none" />
        <div className="vintage-card border-2 border-neutral-900 dark:border-accent-green p-8 bg-white dark:bg-[#1a1a1a] relative">
          <div className="flex flex-col items-center gap-4">
            <FontAwesomeIcon
              icon={faSpinner}
              className="text-3xl text-neutral-900 dark:text-accent-green animate-spin"
            />
            <p className="font-mono text-neutral-700 dark:text-[#c0c0c0]">
              Verifying credentials...
            </p>
          </div>
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-neutral-900 dark:border-accent-green" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-neutral-900 dark:border-accent-green" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-neutral-900 dark:border-accent-green" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-neutral-900 dark:border-accent-green" />
        </div>
      </div>
    );
  }

  if (!approved && approved !== null) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] dark:bg-[#0a0a0a] flex items-center justify-center p-4 relative">
        {/* Scanlines effect */}
        <div className="scanlines pointer-events-none" />

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

        <div className="w-full max-w-md relative z-10">
          <div className="vintage-card border-2 border-neutral-900 dark:border-accent-green p-6 bg-white dark:bg-[#1a1a1a] relative">
            {/* Lock Icon */}
            <div className="text-center mb-6">
              <FontAwesomeIcon
                icon={faLock}
                className="text-4xl text-[#ff6b6b] mb-4 inline-block"
              />
              <h1 className="text-2xl font-mono font-bold text-neutral-900 dark:text-[#e0e0e0] mb-2">
                [ACCESS_DENIED]
              </h1>
              <p className="text-xs font-mono text-neutral-600 dark:text-[#999]">
                <span className="text-[#ffb000]">$</span> ./status --user
              </p>
            </div>

            {/* Message */}
            <div className="bg-neutral-50 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-700 rounded p-4 mb-6">
              <p className="font-mono text-sm text-neutral-900 dark:text-[#e0e0e0] mb-2">
                <span className="text-neutral-900 dark:text-accent-green">
                  ►
                </span>{" "}
                Account Status:
                <span className="font-bold text-[#ff6b6b] ml-2">PENDING</span>
              </p>
              <p className="font-mono text-xs text-neutral-700 dark:text-[#c0c0c0] leading-relaxed">
                Your account has been created and is awaiting admin approval. An
                administrator will review your registration and grant access
                shortly.
              </p>
            </div>

            {/* Info Box */}
            <div className="px-4 py-3 bg-[#ffb000]/10 border border-[#ffb000] rounded mb-6 font-mono text-xs text-neutral-900 dark:text-[#e0e0e0]">
              <p className="font-bold text-[#ffb000] mb-1">⚠ WAIT_TIME</p>
              <p>
                Check back later or contact the administrator if you need
                immediate access.
              </p>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="w-full py-3 rounded border-2 border-neutral-900 dark:border-[#ff6b6b] bg-neutral-900 dark:bg-[#ff6b6b]/20 text-white dark:text-[#ff6b6b] font-mono font-bold hover:bg-neutral-800 dark:hover:bg-[#ff6b6b]/30 transition-all flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faSignOut} />
              LOGOUT
            </button>

            {/* Corner decorations */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-neutral-900 dark:border-accent-green" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-neutral-900 dark:border-accent-green" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-neutral-900 dark:border-accent-green" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-neutral-900 dark:border-accent-green" />
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] dark:bg-[#0a0a0a] flex items-center justify-center p-4 relative">
        {/* Scanlines effect */}
        <div className="scanlines pointer-events-none" />

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

        <div className="w-full max-w-md relative z-10">
          <div className="vintage-card border-2 border-neutral-900 dark:border-accent-green p-6 bg-white dark:bg-[#1a1a1a] relative">
            {/* Back Button */}
            <div className="mb-4">
              <Link
                href="/playground"
                className="group inline-flex items-center gap-2 px-3 py-2 border-2 border-neutral-900 dark:border-accent-green bg-white dark:bg-[#1a1a1a] font-mono text-sm transition-all hover:translate-x-1 hover:-translate-y-1 relative"
              >
                <div className="absolute inset-0 border-2 border-neutral-900 dark:border-accent-green translate-x-1 translate-y-1 -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="text-neutral-900 dark:text-accent-green"
                />
                <span className="text-neutral-900 dark:text-[#e0e0e0] font-bold">
                  BACK
                </span>
              </Link>
            </div>

            {/* Title */}
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-mono font-bold text-neutral-900 dark:text-[#e0e0e0] mb-1">
                [AUTH_SYSTEM]
              </h1>
              <p className="text-xs font-mono text-neutral-600 dark:text-[#999]">
                <span className="text-[#ffb000]">$</span> ./login --secure
              </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex gap-2 mb-6 border border-neutral-200 dark:border-neutral-700 p-1 rounded">
              <button
                className={`flex-1 py-2 px-3 font-mono text-sm font-semibold transition-all border cursor-pointer ${
                  mode === "login"
                    ? "border-neutral-900 dark:border-accent-green bg-neutral-900 dark:bg-accent-green text-white dark:text-[#0a0a0a]"
                    : "border-transparent text-neutral-700 dark:text-[#c0c0c0] hover:border-neutral-300 dark:hover:border-neutral-700"
                }`}
                onClick={() => {
                  setMode("login");
                  setError(null);
                }}
              >
                LOGIN
              </button>
              <button
                className={`flex-1 py-2 px-3 font-mono text-sm font-semibold transition-all border cursor-pointer ${
                  mode === "register"
                    ? "border-neutral-900 dark:border-accent-green bg-neutral-900 dark:bg-accent-green text-white dark:text-[#0a0a0a]"
                    : "border-transparent text-neutral-700 dark:text-[#c0c0c0] hover:border-neutral-300 dark:hover:border-neutral-700"
                }`}
                onClick={() => {
                  setMode("register");
                  setError(null);
                }}
              >
                REGISTER
              </button>
            </div>

            {/* Form */}
            {mode === "login" ? (
              <form onSubmit={onLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-700 dark:text-[#999] mb-2">
                    <span className="text-neutral-900 dark:text-accent-green">
                      ►
                    </span>{" "}
                    EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="user@example.com"
                    className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#e0e0e0] placeholder-neutral-500 dark:placeholder-[#666] font-mono text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-accent-green"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-700 dark:text-[#999] mb-2">
                    <span className="text-neutral-900 dark:text-accent-green">
                      ►
                    </span>{" "}
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#e0e0e0] placeholder-neutral-500 dark:placeholder-[#666] font-mono text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-accent-green"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {serverError && (
                  <div className="px-3 py-2 bg-[#ffb000]/10 border border-[#ffb000] rounded text-[#ffb000] text-xs font-mono flex items-start gap-2">
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className="mt-0.5 shrink-0"
                    />
                    <span>
                      <span className="font-bold">SERVER ERROR:</span>{" "}
                      {serverError}
                    </span>
                  </div>
                )}
                {error && (
                  <div className="px-3 py-2 bg-[#ff6b6b]/10 border border-[#ff6b6b] rounded text-[#ff6b6b] text-xs font-mono">
                    <span className="font-bold">ERROR:</span> {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded border-2 border-neutral-900 dark:border-accent-green bg-neutral-900 dark:bg-accent-green text-white dark:text-[#0a0a0a] font-mono font-bold hover:bg-neutral-800 dark:hover:bg-[#00ff41] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  {loading ? (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="animate-spin"
                    />
                  ) : (
                    "SIGN IN"
                  )}
                </button>
                <p className="text-xs text-neutral-600 dark:text-[#999] font-mono text-center">
                  Authenticate via Supabase
                </p>
              </form>
            ) : (
              <form onSubmit={onRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-700 dark:text-[#999] mb-2">
                    <span className="text-neutral-900 dark:text-accent-green">
                      ►
                    </span>{" "}
                    NAME (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#e0e0e0] placeholder-neutral-500 dark:placeholder-[#666] font-mono text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-accent-green"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-700 dark:text-[#999] mb-2">
                    <span className="text-neutral-900 dark:text-accent-green">
                      ►
                    </span>{" "}
                    EMAIL
                  </label>
                  <input
                    type="email"
                    placeholder="user@example.com"
                    className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#e0e0e0] placeholder-neutral-500 dark:placeholder-[#666] font-mono text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-accent-green"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-700 dark:text-[#999] mb-2">
                    <span className="text-neutral-900 dark:text-accent-green">
                      ►
                    </span>{" "}
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#e0e0e0] placeholder-neutral-500 dark:placeholder-[#666] font-mono text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-accent-green"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {serverError && (
                  <div className="px-3 py-2 bg-[#ffb000]/10 border border-[#ffb000] rounded text-[#ffb000] text-xs font-mono flex items-start gap-2">
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className="mt-0.5 shrink-0"
                    />
                    <span>
                      <span className="font-bold">SERVER ERROR:</span>{" "}
                      {serverError}
                    </span>
                  </div>
                )}
                {error && (
                  <div className="px-3 py-2 bg-[#ff6b6b]/10 border border-[#ff6b6b] rounded text-[#ff6b6b] text-xs font-mono">
                    <span className="font-bold">ERROR:</span> {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded border-2 border-neutral-900 dark:border-accent-green bg-neutral-900 dark:bg-accent-green text-white dark:text-[#0a0a0a] font-mono font-bold hover:bg-neutral-800 dark:hover:bg-[#00ff41] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  {loading ? (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="animate-spin"
                    />
                  ) : (
                    "CREATE ACCOUNT"
                  )}
                </button>
                <div className="px-3 py-2 bg-[#ffb000]/10 border border-[#ffb000] rounded text-[#ffb000] text-xs font-mono">
                  <span className="font-bold">⚠ NOTE:</span> Admin approval
                  required
                </div>
              </form>
            )}

            {/* Corner decorations */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-neutral-900 dark:border-accent-green" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-neutral-900 dark:border-accent-green" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-neutral-900 dark:border-accent-green" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-neutral-900 dark:border-accent-green" />
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
