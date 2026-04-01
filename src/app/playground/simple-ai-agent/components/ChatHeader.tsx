import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faTrash,
  faSignOut,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface ChatHeaderProps {
  onClearHistory: () => void;
  onLogout: () => void;
  speechSupported: boolean;
}

export default function ChatHeader({
  onClearHistory,
  onLogout,
  speechSupported,
}: ChatHeaderProps) {
  return (
    <div className="sticky top-0 bg-white dark:bg-[#1a1a1a] border-b-2 border-neutral-300 dark:border-accent-green p-4 z-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          {/* Back button */}
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

          <div className="flex items-center gap-3">
            {/* Clear History */}
            <button
              onClick={onClearHistory}
              className="group inline-flex items-center gap-2 px-3 py-2 border-2 border-neutral-900 dark:border-accent-green bg-white dark:bg-[#1a1a1a] font-mono text-sm transition-all hover:translate-x-1 hover:-translate-y-1 relative"
              title="Clear conversation history"
            >
              <div className="absolute inset-0 border-2 border-neutral-900 dark:border-accent-green translate-x-1 translate-y-1 -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <FontAwesomeIcon
                icon={faTrash}
                className="text-neutral-900 dark:text-accent-green"
              />
              <span className="text-neutral-900 dark:text-[#e0e0e0] font-bold hidden sm:inline">
                CLEAR
              </span>
            </button>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="group inline-flex items-center gap-2 px-3 py-2 border-2 border-neutral-900 dark:border-[#ff6b6b] bg-white dark:bg-[#1a1a1a] font-mono text-sm transition-all hover:translate-x-1 hover:-translate-y-1 relative"
              title="Logout"
            >
              <div className="absolute inset-0 border-2 border-neutral-900 dark:border-[#ff6b6b] translate-x-1 translate-y-1 -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <FontAwesomeIcon
                icon={faSignOut}
                className="text-neutral-900 dark:text-[#ff6b6b]"
              />
              <span className="text-neutral-900 dark:text-[#ff6b6b] font-bold hidden sm:inline">
                LOGOUT
              </span>
            </button>
          </div>
        </div>

        {/* Title Section */}
        <div className="flex items-center gap-3 mb-2">
          <FontAwesomeIcon
            icon={faTerminal}
            className="text-2xl text-neutral-900 dark:text-accent-green terminal-glow"
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-mono font-bold text-neutral-900 dark:text-[#e0e0e0]">
              [AI_ASSISTANT]
            </h1>
            <p className="text-xs font-mono text-neutral-600 dark:text-[#999] mt-1">
              <span className="text-[#ffb000]">$</span> ./chat --mode=personal
              {speechSupported && " --voice=enabled"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
