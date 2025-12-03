"use client";

import { useState, useRef, useEffect } from "react";

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
    <div className="h-screen w-screen flex flex-col bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">HTML Viewer</h1>
          <p className="text-sm text-gray-400">Real-time HTML preview</p>
        </div>
      </div>

      {/* Main Content - Side by Side */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Side */}
        <div className="w-1/2 flex flex-col border-r border-gray-700">
          <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
            <h2 className="text-sm font-semibold text-gray-300">HTML Code</h2>
          </div>
          <textarea
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
            placeholder="Type or paste your HTML code here..."
            className="flex-1 w-full px-4 py-3 bg-gray-900 text-gray-100 font-mono text-sm resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>

        {/* Preview Side */}
        <div className="w-1/2 flex flex-col">
          <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
            <h2 className="text-sm font-semibold text-gray-300">Preview</h2>
          </div>
          <div className="flex-1 bg-white overflow-auto">
            <iframe
              ref={iframeRef}
              title="HTML Preview"
              className="w-full h-full bg-white border-0"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
