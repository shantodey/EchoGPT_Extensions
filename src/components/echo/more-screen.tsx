"use client";

import { GitCompareArrows, Zap, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Mode } from "./mode-nav";

const tools: {
  id: string;
  icon: React.ElementType;
  label: string;
  description: string;
}[] = [
  {
    id: "compare",
    icon: GitCompareArrows,
    label: "Compare",
    description: "Compare responses across multiple AI models side by side.",
  },
  {
    id: "mcp",
    icon: Zap,
    label: "MCP",
    description: "Connect and run Model Context Protocol tools and integrations.",
  },
];

interface MoreScreenProps {
  onOpenTool?: (toolId: string) => void;
}

export function MoreScreen({ onOpenTool }: MoreScreenProps) {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto px-4 py-5 gap-4">
      <div>
        <h2 className="text-[15px] font-semibold text-[#18181B] tracking-tight">
          Advanced tools
        </h2>
        <p className="text-[11px] text-[#8A8C88] mt-0.5 leading-relaxed">
          Power features for advanced workflows.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {tools.map(({ id, icon: Icon, label, description }) => (
          <button
            key={id}
            id={`more-tool-${id}`}
            onClick={() => onOpenTool?.(id)}
            className={cn(
              "flex items-start gap-3 p-3.5 rounded-xl border border-[#E3E3DD] bg-[#FFFFFF]",
              "text-left hover:border-[#D6D6CF] hover:bg-[#F3F3EE] transition-all group"
            )}
          >
            <span className="mt-0.5 p-2 rounded-xl bg-[#EEEEEA] group-hover:bg-[#D7D7D0] transition-colors shrink-0">
              <Icon size={14} strokeWidth={1.75} className="text-[#5F625F]" />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-[13px] font-semibold text-[#18181B] leading-tight">
                {label}
              </span>
              <span className="block text-[11px] text-[#8A8C88] leading-snug mt-0.5">
                {description}
              </span>
            </span>
            <ExternalLink
              size={12}
              strokeWidth={1.75}
              className="mt-1 text-[#C9C9C1] group-hover:text-[#8A8C88] transition-colors shrink-0"
            />
          </button>
        ))}
      </div>

      {/* Footer link */}
      <div className="mt-auto pt-2">
        <a
          href="https://echogpt.live"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[11px] text-[#8A8C88] hover:text-[#18181B] transition-colors"
        >
          <ExternalLink size={11} strokeWidth={1.75} />
          Open full EchoGPT
        </a>
      </div>
    </div>
  );
}
