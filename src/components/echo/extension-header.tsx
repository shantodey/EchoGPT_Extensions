"use client";

import Image from "next/image";
import { X, Pin } from "lucide-react";
import { cn } from "@/lib/utils";
import logoImg from "@/app/logo.png";

interface ExtensionHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function ExtensionHeader({
  title = "EchoGPT",
  subtitle,
  className,
}: ExtensionHeaderProps) {
  return (
    <header className={cn("flex items-center justify-between px-4 py-3 border-b shrink-0", "bg-[#FFFFFF] border-[#E3E3DD]", className)}>
      <div className="flex items-center gap-2 min-w-0">
        <Image  src={logoImg}  alt="EchoGPT Logo"  width={20}  height={20}  className="rounded-full shrink-0"/>
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
        <button aria-label="Pin extension" className="p-1.5 rounded-lg text-[#8A8C88] hover:text-[#18181B] hover:bg-[#EEEEEA] transition-colors">
          <Pin size={14} strokeWidth={1.75} />
        </button>
        <button aria-label="Close extension" className="p-1.5 rounded-lg text-[#8A8C88] hover:text-[#18181B] hover:bg-[#EEEEEA] transition-colors">
          <X size={14} strokeWidth={1.75} />
        </button>
      </div>
    </header>
  );
}
