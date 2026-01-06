"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AccordionItem from "./AccordionItem";

interface Education {
  university: string;
  degree: string;
  gpa: string;
  startDate: string;
  endDate: string;
  location: string;
}

interface EditEducationProps {
  data: Education | Education[];
  onChange: (data: Education[]) => void;
}

export default function EditEducation({ data, onChange }: EditEducationProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  // Normalize data to always be an array
  const educationList: Education[] = Array.isArray(data) ? data : [data];

  const handleAddEducation = () => {
    const newEducation: Education = {
      university: "New University",
      degree: "Bachelor's Degree",
      gpa: "0.00/4.00",
      startDate: "Month Year",
      endDate: "Month Year",
      location: "Location",
    };
    onChange([...educationList, newEducation]);
  };

  const handleRemoveEducation = (index: number) => {
    onChange(educationList.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index: number, field: string, value: string) => {
    const updated = [...educationList];
    (updated[index] as any)[field] = value;
    onChange(updated);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <FontAwesomeIcon icon={faEdit} className="text-[#bd93f9] text-xl" />
        <h2 className="text-2xl font-bold text-[#bd93f9]">Edit Education</h2>
      </div>

      <div className="space-y-4 mb-6">
        {educationList.map((edu, index) => (
          <AccordionItem
            key={index}
            isExpanded={expandedIndex === index}
            onToggle={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
            onDelete={() => handleRemoveEducation(index)}
            borderColor="border-[#bd93f9]"
            header={
              <div className="text-left">
                <p className="font-bold text-[#00d9ff]">{edu.university}</p>
              </div>
            }
            hoverBgColor="hover:bg-neutral-300 dark:hover:bg-neutral-800"
            subtitle={edu.degree}
            showChevron={false}
          >
            <div className="space-y-4">
              {/* University */}
              <div>
                <label className="text-xs font-bold text-[#bd93f9]">
                  University / Institution
                </label>
                <input
                  type="text"
                  value={edu.university}
                  onChange={(e) =>
                    handleFieldChange(index, "university", e.target.value)
                  }
                  className="w-full mt-1 px-3 py-1 text-sm bg-[#ffffff] dark:bg-[#1a1a1a] border border-black dark:border-white border-opacity-20 rounded focus:outline-none focus:border-[#bd93f9]"
                />
              </div>

              {/* Degree */}
              <div>
                <label className="text-xs font-bold text-[#00d9ff]">
                  Degree / Program
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) =>
                    handleFieldChange(index, "degree", e.target.value)
                  }
                  className="w-full mt-1 px-3 py-1 text-sm bg-[#ffffff] dark:bg-[#1a1a1a] border border-black dark:border-white border-opacity-20 rounded focus:outline-none focus:border-[#00d9ff]"
                />
              </div>

              {/* GPA */}
              <div>
                <label className="text-xs font-bold text-[#ffb000]">
                  GPA / Score
                </label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) =>
                    handleFieldChange(index, "gpa", e.target.value)
                  }
                  className="w-full mt-1 px-3 py-1 text-sm bg-[#ffffff] dark:bg-[#1a1a1a] border border-black dark:border-white border-opacity-20 rounded focus:outline-none focus:border-[#ffb000]"
                  placeholder="3.60/4.00"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Start Date */}
                <div>
                  <label className="text-xs font-bold text-accent-green">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={edu.startDate}
                    onChange={(e) =>
                      handleFieldChange(index, "startDate", e.target.value)
                    }
                    className="w-full mt-1 px-3 py-1 text-sm bg-[#ffffff] dark:bg-[#1a1a1a] border border-black dark:border-white border-opacity-20 rounded focus:outline-none focus:border-accent-green"
                    placeholder="August 2019"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="text-xs font-bold text-accent-green">
                    End Date
                  </label>
                  <input
                    type="text"
                    value={edu.endDate}
                    onChange={(e) =>
                      handleFieldChange(index, "endDate", e.target.value)
                    }
                    className="w-full mt-1 px-3 py-1 text-sm bg-[#ffffff] dark:bg-[#1a1a1a] border border-black dark:border-white border-opacity-20 rounded focus:outline-none focus:border-accent-green"
                    placeholder="August 2024"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-xs font-bold text-[#ff6b6b]">
                  Location
                </label>
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) =>
                    handleFieldChange(index, "location", e.target.value)
                  }
                  className="w-full mt-1 px-3 py-1 text-sm bg-[#ffffff] dark:bg-[#1a1a1a] border border-black dark:border-white border-opacity-20 rounded focus:outline-none focus:border-[#ff6b6b]"
                />
              </div>
            </div>
          </AccordionItem>
        ))}
      </div>

      <button
        onClick={handleAddEducation}
        className="w-full py-3 px-4 border-2 border-dashed border-[#bd93f9] text-[#bd93f9] rounded font-bold hover:bg-[#bd93f9] hover:bg-opacity-10 hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
      >
        <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
        Add Education
      </button>
    </div>
  );
}
