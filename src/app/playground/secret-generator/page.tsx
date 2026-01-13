"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCopy,
  faCheck,
  faEye,
  faEyeSlash,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import SecretCard from "./components/SecretCard";

interface Secret {
  id: string;
  type:
    | "api-key"
    | "jwt-secret"
    | "oauth-token"
    | "random-hex"
    | "random-base64";
  value: string;
  length: number;
  isVisible: boolean;
  copiedAt?: number;
}

export default function SecretGeneratorPage() {
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [secretType, setSecretType] = useState<Secret["type"]>("api-key");
  const [length, setLength] = useState(32);

  const generateSecret = (
    type: Secret["type"],
    customLength: number
  ): string => {
    const charset = {
      "api-key":
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
      "jwt-secret":
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*",
      "oauth-token":
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      "random-hex": "0123456789abcdef",
      "random-base64":
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    };

    const chars = charset[type];
    let result = "";

    // Use crypto API for secure random generation
    const randomValues = new Uint32Array(customLength);
    crypto.getRandomValues(randomValues);

    for (let i = 0; i < customLength; i++) {
      result += chars[randomValues[i] % chars.length];
    }

    return result;
  };

  const handleGenerate = () => {
    const newSecret: Secret = {
      id: Date.now().toString(),
      type: secretType,
      value: generateSecret(secretType, length),
      length,
      isVisible: false,
    };
    setSecrets((prev) => [newSecret, ...prev]);
  };

  const toggleVisibility = (id: string) => {
    setSecrets((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isVisible: !s.isVisible } : s))
    );
  };

  const handleCopy = (id: string) => {
    const secret = secrets.find((s) => s.id === id);
    if (secret) {
      navigator.clipboard.writeText(secret.value);
      setSecrets((prev) =>
        prev.map((s) => (s.id === id ? { ...s, copiedAt: Date.now() } : s))
      );
      setTimeout(() => {
        setSecrets((prev) =>
          prev.map((s) => (s.id === id ? { ...s, copiedAt: undefined } : s))
        );
      }, 2000);
    }
  };

  const handleRegenerate = (id: string) => {
    const secret = secrets.find((s) => s.id === id);
    if (secret) {
      setSecrets((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                value: generateSecret(s.type, s.length),
                isVisible: false,
                copiedAt: undefined,
              }
            : s
        )
      );
    }
  };

  const handleDelete = (id: string) => {
    setSecrets((prev) => prev.filter((s) => s.id !== id));
  };

  const typeDescriptions = {
    "api-key": "Alphanumeric + dash/underscore",
    "jwt-secret": "High entropy with special chars",
    "oauth-token": "Alphanumeric only",
    "random-hex": "Hexadecimal (0-9, a-f)",
    "random-base64": "Base64 characters",
  };

  const presets = [32, 64, 128, 256, 384];

  return (
    <div className="min-h-screen bg-[#f5f5f0] dark:bg-[#0a0a0a] flex flex-col relative p-4">
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

      {/* Header */}
      <div className="max-w-2xl mx-auto w-full mb-8 relative z-10">
        <div className="mb-6">
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

        <div className="vintage-card bg-white dark:bg-[#1a1a1a] border-2 border-neutral-900 dark:border-accent-green p-6 relative">
          <h1 className="text-2xl md:text-3xl font-mono font-bold text-neutral-900 dark:text-[#e0e0e0] mb-2">
            [SECRET_GENERATOR]
          </h1>
          <p className="text-xs font-mono text-neutral-600 dark:text-[#999]">
            <span className="text-[#ffb000]">$</span> ./generate --secure
            --crypto
          </p>

          {/* Corner decorations */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-neutral-900 dark:border-accent-green" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-neutral-900 dark:border-accent-green" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-neutral-900 dark:border-accent-green" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-neutral-900 dark:border-accent-green" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col gap-6 relative z-10">
        {/* Generator Form */}
        <div className="vintage-card bg-white dark:bg-[#1a1a1a] border-2 border-neutral-900 dark:border-accent-green p-6 relative">
          <h2 className="text-lg font-bold font-mono text-neutral-900 dark:text-[#e0e0e0] mb-4">
            Configuration
          </h2>

          <div className="space-y-4">
            {/* Type Selection */}
            <div>
              <label className="block text-xs font-mono text-neutral-700 dark:text-[#999] mb-2 font-bold">
                SECRET_TYPE
              </label>
              <select
                value={secretType}
                onChange={(e) =>
                  setSecretType(e.target.value as Secret["type"])
                }
                className="w-full px-3 py-2 border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#e0e0e0] font-mono text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-accent-green"
              >
                <option value="api-key">API Key</option>
                <option value="jwt-secret">JWT Secret</option>
                <option value="oauth-token">OAuth Token</option>
                <option value="random-hex">Random Hex</option>
                <option value="random-base64">Random Base64</option>
              </select>
              <p className="text-xs text-neutral-500 dark:text-[#666] mt-1 font-mono">
                {typeDescriptions[secretType]}
              </p>
            </div>

            {/* Length Selection */}
            <div>
              <label className="block text-xs font-mono text-neutral-700 dark:text-[#999] mb-3 font-bold">
                LENGTH: {length}
              </label>

              {/* Quick Preset Buttons */}
              <div className="grid grid-cols-5 gap-2 mb-3">
                {presets.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setLength(preset)}
                    className={`px-2 py-2 border-2 font-mono text-xs font-bold rounded transition-all ${
                      length === preset
                        ? "border-neutral-900 dark:border-accent-green bg-neutral-900 dark:bg-accent-green text-white dark:text-[#0a0a0a]"
                        : "border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#e0e0e0] hover:border-neutral-900 dark:hover:border-accent-green"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {/* Slider */}
              <input
                type="range"
                min="8"
                max="384"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-neutral-300 dark:bg-neutral-700 border border-neutral-400 dark:border-neutral-600 rounded cursor-pointer accent-neutral-900 dark:accent-accent-green"
              />
              <div className="flex justify-between text-xs text-neutral-500 dark:text-[#666] mt-1 font-mono">
                <span>Min: 8</span>
                <span>Max: 384</span>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="w-full mt-4 px-4 py-3 border-2 border-neutral-900 dark:border-accent-green bg-neutral-900 dark:bg-accent-green text-white dark:text-[#0a0a0a] hover:bg-neutral-800 dark:hover:bg-[#00ff41] font-mono font-bold text-sm transition-all cursor-pointer"
            >
              GENERATE
            </button>
          </div>

          {/* Corner decorations */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-neutral-900 dark:border-accent-green" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-neutral-900 dark:border-accent-green" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-neutral-900 dark:border-accent-green" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-neutral-900 dark:border-accent-green" />
        </div>

        {/* Generated Secrets */}
        {secrets.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold font-mono text-neutral-900 dark:text-[#e0e0e0]">
              GENERATED_SECRETS ({secrets.length})
            </h2>
            {secrets.map((secret) => (
              <SecretCard
                key={secret.id}
                secret={secret}
                onToggleVisibility={() => toggleVisibility(secret.id)}
                onCopy={() => handleCopy(secret.id)}
                onRegenerate={() => handleRegenerate(secret.id)}
                onDelete={() => handleDelete(secret.id)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {secrets.length === 0 && (
          <div className="vintage-card bg-white dark:bg-[#1a1a1a] border-2 border-dashed border-neutral-300 dark:border-neutral-700 p-8 text-center relative">
            <p className="text-sm font-mono text-neutral-500 dark:text-[#666]">
              No secrets generated yet. Configure and click GENERATE to create
              one.
            </p>
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-neutral-300 dark:border-neutral-700" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-neutral-300 dark:border-neutral-700" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-neutral-300 dark:border-neutral-700" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-neutral-300 dark:border-neutral-700" />
          </div>
        )}
      </div>
    </div>
  );
}
