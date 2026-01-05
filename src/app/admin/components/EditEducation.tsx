"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

interface EditEducationProps {
  data: {
    university: string;
    degree: string;
    gpa: string;
    startDate: string;
    endDate: string;
    location: string;
  };
  onChange: (data: any) => void;
}

export default function EditEducation({ data, onChange }: EditEducationProps) {
  const handleChange = (field: string, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <FontAwesomeIcon icon={faEdit} className="text-[#bd93f9] text-xl" />
        <h2 className="text-2xl font-bold text-[#bd93f9]">Edit Education</h2>
      </div>

      <div className="space-y-6">
        {/* University */}
        <div>
          <label className="block text-sm font-bold text-[#bd93f9] mb-2">
            University / Institution
          </label>
          <input
            type="text"
            value={data.university}
            onChange={(e) => handleChange("university", e.target.value)}
            className="w-full px-4 py-2 bg-[#f5f1e8] dark:bg-[#0a0a0a] border-2 border-[#bd93f9] border-opacity-30 text-[#2a2a2a] dark:text-[#e0e0e0] rounded font-mono text-sm focus:outline-none focus:border-[#bd93f9] focus:shadow-lg focus:shadow-[#bd93f9]/30 transition-all duration-200"
          />
        </div>

        {/* Degree */}
        <div>
          <label className="block text-sm font-bold text-[#00d9ff] mb-2">
            Degree / Program
          </label>
          <input
            type="text"
            value={data.degree}
            onChange={(e) => handleChange("degree", e.target.value)}
            className="w-full px-4 py-2 bg-[#f5f1e8] dark:bg-[#0a0a0a] border-2 border-[#00d9ff] border-opacity-30 text-[#2a2a2a] dark:text-[#e0e0e0] rounded font-mono text-sm focus:outline-none focus:border-[#00d9ff] focus:shadow-lg focus:shadow-[#00d9ff]/30 transition-all duration-200"
          />
        </div>

        {/* GPA */}
        <div>
          <label className="block text-sm font-bold text-[#ffb000] mb-2">
            GPA / Score
          </label>
          <input
            type="text"
            value={data.gpa}
            onChange={(e) => handleChange("gpa", e.target.value)}
            className="w-full px-4 py-2 bg-[#f5f1e8] dark:bg-[#0a0a0a] border-2 border-[#ffb000] border-opacity-30 text-[#2a2a2a] dark:text-[#e0e0e0] rounded font-mono text-sm focus:outline-none focus:border-[#ffb000] focus:shadow-lg focus:shadow-[#ffb000]/30 transition-all duration-200"
            placeholder="3.60/4.00"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Date */}
          <div>
            <label className="block text-sm font-bold text-accent-green mb-2">
              Start Date
            </label>
            <input
              type="text"
              value={data.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              className="w-full px-4 py-2 bg-[#f5f1e8] dark:bg-[#0a0a0a] border-2 border-accent-green border-opacity-30 text-[#2a2a2a] dark:text-[#e0e0e0] rounded font-mono text-sm focus:outline-none focus:border-accent-green focus:shadow-lg focus:shadow-accent-green/30 transition-all duration-200"
              placeholder="August 2019"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-bold text-accent-green mb-2">
              End Date
            </label>
            <input
              type="text"
              value={data.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              className="w-full px-4 py-2 bg-[#f5f1e8] dark:bg-[#0a0a0a] border-2 border-accent-green border-opacity-30 text-[#2a2a2a] dark:text-[#e0e0e0] rounded font-mono text-sm focus:outline-none focus:border-accent-green focus:shadow-lg focus:shadow-accent-green/30 transition-all duration-200"
              placeholder="August 2024"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-bold text-[#ff6b6b] mb-2">
            Location
          </label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="w-full px-4 py-2 bg-[#f5f1e8] dark:bg-[#0a0a0a] border-2 border-[#ff6b6b] border-opacity-30 text-[#2a2a2a] dark:text-[#e0e0e0] rounded font-mono text-sm focus:outline-none focus:border-[#ff6b6b] focus:shadow-lg focus:shadow-[#ff6b6b]/30 transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
}
