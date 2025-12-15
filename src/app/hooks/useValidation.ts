import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useState } from "react";

dayjs.extend(customParseFormat);

export type ValidatorFn = (
  value: any,
  values?: Record<string, any>
) => string | null;

export const required =
  (message = "This field is required"): ((v: any) => string | null) =>
  (v) =>
    v === undefined || v === null || (typeof v === "string" && v.trim() === "")
      ? message
      : null;

export const minLength = (min: number, message?: string) => (v: any) =>
  typeof v === "string" && v.trim().length < min
    ? message || `Minimum ${min} characters required`
    : null;

export const validLink =
  (message = "Invalid link format") =>
  (v: any) => {
    if (typeof v !== "string" || v.trim() === "") return null; // let required handle empty
    // Simple URL validation (http/https)
    try {
      const url = new URL(v);
      if (url.protocol === "http:" || url.protocol === "https:") return null;
      return message;
    } catch {
      return message;
    }
  };

export const noEmoticons =
  (message = "Emoticons are not allowed") =>
  (v: any) => {
    if (typeof v !== "string" || v.trim() === "") return null; // let required handle empty
    const emoticonRegex =
      /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;
    return emoticonRegex.test(v) ? message : null;
  };

export const maxLength = (max: number, message?: string) => (v: any) =>
  typeof v === "string" && v.trim().length > max
    ? message || `Maximum ${max} characters allowed`
    : null;

export const pattern =
  (regex: RegExp, message = "Invalid format") =>
  (v: any) => {
    if (typeof v !== "string" || v.trim() === "") return null; // let required handle empty
    return regex.test(v) ? null : message;
  };

export const email =
  (message = "Invalid email address") =>
  (v: any) => {
    if (typeof v !== "string" || v.trim() === "") return null; // let required handle empty
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(v) ? null : message;
  };

export const matchField =
  (otherFieldName: string, message = "Fields do not match") =>
  (v: any, values?: Record<string, any>) => {
    if (!values) return null;
    return v === values[otherFieldName] ? null : message;
  };

export const validDate =
  (message = "Invalid date", format?: string) =>
  (v: any) => {
    if (typeof v !== "string" || v.trim() === "") return null; // let required handle empty

    // If format provided, use strict parsing
    if (format) {
      return dayjs(v, format, true).isValid() ? null : message;
    }

    // Auto-detect: try common formats (order matters - more specific first)
    const commonFormats = [
      "YYYY-MM-DD HH:mm", // 2025-12-24 14:30
      "DD-MM-YYYY HH:mm", // 24-12-2025 14:30
      "DD/MM/YYYY HH:mm", // 24/12/2025 14:30
      "YYYY-MM-DD", // 2025-12-24
      "DD-MM-YYYY", // 24-12-2025
      "DD/MM/YYYY", // 24/12/2025
      "MM-DD-YYYY", // 12-24-2025
      "YYYY-MM-DD HH:mm:ss", // 2025-12-24 14:30:00
    ];

    for (const fmt of commonFormats) {
      if (dayjs(v, fmt, true).isValid()) {
        return null;
      }
    }

    return message;
  };

/**
 * maxFileSize validator
 * @param max - number (bytes) or string (e.g. "2MB", "500KB", "100B")
 * @param message - custom error message
 */
export const maxFileSize =
  (max: number | string, message?: string) => (v: any) => {
    if (!v) return null;

    let maxBytes: number = 0;
    if (typeof max === "number") {
      maxBytes = max;
    } else if (typeof max === "string") {
      const match = max
        .trim()
        .toUpperCase()
        .match(/^(\d+(?:\.\d+)?)(B|KB|MB|GB)$/);
      if (match) {
        const value = parseFloat(match[1] as string);
        const unit = match[2];
        switch (unit) {
          case "B":
            maxBytes = value;
            break;
          case "KB":
            maxBytes = value * 1024;
            break;
          case "MB":
            maxBytes = value * 1024 * 1024;
            break;
          case "GB":
            maxBytes = value * 1024 * 1024 * 1024;
            break;
          default:
            maxBytes = value;
        }
      } else {
        // fallback: try to parse as number
        maxBytes = Number(max) || 0;
      }
    }

    if (v.size > maxBytes)
      return message || `File size must be less than ${maxBytes} bytes`;
    return null;
  };

export default function useValidation(
  initialErrors: Record<string, string | null> = {}
) {
  const [errors, setErrors] =
    useState<Record<string, string | null>>(initialErrors);

  const validateField = (
    name: string,
    value: any,
    validators?: ValidatorFn[]
  ) => {
    if (!validators || validators.length === 0) {
      setErrors((prev) => ({ ...prev, [name]: null }));
      return true;
    }
    for (const v of validators) {
      const err = v(value);
      if (err) {
        setErrors((prev) => ({ ...prev, [name]: err }));
        return false;
      }
    }
    setErrors((prev) => ({ ...prev, [name]: null }));
    return true;
  };

  const validateAll = (
    values: Record<string, any>,
    rules: Record<string, ValidatorFn[]>
  ) => {
    const next: Record<string, string | null> = {};
    let ok = true;
    for (const key in rules) {
      const validators = rules[key] || [];
      const value = getValueByPath(values, key); // <-- use helper here
      let fieldErr: string | null = null;
      for (const v of validators) {
        const err = v(value, values);
        if (err) {
          fieldErr = err;
          ok = false;
          break;
        }
      }
      next[key] = fieldErr;
    }
    setErrors(next);
    return ok;
  };

  function getValueByPath(obj: any, path: string) {
    return path.split(".").reduce((acc, key) => {
      // convert array index if needed
      const idx = Number(key);
      return Array.isArray(acc) && !isNaN(idx) ? acc[idx] : acc?.[key];
    }, obj);
  }

  const clearErrors = () => setErrors({});

  return { errors, setErrors, validateField, validateAll, clearErrors };
}
