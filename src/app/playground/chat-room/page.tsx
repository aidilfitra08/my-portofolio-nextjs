"use client";

import { useEffect, useState, useRef } from "react";

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
    { id: 1, name: "General", description: "General discussion" },
    { id: 2, name: "Tech Talk", description: "Technology discussions" },
    { id: 3, name: "Random", description: "Random conversations" },
    { id: 4, name: "Gaming", description: "Gaming discussions" },
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
    // console.log("Attempting to connect to:", wsUrl);

    try {
      const websocket = new WebSocket(wsUrl);

      // Set a connection timeout
      const connectionTimeout = setTimeout(() => {
        if (websocket.readyState === WebSocket.CONNECTING) {
          websocket.close();
          const errorMsg =
            "Connection timeout - WebSocket server is not responding";
          setConnectionError(errorMsg);
          alert(
            `❌ Connection Failed\n\n${errorMsg}\n\nPlease check if the WebSocket server is running at:\n${wsUrl}`
          );
          setMessages((prev) => [...prev, `❌ ${errorMsg}`]);
        }
      }, 10000); // 10 second timeout

      websocket.onopen = () => {
        clearTimeout(connectionTimeout);
        // console.log("Connected to WebSocket server");
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
        // console.log("Received message:", event.data);
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
        // console.log("WebSocket connection closed:", event.code, event.reason);
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
          alert(
            `❌ Connection Lost\n\n${errorMsg}\n\n${
              shouldReconnect ? "Will attempt to reconnect..." : ""
            }`
          );
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

        // Show alert for connection errors
        // alert(`❌ Server is offline`);
      };

      setWs(websocket);
      wsRef.current = websocket;
    } catch (error) {
      const errorMsg = `Failed to create WebSocket connection: ${error}`;
      setConnectionError(errorMsg);
      alert(
        `❌ WebSocket Creation Failed\n\n${errorMsg}\n\nPlease check the WebSocket URL configuration.`
      );
      setMessages((prev) => [...prev, `❌ ${errorMsg}`]);
    }
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      setShouldReconnect(false); // Disable reconnection
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
      setShouldReconnect(true); // Enable reconnection
      setMessages([]); // Clear previous messages
      setConnectionError(""); // Clear previous errors
      connectWebSocket();
    }
  };

  const leaveRoom = () => {
    setShouldReconnect(false); // Disable auto-reconnection

    // Clear reconnection timeout
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

    // Close connection
    if (wsRef.current) {
      wsRef.current.close();
    }

    // Reset state
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
      // Remove local ping message - wait for server response
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

  // Generate a random user name if empty
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
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
            Join Chat Room
          </h1>

          {/* Connection Error Alert */}
          {connectionError && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg">
              <div className="flex items-center">
                <span className="text-red-500 mr-2">❌</span>
                <div className="flex-1">
                  <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                    Connection Failed
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-300 mt-1">
                    {connectionError}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* User Name Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Name
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                onClick={generateRandomUser}
                className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                title="Generate random name"
              >
                🎲
              </button>
            </div>
          </div>

          {/* Room Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select a Room
            </label>
            <div className="space-y-2">
              {availableRooms.map((room) => (
                <div
                  key={room.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedRoom === room.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                      : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => setSelectedRoom(room.id)}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="room"
                      value={room.id}
                      checked={selectedRoom === room.id}
                      onChange={() => setSelectedRoom(room.id)}
                      className="mr-3"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {room.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {room.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Join Button */}
          <button
            onClick={joinRoom}
            disabled={!selectedRoom || !userName.trim()}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Join Room
          </button>

          {/* Selected Info */}
          {selectedRoom && userName && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>{userName}</strong> will join{" "}
                <strong>
                  {availableRooms.find((r) => r.id === selectedRoom)?.name}
                </strong>
              </p>
            </div>
          )}

          {/* WebSocket URL Info */}
          {/* <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            <p>
              WebSocket Server:{" "}
              {process.env.NEXT_PUBLIC_WEB_SOCKET_URL || "Not configured"}
            </p>
          </div> */}
        </div>
      </div>
    );
  }

  // Chat interface when in a room
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        {/* Header with room info */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {availableRooms.find((r) => r.id === selectedRoom)?.name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Connected as: <strong>{userName}</strong>
            </p>
          </div>
          <button
            onClick={leaveRoom}
            className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors"
          >
            Leave Room
          </button>
        </div>

        {/* Connection Error Banner */}
        {connectionError && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-red-500 mr-2">❌</span>
                <div>
                  <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                    Connection Error
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-300">
                    {connectionError}
                  </p>
                </div>
              </div>
              <button
                onClick={retryConnection}
                className="px-3 py-1 text-xs bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Connection Status */}
        <div className="mb-4 flex items-center gap-4 flex-wrap">
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              isConnected
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }`}
          >
            {isConnected ? "🟢 Connected" : "🔴 Disconnected"}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Status: {getConnectionStatus()}
          </span>
          <button
            onClick={sendPing}
            disabled={!isConnected}
            className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Ping
          </button>
        </div>

        {/* Messages Display */}
        <div className="mb-4 h-64 overflow-y-auto bg-gray-50 dark:bg-gray-700 rounded-lg p-4 scrollbar-hide">
          {messages.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 italic">
              No messages yet... Start the conversation!
            </p>
          ) : (
            <div className="space-y-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className="text-sm text-gray-800 dark:text-gray-200 break-words"
                >
                  <span className="text-gray-500 text-xs">
                    [{new Date().toLocaleTimeString()}]
                  </span>{" "}
                  {message}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message as ${userName}...`}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            disabled={!isConnected}
          />
          <button
            onClick={sendMessage}
            disabled={!isConnected || !inputMessage.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>

        {/* Debug Info */}
        {/* <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>
            WebSocket URL: {process.env.NEXT_PUBLIC_WEB_SOCKET_URL}/
            {selectedRoom}
          </p>
          <p>Room: {selectedRoom}</p>
          <p>User: {userName}</p>
          <p>Total messages: {messages.length}</p>
          <p>Ready State: {ws?.readyState ?? "Not initialized"}</p>
          <p>Auto-reconnect: {shouldReconnect ? "Enabled" : "Disabled"}</p>
        </div> */}
      </div>
    </div>
  );
}
