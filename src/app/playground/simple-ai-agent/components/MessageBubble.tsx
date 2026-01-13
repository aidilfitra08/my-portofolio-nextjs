import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRobot } from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { markdownComponents } from "../utils/markdownComponents";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div
      className={`flex items-start gap-3 ${
        message.sender === "user" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 border-2 flex items-center justify-center shrink-0 ${
          message.sender === "user"
            ? "border-neutral-900 dark:border-[#ffb000] bg-neutral-100 dark:bg-[#ffb000]/20"
            : "border-neutral-900 dark:border-accent-green bg-neutral-100 dark:bg-accent-green/20"
        }`}
      >
        <FontAwesomeIcon
          icon={message.sender === "user" ? faUser : faRobot}
          className={
            message.sender === "user"
              ? "text-neutral-900 dark:text-[#ffb000] text-sm"
              : "text-neutral-900 dark:text-accent-green text-sm"
          }
        />
      </div>

      {/* Message Bubble */}
      <div
        className={`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl vintage-card relative ${
          message.sender === "user"
            ? "bg-neutral-100 dark:bg-[#1a1a1a] border-2 border-neutral-900 dark:border-[#ffb000] p-3"
            : "bg-white dark:bg-[#1a1a1a] border-2 border-neutral-300 dark:border-accent-green p-3"
        }`}
      >
        {message.sender === "ai" ? (
          <div className="text-sm leading-relaxed font-mono prose prose-sm max-w-none text-neutral-900 dark:text-[#c0c0c0]">
            <ReactMarkdown
              components={markdownComponents}
              rehypePlugins={[rehypeHighlight]}
            >
              {message.text}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm leading-relaxed whitespace-pre-wrap font-mono text-neutral-900 dark:text-[#e0e0e0]">
            {message.text}
          </p>
        )}
        <p className="text-xs mt-2 text-neutral-500 dark:text-[#666] font-mono">
          [
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          ]
        </p>

        {/* Small corner decoration */}
        <div
          className={`absolute w-2 h-2 ${
            message.sender === "user"
              ? "-top-0.5 -right-0.5 border-t-2 border-r-2 border-neutral-900 dark:border-[#ffb000]"
              : "-top-0.5 -left-0.5 border-t-2 border-l-2 border-neutral-300 dark:border-accent-green"
          }`}
        />
      </div>
    </div>
  );
}
