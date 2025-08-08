/* eslint-disable @typescript-eslint/no-explicit-any */
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
} from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

// Add this to your global CSS or import it
import "highlight.js/styles/github-dark.css"; // You can choose different themes

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
          // You can add user feedback here if needed
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

    // Extract name patterns - More specific patterns to avoid false positives
    const namePatterns = [
      /(?:my name is|call me|i'm called|name's|name is)\s+([a-zA-Z]+)/i,
      // Only match "I'm" or "I am" when followed by a single word that looks like a name
      /(?:^|\s)(?:i'm|i am)\s+([A-Z][a-z]+)(?:\s|$|[.!?])/i,
    ];

    for (const pattern of namePatterns) {
      const match = message.match(pattern);
      if (match && match[1]) {
        // Additional validation: avoid common job titles, roles, or descriptive words
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

    // Extract job/profession patterns - Updated to be more specific
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

    // Extract location patterns
    const locationPatterns = [
      /(?:i live in|i'm from|i'm located in|based in|from)\s+([^.!?]+)/i,
      /(?:in|from)\s+(new york|london|tokyo|paris|berlin|sydney|toronto|singapore|mumbai|dubai|jakarta|madrid|rome|amsterdam|bangkok|seoul|taipei|hong kong|vancouver|montreal|chicago|san francisco|los angeles|boston|seattle|miami|austin|denver|atlanta|phoenix|dallas|houston|orlando|philadelphia|detroit|columbus|charlotte|nashville|memphis|kansas city|denver|portland|las vegas|sacramento|san diego|milwaukee|minneapolis|cleveland|pittsburgh|baltimore|richmond|buffalo|louisville|oklahoma city|albuquerque|tucson|fresno|omaha|jacksonville|tampa|new orleans|cincinnati|indianapolis|st louis|madison|spokane|boise|salt lake city|reno|anchorage|honolulu|puerto rico)/i,
    ];

    for (const pattern of locationPatterns) {
      const match = message.match(pattern);
      if (match && match[1]) {
        extracted.location = match[1].trim();
        break;
      }
    }

    // Extract interests patterns
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

    // Store any other personal details - More selective
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

    // Extract personal information from the message
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
          // Include recent messages for context
          history: messages.slice(-3).map((msg) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "Sorry, I couldn't process your request.",
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
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
            className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono text-red-600 dark:text-red-400"
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
        className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto my-3 border border-gray-200 dark:border-gray-700"
        {...props}
      >
        {children}
      </pre>
    ),
    blockquote: ({ children, ...props }: any) => (
      <blockquote
        className="border-l-4 border-blue-500 pl-4 py-2 my-3 bg-blue-50 dark:bg-blue-900/20 italic"
        {...props}
      >
        {children}
      </blockquote>
    ),
    h1: ({ children, ...props }: any) => (
      <h1 className="text-xl font-bold mb-3 mt-4" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: any) => (
      <h2 className="text-lg font-bold mb-2 mt-3" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: any) => (
      <h3 className="text-base font-bold mb-2 mt-3" {...props}>
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
          className="min-w-full border border-gray-200 dark:border-gray-700"
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }: any) => (
      <th
        className="border border-gray-200 dark:border-gray-700 px-3 py-2 bg-gray-100 dark:bg-gray-800 font-semibold text-left"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => (
      <td
        className="border border-gray-200 dark:border-gray-700 px-3 py-2"
        {...props}
      >
        {children}
      </td>
    ),
    a: ({ children, href, ...props }: any) => (
      <a
        href={href}
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 underline"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faRobot} className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                AI Assistant {personalInfo.name && `- Hi ${personalInfo.name}!`}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Powered by AidilDev Backend • Personal conversation mode
                {speechSupported && " • Voice input enabled"}
              </p>
            </div>
          </div>

          {/* Personal Info Toggle */}
          <button
            onClick={() => setShowPersonalInfo(!showPersonalInfo)}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            <FontAwesomeIcon icon={faUserCog} />
            <span className="hidden sm:inline">
              {Object.keys(personalInfo).length > 0 ? "Profile" : "No profile"}
            </span>
          </button>
        </div>

        {/* Personal Info Panel */}
        {showPersonalInfo && (
          <div className="max-w-4xl mx-auto mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                Personal Information
              </h3>
              <button
                onClick={clearPersonalInfo}
                className="text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 underline"
              >
                Clear All
              </button>
            </div>
            {Object.keys(personalInfo).length > 0 ? (
              <div className="space-y-2 text-sm">
                {personalInfo.name && (
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {personalInfo.name}
                  </p>
                )}
                {personalInfo.job && (
                  <p>
                    <span className="font-medium">Job:</span> {personalInfo.job}
                  </p>
                )}
                {personalInfo.location && (
                  <p>
                    <span className="font-medium">Location:</span>{" "}
                    {personalInfo.location}
                  </p>
                )}
                {personalInfo.interests &&
                  personalInfo.interests.length > 0 && (
                    <p>
                      <span className="font-medium">Interests:</span>{" "}
                      {personalInfo.interests.join(", ")}
                    </p>
                  )}
              </div>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tell me about yourself in our conversation, and I&apos;ll
                remember the details to make our chat more personal!
              </p>
            )}
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full flex flex-col p-4">
          <div className="flex-1 overflow-y-auto space-y-4 scrollbar-hide">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === "user"
                      ? "bg-gradient-to-br from-green-400 to-blue-500"
                      : "bg-gradient-to-br from-purple-400 to-pink-500"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={message.sender === "user" ? faUser : faRobot}
                    className="text-white text-sm"
                  />
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl p-3 rounded-lg shadow-sm ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none border border-gray-200 dark:border-gray-600"
                  }`}
                >
                  {message.sender === "ai" ? (
                    <div className="text-sm leading-relaxed prose prose-sm max-w-none prose-invert">
                      <ReactMarkdown
                        components={markdownComponents}
                        rehypePlugins={[rehypeHighlight]}
                      >
                        {message.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                  )}
                  <p
                    className={`text-xs mt-2 ${
                      message.sender === "user"
                        ? "text-blue-100"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faRobot}
                    className="text-white text-sm"
                  />
                </div>
                <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-3 rounded-lg rounded-bl-none shadow-sm">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="text-gray-500 dark:text-gray-400 animate-spin"
                    />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      AI is thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here or use voice input... (Tell me about yourself for a more personal conversation!)"
                className="flex-1 resize-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none min-h-[60px] max-h-32"
                rows={1}
                disabled={isLoading}
              />

              {/* Voice Input Button */}
              {speechSupported && (
                <button
                  onClick={toggleListening}
                  disabled={isLoading}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    isListening
                      ? "bg-red-500 hover:bg-red-600 text-white animate-pulse shadow-lg"
                      : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  title={
                    isListening
                      ? "Stop recording (Click to stop)"
                      : "Start voice input (Click to speak)"
                  }
                >
                  <FontAwesomeIcon
                    icon={isListening ? faMicrophoneSlash : faMicrophone}
                    className={isListening ? "animate-pulse" : ""}
                  />
                </button>
              )}

              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg flex items-center justify-center transition-colors"
              >
                <FontAwesomeIcon
                  icon={isLoading ? faSpinner : faPaperPlane}
                  className={isLoading ? "animate-spin" : ""}
                />
              </button>
            </div>

            {/* Enhanced Helper Text */}
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Press{" "}
              <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                Enter
              </kbd>{" "}
              to send,{" "}
              <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                Shift+Enter
              </kbd>{" "}
              for new line
              {speechSupported && (
                <>
                  {" "}
                  • Click{" "}
                  <FontAwesomeIcon icon={faMicrophone} className="mx-1" />
                  for voice input
                  {isListening && (
                    <span className="ml-2 text-red-500 font-medium animate-pulse">
                      🔴 Listening...
                    </span>
                  )}
                </>
              )}
              {!speechSupported && (
                <span className="text-amber-600 dark:text-amber-400">
                  • Voice input not supported in this browser
                </span>
              )}{" "}
              • Personal info saved for this session
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
