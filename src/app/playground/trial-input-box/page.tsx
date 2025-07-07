"use client";

import {
  useState,
  useRef,
  useEffect,
  ClipboardEvent,
  KeyboardEvent,
  MouseEvent,
  ChangeEvent,
  JSX,
} from "react";

export default function CharacterInput(): JSX.Element {
  const [values, setValues] = useState<string[]>(Array(6).fill(""));
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
    <div className="min-h-screen dark:bg-neutral-800 bg-gray-50 flex items-center justify-center p-4 dark:text-gray-950">
      <div className="bg-white dark:bg-neutral-700 rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Character Input
          </h1>
          <p className="text-gray-600 text-sm dark:text-gray-100">
            Enter one character per box. Use backspace to go back, or paste text
            from clipboard.
          </p>
        </div>

        <div className="flex justify-center space-x-2 mb-6">
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
              className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              maxLength={1}
            />
          ))}
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-100 mb-2">
              Current Value:
            </p>
            <p className="text-lg font-mono bg-gray-100 px-4 py-2 rounded border">
              {getValue() || "Empty"}
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(getValue())}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              disabled={!getValue()}
            >
              Copy Value
            </button>
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-500 dark:text-gray-100 text-center">
          <p>Tips:</p>
          <ul className="mt-2 space-y-1">
            <li>• Type to auto-advance to next box</li>
            <li>• Backspace to go back and clear</li>
            <li>• Paste text to fill multiple boxes</li>
            <li>• Click any box to focus it</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
