"use client";

import { useState } from "react";
import {  PenLine, CornerDownLeft,  CheckCheck,  SlidersHorizontal,  Wand2,  Copy,  Check,} from "lucide-react";
import { cn } from "@/lib/utils";

type WriteMode = "compose" | "reply" | "grammar";

const writeModes: { id: WriteMode; label: string; icon: React.ElementType }[] = [
  { id: "compose", label: "Compose", icon: PenLine },
  { id: "reply",   label: "Reply",   icon: CornerDownLeft },
  { id: "grammar", label: "Grammar", icon: CheckCheck },
];

const formats = ["Automatic", "Paragraph", "Bullet points", "Email", "Essay"];
const tones   = ["Automatic", "Professional", "Casual", "Friendly", "Formal"];
const lengths = ["Automatic", "Short", "Medium", "Long"];
const langs   = ["Automatic", "English", "Spanish", "French", "German", "Chinese"];

export function WriteScreen() {
  const [mode, setMode]         = useState<WriteMode>("compose");
  const [topic, setTopic]       = useState("");
  const [showOpts, setShowOpts] = useState(false);
  const [format, setFormat]     = useState("Automatic");
  const [tone, setTone]         = useState("Automatic");
  const [length, setLength]     = useState("Automatic");
  const [lang, setLang]         = useState("Automatic");
  const [output, setOutput]     = useState("");
  const [copied, setCopied]     = useState(false);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setOutput(`(EchoGPT ${mode} output for: "${topic}". Connect to backend Write API for real-time generation.)`);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Middle: Canvas / Output Workspace */}
      <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0 flex flex-col">
        {output ? (
          <div className="flex-1 flex flex-col rounded-2xl border border-[#E3E3DD] bg-[#FFFFFF] p-4 shadow-sm echo-mode-enter">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3E3DD]/60 mb-3 shrink-0">
              <span className="text-[11px] font-semibold text-[#8A8C88] uppercase tracking-wider">
                {mode} result
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] text-[#8A8C88] hover:text-[#18181B] transition-colors p-1"
                aria-label="Copy output"
              >
                {copied ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <p className="flex-1 text-[13px] text-[#18181B] leading-relaxed whitespace-pre-wrap overflow-y-auto">
              {output}
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-[#8A8C88]">
            <div className="w-12 h-12 rounded-2xl bg-[#EEEEEA] flex items-center justify-center mb-3 text-[#5F625F]">
              <PenLine size={22} strokeWidth={1.75} />
            </div>
            <h3 className="text-[14px] font-semibold text-[#18181B]">Write Studio</h3>
            <p className="text-[12px] text-[#8A8C88] mt-1 max-w-[220px] leading-relaxed">
              Choose a mode below, type your prompt, and generate text instantly.
            </p>
          </div>
        )}
      </div>

      {/* Bottom: Docked Controls & Composer (Zero Horizontal Scroll) */}
      <div className="px-4 pb-4 shrink-0 space-y-2">
        {/* Collapsible Options Drawer */}
        {showOpts && (
          <div className="p-3 rounded-2xl border border-[#E3E3DD] bg-[#FFFFFF] shadow-sm grid grid-cols-2 gap-2 echo-mode-enter">
            <SelectField label="Format"   value={format} options={formats} onChange={setFormat} />
            <SelectField label="Tone"     value={tone}   options={tones}   onChange={setTone}   />
            <SelectField label="Length"   value={length} options={lengths} onChange={setLength} />
            <SelectField label="Language" value={lang}   options={langs}   onChange={setLang}   />
          </div>
        )}

        {/* Clean Mode Bar right on top of the text box (No Horizontal Scroll) */}
        <div className="flex items-center gap-1 p-1 rounded-xl border border-[#E3E3DD] bg-[#FFFFFF] shadow-sm">
          {writeModes.map(({ id, label, icon: Icon }) => {
            const isActive = mode === id;
            return (
              <button
                key={id}
                id={`write-mode-${id}`}
                onClick={() => setMode(id)}
                aria-pressed={isActive}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-medium transition-all",
                  isActive
                    ? "bg-[#D7D7D0] text-[#18181B] shadow-sm"
                    : "text-[#8A8C88] hover:text-[#18181B] hover:bg-[#EEEEEA]"
                )}
              >
                <Icon size={12} strokeWidth={isActive ? 2 : 1.75} />
                <span>{label}</span>
              </button>
            );
          })}

          <button
            onClick={() => setShowOpts(!showOpts)}
            aria-label="Toggle options"
            title="Formatting & Tone options"
            className={cn(
              "p-1.5 rounded-lg transition-colors shrink-0",
              showOpts
                ? "bg-[#D7D7D0] text-[#18181B]"
                : "text-[#8A8C88] hover:text-[#18181B] hover:bg-[#EEEEEA]"
            )}
          >
            <SlidersHorizontal size={13} strokeWidth={1.75} />
          </button>
        </div>

        {/* Input Card */}
        <div className="rounded-2xl border border-[#E3E3DD] bg-[#FFFFFF] shadow-sm focus-within:border-[#D6D6CF] focus-within:shadow-md transition-all">
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleGenerate();
              }
            }}
            placeholder={
              mode === "compose"
                ? "Describe what you want to write..."
                : mode === "reply"
                ? "Paste the message you're replying to..."
                : "Paste the text to check grammar..."
            }
            rows={2}
            aria-label="Write prompt"
            className="w-full resize-none px-4 pt-3 pb-2 text-[13px] text-[#18181B] placeholder:text-[#8A8C88] bg-transparent outline-none border-none leading-relaxed max-h-[120px]"
          />

          <div className="flex items-center justify-between px-3 pb-2.5 pt-1 border-t border-[#E3E3DD]/40">
            <span className="text-[11px] text-[#8A8C88] font-medium capitalize">{mode} mode</span>
            <button
              onClick={handleGenerate}
              disabled={!topic.trim()}
              id="write-generate-btn"
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all shrink-0",
                topic.trim()
                  ? "bg-[#D7D7D0] hover:bg-[#C9C9C1] text-[#18181B]"
                  : "bg-[#EEEEEA] text-[#8A8C88] cursor-not-allowed"
              )}
            >
              <Wand2 size={13} strokeWidth={1.75} />
              <span>Write</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-[#8A8C88] uppercase tracking-widest mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="w-full rounded-lg border border-[#E3E3DD] bg-[#FFFFFF] px-2.5 py-1.5 text-[12px] text-[#18181B] outline-none focus:border-[#D6D6CF] transition-colors appearance-none cursor-pointer"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
