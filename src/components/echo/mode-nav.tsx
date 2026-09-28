"use client";

import {
  MessageSquare,
  PenLine,
  BookOpen,
  Languages,
  Image,
  Video,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type Mode =
  | "home"
  | "chat"
  | "write"
  | "read"
  | "translate"
  | "image"
  | "video"
  | "more";

const primaryModes: { id: Mode; icon: React.ElementType; label: string }[] = [
  { id: "chat",      icon: MessageSquare, label: "Chat"      },
  { id: "write",     icon: PenLine,       label: "Write"     },
  { id: "read",      icon: BookOpen,      label: "Read"      },
  { id: "translate", icon: Languages,     label: "Translate" },
  { id: "image",     icon: Image,         label: "Image"     },
  { id: "video",     icon: Video,         label: "Video"     },
  { id: "more",      icon: MoreHorizontal, label: "More"    },
];

interface ModeNavProps {
  active: Mode;
  onSelect: (mode: Mode) => void;
}

export function ModeNav({ active, onSelect }: ModeNavProps) {
  return (
    <nav
      aria-label="EchoGPT modes"
      className="flex items-center justify-between px-2 py-1.5 border-b border-[#E3E3DD] bg-[#FFFFFF] shrink-0 overflow-x-auto"
    >
      {primaryModes.map(({ id, icon: Icon, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            aria-label={label}
            aria-pressed={isActive}
            className={cn(
              "flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-all min-w-[46px]",
              "text-[#8A8C88] hover:text-[#18181B] hover:bg-[#EEEEEA]",
              isActive && "text-[#18181B] bg-[#D7D7D0]"
            )}
          >
            <Icon size={15} strokeWidth={isActive ? 2 : 1.75} />
            <span className={cn("text-[10px] leading-none font-medium", isActive ? "text-[#18181B]" : "text-[#8A8C88]")}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
