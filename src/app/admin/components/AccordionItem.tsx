"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

interface AccordionItemProps {
  isExpanded: boolean;
  onToggle: () => void;
  onDelete?: () => void;
  borderColor: string;
  hoverBgColor?: string;
  header: ReactNode;
  subtitle?: string;
  children: ReactNode;
  showChevron?: boolean;
  itemCount?: number;
}

export default function AccordionItem({
  isExpanded,
  onToggle,
  onDelete,
  borderColor,
  hoverBgColor = "hover:bg-black hover:bg-opacity-5",
  header,
  subtitle,
  children,
  showChevron = true,
  itemCount,
}: AccordionItemProps) {
  return (
    <div
      className={`border-l-4 ${borderColor} rounded-r-lg overflow-hidden bg-[#f5f1e8] dark:bg-[#0a0a0a]`}
    >
      <div
        className={`flex items-center justify-between ${hoverBgColor} transition-colors duration-200 group`}
      >
        <button
          onClick={onToggle}
          className="flex-1 p-4 flex items-center justify-between transition-colors duration-200 text-left hover:cursor-pointer"
        >
          <div className="flex-1">
            {typeof header === "string" ? (
              <div>
                <p className="font-bold">{header}</p>
                {subtitle && (
                  <p className="text-xs text-[#a0a0a0] group-hover:text-white transition-colors duration-200">
                    {subtitle}
                  </p>
                )}
              </div>
            ) : (
              header
            )}
          </div>
          {showChevron && (
            <div className="flex items-center gap-2">
              {itemCount !== undefined && (
                <span className="text-sm text-[#a0a0a0] group-hover:text-white transition-colors duration-200">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
              )}
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`text-[#a0a0a0] group-hover:text-white transition-all duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </div>
          )}
        </button>
        {onDelete && (
          <div className="p-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-2 text-[#ff6b6b] hover:bg-[#ff6b6b] hover:bg-opacity-20 rounded transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 border-t border-black border-opacity-10 dark:border-white dark:border-opacity-10">
          <div className="pt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
