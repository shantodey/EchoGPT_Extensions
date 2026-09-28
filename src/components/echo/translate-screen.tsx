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
    <div className="flex flex-col flex-1 overflow-y-auto px-4 py-4 gap-4">
      {/* Language selector */}
      <div className="flex items-center gap-2">
        <select
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
          aria-label="Source language"
          id="translate-source-lang"
          className="flex-1 rounded-xl border border-[#E3E3DD] bg-[#FFFFFF] px-3 py-2 text-[12px] text-[#18181B] outline-none focus:border-[#D6D6CF] transition-colors appearance-none cursor-pointer"
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
          className="flex-1 rounded-xl border border-[#E3E3DD] bg-[#FFFFFF] px-3 py-2 text-[12px] text-[#18181B] outline-none focus:border-[#D6D6CF] transition-colors appearance-none cursor-pointer"
        >
          {LANGUAGES.filter((l) => l !== "Automatic").map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      {/* Input */}
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste or enter text to translate..."
        rows={5}
        id="translate-input"
        aria-label="Text to translate"
        className={cn(
          "w-full resize-none rounded-xl border border-[#E3E3DD] bg-[#FFFFFF]",
          "px-3 py-2.5 text-[13px] text-[#18181B] placeholder:text-[#8A8C88]",
          "outline-none focus:border-[#D6D6CF] transition-colors leading-relaxed"
        )}
      />

      {/* Bottom row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[#8A8C88]">
          <Languages size={12} strokeWidth={1.75} />
          <span className="text-[11px]">EchoGPT Translate</span>
        </div>
        <button
          onClick={handleTranslate}
          disabled={!inputText.trim()}
          id="translate-btn"
          className={cn(
            "px-4 py-2 rounded-xl text-[12px] font-semibold transition-all",
            inputText.trim()
              ? "bg-[#D7D7D0] hover:bg-[#C9C9C1] text-[#18181B]"
              : "bg-[#EEEEEA] text-[#8A8C88] cursor-not-allowed"
          )}
        >
          Translate
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="rounded-xl border border-[#E3E3DD] bg-[#FFFFFF] p-3 echo-mode-enter">
          <p className="text-[11px] font-semibold text-[#8A8C88] uppercase tracking-widest mb-2">
            {targetLang}
          </p>
          <p className="text-[13px] text-[#18181B] leading-relaxed whitespace-pre-wrap">
            {result}
          </p>
        </div>
      )}
    </div>
  );
}
