import { useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faSpinner } from "@fortawesome/free-solid-svg-icons";
import MessageBubble from "./MessageBubble";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export default function ChatMessages({
  messages,
  isLoading,
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevMessageCountRef = useRef(messages.length);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }, []);

  // Only scroll when a NEW message is added, not when existing messages are updated
  useEffect(() => {
    if (messages.length > prevMessageCountRef.current) {
      scrollToBottom();
      prevMessageCountRef.current = messages.length;
    }
  }, [messages.length, scrollToBottom]);

  return (
    <div className="flex-1 overflow-hidden relative z-10 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col p-4">
        <div className="flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 border-2 border-neutral-900 dark:border-accent-green bg-neutral-100 dark:bg-accent-green/20 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faRobot}
                  className="text-neutral-900 dark:text-accent-green text-sm"
                />
              </div>
              <div className="vintage-card bg-white dark:bg-[#1a1a1a] border-2 border-neutral-300 dark:border-accent-green p-3 relative">
                <div className="flex items-center gap-2 font-mono text-sm">
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="text-neutral-900 dark:text-accent-green animate-spin"
                  />
                  <span className="text-neutral-700 dark:text-[#c0c0c0]">
                    Processing...
                  </span>
                </div>
                <div className="absolute -top-0.5 -left-0.5 w-2 h-2 border-t-2 border-l-2 border-neutral-300 dark:border-accent-green" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}
