"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlus,
  faTrash,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface Skill {
  category: string;
  items: string[];
  color: string;
  bgColor: string;
  icon: string;
}

interface EditSkillsProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export default function EditSkills({ data, onChange }: EditSkillsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const handleAddSkillItem = (categoryIndex: number, item: string) => {
    const updated = [...data];
    if (!updated[categoryIndex].items.includes(item) && item.trim()) {
      updated[categoryIndex].items.push(item);
      onChange(updated);
    }
  };

  const handleRemoveSkillItem = (categoryIndex: number, itemIndex: number) => {
    const updated = [...data];
    updated[categoryIndex].items.splice(itemIndex, 1);
    onChange(updated);
  };

  const handleCategoryChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...data];
    (updated[index] as any)[field] = value;
    onChange(updated);
  };

  const skillGroupColorsMapping = {
    backend: { color: "accent-green", bgColor: "bg-accent-green" },
    frontend: { color: "[#00d9ff]", bgColor: "bg-[#00d9ff]" },
    database: { color: "[#ffb000]", bgColor: "bg-[#ffb000]" },
    tools: { color: "[#ff6b6b]", bgColor: "bg-[#ff6b6b]" },
    others: { color: "[#bd93f9]", bgColor: "bg-[#bd93f9]" },
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <FontAwesomeIcon icon={faEdit} className="text-[#00d9ff] text-xl" />
        <h2 className="text-2xl font-bold text-[#00d9ff]">Edit Skills</h2>
      </div>

      <div className="space-y-4">
        {data.map((skillGroup, categoryIndex) => (
          <div
            key={categoryIndex}
            className={`border-l-4 rounded-r-lg overflow-hidden bg-[#f5f1e8] dark:bg-[#0a0a0a]  ${skillGroup.color} `}
            // style={{
            //   borderColor:
            //     skillGroup.color === "text-accent-green"
            //       ? "#00ff41"
            //       : skillGroup.color === "text-[#00d9ff]"
            //       ? "#00d9ff"
            //       : skillGroup.color === "text-[#ffb000]"
            //       ? "#ffb000"
            //       : skillGroup.color === "text-[#ff6b6b]"
            //       ? "#ff6b6b"
            //       : "#bd93f9",
            // }}
          >
            <button
              onClick={() =>
                setExpandedIndex(
                  expandedIndex === categoryIndex ? null : categoryIndex
                )
              }
              className={`w-full p-4 flex items-center justify-between hover:${
                skillGroupColorsMapping[
                  skillGroup.category.toLowerCase() as keyof typeof skillGroupColorsMapping
                ]?.bgColor
              } hover:bg-opacity-5 transition-colors duration-200 group`}
            >
              <h3 className={`font-bold`}>{skillGroup.category}</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#a0a0a0]">
                  {skillGroup.items.length} skills
                </span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`text-[#a0a0a0] transition-transform duration-300 ${
                    expandedIndex === categoryIndex ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedIndex === categoryIndex
                  ? "max-h-[2000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-4 pb-4 border-t  border-opacity-10 dark:border-white dark:border-opacity-10">
                <div className="space-y-3 pt-4">
                  {skillGroup.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center gap-2 group animate-in fade-in slide-in-from-left-2 duration-300"
                      style={{ animationDelay: `${itemIndex * 50}ms` }}
                    >
                      <span className="text-[#ff6b6b] text-xs">►</span>
                      <span className="flex-1 text-sm text-[#2a2a2a] dark:text-[#c0c0c0]">
                        {item}
                      </span>
                      <button
                        onClick={() =>
                          handleRemoveSkillItem(categoryIndex, itemIndex)
                        }
                        className="p-1 text-[#ff6b6b] hover:bg-[#ff6b6b] hover:bg-opacity-20 rounded opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <div className="pt-4 flex items-center gap-2 border-t border-black border-opacity-10 dark:border-white dark:border-opacity-10">
                    <input
                      type="text"
                      placeholder="Add new skill..."
                      className="flex-1 px-3 py-1 text-sm bg-[#ffffff] dark:bg-[#1a1a1a] border border-black dark:border-white border-opacity-20 rounded focus:outline-none focus:border-opacity-100"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          const input = e.currentTarget;
                          handleAddSkillItem(categoryIndex, input.value);
                          input.value = "";
                        }
                      }}
                    />
                    <button
                      onClick={(e) => {
                        const input = e.currentTarget
                          .previousElementSibling as HTMLInputElement;
                        handleAddSkillItem(categoryIndex, input.value);
                        input.value = "";
                      }}
                      className="p-1 text-accent-green hover:bg-accent-green hover:bg-opacity-20 rounded"
                    >
                      <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
