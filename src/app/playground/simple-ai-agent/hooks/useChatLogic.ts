import { useState, useRef, useEffect } from "react";

const AI_BASE = process.env.NEXT_PUBLIC_REST_API_URL || "http://localhost:3001";
const TOKEN_KEY = "user_auth_token";

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

export function useChatLogic() {
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
  const [token, setToken] = useState<string | null>(null);
  const [autoRetrieve, setAutoRetrieve] = useState(true);
  const [retrieveLimit, setRetrieveLimit] = useState(3);
  const [useStreaming, setUseStreaming] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Initialize token from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const existing = localStorage.getItem(TOKEN_KEY);
      setToken(existing);
    }
  }, []);

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

  // Load personal info from session storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPersonalInfo = sessionStorage.getItem("ai-chat-personal-info");
      if (savedPersonalInfo) {
        setPersonalInfo(JSON.parse(savedPersonalInfo));
      }
    }
  }, []);

  // Load chat history from backend
  useEffect(() => {
    const loadHistory = async () => {
      if (!token) return;
      try {
        const response = await fetch(`${AI_BASE}/ai/history`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          if (data.history && Array.isArray(data.history)) {
            const historyMessages: Message[] = data.history.map(
              (msg: any, idx: number) => ({
                id: `history-${idx}`,
                text: msg.content || "",
                sender: msg.role === "assistant" ? "ai" : "user",
                timestamp: new Date(msg.timestamp),
              })
            );
            setMessages(
              historyMessages.length > 0
                ? historyMessages
                : [
                    {
                      id: "1",
                      text: "Hello! I'm your AI assistant. Feel free to tell me about yourself - your name, job, interests, or anything else. I'll remember it during our conversation to make our chat more personal! 🎤 You can also use voice input by clicking the microphone button.",
                      sender: "ai",
                      timestamp: new Date(),
                    },
                  ]
            );
          }
        }
      } catch (e) {
        console.error("Failed to load history:", e);
      }
    };
    loadHistory();
  }, [token]);

  // Save personal info to session storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "ai-chat-personal-info",
        JSON.stringify(personalInfo)
      );
    }
  }, [personalInfo]);

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
    if (!token) {
      alert("You must be authenticated to chat.");
      return;
    }

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
      const contextArray = [
        ...((personalInfo.personalDetails || []) as string[]),
        ...(personalContext ? [personalContext] : []),
      ];

      const payload = {
        message: userMessage.text,
        context: contextArray,
        auto_retrieve: autoRetrieve,
        retrieve_limit: retrieveLimit,
      };

      if (useStreaming) {
        const response = await fetch(`${AI_BASE}/ai/chat/stream`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Failed: ${response.status}`);
        }

        if (response.body) {
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
                  if (data === "[DONE]") continue;
                  try {
                    const parsed = JSON.parse(data);
                    const tok =
                      parsed.chunk || parsed.token || parsed.content || "";
                    aiResponseText += tok;

                    if (!aiMessage) {
                      aiMessage = {
                        id: aiMessageId,
                        text: aiResponseText,
                        sender: "ai",
                        timestamp: new Date(),
                      };
                      setMessages((prev) => [...prev, aiMessage!]);
                    } else {
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
                  } catch (e) {
                    continue;
                  }
                }
              }
            }
          } finally {
            reader.releaseLock();
          }

          if (!aiMessage && aiResponseText) {
            const finalMessage: Message = {
              id: aiMessageId,
              text: aiResponseText,
              sender: "ai",
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, finalMessage]);
          } else if (!aiMessage) {
            const errorMessage: Message = {
              id: aiMessageId,
              text: "Sorry, I couldn't process your request.",
              sender: "ai",
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
          }
        }
      } else {
        // Non-streaming endpoint
        const response = await fetch(`${AI_BASE}/ai/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || `Failed: ${response.status}`);
        }
        const aiMessage: Message = {
          id: aiMessageId,
          text: data.response || data.message || "No response from AI server",
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: "Sorry, I'm having trouble connecting to the AI service. Please try again later.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${AI_BASE}/ai/history`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMessages([
          {
            id: "1",
            text: "Hello! I'm your AI assistant. Feel free to tell me about yourself - your name, job, interests, or anything else. I'll remember it during our conversation to make our chat more personal! 🎤 You can also use voice input by clicking the microphone button.",
            sender: "ai",
            timestamp: new Date(),
          },
        ]);
      }
    } catch (e) {
      console.error("Failed to clear history", e);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user_auth_token");
      window.location.reload();
    }
  };

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    personalInfo,
    token,
    autoRetrieve,
    setAutoRetrieve,
    retrieveLimit,
    setRetrieveLimit,
    useStreaming,
    setUseStreaming,
    isListening,
    speechSupported,
    sendMessage,
    clearHistory,
    handleLogout,
    toggleListening,
    handleKeyPress,
  };
}
