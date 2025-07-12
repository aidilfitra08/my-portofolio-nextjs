"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChevronDown,
  faChevronRight,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";

const VSCodeSearchPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [replaceQuery, setReplaceQuery] = useState("");
  const [showReplace, setShowReplace] = useState(false);
  const [searchResults] = useState([
    {
      file: "src/components/Header.tsx",
      matches: [
        {
          line: 5,
          preview: "const Header: React.FC<HeaderProps> = ({ title }) => {",
          match: "Header",
        },
        {
          line: 8,
          preview: '      <h1 className="text-2xl font-bold">{title}</h1>',
          match: "title",
        },
      ],
    },
    {
      file: "src/pages/index.tsx",
      matches: [
        {
          line: 12,
          preview: '        <Header title="Welcome to VS Code Clone" />',
          match: "Header",
        },
      ],
    },
  ]);

  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full flex flex-col">
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">
          Search
        </h3>

        {/* Search Input */}
        <div className="relative mb-2">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
          />
        </div>

        {/* Replace Toggle */}
        <button
          onClick={() => setShowReplace(!showReplace)}
          className="mb-2 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center"
        >
          <FontAwesomeIcon
            icon={showReplace ? faChevronDown : faChevronRight}
            className="w-3 h-3 mr-1"
          />
          Replace
        </button>

        {/* Replace Input */}
        {showReplace && (
          <div className="relative mb-2">
            <input
              type="text"
              placeholder="Replace"
              value={replaceQuery}
              onChange={(e) => setReplaceQuery(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FontAwesomeIcon
              icon={faExchangeAlt}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
            />
          </div>
        )}

        {/* Search Options */}
        <div className="flex flex-wrap gap-1 text-xs">
          <label className="flex items-center text-gray-600 dark:text-gray-400">
            <input type="checkbox" className="mr-1" />
            Match Case
          </label>
          <label className="flex items-center text-gray-600 dark:text-gray-400">
            <input type="checkbox" className="mr-1" />
            Regex
          </label>
        </div>
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto p-2">
        {searchQuery && (
          <div className="mb-3">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              3 results in 2 files
            </div>

            {searchResults.map((result, fileIndex) => (
              <div key={fileIndex} className="mb-3">
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="w-3 h-3 mr-1 text-gray-500"
                  />
                  {result.file}
                  <span className="ml-auto text-xs text-gray-500">
                    {result.matches.length}
                  </span>
                </div>

                {result.matches.map((match, matchIndex) => (
                  <div
                    key={matchIndex}
                    className="ml-4 py-1 px-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded"
                  >
                    <div className="text-gray-600 dark:text-gray-400">
                      Line {match.line}
                    </div>
                    <div className="text-gray-800 dark:text-gray-200 font-mono">
                      {match.preview.split(match.match).map((part, i, arr) => (
                        <span key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <span className="bg-yellow-200 dark:bg-yellow-600 text-black">
                              {match.match}
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {!searchQuery && (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            <FontAwesomeIcon icon={faSearch} className="w-8 h-8 mb-2" />
            <p className="text-sm">Enter a search term to find files</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VSCodeSearchPanel;
