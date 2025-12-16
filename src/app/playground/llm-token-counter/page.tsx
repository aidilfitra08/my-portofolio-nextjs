"use client";

import {
  faCalculator,
  faDollarSign,
  faFileLines,
  faArrowLeft,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useMemo } from "react";
import Link from "next/link";

export default function TokenCalculatorPage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [inputPricePer1M, setInputPricePer1M] = useState("3.00");
  const [outputPricePer1M, setOutputPricePer1M] = useState("15.00");

  const models = [
    { name: "GPT-4 Turbo", input: 10.0, output: 30.0 },
    { name: "GPT-4", input: 30.0, output: 60.0 },
    { name: "GPT-3.5 Turbo", input: 0.5, output: 1.5 },
    { name: "Claude 3.5 Sonnet", input: 3.0, output: 15.0 },
    { name: "Claude 3 Opus", input: 15.0, output: 75.0 },
    { name: "Claude 3 Haiku", input: 0.25, output: 1.25 },
  ];

  const estimateTokens = (text: string) => {
    if (!text) return 0;
    const words = text.trim().split(/\s+/).length;
    const chars = text.length;
    return Math.ceil(Math.max(words / 0.75, chars / 4));
  };

  const calculations = useMemo(() => {
    const inputTokens = estimateTokens(inputText);
    const outputTokens = estimateTokens(outputText);
    const inputPrice = parseFloat(inputPricePer1M) || 0;
    const outputPrice = parseFloat(outputPricePer1M) || 0;
    const inputCost = (inputTokens / 1_000_000) * inputPrice;
    const outputCost = (outputTokens / 1_000_000) * outputPrice;
    const totalCost = inputCost + outputCost;
    return {
      inputTokens,
      outputTokens,
      inputCost: inputCost.toFixed(6),
      outputCost: outputCost.toFixed(6),
      totalCost: totalCost.toFixed(6),
      totalTokens: inputTokens + outputTokens,
    };
  }, [inputText, outputText, inputPricePer1M, outputPricePer1M]);

  const loadPreset = (model: (typeof models)[number]) => {
    setInputPricePer1M(model.input.toFixed(2));
    setOutputPricePer1M(model.output.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] dark:bg-[#0a0a0a] relative">
      {/* Scanlines effect */}
      <div className="scanlines pointer-events-none" />

      {/* Retro grid background */}
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

      <div className="max-w-6xl mx-auto px-4 py-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
          <Link
            href="/playground"
            className="group inline-flex items-center gap-2 px-3 py-2 border-2 border-neutral-900 dark:border-accent-green bg-white dark:bg-[#1a1a1a] font-mono text-sm transition-all hover:translate-x-1 hover:-translate-y-1 relative"
          >
            <div className="absolute inset-0 border-2 border-neutral-900 dark:border-accent-green translate-x-1 translate-y-1 -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="text-neutral-900 dark:text-accent-green group-hover:animate-pulse"
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
                [LLM_TOKEN_COUNTER]
              </h1>
              <p className="text-xs font-mono text-neutral-600 dark:text-[#999]">
                <span className="text-[#ffb000]">$</span> ./calc --tokens --cost
              </p>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="vintage-card bg-white dark:bg-[#1a1a1a] border-2 border-neutral-900 dark:border-accent-green p-5 md:p-6 relative">
          {/* Model presets */}
          <div className="mb-5">
            <h2 className="text-sm font-mono font-bold text-neutral-900 dark:text-accent-green mb-3">
              <span className="text-neutral-500 dark:text-[#999]">►</span>{" "}
              MODEL_PRESETS
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {models.map((model) => (
                <button
                  key={model.name}
                  onClick={() => loadPreset(model)}
                  className="px-3 py-2 border-2 border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-[#0a0a0a] font-mono text-xs text-neutral-900 dark:text-[#e0e0e0] hover:border-neutral-900 dark:hover:border-accent-green hover:translate-x-0.5 hover:-translate-y-0.5 transition-all"
                >
                  {model.name}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing inputs */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-mono font-bold text-neutral-900 dark:text-accent-green mb-2">
                INPUT_PRICE_PER_1M ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={inputPricePer1M}
                onChange={(e) => setInputPricePer1M(e.target.value)}
                className="w-full px-3 py-2 border-2 border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#e0e0e0] font-mono text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-accent-green"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-neutral-900 dark:text-accent-green mb-2">
                OUTPUT_PRICE_PER_1M ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={outputPricePer1M}
                onChange={(e) => setOutputPricePer1M(e.target.value)}
                className="w-full px-3 py-2 border-2 border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#e0e0e0] font-mono text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-accent-green"
              />
            </div>
          </div>

          {/* Textareas */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-mono font-bold text-neutral-900 dark:text-[#e0e0e0] flex items-center gap-2">
                  <FontAwesomeIcon icon={faFileLines} />
                  INPUT_TEXT (PROMPT)
                </label>
                <span className="text-xs font-mono text-neutral-700 dark:text-[#c0c0c0]">
                  {calculations.inputTokens.toLocaleString()} tokens
                </span>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your prompt here..."
                className="w-full h-64 px-4 py-3 border-2 border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#e0e0e0] font-mono text-sm resize-none focus:outline-none focus:border-neutral-900 dark:focus:border-accent-green"
              />
              <div className="mt-2 text-xs font-mono text-neutral-600 dark:text-[#999]">
                Characters: {inputText.length.toLocaleString()} | Words:{" "}
                {inputText
                  .trim()
                  .split(/\s+/)
                  .filter(Boolean)
                  .length.toLocaleString()}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-mono font-bold text-neutral-900 dark:text-[#e0e0e0] flex items-center gap-2">
                  <FontAwesomeIcon icon={faFileLines} />
                  OUTPUT_TEXT (RESPONSE)
                </label>
                <span className="text-xs font-mono text-neutral-700 dark:text-[#c0c0c0]">
                  {calculations.outputTokens.toLocaleString()} tokens
                </span>
              </div>
              <textarea
                value={outputText}
                onChange={(e) => setOutputText(e.target.value)}
                placeholder="Paste model response here..."
                className="w-full h-64 px-4 py-3 border-2 border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#e0e0e0] font-mono text-sm resize-none focus:outline-none focus:border-neutral-900 dark:focus:border-accent-green"
              />
              <div className="mt-2 text-xs font-mono text-neutral-600 dark:text-[#999]">
                Characters: {outputText.length.toLocaleString()} | Words:{" "}
                {outputText
                  .trim()
                  .split(/\s+/)
                  .filter(Boolean)
                  .length.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-neutral-100 dark:bg-[#0a0a0a] border-2 border-neutral-300 dark:border-neutral-700 rounded-lg p-4">
            <h2 className="text-sm font-mono font-bold text-neutral-900 dark:text-accent-green mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faDollarSign} />
              SUMMARY
            </h2>
            <div className="grid md:grid-cols-4 gap-3">
              <div className="p-3 border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a]">
                <div className="text-xs font-mono text-neutral-600 dark:text-[#999]">
                  INPUT_TOKENS
                </div>
                <div className="text-xl font-mono font-bold text-neutral-900 dark:text-[#e0e0e0]">
                  {calculations.inputTokens.toLocaleString()}
                </div>
                <div className="text-xs font-mono text-neutral-500 dark:text-[#777]">
                  ${calculations.inputCost}
                </div>
              </div>

              <div className="p-3 border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a]">
                <div className="text-xs font-mono text-neutral-600 dark:text-[#999]">
                  OUTPUT_TOKENS
                </div>
                <div className="text-xl font-mono font-bold text-neutral-900 dark:text-[#e0e0e0]">
                  {calculations.outputTokens.toLocaleString()}
                </div>
                <div className="text-xs font-mono text-neutral-500 dark:text-[#777]">
                  ${calculations.outputCost}
                </div>
              </div>

              <div className="p-3 border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a]">
                <div className="text-xs font-mono text-neutral-600 dark:text-[#999]">
                  TOTAL_TOKENS
                </div>
                <div className="text-xl font-mono font-bold text-neutral-900 dark:text-[#e0e0e0]">
                  {calculations.totalTokens.toLocaleString()}
                </div>
              </div>

              <div className="p-3 border-2 border-neutral-900 dark:border-accent-green bg-neutral-900 dark:bg-accent-green text-white dark:text-[#0a0a0a]">
                <div className="text-xs font-mono opacity-80">TOTAL_COST</div>
                <div className="text-xl font-mono font-bold">
                  ${calculations.totalCost}
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="mt-5 p-4 border-l-4 border-neutral-900 dark:border-accent-green bg-neutral-50 dark:bg-[#1a1a1a]">
            <p className="text-xs font-mono text-neutral-700 dark:text-[#c0c0c0] leading-relaxed">
              <span className="text-neutral-900 dark:text-accent-green font-bold">
                [INFO]
              </span>{" "}
              Token counts are estimated (~1 token ≈ 4 chars or 0.75 words). For
              exact counts, use the official tokenizer for your model. Pricing
              is per million tokens.
            </p>
          </div>

          {/* Corner decorations */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-neutral-900 dark:border-accent-green pointer-events-none" />
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-neutral-900 dark:border-accent-green pointer-events-none" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-neutral-900 dark:border-accent-green pointer-events-none" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-neutral-900 dark:border-accent-green pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
