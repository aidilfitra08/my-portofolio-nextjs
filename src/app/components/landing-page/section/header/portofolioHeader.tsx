"use client";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTerminal,
  faCode,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import PDFViewer from "../../../PDFViewer";
import SimpleBar from "simplebar-react";

interface HeaderData {
  greeting: string;
  name: string;
  title: string;
  description: string;
  location: string;
}

export default function PortofolioHeader({ data }: { data: any }) {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [commandInput, setCommandInput] = useState("");
  const [terminalLines, setTerminalLines] = useState<
    { type: "cmd" | "out" | "sys"; text: string }[]
  >([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [showCV, setShowCV] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [terminalFocused, setTerminalFocused] = useState(false);
  const terminalScrollRef = useRef<HTMLDivElement>(null);

  const headerData: HeaderData = data?.header || {
    greeting: "Hello,",
    name: "Aidil",
    title: "Computer Science Graduate",
    description:
      "I'm a Computer Science graduate with experience in backend, web, and mobile development. Skilled in technologies like Laravel, Flutter, Node.js, React, Next.js, Golang, MySQL, and MongoDB.",
    location: "Indonesia",
  };
  const fullText = headerData.title;
  const cvUrl = (data?.header && (data.header as any).cvUrl) || "/data/cv.pdf"; // place your CV in public/data/cv.pdf

  useEffect(() => {
    if (terminalFocused) return;
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText, terminalFocused]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Initialize terminal with help and some sample outputs
  useEffect(() => {
    setTerminalLines([
      { type: "sys", text: "Type 'help' to see available commands." },
      { type: "cmd", text: "whoami" },
      { type: "out", text: "Aidil Fitra" },
      { type: "cmd", text: "ls skills/" },
      {
        type: "out",
        text: "• Node.js  • React.js  • Next.js  • Golang  • Flutter  • MySQL  • MongoDB",
      },
      { type: "cmd", text: "cat status.txt" },
      { type: "out", text: "► Ready for new challenges" },
      { type: "out", text: "► Open to collaboration" },
      { type: "out", text: "► Building the future" },
    ]);
  }, []);

  // Auto scroll to bottom on new lines
  useEffect(() => {
    const el = terminalScrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [terminalLines, showCV]);

  // Close CV modal on Escape
  useEffect(() => {
    if (!cvModalOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCvModalOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [cvModalOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (cvModalOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [cvModalOpen]);

  const appendLine = (entry: { type: "cmd" | "out" | "sys"; text: string }) => {
    setTerminalLines((prev) => [...prev, entry]);
  };

  const runCommand = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;

    // record input and history
    appendLine({
      type: "cmd",
      text: cmd.startsWith("$") ? cmd.slice(1).trim() : cmd,
    });
    setHistory((h) => [...h, cmd]);
    setHistoryIndex(-1);

    // parse commands
    const lower = cmd.toLowerCase();

    // suspicious command guard
    const suspiciousPatterns = [
      /\brm\b/,
      /\brmdir\b/,
      /\bdel\b/,
      /shutdown/,
      /reboot/,
      /mkfs/,
      /dd\s+if=/,
      /: \(\) \{ \}/,
      /\bsudo\b/,
      /\bchmod\s+777/,
      /\bchown\b/,
      /\bmv\s+\//,
      /\bformat\b/,
    ];
    const isSuspicious = suspiciousPatterns.some((p) => p.test(lower));
    if (isSuspicious) {
      appendLine({
        type: "out",
        text: "Gotcha! Suspicious command detected — nice try. No self‑destructs here; this terminal is sandboxed.",
      });
      return;
    }

    if (lower === "help") {
      appendLine({ type: "out", text: "Available commands:" });
      appendLine({ type: "out", text: "  help         - Show this help" });
      appendLine({ type: "out", text: "  whoami       - Show user" });
      appendLine({ type: "out", text: "  ls skills    - List skills" });
      appendLine({ type: "out", text: "  status       - Show status" });
      appendLine({ type: "out", text: "  cv           - Open CV viewer" });
      appendLine({ type: "out", text: "  clear        - Clear terminal" });
      return;
    }

    if (lower === "whoami") {
      appendLine({ type: "out", text: headerData?.name || "Aidil Fitra" });
      return;
    }

    if (lower === "ls skills" || lower === "ls skills/") {
      appendLine({
        type: "out",
        text: "• Node.js  • React.js  • Next.js  • Golang  • Flutter  • MySQL  • MongoDB",
      });
      return;
    }

    if (lower === "status" || lower === "cat status.txt") {
      appendLine({ type: "out", text: "► Ready for new challenges" });
      appendLine({ type: "out", text: "► Open to collaboration" });
      appendLine({ type: "out", text: "► Building the future" });
      return;
    }

    if (lower === "cv" || lower === "show-cv") {
      setShowCV(true);
      setCvModalOpen(true);
      appendLine({ type: "out", text: "Opening CV viewer..." });
      return;
    }

    if (lower === "clear") {
      setTerminalLines([]);
      setShowCV(false);
      return;
    }

    appendLine({
      type: "out",
      text: `Command not found: ${cmd}. Type 'help' for available commands.`,
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(commandInput);
    setCommandInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistoryIndex((idx) => {
        const next = idx < 0 ? history.length - 1 : Math.max(0, idx - 1);
        const val = history[next] ?? commandInput;
        setCommandInput(val || "");
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistoryIndex((idx) => {
        if (idx < 0) return -1;
        const next = Math.min(history.length - 1, idx + 1);
        const val = history[next] ?? "";
        setCommandInput(val);
        return next;
      });
    }
  };

  return (
    <header
      className="relative py-12 md:py-20 px-4 overflow-hidden bg-[var(--background)] text-[var(--foreground)]"
      id="about-me"
    >
      {/* Retro grid background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 [data-theme=neobrutalism]:hidden">
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

      {/* Synthetic Terminal Look Alike */}
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Main content */}
          <div className="space-y-6">
            {/* Terminal-style prompt */}
            <div className="flex items-center gap-2 text-accent-green dark:text-accent-green mb-4">
              <FontAwesomeIcon icon={faTerminal} className="text-xl" />
              <span className="text-sm">~/portfolio $</span>
              <span className="text-sm animate-pulse">
                cat introduction.txt
              </span>
            </div>

            {/* Main heading with vintage typewriter aesthetic */}
            <div className="space-y-3">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block text-[#1a1a1a] dark:text-[#e0e0e0]">
                  {headerData?.greeting || "Hello,"}
                </span>
                <span className="block mt-2">
                  <span className="text-[#1a1a1a] dark:text-[#e0e0e0]">
                    I am{" "}
                  </span>
                  <span className="text-accent-green dark:text-accent-green terminal-glow">
                    {headerData?.name || "Aidil"}
                  </span>
                </span>
              </h1>

              {/* Typewriter effect */}
              <div
                className={`text-xl md:text-2xl text-[#ffb000] dark:text-[#ffb000] font-medium min-h-8 flex items-center gap-1`}
              >
                <FontAwesomeIcon icon={faCode} className="text-lg" />
                <span>{typedText}</span>
                <span
                  className={`${
                    showCursor ? "opacity-100" : "opacity-0"
                  } transition-opacity ${terminalFocused ? "hidden" : "block"}`}
                >
                  ▊
                </span>
              </div>
            </div>

            {/* Description with vintage card style */}
            <div className="vintage-card dark:bg-[#1a1a1a] border-l-4 border-accent-green p-6 rounded-r-lg shadow-lg">
              <p className="text-base md:text-lg leading-relaxed text-[#2a2a2a] dark:text-[#c0c0c0]">
                <span className="text-accent-green font-bold">&gt;&gt;</span>{" "}
                {headerData?.description ||
                  "I'm a Computer Science graduate with experience in backend, web, and mobile development. Skilled in technologies like Laravel, Flutter, Node.js, React, Next.js, Golang, MySQL, and MongoDB."}
              </p>
            </div>

            {/* Location tag */}
            <div className="flex items-center gap-2 text-sm text-[#2a2a2a] dark:text-[#a0a0a0]">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-[#ff6b6b]"
              />
              <span>{headerData?.location || "Indonesia"}</span>
            </div>
          </div>

          {/* Right side - Retro terminal display with input */}
          <div className="hidden lg:block">
            <div className="vintage-card dark:bg-[#0a0a0a] border-2 border-accent-green rounded-lg p-6 shadow-2xl crt-effect">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-accent-green border-opacity-30">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff6b6b]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffb000]"></div>
                  <div className="w-3 h-3 rounded-full bg-accent-green"></div>
                </div>
                <span className="text-accent-green text-sm ml-2">
                  terminal@aidil
                </span>
              </div>

              {/* Scrollable terminal content */}
              <SimpleBar
                scrollableNodeProps={{ ref: terminalScrollRef }}
                className="text-sm font-mono max-h-[420px] pr-2"
                style={{ maxHeight: 420 }}
                autoHide={false}
              >
                <div className="space-y-1">
                  {terminalLines.map((line, idx) => (
                    <div
                      key={idx}
                      className={
                        line.type === "cmd"
                          ? "text-accent-green"
                          : line.type === "sys"
                          ? "dark:text-[#a0f0a0] text-[#006400]"
                          : "dark:text-[#c0c0c0] text-[#404040] pl-4"
                      }
                    >
                      {line.type === "cmd" ? (
                        <>
                          <span className="text-[#ffb000]">$</span> {line.text}
                        </>
                      ) : (
                        <>{line.text}</>
                      )}
                    </div>
                  ))}

                  {/* Input row */}
                  <form
                    onSubmit={onSubmit}
                    className="text-accent-green mt-3 flex items-center gap-2"
                  >
                    <span className="text-[#ffb000]">$</span>
                    <input
                      type="text"
                      value={commandInput}
                      onChange={(e) => setCommandInput(e.target.value)}
                      onKeyDown={onKeyDown}
                      onFocus={() => setTerminalFocused(true)}
                      onBlur={() => setTerminalFocused(false)}
                      className="bg-transparent outline-none flex-1 text-accent-green placeholder:text-accent-green/60"
                      placeholder="Type a command (try 'help')"
                      aria-label="terminal-input"
                    />
                  </form>
                </div>
              </SimpleBar>
            </div>
          </div>
        </div>
      </div>

      {cvModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-[#0a0a0a] text-white w-full max-w-5xl rounded-lg border-2 border-accent-green shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-accent-green/30">
              <div className="text-sm text-accent-green">CV Viewer</div>
              <button
                onClick={() => {
                  setCvModalOpen(false);
                  setShowCV(false);
                }}
                className="text-xs px-3 py-1 rounded border border-accent-green text-accent-green hover:bg-accent-green hover:text-black transition-colors"
              >
                Close
              </button>
            </div>
            <div className="h-[70vh] bg-[#121212]">
              <PDFViewer
                url={cvUrl}
                fileName={`${headerData?.name || "CV"} - CV`}
                className="h-full"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
