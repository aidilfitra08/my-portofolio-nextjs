"use client";

import "highlight.js/styles/github-dark.css";
import AuthGate from "../../../components/AuthGate";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import InputArea from "./components/InputArea";
import { useChatLogic } from "./hooks/useChatLogic";

export default function SimpleAIAgentPage() {
  const {
    messages,
    input,
    setInput,
    isLoading,
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
  } = useChatLogic();

  return (
    <AuthGate>
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

        <ChatHeader
          onClearHistory={clearHistory}
          onLogout={handleLogout}
          speechSupported={speechSupported}
        />

        <ChatMessages messages={messages} isLoading={isLoading} />

        <InputArea
          input={input}
          onInputChange={setInput}
          onSendMessage={sendMessage}
          isLoading={isLoading}
          speechSupported={speechSupported}
          isListening={isListening}
          onToggleListening={toggleListening}
          useStreaming={useStreaming}
          onStreamingChange={setUseStreaming}
          autoRetrieve={autoRetrieve}
          onAutoRetrieveChange={setAutoRetrieve}
          retrieveLimit={retrieveLimit}
          onRetrieveLimitChange={setRetrieveLimit}
          onKeyPress={handleKeyPress}
        />
      </div>
    </AuthGate>
  );
}
