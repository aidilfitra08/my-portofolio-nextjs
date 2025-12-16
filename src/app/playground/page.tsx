import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faImage,
  faGlobe,
  faSquare,
  faCode,
  faRobot,
  faComments,
  faFileCode,
  faCalculator,
  faArrowsRotate,
  faArrowLeft,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import { HoloHelp } from "../components/HoloHelpComponent";

const playgroundLinks = [
  { name: "Clock Playground", url: "/playground/clock", icon: faClock },
  { name: "Favicon Test", url: "/playground/favicon-test", icon: faImage },
  { name: "IP Checker", url: "/playground/ip-checker", icon: faGlobe },
  {
    name: "Trial Input Box",
    url: "/playground/trial-input-box",
    icon: faSquare,
  },
  { name: "VSCode Clone", url: "/playground/vscode-clone", icon: faCode },
  {
    name: "Simple Ai Agent",
    url: "/playground/simple-ai-agent",
    icon: faRobot,
  },
  { name: "Chat Room", url: "/playground/chat-room", icon: faComments },
  { name: "HTML Viewer", url: "/playground/html-viewer", icon: faFileCode },
  {
    name: "LLM Token Counter",
    url: "/playground/llm-token-counter",
    icon: faCalculator,
  },
  {
    name: "Format Converter",
    url: "/playground/format-converter",
    icon: faArrowsRotate,
  },
];

export default function PlaygroundIndex() {
  return (
    <main className="min-h-screen bg-[#f5f5f0] dark:bg-[#0a0a0a] py-16 px-4">
      {/* Scanlines effect */}
      <div className="scanlines pointer-events-none" />

      <div className="max-w-2xl mx-auto relative">
        {/* Back button - positioned at top left with vintage style */}
        <Link
          href="/"
          className="group inline-flex items-center gap-3 mb-8 px-4 py-2 border-2 border-neutral-900 dark:border-accent-green bg-white dark:bg-[#1a1a1a] font-mono text-sm transition-all hover:translate-x-1 hover:-translate-y-1 relative"
        >
          {/* Shadow effect */}
          <div className="absolute inset-0 border-2 border-neutral-900 dark:border-accent-green translate-x-1 translate-y-1 -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />

          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-neutral-900 dark:text-accent-green group-hover:animate-pulse"
          />
          <span className="text-neutral-900 dark:text-[#e0e0e0] font-bold tracking-wide">
            <span className="text-neutral-500 dark:text-accent-green">[</span>
            RETURN_HOME
            <span className="text-neutral-500 dark:text-accent-green">]</span>
          </span>
        </Link>

        {/* Header with typewriter aesthetic */}
        <div className="mb-12 border-b-2 border-neutral-300 dark:border-accent-green pb-4">
          <div className="flex items-center gap-3 mb-2">
            <FontAwesomeIcon
              icon={faTerminal}
              className="text-2xl text-neutral-900 dark:text-accent-green terminal-glow"
            />
            <h1 className="text-4xl font-mono font-bold text-neutral-900 dark:text-[#e0e0e0] tracking-tight">
              [PLAYGROUND_INDEX]
            </h1>
          </div>
          <p className="text-sm font-mono text-neutral-500 dark:text-[#999] mt-2">
            <span className="text-[#ffb000]">$</span>{" "}
            ./experimental_projects.list()
          </p>
        </div>

        {/* Menu items */}
        <div className="space-y-3">
          {playgroundLinks.map((link, index) => (
            <Link
              key={link.url}
              href={link.url}
              className="group block relative overflow-hidden"
            >
              {/* Scanline effect overlay */}
              <div
                className="absolute inset-0 bg-linear-to-b from-transparent via-neutral-900/5 dark:via-accent-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ backgroundSize: "100% 4px" }}
              />

              <div className="relative flex items-center gap-4 p-4 border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] font-mono transition-all group-hover:border-neutral-900 dark:group-hover:border-accent-green group-hover:translate-x-1 group-hover:-translate-y-1">
                {/* Index number */}
                <span className="text-neutral-400 dark:text-[#666] text-xs font-bold w-8">
                  {String(index + 1).padStart(2, "0")}.
                </span>

                {/* Icon */}
                <div className="w-8 text-center">
                  <FontAwesomeIcon
                    icon={link.icon}
                    className="text-xl text-neutral-900 dark:text-accent-green group-hover:scale-110 transition-transform"
                  />
                </div>

                {/* Name */}
                <span className="flex-1 text-neutral-900 dark:text-[#e0e0e0] font-medium tracking-wide uppercase text-sm group-hover:text-neutral-900 dark:group-hover:text-accent-green transition-colors">
                  {link.name}
                </span>

                {/* Arrow indicator */}
                <span className="text-neutral-400 dark:text-[#666] group-hover:text-neutral-900 dark:group-hover:text-accent-green transition-colors font-bold">
                  →
                </span>
              </div>

              {/* Shadow effect */}
              <div className="absolute inset-0 border-2 border-neutral-900 dark:border-accent-green translate-x-1 translate-y-1 -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>

        {/* Footer notes */}
        <div className="mt-12 p-4 border-2 border-neutral-300 dark:border-accent-green bg-neutral-100 dark:bg-[#1a1a1a] vintage-card">
          <p className="text-xs font-mono text-neutral-600 dark:text-[#999] leading-relaxed">
            <span className="text-neutral-900 dark:text-accent-green font-bold">
              [INFO]
            </span>{" "}
            These are experimental interfaces combining vintage computing
            aesthetics with modern web technologies. Navigate with caution.
          </p>
        </div>

        {/* Corner decorations */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-neutral-900 dark:border-accent-green pointer-events-none"></div>
        <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-neutral-900 dark:border-accent-green pointer-events-none"></div>
        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-neutral-900 dark:border-accent-green pointer-events-none"></div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-neutral-900 dark:border-accent-green pointer-events-none"></div>
      </div>
      <HoloHelp />
    </main>
  );
}
