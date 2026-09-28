"use client";

import { useState } from "react";
import { ExtensionHeader } from "@/components/echo/extension-header";
import { ModeNav, type Mode } from "@/components/echo/mode-nav";
import { HomeScreen } from "@/components/echo/home-screen";
import { ChatScreen } from "@/components/echo/chat-screen";
import { WriteScreen } from "@/components/echo/write-screen";
import { ReadScreen } from "@/components/echo/read-screen";
import { TranslateScreen } from "@/components/echo/translate-screen";
import { GenerationStudio } from "@/components/echo/generation-studio";
import { MoreScreen } from "@/components/echo/more-screen";
import { ChatComposer } from "@/components/echo/chat-composer";

const MODE_TITLES: Record<Mode, string> = {
  home:      "EchoGPT",
  chat:      "Chat",
  write:     "Write",
  read:      "Read",
  translate: "Translate",
  image:     "Image Studio",
  video:     "Video Studio",
  more:      "More",
};

export default function Home() {
  const [mode, setMode] = useState<Mode>("home");
  const [chatInit, setChatInit] = useState("");

  const handleSuggestion = (prompt: string) => {
    setChatInit(prompt);
    setMode("chat");
  };

  const handleSelectMode = (m: Mode) => {
    setChatInit("");
    setMode(m);
  };

  return (
    <div className="echo-shell">
      {/* ── Main content column ── */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden bg-[#FAFAF7]">
        {/* Unified header */}
        <ExtensionHeader title={MODE_TITLES[mode]} />

        {/* Mode content — grows to fill remaining height */}
        <div key={mode} className="flex flex-col flex-1 overflow-hidden echo-mode-enter">
          {mode === "home" && (
            <>
              <HomeScreen
                onSelectMode={handleSelectMode}
                onSuggestion={handleSuggestion}
              />
              <ChatComposer
                onSend={(text) => {
                  setChatInit(text);
                  setMode("chat");
                }}
                placeholder="Ask anything..."
              />
            </>
          )}
          {mode === "chat"      && <ChatScreen key={chatInit} />}
          {mode === "write"     && <WriteScreen />}
          {mode === "read"      && <ReadScreen />}
          {mode === "translate" && <TranslateScreen />}
          {mode === "image"     && <GenerationStudio type="image" />}
          {mode === "video"     && <GenerationStudio type="video" />}
          {mode === "more"      && <MoreScreen />}
        </div>
      </div>

      {/* ── Right: vertical mode nav ── */}
      <ModeNav active={mode} onSelect={handleSelectMode} />
    </div>
  );
}
