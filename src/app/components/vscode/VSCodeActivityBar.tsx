"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faSearch,
  faCodeBranch,
  faBug,
  faPuzzlePiece,
  faGear,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

interface ActivityBarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const VSCodeActivityBar: React.FC<ActivityBarProps> = ({
  activeView,
  onViewChange,
}) => {
  const activityItems = [
    {
      id: "explorer",
      icon: faFolder,
      title: "Explorer",
      shortcut: "Ctrl+Shift+E",
    },
    {
      id: "search",
      icon: faSearch,
      title: "Search",
      shortcut: "Ctrl+Shift+F",
    },
    {
      id: "source-control",
      icon: faCodeBranch,
      title: "Source Control",
      shortcut: "Ctrl+Shift+G",
    },
    {
      id: "debug",
      icon: faBug,
      title: "Run and Debug",
      shortcut: "Ctrl+Shift+D",
    },
    {
      id: "extensions",
      icon: faPuzzlePiece,
      title: "Extensions",
      shortcut: "Ctrl+Shift+X",
    },
  ];

  const bottomItems = [
    {
      id: "accounts",
      icon: faUser,
      title: "Accounts",
    },
    {
      id: "settings",
      icon: faGear,
      title: "Manage",
    },
  ];

  return (
    <div className="w-12 bg-gray-800 dark:bg-gray-900 flex flex-col justify-between border-r border-gray-700">
      {/* Top Items */}
      <div className="flex flex-col">
        {activityItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-12 h-12 flex items-center justify-center hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors relative group ${
              activeView === item.id
                ? "bg-gray-700 dark:bg-gray-800 border-l-2 border-blue-500"
                : ""
            }`}
            title={`${item.title} (${item.shortcut})`}
          >
            <FontAwesomeIcon
              icon={item.icon}
              className={`w-5 h-5 ${
                activeView === item.id
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            />

            {/* Tooltip */}
            <div className="absolute left-12 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
              {item.title}
              <div className="text-gray-400">{item.shortcut}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom Items */}
      <div className="flex flex-col">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-12 h-12 flex items-center justify-center hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors relative group ${
              activeView === item.id
                ? "bg-gray-700 dark:bg-gray-800 border-l-2 border-blue-500"
                : ""
            }`}
            title={item.title}
          >
            <FontAwesomeIcon
              icon={item.icon}
              className={`w-5 h-5 ${
                activeView === item.id
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            />

            {/* Tooltip */}
            <div className="absolute left-12 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
              {item.title}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VSCodeActivityBar;
