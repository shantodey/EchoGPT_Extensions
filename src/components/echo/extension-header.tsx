"use client";

import { X, Pin, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExtensionHeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  className?: string;
}

export function ExtensionHeader({
  title = "EchoGPT",
  subtitle,
  onBack,
  className,
}: ExtensionHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between px-4 py-3 border-b",
        "bg-[#FFFFFF] border-[#E3E3DD] shrink-0",
        className
      )}
    >
      <div className="flex items-center gap-2 min-w-0">
        {onBack && (
          <button
            onClick={onBack}
            aria-label="Go back"
            className="p-1 rounded-lg text-[#8A8C88] hover:text-[#18181B] hover:bg-[#EEEEEA] transition-colors"
          >
            <ArrowLeft size={16} strokeWidth={1.75} />
          </button>
        )}
        <div className="min-w-0">
          <span className="text-[13px] font-semibold text-[#18181B] tracking-tight leading-none">
            {title}
          </span>
          {subtitle && (
            <span className="block text-[11px] text-[#8A8C88] leading-none mt-0.5">
              {subtitle}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          aria-label="Pin extension"
          className="p-1.5 rounded-lg text-[#8A8C88] hover:text-[#18181B] hover:bg-[#EEEEEA] transition-colors"
        >
          <Pin size={14} strokeWidth={1.75} />
        </button>
        <button
          aria-label="Close extension"
          className="p-1.5 rounded-lg text-[#8A8C88] hover:text-[#18181B] hover:bg-[#EEEEEA] transition-colors"
        >
          <X size={14} strokeWidth={1.75} />
        </button>
      </div>
    </header>
  );
}
