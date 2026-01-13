"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faCheck,
  faEye,
  faEyeSlash,
  faRotate,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

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

interface SecretCardProps {
  secret: Secret;
  onToggleVisibility: () => void;
  onCopy: () => void;
  onRegenerate: () => void;
  onDelete?: () => void;
}

const getMaskedValue = (value: string): string => {
  if (value.length <= 8) {
    return value;
  }
  const start = value.substring(0, 4);
  const end = value.substring(value.length - 4);
  const middle = "*".repeat(Math.max(3, value.length - 8));
  return `${start}${middle}${end}`;
};

const getTypeLabel = (type: Secret["type"]): string => {
  const labels = {
    "api-key": "API_KEY",
    "jwt-secret": "JWT_SECRET",
    "oauth-token": "OAUTH_TOKEN",
    "random-hex": "RANDOM_HEX",
    "random-base64": "RANDOM_BASE64",
  };
  return labels[type];
};

const getTypeColor = (type: Secret["type"]): string => {
  const colors = {
    "api-key":
      "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300 border-blue-300 dark:border-blue-700",
    "jwt-secret":
      "bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-300 border-purple-300 dark:border-purple-700",
    "oauth-token":
      "bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-300 border-green-300 dark:border-green-700",
    "random-hex":
      "bg-orange-100 dark:bg-orange-900/30 text-orange-900 dark:text-orange-300 border-orange-300 dark:border-orange-700",
    "random-base64":
      "bg-pink-100 dark:bg-pink-900/30 text-pink-900 dark:text-pink-300 border-pink-300 dark:border-pink-700",
  };
  return colors[type];
};

export default function SecretCard({
  secret,
  onToggleVisibility,
  onCopy,
  onRegenerate,
  onDelete,
}: SecretCardProps) {
  const isCopied = secret.copiedAt && Date.now() - secret.copiedAt < 2000;

  return (
    <div className="vintage-card bg-white dark:bg-[#1a1a1a] border-2 border-neutral-900 dark:border-accent-green p-4 relative group">
      {/* Type Badge */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-xs font-mono font-bold px-2 py-1 border rounded ${getTypeColor(
            secret.type
          )}`}
        >
          {getTypeLabel(secret.type)}
        </span>
        <span className="text-xs font-mono text-neutral-500 dark:text-[#666]">
          {secret.length} chars
        </span>
      </div>

      {/* Secret Value */}
      <div className="mb-3 relative">
        <div
          onClick={onCopy}
          className="cursor-pointer p-3 bg-neutral-50 dark:bg-[#0a0a0a] border border-neutral-300 dark:border-neutral-700 rounded font-mono text-sm text-neutral-900 dark:text-[#e0e0e0] break-all hover:border-neutral-900 dark:hover:border-accent-green transition-colors group"
          title="Click to copy"
        >
          {secret.isVisible ? secret.value : getMaskedValue(secret.value)}
        </div>
        {isCopied && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-mono font-bold flex items-center gap-1">
            <FontAwesomeIcon icon={faCheck} /> Copied!
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {/* Show/Hide Button */}
        <button
          onClick={onToggleVisibility}
          className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#e0e0e0] hover:border-neutral-900 dark:hover:border-accent-green font-mono text-xs font-bold rounded transition-colors flex items-center justify-center gap-2"
          title={secret.isVisible ? "Hide value" : "Show value"}
        >
          <FontAwesomeIcon icon={secret.isVisible ? faEyeSlash : faEye} />
          {secret.isVisible ? "HIDE" : "SHOW"}
        </button>

        {/* Copy Button */}
        <button
          onClick={onCopy}
          className={`flex-1 px-3 py-2 font-mono text-xs font-bold rounded transition-colors flex items-center justify-center gap-2 ${
            isCopied
              ? "border-2 border-green-500 bg-green-500 text-white"
              : "border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#e0e0e0] hover:border-neutral-900 dark:hover:border-accent-green"
          }`}
          title="Copy to clipboard"
        >
          <FontAwesomeIcon icon={isCopied ? faCheck : faCopy} />
          {isCopied ? "COPIED" : "COPY"}
        </button>

        {/* Regenerate Button */}
        <button
          onClick={onRegenerate}
          className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#e0e0e0] hover:border-neutral-900 dark:hover:border-accent-green font-mono text-xs font-bold rounded transition-colors flex items-center justify-center gap-2"
          title="Generate new secret with same config"
        >
          <FontAwesomeIcon icon={faRotate} />
          REGEN
        </button>

        {/* Delete Button */}
        {onDelete && (
          <button
            onClick={onDelete}
            className="px-3 py-2 border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-300 hover:border-red-900 dark:hover:border-red-500 font-mono text-xs font-bold rounded transition-colors"
            title="Delete"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>

      {/* Corner decorations */}
      <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-neutral-900 dark:border-accent-green" />
      <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-neutral-900 dark:border-accent-green" />
      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-neutral-900 dark:border-accent-green" />
      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-neutral-900 dark:border-accent-green" />
    </div>
  );
}
