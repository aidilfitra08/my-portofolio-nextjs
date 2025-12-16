"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCode,
  faDisplay,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";

export default function HTMLViewer() {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;
    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(htmlContent);
      iframeDoc.close();
    }
  }, [htmlContent]);

  return (
    <div className="min-h-screen bg-[#f5f5f0] dark:bg-[#0a0a0a] flex flex-col relative">
      {/* Scanlines effect */}
      <div className="scanlines pointer-events-none" />

      {/* Retro grid background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 65, 0.25) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 65, 0.25) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white dark:bg-[#1a1a1a] border-b-2 border-neutral-300 dark:border-accent-green">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
          <Link
            href="/playground"
            className="group inline-flex items-center gap-2 px-3 py-2 border-2 border-neutral-900 dark:border-accent-green bg-white dark:bg-[#1a1a1a] font-mono text-sm transition-all hover:translate-x-1 hover:-translate-y-1 relative"
          >
            <div className="absolute inset-0 border-2 border-neutral-900 dark:border-accent-green translate-x-1 translate-y-1 -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="text-neutral-900 dark:text-accent-green group-hover:animate-pulse"
            />
            <span className="text-neutral-900 dark:text-[#e0e0e0] font-bold">
              BACK
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faTerminal}
              className="text-2xl text-neutral-900 dark:text-accent-green terminal-glow"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-mono font-bold text-neutral-900 dark:text-[#e0e0e0]">
                [HTML_VIEWER]
              </h1>
              <p className="text-xs font-mono text-neutral-600 dark:text-[#999]">
                <span className="text-[#ffb000]">$</span> ./preview --live
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto w-full flex-1 px-4 pb-6 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 h-[calc(100vh-170px)]">
          {/* Editor */}
          <section className="flex flex-col bg-white dark:bg-[#1a1a1a] border-2 border-neutral-900 dark:border-accent-green vintage-card overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-neutral-300 dark:border-accent-green">
              <FontAwesomeIcon
                icon={faCode}
                className="text-neutral-900 dark:text-accent-green"
              />
              <h2 className="text-sm font-mono font-bold text-neutral-900 dark:text-[#e0e0e0]">
                [HTML_CODE]
              </h2>
            </div>
            <textarea
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              placeholder="Type or paste your HTML here..."
              spellCheck={false}
              className="flex-1 w-full px-4 py-3 bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#e0e0e0] font-mono text-sm resize-none focus:outline-none focus:border-neutral-900 dark:focus:border-accent-green"
            />
          </section>

          {/* Preview */}
          <section className="flex flex-col bg-white dark:bg-[#1a1a1a] border-2 border-neutral-900 dark:border-accent-green vintage-card overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-neutral-300 dark:border-accent-green">
              <FontAwesomeIcon
                icon={faDisplay}
                className="text-neutral-900 dark:text-accent-green"
              />
              <h2 className="text-sm font-mono font-bold text-neutral-900 dark:text-[#e0e0e0]">
                [PREVIEW]
              </h2>
            </div>
            <div className="flex-1 bg-white dark:bg-[#0a0a0a] overflow-auto">
              <iframe
                ref={iframeRef}
                title="HTML Preview"
                className="w-full h-full bg-white dark:bg-[#0a0a0a] border-0"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </section>
        </div>
      </main>

      {/* Corner decorations */}
      <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-neutral-900 dark:border-accent-green pointer-events-none" />
      <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-neutral-900 dark:border-accent-green pointer-events-none" />
      <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-neutral-900 dark:border-accent-green pointer-events-none" />
      <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-neutral-900 dark:border-accent-green pointer-events-none" />
    </div>
  );
}
