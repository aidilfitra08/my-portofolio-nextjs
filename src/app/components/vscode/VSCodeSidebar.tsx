"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faFolderOpen,
  faFile,
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

interface FileItem {
  name: string;
  type: "file" | "folder";
  children?: FileItem[];
  content?: string;
  language?: string;
}

interface VSCodeSidebarProps {
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
  selectedFile: FileItem | null;
}

const VSCodeSidebar: React.FC<VSCodeSidebarProps> = ({
  files,
  onFileSelect,
  selectedFile,
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["src"])
  );

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFileTree = (items: FileItem[], depth = 0) => {
    return items.map((item, index) => (
      <div key={`${item.name}-${depth}-${index}`}>
        <div
          className={`flex items-center py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
            selectedFile?.name === item.name
              ? "bg-blue-100 dark:bg-blue-900"
              : ""
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => {
            if (item.type === "folder") {
              toggleFolder(item.name);
            } else {
              onFileSelect(item);
            }
          }}
        >
          {item.type === "folder" && (
            <FontAwesomeIcon
              icon={
                expandedFolders.has(item.name) ? faChevronDown : faChevronRight
              }
              className="w-3 h-3 mr-1 text-gray-500"
            />
          )}
          <FontAwesomeIcon
            icon={
              item.type === "folder"
                ? expandedFolders.has(item.name)
                  ? faFolderOpen
                  : faFolder
                : faFile
            }
            className={`w-4 h-4 mr-2 ${
              item.type === "folder" ? "text-blue-500" : "text-gray-600"
            }`}
          />
          <span className="text-sm text-gray-800 dark:text-gray-200">
            {item.name}
          </span>
        </div>
        {item.type === "folder" &&
          expandedFolders.has(item.name) &&
          item.children &&
          renderFileTree(item.children, depth + 1)}
      </div>
    ));
  };

  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto">
      <div className="p-2 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
          Explorer
        </h3>
      </div>
      <div className="py-2">{renderFileTree(files)}</div>
    </div>
  );
};

export default VSCodeSidebar;
