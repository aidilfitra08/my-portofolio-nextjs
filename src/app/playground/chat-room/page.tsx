"use client";

import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTerminal,
  faArrowLeft,
  faCircle,
  faPaperPlane,
  faDice,
  faSignal,
  faArrowRightFromBracket,
  faGamepad,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Page() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [isInRoom, setIsInRoom] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [shouldReconnect, setShouldReconnect] = useState(true);
  const [connectionError, setConnectionError] = useState<string>("");
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Predefined rooms
  const availableRooms = [
    {
      id: 1,
      name: "General",
      description: "General discussion",
      icon: <FontAwesomeIcon icon={faComment} />,
    },
    {
      id: 2,
      name: "Tech Talk",
      description: "Technology discussions",
      icon: <FontAwesomeIcon icon={faTerminal} />,
    },
    {
      id: 3,
      name: "Random",
      description: "Random conversations",
      icon: <FontAwesomeIcon icon={faDice} />,
    },
    {
      id: 4,
      name: "Gaming",
      description: "Gaming discussions",
      icon: <FontAwesomeIcon icon={faGamepad} />,
    },
  ];

  // Auto scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connectWebSocket = () => {
    if (!selectedRoom || !userName.trim()) return;

    // Clear any existing reconnection timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    // Close existing connection if any
    if (wsRef.current) {
      wsRef.current.close();
    }

    // Clear previous connection error
    setConnectionError("");

    const wsUrl = `${process.env.NEXT_PUBLIC_WEB_SOCKET_URL}/${selectedRoom}`;

    try {
      const websocket = new WebSocket(wsUrl);

      // Set a connection timeout
      const connectionTimeout = setTimeout(() => {
        if (websocket.readyState === WebSocket.CONNECTING) {
          websocket.close();
          const errorMsg =
            "Connection timeout - WebSocket server is not responding";
          setConnectionError(errorMsg);
          // alert(
          //   `❌ Connection Failed\n\n${errorMsg}\n\nPlease check if the WebSocket server is running at:\n${wsUrl}`
          // );
          setMessages((prev) => [...prev, `${errorMsg}`]);
        }
      }, 10000); // 10 second timeout

      websocket.onopen = () => {
        clearTimeout(connectionTimeout);
        setIsConnected(true);
        setConnectionError("");
        setMessages((prev) => [...prev, "🟢 Connected to WebSocket server"]);

        // Send join room message
        const joinMessage = {
          type: "join",
          room: selectedRoom,
          user: userName,
          timestamp: new Date().toISOString(),
        };
        websocket.send(JSON.stringify(joinMessage));
        setMessages((prev) => [
          ...prev,
          `📨 ${userName} joining room ${selectedRoom}...`,
        ]);
        setIsInRoom(true);
      };

      websocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          // Handle different message types
          switch (data.type) {
            case "message":
              setMessages((prev) => [
                ...prev,
                `💬 ${data.sender}: ${data.content}`,
              ]);
              break;
            case "join":
              setMessages((prev) => [
                ...prev,
                `👋 ${data.user} joined the room`,
              ]);
              break;
            case "leave":
              setMessages((prev) => [...prev, `👋 ${data.user} left the room`]);
              break;
            case "ping":
              setMessages((prev) => [...prev, `🏓 ${data.user} sent a ping`]);
              break;
            case "user_list":
              setMessages((prev) => [
                ...prev,
                `👥 Users in room: ${data.users.join(", ")}`,
              ]);
              break;
            case "error":
              setMessages((prev) => [...prev, `❌ Error: ${data.message}`]);
              break;
            default:
              setMessages((prev) => [...prev, `📩 ${JSON.stringify(data)}`]);
          }
        } catch (error) {
          // If it's not JSON, just display the raw message
          setMessages((prev) => [...prev, `📩 Raw: ${event.data}`]);
          console.error("Failed to parse message:", error);
        }
      };

      websocket.onclose = (event) => {
        clearTimeout(connectionTimeout);
        setIsConnected(false);

        let closeReason = "";
        switch (event.code) {
          case 1000:
            closeReason = "Normal closure";
            break;
          case 1001:
            closeReason = "Going away";
            break;
          case 1002:
            closeReason = "Protocol error";
            break;
          case 1003:
            closeReason = "Unsupported data type";
            break;
          case 1006:
            closeReason = "Connection lost (no close frame)";
            break;
          case 1011:
            closeReason = "Server error";
            break;
          case 1012:
            closeReason = "Service restart";
            break;
          default:
            closeReason = event.reason || "Unknown reason";
        }

        const disconnectMsg = `🔴 Connection closed (Code: ${event.code} - ${closeReason})`;
        setMessages((prev) => [...prev, disconnectMsg]);

        // Show alert for unexpected disconnections
        if (event.code !== 1000 && isConnected) {
          const errorMsg = `Connection lost unexpectedly!\n\nCode: ${event.code}\nReason: ${closeReason}`;
          setConnectionError(errorMsg);
          // alert(
          //   `❌ Connection Lost\n\n${errorMsg}\n\n${
          //     shouldReconnect ? "Will attempt to reconnect..." : ""
          //   }`
          // );
        }

        // Only auto-reconnect if we should and we're still in the room
        if (shouldReconnect && isInRoom && selectedRoom && userName.trim()) {
          setMessages((prev) => [
            ...prev,
            "🔄 Attempting to reconnect in 3 seconds...",
          ]);
          reconnectTimeoutRef.current = setTimeout(() => {
            connectWebSocket();
          }, 3000);
        }
      };

      websocket.onerror = (error) => {
        clearTimeout(connectionTimeout);
        console.error("WebSocket error:", error);

        const errorMsg = "Server is offline";
        setConnectionError(errorMsg);
        setMessages((prev) => [...prev, `❌ ${errorMsg}`]);
      };

      setWs(websocket);
      wsRef.current = websocket;
    } catch (error) {
      const errorMsg = `Failed to create WebSocket connection: ${error}`;
      setConnectionError(errorMsg);
      // alert(
      //   `❌ WebSocket Creation Failed\n\n${errorMsg}\n\nPlease check the WebSocket URL configuration.`
      // );
      setMessages((prev) => [...prev, `❌ ${errorMsg}`]);
    }
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      setShouldReconnect(false);
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const joinRoom = () => {
    if (selectedRoom && userName.trim()) {
      setShouldReconnect(true);
      setMessages([]);
      setConnectionError("");
      connectWebSocket();
    }
  };

  const leaveRoom = () => {
    setShouldReconnect(false);

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    if (ws && ws.readyState === WebSocket.OPEN) {
      const leaveMessage = {
        type: "leave",
        room: selectedRoom,
        user: userName,
        timestamp: new Date().toISOString(),
      };
      ws.send(JSON.stringify(leaveMessage));
      setMessages((prev) => [...prev, "👋 You left the room"]);
    }

    if (wsRef.current) {
      wsRef.current.close();
    }

    setIsInRoom(false);
    setIsConnected(false);
    setWs(null);
    wsRef.current = null;
    setSelectedRoom(null);
    setUserName("");
    setMessages([]);
    setConnectionError("");
  };

  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN && inputMessage.trim()) {
      const message = {
        type: "message",
        room: selectedRoom,
        content: inputMessage,
        timestamp: new Date().toISOString(),
        sender: userName,
      };

      ws.send(JSON.stringify(message));
      setInputMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendPing = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const pingMessage = {
        type: "ping",
        room: selectedRoom,
        user: userName,
        timestamp: new Date().toISOString(),
      };
      ws.send(JSON.stringify(pingMessage));
    }
  };

  const retryConnection = () => {
    setConnectionError("");
    connectWebSocket();
  };

  const getConnectionStatus = () => {
    if (!ws) return "Not initialized";
    switch (ws.readyState) {
      case WebSocket.CONNECTING:
        return "Connecting...";
      case WebSocket.OPEN:
        return "Connected";
      case WebSocket.CLOSING:
        return "Closing...";
      case WebSocket.CLOSED:
        return "Closed";
      default:
        return "Unknown";
    }
  };

  const generateRandomUser = () => {
    const adjectives = ["Cool", "Smart", "Fast", "Bright", "Lucky"];
    const nouns = ["User", "Player", "Coder", "Gamer", "Dev"];
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNum = Math.floor(Math.random() * 100);
    setUserName(`${randomAdj}${randomNoun}${randomNum}`);
  };

  // If not in a room, show room selection
  if (!isInRoom) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] dark:bg-[#0a0a0a] p-4 relative">
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

        <div className="max-w-2xl mx-auto relative">
          {/* Back button */}
          <Link
            href="/playground"
            className="group inline-flex items-center gap-2 mb-6 px-3 py-2 border-2 border-neutral-900 dark:border-accent-green bg-white dark:bg-[#1a1a1a] font-mono text-sm transition-all hover:translate-x-1 hover:-translate-y-1 relative"
          >
            <div className="absolute inset-0 border-2 border-neutral-900 dark:border-accent-green translate-x-1 translate-y-1 -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="text-neutral-900 dark:text-accent-green group-hover:animate-pulse"
            />
            <span className="text-neutral-900 dark:text-[#e0e0e0] font-bold tracking-wide">
              BACK
            </span>
          </Link>

          <div className="vintage-card bg-white dark:bg-[#1a1a1a] border-2 border-neutral-900 dark:border-accent-green p-6 md:p-8 relative">
            {/* Terminal header */}
            <div className="flex items-center gap-3 mb-6 border-b-2 border-neutral-300 dark:border-accent-green pb-4">
              <FontAwesomeIcon
                icon={faTerminal}
                className="text-2xl text-neutral-900 dark:text-accent-green terminal-glow"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-mono font-bold text-neutral-900 dark:text-[#e0e0e0]">
                  [CHAT_ROOM_LOBBY]
                </h1>
                <p className="text-xs font-mono text-neutral-600 dark:text-[#999] mt-1">
                  <span className="text-[#ffb000]">$</span> ./connect --room
                </p>
              </div>
            </div>

            {/* Connection Error Alert */}
            {connectionError && (
              <div className="mb-6 p-4 border-2 border-[#ff6b6b] bg-red-50 dark:bg-[#ff6b6b]/10 vintage-card">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="text-[#ff6b6b] animate-pulse"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-mono font-bold text-[#ff6b6b] mb-1">
                      [CONNECTION_ERROR]
                    </p>
                    <p className="text-xs font-mono text-neutral-700 dark:text-[#c0c0c0]">
                      {connectionError}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* User Name Input */}
            <div className="mb-6">
              <label className="block text-sm font-mono font-bold text-neutral-900 dark:text-accent-green mb-3">
                <span className="text-neutral-500 dark:text-[#999]">►</span>{" "}
                USERNAME:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter_your_name..."
                  className="flex-1 px-4 py-3 border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#e0e0e0] font-mono focus:outline-none focus:border-neutral-900 dark:focus:border-accent-green transition-colors"
                />
                <button
                  onClick={generateRandomUser}
                  className="px-4 py-3 border-2 border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-[#1a1a1a] hover:bg-neutral-200 dark:hover:bg-[#2a2a2a] transition-colors"
                  title="Generate random name"
                >
                  <FontAwesomeIcon
                    icon={faDice}
                    className="text-neutral-900 dark:text-accent-green"
                  />
                </button>
              </div>
            </div>

            {/* Room Selection */}
            <div className="mb-6">
              <label className="block text-sm font-mono font-bold text-neutral-900 dark:text-accent-green mb-3">
                <span className="text-neutral-500 dark:text-[#999]">►</span>{" "}
                SELECT_ROOM:
              </label>
              <div className="space-y-3">
                {availableRooms.map((room) => (
                  <div
                    key={room.id}
                    className={`group relative p-4 border-2 cursor-pointer transition-all font-mono ${
                      selectedRoom === room.id
                        ? "border-neutral-900 dark:border-accent-green bg-neutral-50 dark:bg-[#1a1a1a] translate-x-1 -translate-y-1"
                        : "border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-accent-green"
                    }`}
                    onClick={() => setSelectedRoom(room.id)}
                  >
                    {/* Shadow effect */}
                    {selectedRoom === room.id && (
                      <div className="absolute inset-0 border-2 border-neutral-900 dark:border-accent-green translate-x-1 translate-y-1 -z-10" />
                    )}

                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="room"
                        value={room.id}
                        checked={selectedRoom === room.id}
                        onChange={() => setSelectedRoom(room.id)}
                        className="w-4 h-4 accent-neutral-900 dark:accent-accent-green"
                      />
                      <span className="text-2xl">{room.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-neutral-900 dark:text-[#e0e0e0] mb-1">
                          {String(room.id).padStart(2, "0")}. [
                          {room.name.toUpperCase()}]
                        </h3>
                        <p className="text-xs text-neutral-600 dark:text-[#999]">
                          {room.description}
                        </p>
                      </div>
                      {selectedRoom === room.id && (
                        <span className="text-neutral-900 dark:text-accent-green font-bold">
                          ✓
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Join Button */}
            <button
              onClick={joinRoom}
              disabled={!selectedRoom || !userName.trim()}
              className="w-full px-4 py-3 border-2 border-neutral-900 dark:border-accent-green bg-neutral-900 dark:bg-accent-green text-white dark:text-[#0a0a0a] font-mono font-bold hover:bg-neutral-800 dark:hover:bg-[#00ff41] disabled:bg-neutral-300 dark:disabled:bg-neutral-700 disabled:border-neutral-300 dark:disabled:border-neutral-700 disabled:text-neutral-500 dark:disabled:text-neutral-500 disabled:cursor-not-allowed transition-all uppercase tracking-wider cursor-pointer"
            >
              {selectedRoom && userName.trim()
                ? "► CONNECT_TO_ROOM"
                : "► ENTER_CREDENTIALS"}
            </button>

            {/* Selected Info */}
            {selectedRoom && userName && (
              <div className="mt-4 p-3 border-l-4 border-neutral-900 dark:border-accent-green bg-neutral-50 dark:bg-[#1a1a1a]">
                <p className="text-xs font-mono text-neutral-700 dark:text-[#c0c0c0]">
                  <span className="text-neutral-900 dark:text-accent-green font-bold">
                    [READY]
                  </span>{" "}
                  <strong className="text-neutral-900 dark:text-[#e0e0e0]">
                    {userName}
                  </strong>{" "}
                  →{" "}
                  <strong className="text-neutral-900 dark:text-[#e0e0e0]">
                    {availableRooms.find((r) => r.id === selectedRoom)?.name}
                  </strong>
                </p>
              </div>
            )}

            {/* Corner decorations */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-neutral-900 dark:border-accent-green" />
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-neutral-900 dark:border-accent-green" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-neutral-900 dark:border-accent-green" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-neutral-900 dark:border-accent-green" />
          </div>
        </div>
      </div>
    );
  }

  // Chat interface when in a room
  return (
    <div className="min-h-screen bg-[#f5f5f0] dark:bg-[#0a0a0a] p-4 relative">
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

      <div className="max-w-4xl mx-auto relative">
        <div className="vintage-card bg-white dark:bg-[#1a1a1a] border-2 border-neutral-900 dark:border-accent-green relative">
          {/* Header with room info */}
          <div className="border-b-2 border-neutral-300 dark:border-accent-green p-4 md:p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faTerminal}
                  className="text-xl text-neutral-900 dark:text-accent-green terminal-glow"
                />
                <div>
                  <h1 className="text-xl md:text-2xl font-mono font-bold text-neutral-900 dark:text-[#e0e0e0]">
                    [
                    {availableRooms
                      .find((r) => r.id === selectedRoom)
                      ?.name.toUpperCase()}
                    ]
                  </h1>
                  <p className="text-xs font-mono text-neutral-600 dark:text-[#999]">
                    <span className="text-[#ffb000]">$</span> user:{" "}
                    <strong className="text-neutral-900 dark:text-[#e0e0e0]">
                      {userName}
                    </strong>
                  </p>
                </div>
              </div>
              <button
                onClick={leaveRoom}
                className="group inline-flex items-center gap-2 px-3 py-2 border-2 border-[#ff6b6b] bg-white dark:bg-[#1a1a1a] hover:bg-[#ff6b6b] hover:text-white transition-all font-mono text-xs"
              >
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className="text-[#ff6b6b] group-hover:text-white"
                />
                <span className="text-[#ff6b6b] group-hover:text-white font-bold">
                  DISCONNECT
                </span>
              </button>
            </div>
          </div>

          {/* Connection Error Banner */}
          {connectionError && (
            <div className="m-4 p-4 border-2 border-[#ff6b6b] bg-red-50 dark:bg-[#ff6b6b]/10 vintage-card">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="text-[#ff6b6b] animate-pulse"
                  />
                  <div>
                    <p className="text-sm font-mono font-bold text-[#ff6b6b] mb-1">
                      [CONNECTION_ERROR]
                    </p>
                    <p className="text-xs font-mono text-neutral-700 dark:text-[#c0c0c0]">
                      {connectionError}
                    </p>
                  </div>
                </div>
                <button
                  onClick={retryConnection}
                  className="px-3 py-2 border-2 border-[#ff6b6b] bg-white dark:bg-[#1a1a1a] hover:bg-[#ff6b6b] hover:text-white transition-all font-mono text-xs text-[#ff6b6b] font-bold"
                >
                  RETRY
                </button>
              </div>
            </div>
          )}

          {/* Connection Status Bar */}
          <div className="border-b-2 border-neutral-300 dark:border-neutral-700 p-4 bg-neutral-50 dark:bg-[#0a0a0a]">
            <div className="flex items-center gap-4 flex-wrap text-xs font-mono">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCircle}
                  className={`text-xs ${
                    isConnected
                      ? "text-accent-green animate-pulse"
                      : "text-[#ff6b6b]"
                  }`}
                />
                <span className="text-neutral-700 dark:text-[#c0c0c0]">
                  {isConnected ? "CONNECTED" : "DISCONNECTED"}
                </span>
              </div>
              <div className="text-neutral-600 dark:text-[#999]">
                <FontAwesomeIcon icon={faSignal} className="mr-2" />
                {getConnectionStatus()}
              </div>
              <button
                onClick={sendPing}
                disabled={!isConnected}
                className="px-2 py-1 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] hover:bg-neutral-100 dark:hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-neutral-900 dark:text-[#e0e0e0]"
              >
                🏓 PING
              </button>
            </div>
          </div>

          {/* Messages Display */}
          <div className="h-96 overflow-y-auto bg-neutral-50 dark:bg-[#0a0a0a] p-4 md:p-6 font-mono text-sm border-b-2 border-neutral-300 dark:border-neutral-700 scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-center">
                <p className="text-neutral-500 dark:text-[#666] italic">
                  <span className="text-neutral-900 dark:text-accent-green">
                    ►
                  </span>{" "}
                  No messages yet... Start the conversation!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className="text-neutral-700 dark:text-[#c0c0c0] wrap-break-words"
                  >
                    <span className="text-neutral-500 dark:text-[#666] text-xs mr-2">
                      [{new Date().toLocaleTimeString()}]
                    </span>
                    <span className="text-neutral-900 dark:text-[#e0e0e0]">
                      {message}
                    </span>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-6 bg-white dark:bg-[#1a1a1a]">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Message_as_${userName}...`}
                className="flex-1 px-4 py-3 border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#e0e0e0] font-mono focus:outline-none focus:border-neutral-900 dark:focus:border-accent-green disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={!isConnected}
              />
              <button
                onClick={sendMessage}
                disabled={!isConnected || !inputMessage.trim()}
                className="px-6 py-3 border-2 border-neutral-900 dark:border-accent-green bg-neutral-900 dark:bg-accent-green text-white dark:text-[#0a0a0a] font-mono font-bold hover:bg-neutral-800 dark:hover:bg-[#00ff41] disabled:bg-neutral-300 dark:disabled:bg-neutral-700 disabled:border-neutral-300 dark:disabled:border-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-all"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
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
