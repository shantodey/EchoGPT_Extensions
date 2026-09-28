"use client";

import {
  PenLine,
  Languages,
  BookOpen,
  ImageIcon,
  Video,
  GitCompareArrows,
  Sparkles,
  FileText,
  Wand2,
  AlignLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Mode } from "./mode-nav";
import Image from "next/image";
import logo from "@/app/logo.png";

const actions: {
  id: Mode;
  icon: React.ElementType;
  label: string;
  description: string;
}[] = [
    { id: "write", icon: PenLine, label: "Write", description: "Create or improve text" },
    { id: "translate", icon: Languages, label: "Translate", description: "Translate to any language" },
    { id: "read", icon: BookOpen, label: "Read", description: "Summarize links & files" },
    { id: "image", icon: ImageIcon, label: "Image", description: "Generate images with AI" },
    { id: "video", icon: Video, label: "Video", description: "Create AI videos" },
    { id: "more", icon: GitCompareArrows, label: "Compare", description: "Compare AI responses" },
  ];

const suggestions = [
  { icon: AlignLeft, label: "Summarize this page" },
  { icon: Wand2, label: "Explain this simply" },
  { icon: FileText, label: "Fix my grammar" },
];

interface HomeScreenProps {
  onSelectMode: (mode: Mode) => void;
  onSuggestion: (prompt: string) => void;
}

export function HomeScreen({ onSelectMode, onSuggestion }: HomeScreenProps) {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto px-4 py-5 gap-5">
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[11px] text-[#8A8C88] font-medium">EchoGPT</span>
        </div>
        <h1 className="text-[22px] font-semibold text-[#18181B] leading-tight tracking-tight">
          How can I help you?
        </h1>
        <p className="text-[12px] text-[#8A8C88] mt-1 leading-relaxed">
          Pick a mode or just start typing below.
        </p>
      </div>

      {/* Action grid */}
      <div className="grid grid-cols-2 gap-2">
        {actions.map(({ id, icon: Icon, label, description }) => (
          <button
            key={id}
            id={`action-${id}`}
            onClick={() => onSelectMode(id)}
            className={cn(
              "flex items-start gap-2.5 p-3 rounded-xl border border-[#E3E3DD] bg-[#FFFFFF]",
              "text-left hover:border-[#D6D6CF] hover:bg-[#F3F3EE] transition-all group"
            )}
          >
            <span className="mt-0.5 p-1.5 rounded-lg bg-[#EEEEEA] group-hover:bg-[#D7D7D0] transition-colors">
              <Icon size={13} strokeWidth={1.75} className="text-[#5F625F]" />
            </span>
            <span className="min-w-0">
              <span className="block text-[12px] font-semibold text-[#18181B] leading-tight">
                {label}
              </span>
              <span className="block text-[11px] text-[#8A8C88] leading-tight mt-0.5">
                {description}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Suggested prompts */}
      <div>
        <p className="text-[10px] font-semibold text-[#8A8C88] uppercase tracking-widest mb-2">
          Suggestions
        </p>
        <div className="flex flex-col gap-1">
          {suggestions.map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={() => onSuggestion(label)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-left hover:bg-[#EEEEEA] transition-colors group"
            >
              <Icon size={13} strokeWidth={1.75} className="text-[#8A8C88] shrink-0" />
              <span className="text-[12px] text-[#5F625F] group-hover:text-[#18181B] transition-colors">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
