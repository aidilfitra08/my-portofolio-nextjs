"use client";

import { useState, DragEvent } from "react";

interface CVUploadProps {
  onUploaded: (url: string) => void;
  currentUrl?: string | null;
}

const MAX_BYTES = 5 * 1024 * 1024; // 5MB

type MsgKind = "success" | "error" | "info" | null;

export default function CVUpload({ onUploaded, currentUrl }: CVUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageKind, setMessageKind] = useState<MsgKind>(null);
  const [dragOver, setDragOver] = useState(false);
  const [hasUploadedThisSession, setHasUploadedThisSession] = useState(false);
  const [lastUploadedName, setLastUploadedName] = useState<string | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    if (file.type !== "application/pdf") {
      setMessage("Only PDF files are allowed.");
      setMessageKind("error");
      return;
    }

    if (file.size > MAX_BYTES) {
      setMessage("File too large. Max size is 5MB.");
      setMessageKind("error");
      return;
    }

    if (hasUploadedThisSession && lastUploadedName === file.name) {
      setMessage("Please upload a different CV (same file detected).");
      setMessageKind("info");
      return;
    }

    setUploading(true);
    setMessage(null);
    setMessageKind(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload-cv", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Upload failed");
      }

      setMessage("CV uploaded successfully. Replaced existing file.");
      setMessageKind("success");
      setHasUploadedThisSession(true);
      setLastUploadedName(file.name);
      onUploaded("/data/cv.pdf");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      setMessage(msg);
      setMessageKind("error");
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    void handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div className="space-y-2">
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`w-full border-2 border-dashed rounded-md p-4 text-sm cursor-pointer transition-colors ${
          dragOver
            ? "border-accent-green bg-accent-green/10"
            : "border-accent-green border-opacity-50 hover:border-accent-green"
        } ${uploading ? "opacity-70" : ""}`}
        onClick={() => document.getElementById("cv-file-input")?.click()}
      >
        <p className="text-accent-green font-bold">
          {hasUploadedThisSession
            ? "Replace CV (uploaded this session)"
            : "Drag & drop your CV (PDF, max 5MB)"}
        </p>
        <p className="text-[#a0a0a0] mt-1">
          {hasUploadedThisSession
            ? "Pick a different file to replace the current upload."
            : "Click to browse if you prefer."}
        </p>
      </div>

      <input
        id="cv-file-input"
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => {
          void handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      <div className="flex items-center gap-3 text-xs mt-1 flex-wrap">
        <span className="text-[#a0a0a0]">
          {currentUrl ? "Current CV available." : "No CV uploaded yet."}
        </span>
        {currentUrl && (
          <a
            href={currentUrl}
            target="_blank"
            rel="noreferrer"
            className="px-2 py-1 border border-accent-green text-accent-green rounded hover:bg-accent-green hover:text-black transition-colors"
          >
            View current CV
          </a>
        )}
      </div>

      {uploading && <p className="text-xs text-accent-green">Uploading...</p>}
      {message && (
        <p
          className={`text-xs ${
            messageKind === "error"
              ? "text-[#ff6b6b]"
              : messageKind === "success"
              ? "text-accent-green"
              : "text-[#a0a0a0]"
          }`}
        >
          {message}
        </p>
      )}
      <p className="text-[11px] text-[#a0a0a0]">
        Upload replaces the existing CV (stored as /public/data/cv.pdf). PDF
        only. Max 5MB.
      </p>
    </div>
  );
}
