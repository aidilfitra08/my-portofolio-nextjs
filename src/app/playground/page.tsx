import Link from "next/link";
import Notes from "../components/notes/notes";

const playgroundLinks = [
  { name: "Clock Playground", url: "/playground/clock", icon: "🕒" },
  { name: "Favicon Test", url: "/playground/favicon-test", icon: "🖼️" },
  { name: "IP Checker", url: "/playground/ip-checker", icon: "🌐" },
  { name: "Trial Input Box", url: "/playground/trial-input-box", icon: "🔲" },
  { name: "VSCode Clone", url: "/playground/vscode-clone", icon: "💻" },
  { name: "Simple Ai Agent", url: "/playground/simple-ai-agent", icon: "🤖" },
  { name: "Chat Room", url: "/playground/chat-room", icon: "💬" },
  { name: "HTML Viewer", url: "/playground/html-viewer", icon: "📄" },
  {
    name: "LLM Token Counter",
    url: "/playground/llm-token-counter",
    icon: "🧮",
  },
  { name: "Format Converter", url: "/playground/format-converter", icon: "🔄" },
];

export default function PlaygroundIndex() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header with typewriter aesthetic */}
        <div className="mb-12 border-b-2 border-neutral-300 dark:border-neutral-700 pb-4">
          <h1 className="text-4xl font-mono font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            [PLAYGROUND_INDEX]
          </h1>
          <p className="text-sm font-mono text-neutral-500 dark:text-neutral-400 mt-2">
            // experimental_projects.list()
          </p>
        </div>

        {/* Menu items */}
        <div className="space-y-3">
          {playgroundLinks.map((link, index) => (
            <a
              key={link.url}
              href={link.url}
              className="group block relative overflow-hidden"
            >
              {/* Scanline effect overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ backgroundSize: "100% 4px" }}
              />

              <div className="relative flex items-center gap-4 p-4 border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 font-mono transition-all group-hover:border-neutral-900 dark:group-hover:border-neutral-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                {/* Index number */}
                <span className="text-neutral-400 dark:text-neutral-600 text-xs font-bold w-8">
                  {String(index + 1).padStart(2, "0")}.
                </span>

                {/* Icon */}
                <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 w-8 text-center">
                  {link.icon}
                </span>

                {/* Name */}
                <span className="flex-1 text-neutral-900 dark:text-neutral-100 font-medium tracking-wide uppercase text-sm">
                  {link.name}
                </span>

                {/* Arrow indicator */}
                <span className="text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
                  →
                </span>
              </div>

              {/* Shadow effect */}
              <div className="absolute inset-0 border-2 border-neutral-900 dark:border-neutral-300 translate-x-1 translate-y-1 -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>

        {/* Footer notes */}
        <div className="mt-12 p-4 border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900/50">
          <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 leading-relaxed">
            <span className="text-neutral-900 dark:text-neutral-100">
              [INFO]
            </span>{" "}
            These are experimental interfaces combining vintage computing
            aesthetics with modern web technologies. Navigate with caution.
          </p>
        </div>
      </div>
    </main>
  );
}
