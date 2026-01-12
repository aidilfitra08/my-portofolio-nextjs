"use client";

import Link from "next/link";
import {
  useState,
  useRef,
  useEffect,
  ClipboardEvent,
  KeyboardEvent,
  ChangeEvent,
  JSX,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSquare,
  faCopy,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function CharacterInput(): JSX.Element {
  const [values, setValues] = useState<string[]>(Array(6).fill(""));
  const [copied, setCopied] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const numInputs: number = 6;

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index: number, value: string): void => {
    if (value.length <= 1) {
      const newValues: string[] = [...values];
      newValues[index] = value;
      setValues(newValues);

      // Move to next input if value is entered
      if (value && index < numInputs - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newValues: string[] = [...values];

      if (values[index]) {
        // If current input has value, clear it
        newValues[index] = "";
        setValues(newValues);
      } else if (index > 0) {
        // If current input is empty, move to previous and clear it
        newValues[index - 1] = "";
        setValues(newValues);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedText: string = e.clipboardData.getData("text");

    if (pastedText) {
      const newValues: string[] = [...values];
      const chars: string[] = pastedText.split("").slice(0, numInputs);

      chars.forEach((char: string, i: number) => {
        if (i < numInputs) {
          newValues[i] = char;
        }
      });

      setValues(newValues);

      // Focus the input after the last pasted character
      const nextIndex: number = Math.min(chars.length, numInputs - 1);
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex]?.focus();
      }
    }
  };

  const handleClick = (index: number): void => {
    // Allow clicking on any input to focus it
    inputRefs.current[index]?.focus();
  };

  const getValue = (): string => {
    return values.join("");
  };

  const clearAll = (): void => {
    setValues(Array(numInputs).fill(""));
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8] dark:bg-[#0d0d0d] text-[#2a2a2a] dark:text-[#e0e0e0] font-mono relative overflow-hidden p-6">
      {/* Vintage scanline effect overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black to-transparent animate-pulse"></div>
      </div>

      <div className="max-w-2xl mx-auto relative">
        {/* Back button */}
        <Link
          href="/playground"
          className="group inline-flex items-center gap-3 mb-8 px-4 py-2 border-2 border-neutral-900 dark:border-accent-green bg-white dark:bg-[#1a1a1a] text-sm transition-all hover:translate-x-1 hover:-translate-y-1 relative"
        >
          <div className="absolute inset-0 border-2 border-neutral-900 dark:border-accent-green translate-x-1 translate-y-1 -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-neutral-900 dark:text-accent-green group-hover:animate-pulse"
          />
          <span className="text-neutral-900 dark:text-[#e0e0e0] font-bold tracking-wide">
            <span className="text-neutral-500 dark:text-accent-green">[</span>
            RETURN_PLAYGROUND
            <span className="text-neutral-500 dark:text-accent-green">]</span>
          </span>
        </Link>

        {/* Header */}
        <div className="mb-8 border-b-2 border-accent-green pb-4 flex items-center gap-3">
          <FontAwesomeIcon
            icon={faSquare}
            className="text-2xl text-neutral-900 dark:text-accent-green"
          />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              [CHARACTER_INPUT]
            </h1>
            <p className="text-sm text-neutral-600 dark:text-[#999] mt-1">
              <span className="text-[#ffb000]">$</span> input_handler --boxes=6
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className="relative">
          {/* Shadow */}
          <div className="absolute inset-0 border-2 border-neutral-900 dark:border-accent-green translate-x-2 translate-y-2 -z-10 opacity-70"></div>

          <div className="border-2 border-accent-green bg-[#faf8f3] dark:bg-[#1a1a1a] p-6 md:p-8 rounded-lg shadow-2xl relative overflow-hidden">
            {/* Corner accents */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-accent-green"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-accent-green"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-accent-green"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-accent-green"></div>

            <div className="text-center mb-6">
              <p className="text-sm text-neutral-600 dark:text-[#999]">
                Enter one character per box. Use backspace to go back, or paste
                text from clipboard.
              </p>
            </div>

            <div className="flex justify-center gap-2 mb-6 flex-wrap">
              {values.map((value: string, index: number) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  value={value}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(index, e.target.value)
                  }
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                    handleKeyDown(index, e)
                  }
                  onPaste={handlePaste}
                  onClick={() => handleClick(index)}
                  className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-bold border-2 border-accent-green bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-accent-green rounded focus:outline-none focus:ring-2 focus:ring-accent-green transition-all"
                  maxLength={1}
                />
              ))}
            </div>

            <div className="space-y-5">
              <div className="text-center">
                <p className="text-sm text-neutral-600 dark:text-[#999] mb-2">
                  <span className="text-accent-green">$</span> output_value:
                </p>
                <div className="border-2 border-accent-green bg-[#0a0a0a] text-accent-green rounded p-4 text-center">
                  <p className="text-xl font-mono font-bold break-all">
                    {getValue() || "[EMPTY]"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={clearAll}
                  className="flex-1 px-4 py-3 border-2 border-red-600 bg-red-600 text-white font-bold tracking-wide rounded hover:bg-transparent hover:text-red-600 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faTrash} />
                  Clear All
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(getValue());
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1600);
                  }}
                  className="flex-1 px-4 py-3 border-2 border-accent-green bg-accent-green text-white dark:text-[#0d0d0d] font-bold tracking-wide rounded hover:bg-transparent hover:text-accent-green transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  disabled={!getValue()}
                >
                  <FontAwesomeIcon icon={faCopy} />
                  {copied ? "Copied!" : "Copy Value"}
                </button>
              </div>
            </div>

            <div className="mt-6 text-xs text-neutral-600 dark:text-[#999] leading-relaxed bg-[#f1ede3] dark:bg-[#111] border border-neutral-300 dark:border-neutral-700 rounded p-4">
              <p className="font-bold mb-2 text-accent-green">→ Tips:</p>
              <ul className="space-y-1 pl-4">
                <li>
                  <span className="text-accent-green">▸</span> Type to
                  auto-advance to next box
                </li>
                <li>
                  <span className="text-accent-green">▸</span> Backspace to go
                  back and clear
                </li>
                <li>
                  <span className="text-accent-green">▸</span> Paste text to
                  fill multiple boxes
                </li>
                <li>
                  <span className="text-accent-green">▸</span> Click any box to
                  focus it
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
