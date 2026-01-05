"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

interface EditExperienceProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export default function EditExperience({
  data,
  onChange,
}: EditExperienceProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const handleAddExperience = () => {
    const newExperience: Experience = {
      title: "New Position",
      company: "Company Name",
      location: "Location",
      startDate: "Start Date",
      endDate: "End Date",
      responsibilities: [],
    };
    onChange([...data, newExperience]);
  };

  const handleRemoveExperience = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index: number, field: string, value: any) => {
    const updated = [...data];
    (updated[index] as any)[field] = value;
    onChange(updated);
  };

  const handleAddResponsibility = (
    expIndex: number,
    responsibility: string
  ) => {
    const updated = [...data];
    if (
      responsibility.trim() &&
      !updated[expIndex].responsibilities.includes(responsibility)
    ) {
      updated[expIndex].responsibilities.push(responsibility);
      onChange(updated);
    }
  };

  const handleRemoveResponsibility = (expIndex: number, respIndex: number) => {
    const updated = [...data];
    updated[expIndex].responsibilities.splice(respIndex, 1);
    onChange(updated);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <FontAwesomeIcon icon={faEdit} className="text-[#ffb000] text-xl" />
        <h2 className="text-2xl font-bold text-[#ffb000]">Edit Experience</h2>
      </div>

      <div className="space-y-4 mb-6">
        {data.map((exp, index) => (
          <div
            key={index}
            className="border-l-4 border-[#ffb000] rounded-r-lg overflow-hidden bg-[#f5f1e8] dark:bg-[#0a0a0a]"
          >
            <div className="flex items-center justify-between transition-colors duration-200 hover:bg-black hover:bg-opacity-5">
              <button
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
                className="w-full p-4 flex items-center justify-between transition-colors duration-200"
              >
                <div className="text-left">
                  <p className="font-bold text-[#00d9ff]">{exp.title}</p>
                  <p className="text-xs text-[#a0a0a0]">{exp.company}</p>
                </div>
              </button>
              <div className="p-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveExperience(index);
                  }}
                  className="p-2 text-[#ff6b6b] hover:bg-[#ff6b6b] hover:bg-opacity-20 rounded"
                >
                  <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedIndex === index
                  ? "max-h-[2000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-4 pb-4 border-t border-black border-opacity-10 dark:border-white dark:border-opacity-10">
                <div className="space-y-4 pt-4">
                  {/* Title */}
                  <div>
                    <label className="text-xs font-bold text-[#00d9ff]">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) =>
                        handleFieldChange(index, "title", e.target.value)
                      }
                      className="w-full mt-1 px-3 py-1 text-sm bg-[#ffffff] dark:bg-[#1a1a1a] border border-black dark:border-white border-opacity-20 rounded focus:outline-none focus:border-[#00d9ff]"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="text-xs font-bold text-accent-green">
                      Company
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) =>
                        handleFieldChange(index, "company", e.target.value)
                      }
                      className="w-full mt-1 px-3 py-1 text-sm bg-[#ffffff] dark:bg-[#1a1a1a] border border-black dark:border-white border-opacity-20 rounded focus:outline-none focus:border-accent-green"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Location */}
                    <div>
                      <label className="text-xs font-bold text-[#ff6b6b]">
                        Location
                      </label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) =>
                          handleFieldChange(index, "location", e.target.value)
                        }
                        className="w-full mt-1 px-3 py-1 text-sm bg-[#ffffff] dark:bg-[#1a1a1a] border border-black dark:border-white border-opacity-20 rounded focus:outline-none focus:border-[#ff6b6b]"
                      />
                    </div>

                    {/* Start Date */}
                    <div>
                      <label className="text-xs font-bold text-[#ffb000]">
                        Start Date
                      </label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) =>
                          handleFieldChange(index, "startDate", e.target.value)
                        }
                        className="w-full mt-1 px-3 py-1 text-sm bg-[#ffffff] dark:bg-[#1a1a1a] border border-black dark:border-white border-opacity-20 rounded focus:outline-none focus:border-[#ffb000]"
                      />
                    </div>

                    {/* End Date */}
                    <div>
                      <label className="text-xs font-bold text-[#ffb000]">
                        End Date
                      </label>
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) =>
                          handleFieldChange(index, "endDate", e.target.value)
                        }
                        className="w-full mt-1 px-3 py-1 text-sm bg-[#ffffff] dark:bg-[#1a1a1a] border border-black dark:border-white border-opacity-20 rounded focus:outline-none focus:border-[#ffb000]"
                      />
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="border-t border-black border-opacity-10 dark:border-white dark:border-opacity-10 pt-3">
                    <label className="text-xs font-bold text-accent-green block mb-2">
                      Responsibilities
                    </label>
                    <div className="space-y-2 mb-3">
                      {exp.responsibilities.map((resp, respIndex) => (
                        <div
                          key={respIndex}
                          className="flex items-start gap-2 group"
                        >
                          <span className="text-[#ff6b6b] text-xs mt-1 shrink-0">
                            ►
                          </span>
                          <span className="flex-1 text-xs text-[#2a2a2a] dark:text-[#c0c0c0] wrap-break-word">
                            {resp}
                          </span>
                          <button
                            onClick={() =>
                              handleRemoveResponsibility(index, respIndex)
                            }
                            className="p-1 text-[#ff6b6b] hover:bg-[#ff6b6b] hover:bg-opacity-20 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 shrink-0"
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="w-3 h-3"
                            />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Add responsibility..."
                        className="flex-1 px-2 py-1 text-xs bg-[#ffffff] dark:bg-[#1a1a1a] border border-black dark:border-white border-opacity-20 rounded focus:outline-none focus:border-opacity-100"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            const input = e.currentTarget;
                            handleAddResponsibility(index, input.value);
                            input.value = "";
                          }
                        }}
                      />
                      <button
                        onClick={(e) => {
                          const input = e.currentTarget
                            .previousElementSibling as HTMLInputElement;
                          handleAddResponsibility(index, input.value);
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
          </div>
        ))}
      </div>

      <button
        onClick={handleAddExperience}
        className="w-full py-3 px-4 border-2 border-dashed border-[#ffb000] text-[#ffb000] rounded font-bold hover:bg-[#ffb000] hover:bg-opacity-10 hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
      >
        <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
        Add Experience
      </button>
    </div>
  );
}
