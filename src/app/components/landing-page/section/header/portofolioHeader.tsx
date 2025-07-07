"use client";
import { useEffect, useState } from "react";

export default function PortofolioHeader() {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Computer Science Graduate";

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <header className="py-6 px-4" id="about-me">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-neutral-900 dark:text-white">Hello,</span>
            <br />
            <span className="text-neutral-900 dark:text-white">I am </span>
            <span className="text-blue-700 dark:text-blue-400">Aidil</span>
          </h1>
          <div
            className="text-lg text-neutral-900 dark:text-gray-300 mb-2"
            style={{ fontSize: "16px" }}
          >
            {typedText}
            <span className="animate-pulse text-blue-400">|</span>
          </div>
          <p
            className="text-neutral-900 dark:text-gray-400 max-w-2xl leading-relaxed"
            style={{ fontSize: "14px", lineHeight: "1.4" }}
          >
            I'm a Computer Science graduate with experience in backend, web, and
            mobile development. I'm skilled in technologies like CodeIgniter,
            Flutter, Node.js, React, Golang, MySQL, and MongoDB.
          </p>
        </div>
      </div>
    </header>
  );
}
