"use client";

import { useState } from "react";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatComposer } from "./chat-composer";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content: "Hello! I'm EchoGPT. How can I help you today?",
};

export function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);

  const handleSend = (text: string) => {
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };
    // ponytail: stub response; wire to real API when backend is connected
    const assistantMsg: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "I received your message. (Connect to EchoGPT API to get real responses.)",
    };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn("flex gap-2.5", msg.role === "user" && "flex-row-reverse")}
          >
            {/* Avatar */}
            <div
              className={cn(
                "flex items-center justify-center w-6 h-6 rounded-full shrink-0 mt-0.5",
                msg.role === "assistant"
                  ? "bg-[#D7D7D0] text-[#18181B]"
                  : "bg-[#EEEEEA] text-[#5F625F]"
              )}
            >
              {msg.role === "assistant" ? (
                <Bot size={12} strokeWidth={1.75} />
              ) : (
                <User size={12} strokeWidth={1.75} />
              )}
            </div>

            {/* Bubble */}
            <div
              className={cn(
                "max-w-[75%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed",
                msg.role === "assistant"
                  ? "bg-[#FFFFFF] border border-[#E3E3DD] text-[#18181B] rounded-tl-sm"
                  : "bg-[#D7D7D0] text-[#18181B] rounded-tr-sm"
              )}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Composer */}
      <ChatComposer onSend={handleSend} placeholder="Ask anything..." />
    </div>
  );
}
