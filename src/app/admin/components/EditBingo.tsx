"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faList, faPalette } from "@fortawesome/free-solid-svg-icons";
import { BINGO_THEMES } from "@/lib/bingo";

interface BingoData {
  title?: string;
  subtitle?: string;
  defaultThemeId?: string;
  texts: string[];
}

interface EditBingoProps {
  data: BingoData;
  onChange: (data: BingoData) => void;
}

export default function EditBingo({ data, onChange }: EditBingoProps) {
  const [textValue, setTextValue] = useState(data.texts.join("\n"));

  const handleFieldChange = (field: keyof BingoData, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleTextsChange = (value: string) => {
    setTextValue(value);

    const texts = value
      .split("\n")
      .map((text) => text.trim())
      .filter(Boolean);

    onChange({
      ...data,
      texts,
    });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <FontAwesomeIcon icon={faEdit} className="text-[#ffb000] text-xl" />
        <h2 className="text-2xl font-bold text-[#ffb000]">Edit Bingo</h2>
      </div>

      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-bold text-accent-green mb-2">
              Game Title
            </label>
            <input
              type="text"
              value={data.title || ""}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              className="w-full px-4 py-2 bg-[#f5f1e8] dark:bg-[#0a0a0a] border-2 border-accent-green border-opacity-30 text-[#2a2a2a] dark:text-[#e0e0e0] rounded font-mono text-sm focus:outline-none focus:border-accent-green"
              placeholder="Playground Bingo"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#00d9ff] mb-2">
              Default Theme
            </label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faPalette}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#00d9ff]"
              />
              <select
                value={data.defaultThemeId || BINGO_THEMES[0].id}
                onChange={(e) =>
                  handleFieldChange("defaultThemeId", e.target.value)
                }
                className="w-full appearance-none px-10 py-2 bg-[#f5f1e8] dark:bg-[#0a0a0a] border-2 border-[#00d9ff] border-opacity-30 text-[#2a2a2a] dark:text-[#e0e0e0] rounded font-mono text-sm focus:outline-none focus:border-[#00d9ff]"
              >
                {BINGO_THEMES.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-[#ff6b6b] mb-2">
            Subtitle / Instructions
          </label>
          <textarea
            value={data.subtitle || ""}
            onChange={(e) => handleFieldChange("subtitle", e.target.value)}
            rows={3}
            className="w-full px-4 py-2 bg-[#f5f1e8] dark:bg-[#0a0a0a] border-2 border-[#ff6b6b] border-opacity-30 text-[#2a2a2a] dark:text-[#e0e0e0] rounded font-mono text-sm focus:outline-none focus:border-[#ff6b6b] resize-none"
            placeholder="Click the matching tiles as you find them."
          />
        </div>

        <div>
          <div className="flex items-center justify-between gap-3 mb-2">
            <label className="flex items-center gap-2 text-sm font-bold text-[#00d9ff]">
              <FontAwesomeIcon icon={faList} className="w-4 h-4" />
              Bingo Texts
            </label>
            <span className="text-xs text-[#a0a0a0]">
              Add one text per line. Recommended: 25 or more.
            </span>
          </div>
          <textarea
            value={textValue}
            onChange={(e) => handleTextsChange(e.target.value)}
            rows={14}
            className="w-full px-4 py-3 bg-[#f5f1e8] dark:bg-[#0a0a0a] border-2 border-[#00d9ff] border-opacity-30 text-[#2a2a2a] dark:text-[#e0e0e0] rounded font-mono text-sm focus:outline-none focus:border-[#00d9ff] resize-y"
            placeholder={"Ship it\nDebug\nDeploy\nRefactor"}
          />
        </div>

        <div className="rounded border-2 border-accent-green bg-accent-green/5 p-4">
          <p className="text-xs uppercase tracking-[0.35em] text-accent-green">
            Preview
          </p>
          <p className="mt-2 text-sm text-[#2a2a2a] dark:text-[#e0e0e0]">
            <span className="font-bold text-accent-green">
              {data.title || "Playground Bingo"}
            </span>
            <br />
            {data.subtitle || "Click the matching tiles as you find them."}
            <br />
            <span className="text-xs text-[#a0a0a0]">
              {data.texts.length} bingo texts saved
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}