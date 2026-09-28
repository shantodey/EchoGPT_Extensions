"use client";

import { useState } from "react";
import { ArrowLeftRight, Languages } from "lucide-react";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  "Automatic", "English", "Spanish", "French", "German",
  "Chinese", "Japanese", "Korean", "Arabic", "Portuguese",
  "Italian", "Russian", "Hindi",
];

export function TranslateScreen() {
  const [sourceLang, setSourceLang] = useState("Automatic");
  const [targetLang, setTargetLang] = useState("English");
  const [inputText, setInputText]   = useState("");
  const [result, setResult]         = useState("");

  const swapLangs = () => {
    if (sourceLang === "Automatic") return;
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  const handleTranslate = () => {
    if (!inputText.trim()) return;
    // ponytail: stub — wire to EchoGPT translate API
    setResult(`(Translation from ${sourceLang} → ${targetLang} will appear here.)`);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Language selector */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-2 shrink-0">
        <select
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
          aria-label="Source language"
          id="translate-source-lang"
          className="flex-1 rounded-xl border border-[#E3E3DD] bg-[#FFFFFF] px-3 py-2 text-[12px] font-medium text-[#18181B] outline-none focus:border-[#D6D6CF] transition-colors appearance-none cursor-pointer"
        >
          {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>

        <button
          onClick={swapLangs}
          id="translate-swap-btn"
          aria-label="Swap languages"
          disabled={sourceLang === "Automatic"}
          className={cn(
            "p-2 rounded-xl border border-[#E3E3DD] bg-[#FFFFFF] transition-all",
            sourceLang !== "Automatic"
              ? "hover:bg-[#EEEEEA] hover:border-[#D6D6CF] text-[#5F625F]"
              : "text-[#C9C9C1] cursor-not-allowed"
          )}
        >
          <ArrowLeftRight size={14} strokeWidth={1.75} />
        </button>

        <select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          aria-label="Target language"
          id="translate-target-lang"
          className="flex-1 rounded-xl border border-[#E3E3DD] bg-[#FFFFFF] px-3 py-2 text-[12px] font-medium text-[#18181B] outline-none focus:border-[#D6D6CF] transition-colors appearance-none cursor-pointer"
        >
          {LANGUAGES.filter((l) => l !== "Automatic").map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      {/* Middle: Two balanced cards taking all available height */}
      <div className="flex-1 flex flex-col gap-3 px-4 py-2 min-h-0 overflow-y-auto">
        {/* Source card */}
        <div className="flex-1 flex flex-col min-h-[110px] rounded-2xl border border-[#E3E3DD] bg-[#FFFFFF] p-3 shadow-sm focus-within:border-[#D6D6CF] transition-all">
          <label className="text-[10px] font-semibold text-[#8A8C88] uppercase tracking-widest mb-1">
            {sourceLang}
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste or enter text to translate..."
            id="translate-input"
            aria-label="Text to translate"
            className="flex-1 w-full resize-none text-[13px] text-[#18181B] placeholder:text-[#8A8C88] bg-transparent outline-none border-none leading-relaxed"
          />
        </div>

        {/* Target card */}
        <div className="flex-1 flex flex-col min-h-[110px] rounded-2xl border border-[#E3E3DD] bg-[#FFFFFF] p-3 shadow-sm">
          <label className="text-[10px] font-semibold text-[#8A8C88] uppercase tracking-widest mb-1">
            {targetLang}
          </label>
          {result ? (
            <p className="flex-1 text-[13px] text-[#18181B] leading-relaxed whitespace-pre-wrap echo-mode-enter overflow-y-auto">
              {result}
            </p>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center text-[#8A8C88]">
              <p className="text-[12px] opacity-60">Translation will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom: Docked translate action button */}
      <div className="px-4 pb-4 pt-1 shrink-0">
        <button
          onClick={handleTranslate}
          disabled={!inputText.trim()}
          id="translate-btn"
          className={cn(
            "flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[13px] font-semibold transition-all shadow-sm",
            inputText.trim()
              ? "bg-[#D7D7D0] hover:bg-[#C9C9C1] text-[#18181B]"
              : "bg-[#EEEEEA] text-[#8A8C88] cursor-not-allowed"
          )}
        >
          <Languages size={15} strokeWidth={1.75} />
          Translate
        </button>
      </div>
    </div>
  );
}
