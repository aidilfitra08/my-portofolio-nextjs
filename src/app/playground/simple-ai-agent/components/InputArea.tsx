import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faMicrophone,
  faMicrophoneSlash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

interface InputAreaProps {
  input: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
  speechSupported: boolean;
  isListening: boolean;
  onToggleListening: () => void;
  useStreaming: boolean;
  onStreamingChange: (value: boolean) => void;
  autoRetrieve: boolean;
  onAutoRetrieveChange: (value: boolean) => void;
  retrieveLimit: number;
  onRetrieveLimitChange: (value: number) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export default function InputArea({
  input,
  onInputChange,
  onSendMessage,
  isLoading,
  speechSupported,
  isListening,
  onToggleListening,
  useStreaming,
  onStreamingChange,
  autoRetrieve,
  onAutoRetrieveChange,
  retrieveLimit,
  onRetrieveLimitChange,
  onKeyPress,
}: InputAreaProps) {
  return (
    <div className="sticky bottom-0 p-4 z-20">
      <div className="max-w-4xl mx-auto">
        <div className="vintage-card relative bg-white dark:bg-[#1a1a1a] border-2 border-neutral-900 dark:border-accent-green p-4">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="Type_message_here..."
              className="flex-1 resize-none bg-transparent text-neutral-900 dark:text-[#e0e0e0] placeholder-neutral-500 dark:placeholder-[#666] focus:outline-none min-h-[60px] max-h-32 font-mono text-sm"
              rows={1}
              disabled={isLoading}
            />

            {/* Voice Input Button */}
            {speechSupported && (
              <button
                onClick={onToggleListening}
                disabled={isLoading}
                className={`w-10 h-10 border-2 flex items-center justify-center transition-all ${
                  isListening
                    ? "border-[#ff6b6b] bg-[#ff6b6b] text-white animate-pulse"
                    : "border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#c0c0c0] hover:border-neutral-900 dark:hover:border-accent-green"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                title={isListening ? "Stop recording" : "Start voice input"}
              >
                <FontAwesomeIcon
                  icon={isListening ? faMicrophoneSlash : faMicrophone}
                />
              </button>
            )}

            <button
              onClick={onSendMessage}
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 border-2 border-neutral-900 dark:border-accent-green bg-neutral-900 dark:bg-accent-green text-white dark:text-[#0a0a0a] hover:bg-neutral-800 dark:hover:bg-[#00ff41] disabled:bg-neutral-300 dark:disabled:bg-neutral-700 disabled:border-neutral-300 dark:disabled:border-neutral-700 disabled:cursor-not-allowed flex items-center justify-center transition-all"
            >
              <FontAwesomeIcon
                icon={isLoading ? faSpinner : faPaperPlane}
                className={isLoading ? "animate-spin" : ""}
              />
            </button>
          </div>

          {/* Helper Text */}
          <div className="mt-2 text-xs text-neutral-600 dark:text-[#999] font-mono">
            <kbd className="px-1 py-0.5 bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-xs">
              Enter
            </kbd>{" "}
            to send •{" "}
            <kbd className="px-1 py-0.5 bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-xs">
              Shift+Enter
            </kbd>{" "}
            for new line
            {speechSupported && (
              <>
                {" "}
                • <FontAwesomeIcon icon={faMicrophone} className="mx-1" />
                for voice
                {isListening && (
                  <span className="ml-2 text-[#ff6b6b] font-bold animate-pulse">
                    🔴 LISTENING
                  </span>
                )}
              </>
            )}
          </div>

          {/* Chat Options - Commented for now, uncomment when needed */}
          {/* <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
            <label className="flex items-center gap-2 text-xs font-mono text-neutral-700 dark:text-[#999]">
              <input
                type="checkbox"
                checked={useStreaming}
                onChange={(e) => onStreamingChange(e.target.checked)}
              />
              STREAMING
            </label>
            <label className="flex items-center gap-2 text-xs font-mono text-neutral-700 dark:text-[#999]">
              <input
                type="checkbox"
                checked={autoRetrieve}
                onChange={(e) => onAutoRetrieveChange(e.target.checked)}
              />
              AUTO_RETRIEVE
            </label>
            <label className="flex items-center gap-2 text-xs font-mono text-neutral-700 dark:text-[#999]">
              LIMIT
              <input
                type="number"
                min={1}
                max={10}
                value={retrieveLimit}
                onChange={(e) =>
                  onRetrieveLimitChange(parseInt(e.target.value) || 3)
                }
                className="w-16 px-2 py-1 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#e0e0e0] font-mono text-xs focus:outline-none"
              />
            </label>
          </div> */}

          {/* Corner decorations */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-neutral-900 dark:border-accent-green" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-neutral-900 dark:border-accent-green" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-neutral-900 dark:border-accent-green" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-neutral-900 dark:border-accent-green" />
        </div>
      </div>
    </div>
  );
}
