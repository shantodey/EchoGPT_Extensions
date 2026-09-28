"use client";

import { useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatComposer } from "./chat-composer";
import logo from "@/app/logo.png";

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

    const assistantMsg: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "I received your message. (Connect to EchoGPT API to get real responses.)",
    };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Messages — flow up from bottom */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col justify-end space-y-4 min-h-0">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex gap-2.5", msg.role === "user" && "flex-row-reverse")} >
            <div className={cn(
              "flex items-center justify-center w-6 h-6 rounded-full shrink-0 mt-0.5 overflow-hidden",
              msg.role === "assistant" ? "" : "bg-[#EEEEEA] text-[#5F625F]"
            )}>
              {msg.role === "assistant" ? (
                <Image src={logo} alt="EchoGPT" width={24} height={24} className="w-full h-full object-cover rounded-full" />
              ) : (
                <User size={12} strokeWidth={1.75} />
              )}
            </div>

            <div className={cn("max-w-[75%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed", msg.role === "assistant"
              ? "bg-[#FFFFFF] border border-[#E3E3DD] text-[#18181B] rounded-tl-sm" : "bg-[#D7D7D0] text-[#18181B] rounded-tr-sm")}>
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
