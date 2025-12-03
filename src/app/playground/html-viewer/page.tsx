"use client";

// import React, { useState, useRef, useEffect } from "react";
// import HTMLViewerWithTailwindComponent from "./components/HTMLViewerWithTailwindComponent";
import HTMLViewer from "./components/HTMLViewer";

export default function Page() {
  // const [activeView, setActiveView] = useState<"basic" | "tailwind">("basic");

  return (
    <main className="">
      {/* <nav className="p-4 flex gap-2">
        <button
          className={`px-3 py-2 rounded ${
            activeView === "basic" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveView("basic")}
        >
          Basic Viewer
        </button>
        <button
          className={`px-3 py-2 rounded ${
            activeView === "tailwind" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveView("tailwind")}
        >
          Tailwind Viewer
        </button>
      </nav> */}

      <HTMLViewer />
    </main>
  );
}
