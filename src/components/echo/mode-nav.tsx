"use client";

import {
  MessageSquare,
  PenLine,
  BookOpen,
  Languages,
  Image,
  Video,
  MoreHorizontal,
  Home,
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

const navItems: { id: Mode; icon: React.ElementType; label: string }[] = [
  { id: "home",      icon: Home,          label: "Home"      },
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
      className="flex flex-col items-center py-3 gap-0.5 w-14 shrink-0 border-r border-[#E3E3DD] bg-[#FFFFFF] overflow-y-auto"
    >
      {navItems.map(({ id, icon: Icon, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            aria-label={label}
            aria-pressed={isActive}
            title={label}
            className={cn(
              "flex flex-col items-center gap-1 w-10 py-2 rounded-xl transition-all",
              "text-[#8A8C88] hover:text-[#18181B] hover:bg-[#EEEEEA]",
              isActive && "text-[#18181B] bg-[#D7D7D0] hover:bg-[#C9C9C1]"
            )}
          >
            <Icon size={16} strokeWidth={isActive ? 2 : 1.75} />
            <span className={cn(
              "text-[9px] leading-none font-medium",
              isActive ? "text-[#18181B]" : "text-[#8A8C88]"
            )}>
              {label === "Translate" ? "Transl." : label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
