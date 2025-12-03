"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function Notes() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const quotes = [
    {
      text: "First, solve the problem. Then, write the code.",
      author: "John Johnson",
    },
    {
      text: "Code is like humor. When you have to explain it, it's bad.",
      author: "Cory House",
    },
    {
      text: "The best error message is the one that never shows up.",
      author: "Thomas Fuchs",
    },
    {
      text: "Simplicity is the ultimate sophistication.",
      author: "Leonardo da Vinci",
    },
    {
      text: "Make it work, make it right, make it fast.",
      author: "Kent Beck",
    },
  ];

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % 2);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + 2) % 2);
  };

  return (
    <div className="fixed right-4 bottom-4 z-50">
      {/* Notebook */}
      <div
        className={`relative transition-all duration-300 ${
          isOpen ? "w-80 h-96" : "w-16 h-20"
        }`}
      >
        {/* Notebook Cover */}
        <div
          className={`absolute inset-0 bg-linear-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 rounded-lg shadow-2xl border-2 border-amber-300 dark:border-amber-700 cursor-pointer transition-all duration-300 ${
            isOpen ? "rotate-0" : "rotate-3"
          }`}
          onClick={() => !isOpen && setIsOpen(true)}
        >
          {/* Spiral Binding */}
          <div className="absolute left-2 top-0 bottom-0 w-1 bg-linear-to-b from-gray-400 to-gray-600 rounded-full"></div>
          <div className="absolute left-1 top-4 w-3 h-3 bg-gray-300 rounded-full shadow-inner"></div>
          <div className="absolute left-1 top-12 w-3 h-3 bg-gray-300 rounded-full shadow-inner"></div>
          <div className="absolute left-1 bottom-12 w-3 h-3 bg-gray-300 rounded-full shadow-inner"></div>
          <div className="absolute left-1 bottom-4 w-3 h-3 bg-gray-300 rounded-full shadow-inner"></div>

          {/* Notebook Label */}
          {!isOpen && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-semibold text-amber-800 dark:text-amber-200 transform -rotate-3">
                Notes
              </span>
            </div>
          )}

          {/* Notebook Content */}
          {isOpen && (
            <div className="p-6 pl-8 h-full overflow-hidden relative">
              {/* Ruled Lines Background */}
              {/* <div className="absolute left-8 right-4 top-16 bottom-16 opacity-30">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-6 border-b border-blue-400 dark:border-blue-500"
                  ></div>
                ))}
              </div> */}

              {/* Page Content Container */}
              <div className="relative z-10 h-full">
                {/* Page 1: Contact Information */}
                {currentPage === 0 && (
                  <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="mb-4 pb-2 border-b-2 border-blue-400 dark:border-blue-600">
                      <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 handwriting">
                        Contact Notes
                      </h3>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date().toLocaleDateString()}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3 text-sm text-gray-800 dark:text-gray-200">
                      <div className="handwriting leading-6">
                        <p className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                          📞 Get in touch:
                        </p>

                        <div className="space-y-2 ml-4">
                          <p className="flex items-center gap-2">
                            <span className="text-red-600">✉️</span>
                            <span className="font-mono text-xs bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded-sm">
                              aidil.fitra.work@gmail.com
                            </span>
                          </p>

                          <Link
                            href="https://www.linkedin.com/in/aidilfitra/"
                            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors underline decoration-wavy"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="text-blue-500">🔗</span>
                            LinkedIn Profile
                          </Link>

                          <Link
                            href="https://www.github.com/aidilfitra08/"
                            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors underline decoration-wavy"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="text-blue-500">🔗</span>
                            Github Profile
                          </Link>

                          <div className="mt-4 p-2 bg-green-100 dark:bg-green-900 rounded-sm border-l-4 border-green-400">
                            <p className="text-green-800 dark:text-green-200 text-xs italic">
                              💡 Feel free to reach out for collaborations!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Page 2: Software Engineering Quotes */}
                {currentPage === 1 && (
                  <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="mb-4 pb-2 border-b-2 border-purple-400 dark:border-purple-600">
                      <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100 handwriting">
                        Dev Wisdom
                      </h3>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Quotes to Code By
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4 text-sm text-gray-800 dark:text-gray-200 overflow-auto scrollbar-hide">
                      <div className="handwriting leading-6">
                        {quotes.map((quote, index) => (
                          <div
                            key={index}
                            className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg border-l-4 border-purple-400"
                          >
                            <p className="text-purple-800 dark:text-purple-200 italic mb-2">
                              &quot;{quote.text}&quot;
                            </p>
                            <p className="text-xs text-purple-600 dark:text-purple-400 text-right">
                              — {quote.author}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Page Navigation */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
                  <button
                    onClick={prevPage}
                    className="w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-xs font-bold transition-colors shadow-md flex items-center justify-center"
                    disabled={currentPage === 0}
                  >
                    ‹
                  </button>

                  <div className="flex gap-1">
                    {[0, 1].map((pageIndex) => (
                      <div
                        key={pageIndex}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          currentPage === pageIndex
                            ? "bg-blue-500"
                            : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextPage}
                    className="w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-xs font-bold transition-colors shadow-md flex items-center justify-center"
                    disabled={currentPage === 1}
                  >
                    ›
                  </button>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  setCurrentPage(0); // Reset to first page when closing
                }}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs font-bold transition-colors shadow-md z-20"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Notebook Shadow */}
        <div
          className={`absolute inset-0 bg-amber-200 dark:bg-amber-800 rounded-lg transition-all duration-300 ${
            isOpen
              ? "-rotate-1 -z-10 translate-x-1 translate-y-1"
              : "rotate-1 -z-10 translate-x-1 translate-y-1"
          }`}
        ></div>
      </div>
    </div>
  );
}
