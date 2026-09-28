"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

type WriteMode = "compose" | "reply" | "grammar";

const writeModes: { id: WriteMode; label: string }[] = [
  { id: "compose", label: "Compose" },
  { id: "reply",   label: "Reply"   },
  { id: "grammar", label: "Grammar" },
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

  const handleGenerate = () => {
    if (!topic.trim()) return;
    // ponytail: stub — wire to EchoGPT write API
    setOutput(`(EchoGPT will generate your ${mode} here. Connect to the Write API.)`);
  };

  return (
    <div className="flex flex-col flex-1 overflow-y-auto px-4 py-4 gap-4">
      {/* Mode tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-[#EEEEEA]">
        {writeModes.map(({ id, label }) => (
          <button
            key={id}
            id={`write-mode-${id}`}
            onClick={() => setMode(id)}
            aria-pressed={mode === id}
            className={cn(
              "flex-1 py-1.5 rounded-lg text-[12px] font-medium transition-all",
              mode === id
                ? "bg-[#D7D7D0] text-[#18181B] shadow-sm"
                : "text-[#8A8C88] hover:text-[#18181B]"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Topic textarea */}
      <div>
        <label className="block text-[11px] font-semibold text-[#8A8C88] uppercase tracking-widest mb-1.5">
          {mode === "grammar" ? "Paste your text" : "Topic or prompt"}
        </label>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder={
            mode === "compose"
              ? "Describe what you want to write..."
              : mode === "reply"
              ? "Paste the message you're replying to..."
              : "Paste the text to check grammar..."
          }
          rows={4}
          className={cn(
            "w-full resize-none rounded-xl border border-[#E3E3DD] bg-[#FFFFFF]",
            "px-3 py-2.5 text-[13px] text-[#18181B] placeholder:text-[#8A8C88]",
            "outline-none focus:border-[#D6D6CF] transition-colors leading-relaxed"
          )}
        />
      </div>

      {/* Advanced options toggle */}
      <button
        onClick={() => setShowOpts(!showOpts)}
        className="flex items-center justify-between px-3 py-2 rounded-xl border border-[#E3E3DD] bg-[#FFFFFF] text-[12px] text-[#5F625F] hover:border-[#D6D6CF] hover:bg-[#F3F3EE] transition-all"
      >
        <span className="font-medium">Writing options</span>
        <div className="flex items-center gap-1.5 text-[#8A8C88]">
          <span className="text-[11px]">{format} · {tone} · {length}</span>
          {showOpts ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </div>
      </button>

      {/* Collapsible options */}
      {showOpts && (
        <div className="grid grid-cols-2 gap-2 echo-mode-enter">
          <SelectField label="Format"   value={format} options={formats} onChange={setFormat} />
          <SelectField label="Tone"     value={tone}   options={tones}   onChange={setTone}   />
          <SelectField label="Length"   value={length} options={lengths} onChange={setLength} />
          <SelectField label="Language" value={lang}   options={langs}   onChange={setLang}   />
        </div>
      )}

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={!topic.trim()}
        id="write-generate-btn"
        className={cn(
          "flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[13px] font-semibold transition-all",
          topic.trim()
            ? "bg-[#D7D7D0] hover:bg-[#C9C9C1] text-[#18181B]"
            : "bg-[#EEEEEA] text-[#8A8C88] cursor-not-allowed"
        )}
      >
        <Wand2 size={14} strokeWidth={1.75} />
        Generate
      </button>

      {/* Output */}
      {output && (
        <div className="rounded-xl border border-[#E3E3DD] bg-[#FFFFFF] p-3 echo-mode-enter">
          <p className="text-[11px] font-semibold text-[#8A8C88] uppercase tracking-widest mb-2">
            Result
          </p>
          <p className="text-[13px] text-[#18181B] leading-relaxed whitespace-pre-wrap">
            {output}
          </p>
        </div>
      )}
    </div>
  );
}

// Inline mini select component — avoids extra file for simple dropdown
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
