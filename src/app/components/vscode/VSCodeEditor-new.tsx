"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlay, faEye } from "@fortawesome/free-solid-svg-icons";

interface FileItem {
  name: string;
  type: "file" | "folder";
  children?: FileItem[];
  content?: string;
  language?: string;
}

interface VSCodeEditorProps {
  file: FileItem | null;
  onCloseFile?: () => void;
  onContentChange?: (content: string) => void;
}

const VSCodeEditor: React.FC<VSCodeEditorProps> = ({
  file,
  onCloseFile,
  onContentChange,
}) => {
  const [content, setContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (file?.content) {
      setContent(file.content);
    }
  }, [file]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    if (onContentChange) {
      onContentChange(newContent);
    }
  };

  const executeCode = () => {
    if (!file) return;

    setError("");
    setOutput("");

    try {
      if (file.language === "javascript" || file.language === "typescript") {
        // Create a safe execution environment
        const logs: string[] = [];
        const originalConsoleLog = console.log;
        const originalConsoleTime = console.time;
        const originalConsoleTimeEnd = console.timeEnd;
        const originalConsoleError = console.error;
        const originalConsoleWarn = console.warn;
        const timers: { [key: string]: number } = {};

        // Override console methods to capture output
        console.log = (...args: unknown[]) => {
          logs.push(
            args
              .map((arg) =>
                typeof arg === "object" && arg !== null
                  ? JSON.stringify(arg, null, 2)
                  : String(arg)
              )
              .join(" ")
          );
        };

        console.error = (...args: unknown[]) => {
          logs.push(
            "ERROR: " +
              args
                .map((arg) =>
                  typeof arg === "object" && arg !== null
                    ? JSON.stringify(arg, null, 2)
                    : String(arg)
                )
                .join(" ")
          );
        };

        console.warn = (...args: unknown[]) => {
          logs.push(
            "WARN: " +
              args
                .map((arg) =>
                  typeof arg === "object" && arg !== null
                    ? JSON.stringify(arg, null, 2)
                    : String(arg)
                )
                .join(" ")
          );
        };

        console.time = (label: string = "default") => {
          timers[label] = performance.now();
        };

        console.timeEnd = (label: string = "default") => {
          if (timers[label]) {
            const elapsed = performance.now() - timers[label];
            logs.push(`${label}: ${elapsed.toFixed(3)}ms`);
            delete timers[label];
          }
        };

        try {
          // Clean up the content to handle escaped characters properly
          let cleanedContent = content;

          // Replace escaped template literals with actual template literals
          cleanedContent = cleanedContent.replace(/\\`/g, "`");
          cleanedContent = cleanedContent.replace(/\\\$/g, "$");
          cleanedContent = cleanedContent.replace(/\\n/g, "\n");

          // Create a sandboxed environment with common globals
          const sandboxGlobals = {
            console,
            setTimeout,
            setInterval,
            clearTimeout,
            clearInterval,
            Math,
            Date,
            Array,
            Object,
            JSON,
            Promise,
            performance,
          };

          // Use Function constructor for safer execution than eval
          const func = new Function(
            ...Object.keys(sandboxGlobals),
            `
            "use strict";
            try {
              ${cleanedContent}
            } catch (error) {
              console.error('Runtime Error:', error.message);
              throw error;
            }
          `
          );

          func(...Object.values(sandboxGlobals));

          setOutput(
            logs.join("\n") || "Code executed successfully (no output)"
          );
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "Unknown error";
          // Provide more detailed error information
          if (err instanceof SyntaxError) {
            setError(
              `Syntax Error: ${errorMessage}\n\nTip: Check for missing brackets, semicolons, or invalid syntax.`
            );
          } else if (err instanceof ReferenceError) {
            setError(
              `Reference Error: ${errorMessage}\n\nTip: Make sure all variables and functions are properly defined.`
            );
          } else if (err instanceof TypeError) {
            setError(
              `Type Error: ${errorMessage}\n\nTip: Check data types and method calls.`
            );
          } else {
            setError(`Execution Error: ${errorMessage}`);
          }
        } finally {
          // Restore original console methods
          console.log = originalConsoleLog;
          console.error = originalConsoleError;
          console.warn = originalConsoleWarn;
          console.time = originalConsoleTime;
          console.timeEnd = originalConsoleTimeEnd;
        }
      } else if (file.language === "html") {
        // For HTML, we'll show it in an iframe
        setOutput("HTML preview available in preview panel");
        setShowPreview(true);
      } else if (file.language === "css") {
        setOutput("CSS styles - use with HTML preview");
      } else {
        setOutput("Code execution not supported for this file type");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Execution failed");
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "ts":
      case "tsx":
        return "🔷";
      case "js":
      case "jsx":
        return "🟨";
      case "css":
        return "🎨";
      case "json":
        return "📋";
      case "md":
        return "📝";
      case "html":
        return "🌐";
      default:
        return "📄";
    }
  };

  const generateLineNumbers = (content: string) => {
    const lines = content.split("\n");
    return lines.map((_, index) => (
      <div
        key={index}
        className="text-right text-gray-400 dark:text-gray-600 text-sm font-mono pr-4 select-none"
        style={{ minWidth: "40px" }}
      >
        {index + 1}
      </div>
    ));
  };

  const renderPreview = () => {
    if (!file || !showPreview) return null;

    if (file.language === "html") {
      return (
        <iframe
          srcDoc={content}
          className="w-full h-full border-0"
          title="HTML Preview"
          sandbox="allow-scripts"
        />
      );
    }

    return (
      <div className="p-4 text-sm text-gray-600 dark:text-gray-400">
        Preview not available for this file type
      </div>
    );
  };

  if (!file) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="text-6xl mb-4">👋</div>
          <h2 className="text-2xl font-semibold mb-2">
            Welcome to VS Code Clone
          </h2>
          <p>Select a file from the explorer to start editing</p>
          <p className="text-sm mt-2">✨ Now with live code execution!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
      {/* Tab Bar */}
      <div className="flex items-center bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center px-3 py-2 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
          <span className="mr-2">{getFileIcon(file.name)}</span>
          <span className="text-sm text-gray-800 dark:text-gray-200">
            {file.name}
          </span>
          {onCloseFile && (
            <button
              onClick={onCloseFile}
              className="ml-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              <FontAwesomeIcon
                icon={faTimes}
                className="w-3 h-3 text-gray-500"
              />
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center ml-auto mr-2 space-x-2">
          {(file.language === "javascript" ||
            file.language === "typescript" ||
            file.language === "html") && (
            <button
              onClick={executeCode}
              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded flex items-center space-x-1"
            >
              <FontAwesomeIcon icon={faPlay} className="w-3 h-3" />
              <span>Run</span>
            </button>
          )}

          {file.language === "html" && (
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`px-3 py-1 text-xs rounded flex items-center space-x-1 ${
                showPreview
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              <FontAwesomeIcon icon={faEye} className="w-3 h-3" />
              <span>Preview</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor */}
        <div
          className={`flex ${showPreview ? "w-1/2" : "w-full"} overflow-hidden`}
        >
          <div className="flex w-full">
            {/* Line Numbers */}
            <div className="bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 py-4">
              {generateLineNumbers(content)}
            </div>

            {/* Code Content */}
            <div className="flex-1 p-4 overflow-auto">
              <textarea
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                className="w-full h-full bg-transparent text-gray-800 dark:text-gray-200 font-mono text-sm resize-none outline-none"
                style={{
                  fontFamily: "'Courier New', monospace",
                  lineHeight: "1.5",
                  tabSize: 2,
                  minHeight: "100%",
                }}
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="w-1/2 border-l border-gray-200 dark:border-gray-700 bg-white">
            <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Preview
              </span>
            </div>
            <div className="h-full">{renderPreview()}</div>
          </div>
        )}
      </div>

      {/* Output Panel */}
      {(output || error) && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {error ? "Console (Error)" : "Console (Output)"}
            </span>
          </div>
          <div className="p-4 max-h-32 overflow-y-auto">
            <pre
              className={`text-sm font-mono whitespace-pre-wrap ${
                error
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-800 dark:text-gray-200"
              }`}
            >
              {error || output}
            </pre>
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="bg-blue-600 text-white text-xs px-4 py-1 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span>✓ {file.language || "Plain Text"}</span>
          <span>UTF-8</span>
          <span>LF</span>
          {(file.language === "javascript" ||
            file.language === "typescript") && <span>🚀 Executable</span>}
        </div>
        <div className="flex items-center space-x-4">
          <span>Ln {content.split("\n").length}, Col 1</span>
          <span>Spaces: 2</span>
        </div>
      </div>
    </div>
  );
};

export default VSCodeEditor;
