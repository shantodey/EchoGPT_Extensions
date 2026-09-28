"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import { Paperclip, Mic, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatComposerProps {
  placeholder?: string;
  onSend: (message: string) => void;
  initialValue?: string;
  className?: string;
}

export function ChatComposer({
  placeholder = "Ask anything...",
  onSend,
  initialValue = "",
  className,
}: ChatComposerProps) {
  const [value, setValue] = useState(initialValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  const hasContent = value.trim().length > 0;

  return (
    <div
      className={cn(
        "mx-4 mb-4 rounded-2xl border border-[#E3E3DD] bg-[#FFFFFF] shadow-sm",
        "focus-within:border-[#D6D6CF] focus-within:shadow-md transition-all",
        className
      )}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        placeholder={placeholder}
        rows={2}
        aria-label="Message input"
        className={cn(
          "w-full resize-none rounded-t-2xl px-4 pt-3 pb-2",
          "text-[13px] text-[#18181B] placeholder:text-[#8A8C88]",
          "bg-transparent outline-none border-none leading-relaxed",
          "max-h-[120px]"
        )}
      />
      <div className="flex items-center justify-between px-3 pb-2.5 pt-1">
        <div className="flex items-center gap-0.5">
          <button
            aria-label="Attach file"
            className="p-1.5 rounded-lg text-[#8A8C88] hover:text-[#18181B] hover:bg-[#EEEEEA] transition-colors"
          >
            <Paperclip size={14} strokeWidth={1.75} />
          </button>
          <button
            aria-label="Voice input"
            className="p-1.5 rounded-lg text-[#8A8C88] hover:text-[#18181B] hover:bg-[#EEEEEA] transition-colors"
          >
            <Mic size={14} strokeWidth={1.75} />
          </button>
        </div>
        <button
          onClick={handleSend}
          disabled={!hasContent}
          aria-label="Send message"
          className={cn(
            "flex items-center justify-center w-7 h-7 rounded-lg transition-all",
            hasContent
              ? "bg-[#D7D7D0] hover:bg-[#C9C9C1] text-[#18181B]"
              : "bg-[#EEEEEA] text-[#8A8C88] cursor-not-allowed"
          )}
        >
          <ArrowUp size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
