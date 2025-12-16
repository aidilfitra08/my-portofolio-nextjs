"use client";
import React, { useState } from "react";

import * as Papa from "papaparse";
import * as YAML from "yaml";
import { decode, encode } from "@toon-format/toon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faCircleExclamation,
  faDownload,
  faFileLines,
  faUpload,
  faArrowLeft,
  faTerminal,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function FileConverter() {
  const [inputFormat, setInputFormat] = useState("csv");
  const [outputFormat, setOutputFormat] = useState("json");
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState("");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const formats = ["csv", "json", "json-compact", "yaml", "xml", "tsv", "toon"];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setInputData((event.target?.result as string) || "");
        setError("");
        setOutputData("");
      };
      reader.readAsText(file);
    }
  };

  const parseCSV = (text: any) => {
    return new Promise((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results: any) => resolve(results.data),
        error: (error: any) => reject(error),
      });
    });
  };

  const parseTSV = (text: any) => {
    return new Promise((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        delimiter: "\t",
        skipEmptyLines: true,
        complete: (results: any) => resolve(results.data),
        error: (error: any) => reject(error),
      });
    });
  };

  const parseXML = (text: any) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");

    const xmlToJson = (node: any) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.trim();
      }

      const obj: any = {};

      if (node.attributes) {
        for (let attr of node.attributes) {
          obj[`@${attr.name}`] = attr.value;
        }
      }

      const children: any = Array.from(node.childNodes);
      const textContent = children
        .filter((child: any) => child.nodeType === Node.TEXT_NODE)
        .map((child: any) => child.textContent.trim())
        .join("");

      if (
        textContent &&
        !children.some((child: any) => child.nodeType === Node.ELEMENT_NODE)
      ) {
        return textContent;
      }

      for (let child of children) {
        if (child.nodeType === Node.ELEMENT_NODE) {
          const name = child.nodeName;
          const value = xmlToJson(child);

          if (obj[name]) {
            if (Array.isArray(obj[name])) {
              obj[name].push(value);
            } else {
              obj[name] = [obj[name], value];
            }
          } else {
            obj[name] = value;
          }
        }
      }

      return obj;
    };

    return xmlToJson(xml.documentElement);
  };

  const jsonToXML = (obj: any, rootName = "root") => {
    const toXML: (data: any, name: any) => string = (data: any, name: any) => {
      if (Array.isArray(data)) {
        return data.map((item: any) => toXML(item, name)).join("");
      }

      if (typeof data === "object" && data !== null) {
        let xml = `<${name}>`;
        for (let key in data) {
          xml += toXML(data[key], key);
        }
        xml += `</${name}>`;
        return xml;
      }

      return `<${name}>${data}</${name}>`;
    };

    return `<?xml version="1.0" encoding="UTF-8"?>\n${toXML(obj, rootName)}`;
  };

  const convert = async () => {
    try {
      setError("");
      let data;

      // Parse input
      switch (inputFormat) {
        case "csv":
          data = await parseCSV(inputData);
          break;
        case "tsv":
          data = await parseTSV(inputData);
          break;
        case "json":
        case "json-compact":
          data = JSON.parse(inputData);
          break;
        case "yaml":
          data = YAML.parse(inputData);
          break;
        case "xml":
          data = parseXML(inputData);
          break;
        case "toon":
          data = decode(inputData);
          break;
        default:
          throw new Error("Unsupported input format");
      }

      // Convert to output
      let result;
      switch (outputFormat) {
        case "json":
          result = JSON.stringify(data, null, 2);
          break;
        case "json-compact":
          result = JSON.stringify(data);
          break;
        case "yaml":
          result = YAML.stringify(data);
          break;
        case "csv":
          result = Papa.unparse(Array.isArray(data) ? data : [data]);
          break;
        case "tsv":
          result = Papa.unparse(Array.isArray(data) ? data : [data], {
            delimiter: "\t",
          });
          break;
        case "xml":
          result = jsonToXML(data);
          break;
        case "toon":
          result = encode(data);
          break;
        default:
          throw new Error("Unsupported output format");
      }

      setOutputData(result);
    } catch (err: any) {
      setError(`Conversion error: ${err.message}`);
      setOutputData("");
    }
  };

  const downloadOutput = () => {
    const blob = new Blob([outputData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted.${outputFormat}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getFileExtension = (format: string) => {
    if (format === "json-compact") return ".json";
    return `.${format}`;
  };

  // Estimate token count (approximate: ~4 chars per token for English)
  const estimateTokens = (text: string) => {
    if (!text) return 0;
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const chars = text.length;
    return Math.ceil(Math.max(words / 0.75, chars / 4));
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] dark:bg-[#0a0a0a] relative flex flex-col">
      {/* Scanlines */}
      <div className="scanlines pointer-events-none" />
      {/* Retro grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 65, 0.25) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 65, 0.25) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b-2 border-neutral-300 dark:border-accent-green bg-white dark:bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
          <Link
            href="/playground"
            className="group inline-flex items-center gap-2 px-3 py-2 border-2 border-neutral-900 dark:border-accent-green bg-white dark:bg-[#1a1a1a] font-mono text-sm transition-all hover:translate-x-1 hover:-translate-y-1 relative"
          >
            <div className="absolute inset-0 border-2 border-neutral-900 dark:border-accent-green translate-x-1 translate-y-1 -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="text-neutral-900 dark:text-accent-green"
            />
            <span className="text-neutral-900 dark:text-[#e0e0e0] font-bold">
              BACK
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faTerminal}
              className="text-2xl text-neutral-900 dark:text-accent-green terminal-glow"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-mono font-bold text-neutral-900 dark:text-[#e0e0e0]">
                [FORMAT_CONVERTER]
              </h1>
              <p className="text-xs font-mono text-neutral-600 dark:text-[#999]">
                <span className="text-[#ffb000]">$</span> ./convert
                --multi-format
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="relative z-10 max-w-6xl mx-auto w-full flex-1 px-4 py-6 space-y-6">
        {/* Controls card */}
        <section className="vintage-card bg-white dark:bg-[#1a1a1a] border-2 border-neutral-900 dark:border-accent-green p-5 relative">
          {/* Formats row */}
          <div className="flex items-center gap-3 flex-wrap mb-5">
            <div className="flex-1 min-w-[180px]">
              <label className="block text-xs font-mono font-bold text-neutral-900 dark:text-accent-green mb-2">
                FROM
              </label>
              <select
                value={inputFormat}
                onChange={(e) => setInputFormat(e.target.value)}
                className="w-full px-3 py-2 border-2 border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#e0e0e0] font-mono text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-accent-green"
              >
                {formats.map((fmt) => (
                  <option key={fmt} value={fmt} className="dark:bg-[#0a0a0a]">
                    {fmt.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="px-3 py-2 border-2 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-[#c0c0c0] font-mono text-sm bg-neutral-50 dark:bg-[#0a0a0a] flex items-center gap-2">
              <FontAwesomeIcon icon={faArrowRightArrowLeft} />
              MAP
            </div>

            <div className="flex-1 min-w-[180px]">
              <label className="block text-xs font-mono font-bold text-neutral-900 dark:text-accent-green mb-2">
                TO
              </label>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                className="w-full px-3 py-2 border-2 border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#e0e0e0] font-mono text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-accent-green"
              >
                {formats.map((fmt) => (
                  <option key={fmt} value={fmt} className="dark:bg-[#0a0a0a]">
                    {fmt.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Upload */}
          <label className="flex items-center justify-center w-full px-4 py-5 border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-[#0a0a0a] cursor-pointer hover:border-neutral-900 dark:hover:border-accent-green transition-colors mb-5">
            <div className="flex flex-col items-center text-center">
              <FontAwesomeIcon
                icon={faUpload}
                className="text-neutral-500 dark:text-[#777] mb-2"
                size="lg"
              />
              <span className="text-sm font-mono text-neutral-700 dark:text-[#c0c0c0]">
                {fileName ||
                  `Click to upload ${inputFormat.toUpperCase()} file`}
              </span>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept={getFileExtension(inputFormat)}
            />
          </label>

          {/* Textareas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-mono font-bold text-neutral-900 dark:text-[#e0e0e0] flex items-center gap-2">
                  <FontAwesomeIcon icon={faFileLines} />
                  INPUT_DATA
                </label>
                <span className="text-xs font-mono text-neutral-700 dark:text-[#c0c0c0]">
                  ~{estimateTokens(inputData).toLocaleString()} tokens
                </span>
              </div>
              <textarea
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder={`Paste your ${inputFormat.toUpperCase()} data here...`}
                className="w-full h-64 px-4 py-3 border-2 border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#e0e0e0] font-mono text-sm resize-none focus:outline-none focus:border-neutral-900 dark:focus:border-accent-green"
              />
              <div className="text-xs font-mono text-neutral-600 dark:text-[#999]">
                Chars: {inputData.length.toLocaleString()} • Words:{" "}
                {inputData
                  .trim()
                  .split(/\s+/)
                  .filter(Boolean)
                  .length.toLocaleString()}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-mono font-bold text-neutral-900 dark:text-[#e0e0e0] flex items-center gap-2">
                  <FontAwesomeIcon icon={faFileLines} />
                  OUTPUT_DATA
                </label>
                <span className="text-xs font-mono text-neutral-700 dark:text-[#c0c0c0]">
                  ~{estimateTokens(outputData).toLocaleString()} tokens
                </span>
              </div>
              <textarea
                value={outputData}
                readOnly
                placeholder="Converted data will appear here..."
                className="w-full h-64 px-4 py-3 border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#e0e0e0] font-mono text-sm resize-none focus:outline-none focus:border-neutral-900 dark:focus:border-accent-green"
              />
              <div className="text-xs font-mono text-neutral-600 dark:text-[#999]">
                Chars: {outputData.length.toLocaleString()} • Words:{" "}
                {outputData
                  .trim()
                  .split(/\s+/)
                  .filter(Boolean)
                  .length.toLocaleString()}
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 border-2 border-[#ff6b6b] bg-red-50 dark:bg-[#ff6b6b]/10 flex items-start gap-3 font-mono text-sm text-[#b91c1c] dark:text-[#ffb3b3]">
              <FontAwesomeIcon icon={faCircleExclamation} className="mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <button
              onClick={convert}
              disabled={!inputData}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border-2 border-neutral-900 dark:border-accent-green bg-neutral-900 dark:bg-accent-green text-white dark:text-[#0a0a0a] font-mono font-bold hover:bg-neutral-800 dark:hover:bg-[#00ff41] disabled:bg-neutral-300 dark:disabled:bg-neutral-700 disabled:border-neutral-300 dark:disabled:border-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-all"
            >
              <FontAwesomeIcon icon={faFileLines} />
              CONVERT
            </button>
            <button
              onClick={downloadOutput}
              disabled={!outputData}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] font-mono font-bold text-neutral-900 dark:text-[#e0e0e0] hover:border-neutral-900 dark:hover:border-accent-green disabled:text-neutral-500 dark:disabled:text-neutral-500 disabled:border-neutral-300 dark:disabled:border-neutral-700 disabled:cursor-not-allowed transition-all"
            >
              <FontAwesomeIcon icon={faDownload} />
              DOWNLOAD
            </button>
          </div>

          {/* Supported conversions */}
          <div className="mt-6 bg-neutral-100 dark:bg-[#0a0a0a] border-2 border-neutral-300 dark:border-neutral-700 p-4">
            <h3 className="text-sm font-mono font-bold text-neutral-900 dark:text-accent-green mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faCalculator} />
              SUPPORTED_CONVERSIONS
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 text-xs font-mono text-neutral-700 dark:text-[#c0c0c0]">
              {formats.map((from) =>
                formats
                  .filter((to) => to !== from)
                  .map((to) => (
                    <div
                      key={`${from}-${to}`}
                      className="px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a]"
                    >
                      {from.toUpperCase()} → {to.toUpperCase()}
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-neutral-900 dark:border-accent-green pointer-events-none" />
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-neutral-900 dark:border-accent-green pointer-events-none" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-neutral-900 dark:border-accent-green pointer-events-none" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-neutral-900 dark:border-accent-green pointer-events-none" />
        </section>
      </main>
    </div>
  );
}
