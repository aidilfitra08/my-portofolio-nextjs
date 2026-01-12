"use client";

import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faRobot,
  faUser,
  faSpinner,
  faUserCog,
  faMicrophone,
  faMicrophoneSlash,
  faTerminal,
  faArrowLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import Link from "next/link";

// Add this to your global CSS or import it
import "highlight.js/styles/github-dark.css";

// Add this interface for speech recognition
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror:
    | ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any)
    | null;
  onresult:
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any)
    | null;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface PersonalInfo {
  name?: string;
  job?: string;
  location?: string;
  interests?: string[];
  personalDetails?: string[];
}

export default function SimpleAIAgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI assistant. Feel free to tell me about yourself - your name, job, interests, or anything else. I'll remember it during our conversation to make our chat more personal! 🎤 You can also use voice input by clicking the microphone button.",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({});
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Speech recognition states
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      setSpeechSupported(!!SpeechRecognition);

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        const recognition = recognitionRef.current;

        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let transcript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          setInput(transcript);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
        };
      }
    }
  }, []);

  // Load personal info from session storage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPersonalInfo = sessionStorage.getItem("ai-chat-personal-info");
      if (savedPersonalInfo) {
        setPersonalInfo(JSON.parse(savedPersonalInfo));
      }
    }
  }, []);

  // Save personal info to session storage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "ai-chat-personal-info",
        JSON.stringify(personalInfo)
      );
    }
  }, [personalInfo]);

  // Speech recognition toggle function
  const toggleListening = () => {
    if (!recognitionRef.current || isLoading) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Failed to start speech recognition:", error);
      }
    }
  };

  // Extract personal information from user messages
  const extractPersonalInfo = (message: string): Partial<PersonalInfo> => {
    const lowerMessage = message.toLowerCase();
    const extracted: Partial<PersonalInfo> = {};

    const namePatterns = [
      /(?:my name is|call me|i'm called|name's|name is)\s+([a-zA-Z]+)/i,
      /(?:^|\s)(?:i'm|i am)\s+([A-Z][a-z]+)(?:\s|$|[.!?])/i,
    ];

    for (const pattern of namePatterns) {
      const match = message.match(pattern);
      if (match && match[1]) {
        const excludedWords = [
          "developer",
          "engineer",
          "designer",
          "programmer",
          "student",
          "teacher",
          "manager",
          "analyst",
          "consultant",
          "freelancer",
          "entrepreneur",
          "working",
          "learning",
          "studying",
          "coding",
          "building",
          "creating",
          "passionate",
          "interested",
          "experienced",
          "new",
          "senior",
          "junior",
          "software",
          "web",
          "mobile",
          "frontend",
          "backend",
          "fullstack",
          "happy",
          "excited",
          "looking",
          "trying",
          "hoping",
          "planning",
        ];

        const potentialName = match[1].toLowerCase();
        if (!excludedWords.includes(potentialName)) {
          extracted.name = match[1];
          break;
        }
      }
    }

    const jobPatterns = [
      /(?:i work as|my job is|i work in|profession is|i do|my role is)\s+([^.!?]+)/i,
      /(?:i'm a|i am a)\s+(software engineer|web developer|mobile developer|frontend developer|backend developer|fullstack developer|developer|designer|teacher|student|manager|doctor|nurse|lawyer|artist|writer|programmer|analyst|consultant|freelancer|entrepreneur|engineer)/i,
    ];

    for (const pattern of jobPatterns) {
      const match = message.match(pattern);
      if (match && match[1]) {
        extracted.job = match[1].trim();
        break;
      }
    }

    const locationPatterns = [
      /(?:i live in|i'm from|i'm located in|based in|from)\s+([^.!?]+)/i,
    ];

    for (const pattern of locationPatterns) {
      const match = message.match(pattern);
      if (match && match[1]) {
        extracted.location = match[1].trim();
        break;
      }
    }

    const interestPatterns = [
      /(?:i like|i love|i enjoy|interested in|passion for|hobby is|hobbies are|i'm into)\s+([^.!?]+)/i,
    ];

    for (const pattern of interestPatterns) {
      const match = message.match(pattern);
      if (match && match[1]) {
        const interests = match[1]
          .split(/,|\sand\s/)
          .map((interest) => interest.trim())
          .filter(Boolean);
        extracted.interests = interests;
        break;
      }
    }

    if (
      (lowerMessage.includes("i have") &&
        !lowerMessage.includes("i have a question")) ||
      (lowerMessage.includes("my") &&
        (lowerMessage.includes("my background") ||
          lowerMessage.includes("my experience"))) ||
      lowerMessage.includes("i study") ||
      lowerMessage.includes("i studied")
    ) {
      extracted.personalDetails = [
        ...(personalInfo.personalDetails || []),
        message,
      ];
    }

    return extracted;
  };

  // Create context string from personal info
  const createPersonalContext = (): string => {
    if (Object.keys(personalInfo).length === 0) return "";

    const context = "User data: ";
    const details = [];

    if (personalInfo.name) details.push(`Name: ${personalInfo.name}`);
    if (personalInfo.job) details.push(`Job/Profession: ${personalInfo.job}`);
    if (personalInfo.location)
      details.push(`Location: ${personalInfo.location}`);
    if (personalInfo.interests && personalInfo.interests.length > 0) {
      details.push(`Interests: ${personalInfo.interests.join(", ")}`);
    }

    return context + details.join("; ");
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    const extractedInfo = extractPersonalInfo(userMessage.text);
    if (Object.keys(extractedInfo).length > 0) {
      setPersonalInfo((prev) => ({
        ...prev,
        ...extractedInfo,
        interests: extractedInfo.interests || prev.interests,
        personalDetails: extractedInfo.personalDetails || prev.personalDetails,
      }));
    }

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const aiMessageId = (Date.now() + 1).toString();

    try {
      const personalContext = createPersonalContext();
      const fullMessage = personalContext
        ? `${personalContext}\n\nUser message: ${userMessage.text}`
        : userMessage.text;

      const response = await fetch("/api/simple-ai-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: fullMessage,
          history: messages.slice(-3).map((msg) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      // Check if response is a stream (Server-Sent Events)
      const contentType = response.headers.get("content-type");
      const isStream = contentType?.includes("text/event-stream");

      if (isStream && response.body) {
        // Handle Server-Sent Events (SSE) streaming
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let aiResponseText = "";
        let aiMessage: Message | null = null;

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6).trim();
                if (data === "[DONE]") {
                  // Stream completed
                  continue;
                }

                try {
                  const parsed = JSON.parse(data);
                  const token = parsed.token || parsed.content || "";
                  aiResponseText += token;

                  // Create or update the AI message
                  if (!aiMessage) {
                    aiMessage = {
                      id: aiMessageId,
                      text: aiResponseText,
                      sender: "ai",
                      timestamp: new Date(),
                    };
                    setMessages((prev) => [...prev, aiMessage!]);
                  } else {
                    // Update the last message (AI response) with new text
                    setMessages((prev) => {
                      const updated = [...prev];
                      const lastIndex = updated.length - 1;
                      if (
                        lastIndex >= 0 &&
                        updated[lastIndex].id === aiMessageId
                      ) {
                        updated[lastIndex] = {
                          ...updated[lastIndex],
                          text: aiResponseText,
                        };
                      }
                      return updated;
                    });
                  }
                } catch (parseError) {
                  // Skip invalid JSON lines
                  continue;
                }
              }
            }
          }
        } finally {
          reader.releaseLock();
        }

        // Ensure we have at least an empty response
        if (!aiMessage) {
          const aiMessage: Message = {
            id: aiMessageId,
            text: aiResponseText || "Sorry, I couldn't process your request.",
            sender: "ai",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiMessage]);
        }
      } else {
        // Handle regular JSON response (fallback)
        const data = await response.json();

        const aiMessage: Message = {
          id: aiMessageId,
          text: data.response || "Sorry, I couldn't process your request.",
          sender: "ai",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: aiMessageId,
        text: "Sorry, I'm having trouble connecting to the AI service. Please try again later.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearPersonalInfo = () => {
    setPersonalInfo({});
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("ai-chat-personal-info");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Custom Markdown components for better styling
  const markdownComponents = {
    code: ({ className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || "");
      const isInline = !match;

      if (isInline) {
        return (
          <code
            className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded-sm text-sm font-mono text-[#ff6b6b] dark:text-[#ff6b6b]"
            {...props}
          >
            {children}
          </code>
        );
      }

      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    pre: ({ children, ...props }: any) => (
      <pre
        className="bg-neutral-900 dark:bg-neutral-800 rounded-lg p-4 overflow-x-auto my-3 border-2 border-neutral-700 dark:border-accent-green"
        {...props}
      >
        {children}
      </pre>
    ),
    blockquote: ({ children, ...props }: any) => (
      <blockquote
        className="border-l-4 border-accent-green pl-4 py-2 my-3 bg-neutral-50 dark:bg-accent-green/10 italic"
        {...props}
      >
        {children}
      </blockquote>
    ),
    h1: ({ children, ...props }: any) => (
      <h1
        className="text-xl font-bold mb-3 mt-4 text-neutral-900 dark:text-[#e0e0e0]"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: any) => (
      <h2
        className="text-lg font-bold mb-2 mt-3 text-neutral-900 dark:text-[#e0e0e0]"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: any) => (
      <h3
        className="text-base font-bold mb-2 mt-3 text-neutral-900 dark:text-[#e0e0e0]"
        {...props}
      >
        {children}
      </h3>
    ),
    ul: ({ children, ...props }: any) => (
      <ul className="list-disc pl-6 my-2 space-y-1" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol className="list-decimal pl-6 my-2 space-y-1" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: any) => (
      <li className="mb-1" {...props}>
        {children}
      </li>
    ),
    table: ({ children, ...props }: any) => (
      <div className="overflow-x-auto my-3">
        <table
          className="min-w-full border-2 border-neutral-300 dark:border-neutral-700"
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }: any) => (
      <th
        className="border border-neutral-300 dark:border-neutral-700 px-3 py-2 bg-neutral-100 dark:bg-neutral-800 font-semibold text-left"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => (
      <td
        className="border border-neutral-300 dark:border-neutral-700 px-3 py-2"
        {...props}
      >
        {children}
      </td>
    ),
    a: ({ children, href, ...props }: any) => (
      <a
        href={href}
        className="text-accent-green dark:text-accent-green hover:text-[#00ff41] dark:hover:text-[#00ff41] underline"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    p: ({ children, ...props }: any) => (
      <p className="mb-2 leading-relaxed" {...props}>
        {children}
      </p>
    ),
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] dark:bg-[#0a0a0a] flex flex-col relative">
      {/* Scanlines effect */}
      <div className="scanlines pointer-events-none" />

      {/* Retro grid background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 65, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 65, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-[#1a1a1a] border-b-2 border-neutral-300 dark:border-accent-green p-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            {/* Back button */}
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

            {/* Personal Info Toggle */}
            <button
              onClick={() => setShowPersonalInfo(!showPersonalInfo)}
              className="group inline-flex items-center gap-2 px-3 py-2 border-2 border-neutral-900 dark:border-accent-green bg-white dark:bg-[#1a1a1a] font-mono text-sm transition-all hover:translate-x-1 hover:-translate-y-1 relative"
            >
              <div className="absolute inset-0 border-2 border-neutral-900 dark:border-accent-green translate-x-1 translate-y-1 -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <FontAwesomeIcon
                icon={faUserCog}
                className="text-neutral-900 dark:text-accent-green"
              />
              <span className="text-neutral-900 dark:text-[#e0e0e0] font-bold hidden sm:inline">
                {Object.keys(personalInfo).length > 0 ? "PROFILE" : "NO_DATA"}
              </span>
            </button>
          </div>

          {/* Title Section */}
          <div className="flex items-center gap-3 mb-2">
            <FontAwesomeIcon
              icon={faTerminal}
              className="text-2xl text-neutral-900 dark:text-accent-green terminal-glow"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-mono font-bold text-neutral-900 dark:text-[#e0e0e0]">
                [AI_ASSISTANT]
                {personalInfo.name && (
                  <span className="text-accent-green dark:text-accent-green ml-2">
                    // {personalInfo.name}
                  </span>
                )}
              </h1>
              <p className="text-xs font-mono text-neutral-600 dark:text-[#999] mt-1">
                <span className="text-[#ffb000]">$</span> ./chat --mode=personal
                {speechSupported && " --voice=enabled"}
              </p>
            </div>
          </div>

          {/* Personal Info Panel */}
          {showPersonalInfo && (
            <div className="mt-4 vintage-card bg-white dark:bg-[#1a1a1a] border-2 border-neutral-900 dark:border-accent-green p-4 relative">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-mono font-bold text-neutral-900 dark:text-accent-green">
                  [USER_PROFILE]
                </h3>
                <button
                  onClick={clearPersonalInfo}
                  className="inline-flex items-center gap-1 px-2 py-1 border border-[#ff6b6b] bg-white dark:bg-[#1a1a1a] text-[#ff6b6b] font-mono text-xs hover:bg-[#ff6b6b] hover:text-white transition-all"
                >
                  <FontAwesomeIcon icon={faTrash} />
                  CLEAR
                </button>
              </div>
              {Object.keys(personalInfo).length > 0 ? (
                <div className="space-y-2 text-sm font-mono">
                  {personalInfo.name && (
                    <p className="text-neutral-700 dark:text-[#c0c0c0]">
                      <span className="text-neutral-900 dark:text-accent-green">
                        ►
                      </span>{" "}
                      Name:{" "}
                      <span className="text-neutral-900 dark:text-[#e0e0e0]">
                        {personalInfo.name}
                      </span>
                    </p>
                  )}
                  {personalInfo.job && (
                    <p className="text-neutral-700 dark:text-[#c0c0c0]">
                      <span className="text-neutral-900 dark:text-accent-green">
                        ►
                      </span>{" "}
                      Job:{" "}
                      <span className="text-neutral-900 dark:text-[#e0e0e0]">
                        {personalInfo.job}
                      </span>
                    </p>
                  )}
                  {personalInfo.location && (
                    <p className="text-neutral-700 dark:text-[#c0c0c0]">
                      <span className="text-neutral-900 dark:text-accent-green">
                        ►
                      </span>{" "}
                      Location:{" "}
                      <span className="text-neutral-900 dark:text-[#e0e0e0]">
                        {personalInfo.location}
                      </span>
                    </p>
                  )}
                  {personalInfo.interests &&
                    personalInfo.interests.length > 0 && (
                      <p className="text-neutral-700 dark:text-[#c0c0c0]">
                        <span className="text-neutral-900 dark:text-accent-green">
                          ►
                        </span>{" "}
                        Interests:{" "}
                        <span className="text-neutral-900 dark:text-[#e0e0e0]">
                          {personalInfo.interests.join(", ")}
                        </span>
                      </p>
                    )}
                </div>
              ) : (
                <p className="text-sm font-mono text-neutral-600 dark:text-[#999]">
                  <span className="text-neutral-900 dark:text-accent-green">
                    ►
                  </span>{" "}
                  No data stored. Tell me about yourself!
                </p>
              )}

              {/* Corner decorations */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-neutral-900 dark:border-accent-green" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-neutral-900 dark:border-accent-green" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-neutral-900 dark:border-accent-green" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-neutral-900 dark:border-accent-green" />
            </div>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-hidden relative z-10">
        <div className="max-w-4xl mx-auto h-full flex flex-col p-4">
          <div className="flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700">
            {messages.map((message) => (
              <div
                key={message.id}
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

          {/* Input Area */}
          <div className="mt-4 vintage-card bg-white dark:bg-[#1a1a1a] border-2 border-neutral-900 dark:border-accent-green p-4 relative">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type_message_here..."
                className="flex-1 resize-none bg-transparent text-neutral-900 dark:text-[#e0e0e0] placeholder-neutral-500 dark:placeholder-[#666] focus:outline-none min-h-[60px] max-h-32 font-mono text-sm"
                rows={1}
                disabled={isLoading}
              />

              {/* Voice Input Button */}
              {speechSupported && (
                <button
                  onClick={toggleListening}
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
                onClick={sendMessage}
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

            {/* Corner decorations */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-neutral-900 dark:border-accent-green" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-neutral-900 dark:border-accent-green" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-neutral-900 dark:border-accent-green" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-neutral-900 dark:border-accent-green" />
          </div>
        </div>
      </div>
    </div>
  );
}
