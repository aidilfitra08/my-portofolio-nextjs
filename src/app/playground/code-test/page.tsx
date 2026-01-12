"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import Monaco Editor to avoid SSR issues
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

// Sample question data - replace with your API call
const SAMPLE_QUESTION = {
  id: 1,
  title: "Two Sum",
  difficulty: "Easy",
  description:
    "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
    },
  ],
  constraints: [
    "2 <= nums.length <= 10⁴",
    "-10⁹ <= nums[i] <= 10⁹",
    "-10⁹ <= target <= 10⁹",
    "Only one valid answer exists.",
  ],
};

const LANGUAGE_CONFIG = {
  javascript: {
    name: "JavaScript",
    ext: "js",
    monaco: "javascript",
    template: "// Write your code here\nfunction solution() {\n    \n}",
  },
  typescript: {
    name: "TypeScript",
    ext: "ts",
    monaco: "typescript",
    template: "// Write your code here\nfunction solution(): void {\n    \n}",
  },
  go: {
    name: "Go",
    ext: "go",
    monaco: "go",
    template:
      'package main\n\nimport "fmt"\n\nfunc main() {\n    // Write your code here\n}',
  },
  php: {
    name: "PHP",
    ext: "php",
    monaco: "php",
    template: "<?php\n// Write your code here\n?>",
  },
  cpp: {
    name: "C++",
    ext: "cpp",
    monaco: "cpp",
    template:
      "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}",
  },
  java: {
    name: "Java",
    ext: "java",
    monaco: "java",
    template:
      "public class Main {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
  },
  python: {
    name: "Python",
    ext: "py",
    monaco: "python",
    template: "# Write your code here\ndef solution():\n    pass",
  },
  c: {
    name: "C",
    ext: "c",
    monaco: "c",
    template:
      "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    return 0;\n}",
  },
};

export default function CodeTestPage() {
  const [language, setLanguage] =
    useState<keyof typeof LANGUAGE_CONFIG>("javascript");
  const [code, setCode] = useState(LANGUAGE_CONFIG.javascript.template);
  const [codeStorage, setCodeStorage] = useState<
    Record<keyof typeof LANGUAGE_CONFIG, string>
  >({
    javascript: LANGUAGE_CONFIG.javascript.template,
    typescript: LANGUAGE_CONFIG.typescript.template,
    go: LANGUAGE_CONFIG.go.template,
    php: LANGUAGE_CONFIG.php.template,
    cpp: LANGUAGE_CONFIG.cpp.template,
    java: LANGUAGE_CONFIG.java.template,
    python: LANGUAGE_CONFIG.python.template,
    c: LANGUAGE_CONFIG.c.template,
  });
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<"problem" | "submissions">(
    "problem"
  );
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [outputHeight, setOutputHeight] = useState(200); // Height of output panel in pixels
  const [isResizing, setIsResizing] = useState(false);

  // Detect user's preferred theme
  useEffect(() => {
    const checkTheme = () => {
      const darkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(darkMode);
    };

    checkTheme();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Handle resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      // Get the editor container
      const editorContainer = document.getElementById("editor-container");
      if (!editorContainer) return;

      const containerRect = editorContainer.getBoundingClientRect();
      const newHeight = containerRect.bottom - e.clientY;

      // Set min and max height constraints
      const minHeight = 100;
      const maxHeight = containerRect.height - 200;

      if (newHeight >= minHeight && newHeight <= maxHeight) {
        setOutputHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "ns-resize";
      document.body.style.userSelect = "none";
    } else {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing]);

  const handleResizeStart = () => {
    setIsResizing(true);
  };

  const handleLanguageChange = (newLang: keyof typeof LANGUAGE_CONFIG) => {
    // Save current code to storage before changing language
    setCodeStorage((prev) => ({
      ...prev,
      [language]: code,
    }));

    // Switch to new language and load its saved code
    setLanguage(newLang);
    setCode(codeStorage[newLang]);
    setOutput("");
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("Running...");

    try {
      // Replace with your backend URL
      const response = await fetch("YOUR_BACKEND_URL/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          code,
          questionId: SAMPLE_QUESTION.id,
        }),
      });

      const data = await response.json();
      setOutput(data.output || data.error || "No output");
    } catch (error) {
      setOutput(
        `Error: ${
          error instanceof Error ? error.message : "Failed to connect to server"
        }`
      );
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen bg-[#f5f1e8] dark:bg-[#0d0d0d] text-[#2a2a2a] dark:text-[#e0e0e0] font-mono flex flex-col overflow-x-hidden">
      {/* Vintage scanline effect overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black to-transparent animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-[#faf8f3] dark:bg-[#1a1a1a] border-b-2 border-accent-green px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-[#2a2a2a] dark:text-accent-green">
            <span className="mr-2">{">"}</span>
            CodeTest Terminal
          </h1>
        </div>
        <Link
          href="/playground"
          className="px-4 py-2 bg-accent-green text-white dark:text-[#0d0d0d] rounded border-2 border-accent-green hover:bg-transparent hover:text-accent-green transition-colors font-semibold"
        >
          <span className="mr-2">←</span>
          Exit
        </Link>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row lg:min-h-0 lg:overflow-hidden">
        {/* Left Panel - Problem Description */}
        <div className="w-full lg:w-1/2 bg-[#faf8f3] dark:bg-[#1a1a1a] lg:border-r-2 border-accent-green flex flex-col lg:overflow-hidden">
          <div className="lg:flex-1 lg:overflow-y-auto">
            <div className="p-6">
              {/* Tabs */}
              <div className="flex border-b-2 border-accent-green mb-6">
                <button
                  onClick={() => setActiveTab("problem")}
                  className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
                    activeTab === "problem"
                      ? "border-accent-green text-accent-green -mb-0.5"
                      : "border-transparent text-[#2a2a2a] dark:text-[#e0e0e0] hover:text-accent-green"
                  }`}
                >
                  <span className="mr-2">❓</span>
                  Problem
                </button>
                <button
                  onClick={() => setActiveTab("submissions")}
                  className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
                    activeTab === "submissions"
                      ? "border-accent-green text-accent-green -mb-0.5"
                      : "border-transparent text-[#2a2a2a] dark:text-[#e0e0e0] hover:text-accent-green"
                  }`}
                >
                  <span className="mr-2">📜</span>
                  Submissions
                </button>
              </div>

              {activeTab === "problem" ? (
                <>
                  {/* Question Title */}
                  <div className="mb-6 border-2 border-accent-green p-4 rounded bg-white dark:bg-[#0a0a0a]">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-[#2a2a2a] dark:text-accent-green">
                        {SAMPLE_QUESTION.title}
                      </h2>
                      <span
                        className={`text-sm font-bold px-2 py-1 rounded border-2 ${
                          SAMPLE_QUESTION.difficulty.toLowerCase() === "easy"
                            ? "border-green-600 text-green-600 dark:border-green-400 dark:text-green-400"
                            : SAMPLE_QUESTION.difficulty.toLowerCase() ===
                              "medium"
                            ? "border-yellow-600 text-yellow-600 dark:border-yellow-400 dark:text-yellow-400"
                            : "border-red-600 text-red-600 dark:border-red-400 dark:text-red-400"
                        }`}
                      >
                        {SAMPLE_QUESTION.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-[#2a2a2a] dark:text-accent-green mb-3">
                      <span className="mr-2">▸</span>
                      Description
                    </h3>
                    <p className="text-[#2a2a2a] dark:text-[#e0e0e0] whitespace-pre-line leading-relaxed pl-4">
                      {SAMPLE_QUESTION.description}
                    </p>
                  </div>

                  {/* Examples */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-[#2a2a2a] dark:text-accent-green mb-3">
                      <span className="mr-2">💡</span>
                      Examples
                    </h3>
                    {SAMPLE_QUESTION.examples.map((example, idx) => (
                      <div
                        key={idx}
                        className="mb-4 p-4 bg-white dark:bg-[#0a0a0a] rounded border-2 border-[#4caf50] dark:border-[#00ff41]"
                      >
                        <p className="font-bold text-[#2a2a2a] dark:text-accent-green mb-2">
                          Example {idx + 1}:
                        </p>
                        <div className="mb-2">
                          <span className="font-semibold text-[#2a2a2a] dark:text-[#e0e0e0]">
                            Input:
                          </span>
                          <code className="ml-2 text-sm bg-[#faf8f3] dark:bg-[#1a1a1a] px-2 py-1 rounded border border-accent-green text-accent-green">
                            {example.input}
                          </code>
                        </div>
                        <div className="mb-2">
                          <span className="font-semibold text-[#2a2a2a] dark:text-[#e0e0e0]">
                            Output:
                          </span>
                          <code className="ml-2 text-sm bg-[#faf8f3] dark:bg-[#1a1a1a] px-2 py-1 rounded border border-accent-green text-accent-green">
                            {example.output}
                          </code>
                        </div>
                        {example.explanation && (
                          <div>
                            <span className="font-semibold text-[#2a2a2a] dark:text-[#e0e0e0]">
                              Explanation:
                            </span>
                            <p className="ml-2 text-sm text-[#2a2a2a] dark:text-[#e0e0e0]">
                              {example.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Constraints */}
                  <div>
                    <h3 className="text-lg font-bold text-[#2a2a2a] dark:text-accent-green mb-3">
                      <span className="mr-2">⚠️</span>
                      Constraints
                    </h3>
                    <ul className="space-y-2 text-[#2a2a2a] dark:text-[#e0e0e0] pl-4">
                      {SAMPLE_QUESTION.constraints.map((constraint, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-accent-green mr-2">→</span>
                          <span>{constraint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 text-accent-green">📭</div>
                  <p className="text-[#2a2a2a] dark:text-[#e0e0e0]">
                    No submissions yet
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div
          id="editor-container"
          className="w-full lg:w-1/2 flex flex-col min-h-screen lg:min-h-0 lg:overflow-hidden"
        >
          {/* Language Selector & Actions */}
          <div className="px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b-2 border-accent-green">
            <div className="flex items-center gap-2">
              <span className="text-accent-green">$</span>
              <select
                value={language}
                onChange={(e) =>
                  handleLanguageChange(
                    e.target.value as keyof typeof LANGUAGE_CONFIG
                  )
                }
                className="dark:bg-black text-accent-green px-3 py-2 rounded border-2 border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green font-mono"
              >
                {Object.entries(LANGUAGE_CONFIG).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-4 py-2 bg-accent-green text-white dark:text-[#0d0d0d] rounded border-2 border-accent-green hover:bg-transparent hover:text-accent-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
              >
                <span>{isRunning ? "⏳" : "▶"}</span>
                {isRunning ? "Running..." : "Run Code"}
              </button>
              <button className="px-4 py-2 bg-[#00d9ff] text-[#0d0d0d] rounded border-2 border-[#00d9ff] hover:bg-transparent hover:text-[#00d9ff] transition-colors flex items-center gap-2 font-semibold">
                <span>📤</span>
                Submit
              </button>
            </div>
          </div>

          {/* Monaco Editor */}
          <div
            className="h-96 lg:overflow-hidden"
            style={{
              height:
                typeof window !== "undefined" && window.innerWidth >= 1024
                  ? `calc(100% - ${outputHeight}px - 150px)`
                  : "400px",
            }}
          >
            <Editor
              height="100%"
              language={LANGUAGE_CONFIG[language].monaco}
              value={code}
              onChange={(value) => setCode(value || "")}
              theme={isDarkMode ? "vs-dark" : "vs-light"}
              options={{
                fontSize: 14,
                fontFamily: '"Courier New", "Courier", monospace',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: "on",
                lineNumbers: "on",
                renderWhitespace: "selection",
                cursorBlinking: "smooth",
              }}
            />
          </div>

          {/* Resizable Divider */}
          <div
            onMouseDown={handleResizeStart}
            className="h-1 bg-accent-green hover:h-2 cursor-ns-resize transition-all group relative"
          >
            <div className="absolute inset-x-0 -top-1 -bottom-1 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-1 bg-accent-green rounded-full"></div>
            </div>
          </div>

          {/* Output Panel */}
          <div
            className="border-t-2 border-accent-green flex flex-col h-64 lg:h-auto"
            style={{
              height:
                typeof window !== "undefined" && window.innerWidth >= 1024
                  ? `${outputHeight}px`
                  : "256px",
            }}
          >
            <div className="px-4 py-2 border-b-2 border-accent-green flex items-center justify-between">
              <span className="text-accent-green font-semibold">
                <span className="mr-2">$</span>
                Output
              </span>
              <button
                onClick={() => setOutput("")}
                className="text-accent-green hover:text-accent-green text-sm"
              >
                ✕
              </button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              <pre className="text-accent-green font-mono text-sm whitespace-pre-wrap">
                {output || "$ Run your code to see output here..."}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Vintage corner decorations */}
      <div className="fixed top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-accent-green opacity-20 pointer-events-none z-40"></div>
      <div className="fixed bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-accent-green opacity-20 pointer-events-none z-40"></div>
    </div>
  );
}
