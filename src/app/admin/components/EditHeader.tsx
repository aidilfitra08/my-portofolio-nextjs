"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUser } from "@fortawesome/free-solid-svg-icons";

interface EditHeaderProps {
  data: {
    greeting: string;
    name: string;
    title: string;
    description: string;
    location: string;
  };
  onChange: (data: any) => void;
}

export default function EditHeader({ data, onChange }: EditHeaderProps) {
  const handleChange = (field: string, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <FontAwesomeIcon icon={faEdit} className="text-accent-green text-xl" />
        <h2 className="text-2xl font-bold text-accent-green">
          Edit Header / About Section
        </h2>
      </div>

      <div className="space-y-6">
        {/* Greeting */}
        <div>
          <label className="block text-sm font-bold text-accent-green mb-2">
            Greeting
          </label>
          <input
            type="text"
            value={data.greeting}
            onChange={(e) => handleChange("greeting", e.target.value)}
            className="w-full px-4 py-2 bg-[#f5f1e8] dark:bg-[#0a0a0a] border-2 border-accent-green border-opacity-30 text-[#2a2a2a] dark:text-[#e0e0e0] rounded font-mono text-sm focus:outline-none focus:border-accent-green focus:shadow-lg focus:shadow-accent-green/30 transition-all duration-200"
          />
        </div>

        {/* Name */}
        <div>
          <label className="flex text-sm font-bold text-accent-green mb-2 items-center gap-2">
            <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
            Full Name
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full px-4 py-2 bg-[#f5f1e8] dark:bg-[#0a0a0a] border-2 border-accent-green border-opacity-30 text-[#2a2a2a] dark:text-[#e0e0e0] rounded font-mono text-sm focus:outline-none focus:border-accent-green focus:shadow-lg focus:shadow-accent-green/30 transition-all duration-200"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-bold text-[#00d9ff] mb-2">
            Professional Title
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full px-4 py-2 bg-[#f5f1e8] dark:bg-[#0a0a0a] border-2 border-[#00d9ff] border-opacity-30 text-[#2a2a2a] dark:text-[#e0e0e0] rounded font-mono text-sm focus:outline-none focus:border-[#00d9ff] focus:shadow-lg focus:shadow-[#00d9ff]/30 transition-all duration-200"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-bold text-[#ffb000] mb-2">
            Description / Bio
          </label>
          <textarea
            value={data.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={5}
            className="w-full px-4 py-2 bg-[#f5f1e8] dark:bg-[#0a0a0a] border-2 border-[#ffb000] border-opacity-30 text-[#2a2a2a] dark:text-[#e0e0e0] rounded font-mono text-sm focus:outline-none focus:border-[#ffb000] focus:shadow-lg focus:shadow-[#ffb000]/30 transition-all duration-200 resize-none"
          />
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

        {/* Preview */}
        <div className="mt-8 p-4 rounded border-4 border-accent-green bg-opacity-5">
          <p className="text-xs text-white font-bold mb-2">PREVIEW</p>
          <p className="text-sm">
            <span className="text-[#2a2a2a] dark:text-[#e0e0e0]">
              {data.greeting}
            </span>
            <br />
            <span className="text-lg font-bold text-accent-green">
              {data.name}
            </span>
            <br />
            <span className="text-[#ffb000]">{data.title}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
