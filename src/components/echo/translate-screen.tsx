"use client";

import { useState } from "react";
import { ArrowLeftRight, Languages, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const ALL_LANGUAGES = [
  "Automatic", "English", "Spanish", "French", "German",
  "Chinese", "Japanese", "Korean", "Arabic", "Portuguese",
  "Italian", "Russian", "Hindi", "Bengali", "Turkish",
];

export function TranslateScreen() {
  const [sourceLang, setSourceLang] = useState("Automatic");
  const [targetLang, setTargetLang] = useState("English");
  const [inputText, setInputText]   = useState("");
  const [result, setResult]         = useState("");
  const [copied, setCopied]         = useState(false);

  const swapLangs = () => {
    if (sourceLang === "Automatic") return;
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    if (result && inputText) {
      setInputText(result);
      setResult(inputText);
    }
  };

  const handleTranslate = () => {
    if (!inputText.trim()) return;
    setResult(`(Translation to ${targetLang}: "${inputText}". Connect backend Translate API.)`);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Middle: Canvas / Output Workspace */}
      <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0 flex flex-col">
        {result ? (
          <div className="flex-1 flex flex-col rounded-2xl border border-[#E3E3DD] bg-[#FFFFFF] p-4 shadow-sm echo-mode-enter">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3E3DD]/40 mb-2 shrink-0">
              <span className="text-[11px] font-semibold text-[#8A8C88] uppercase tracking-wider">
                {targetLang} Translation
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] text-[#8A8C88] hover:text-[#18181B] p-1 transition-colors"
                aria-label="Copy translation"
              >
                {copied ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <p className="flex-1 text-[13px] text-[#18181B] leading-relaxed whitespace-pre-wrap overflow-y-auto">
              {result}
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-[#8A8C88]">
            <div className="w-12 h-12 rounded-2xl bg-[#EEEEEA] flex items-center justify-center mb-3 text-[#5F625F]">
              <Languages size={22} strokeWidth={1.75} />
            </div>
            <h3 className="text-[14px] font-semibold text-[#18181B]">Translate</h3>
            <p className="text-[12px] text-[#8A8C88] mt-1 max-w-[220px] leading-relaxed">
              Type or paste any text in the box below to translate instantly.
            </p>
          </div>
        )}
      </div>

      {/* Bottom: Language Bar on top of text box + Input Composer */}
      <div className="px-4 pb-4 shrink-0 space-y-2">
        {/* Language selector bar right on top of text box */}
        <div className="flex items-center justify-between p-1.5 rounded-xl border border-[#E3E3DD] bg-[#FFFFFF] shadow-sm">
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            aria-label="Source language"
            className="flex-1 bg-transparent px-2 py-1 text-[12px] font-medium text-[#18181B] outline-none cursor-pointer appearance-none text-center"
          >
            {ALL_LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>

          <button
            onClick={swapLangs}
            disabled={sourceLang === "Automatic"}
            aria-label="Swap languages"
            className={cn(
              "p-1.5 rounded-lg transition-all shrink-0",
              sourceLang !== "Automatic"
                ? "hover:bg-[#EEEEEA] text-[#18181B]"
                : "text-[#C9C9C1] cursor-not-allowed"
            )}
          >
            <ArrowLeftRight size={13} strokeWidth={2} />
          </button>

          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            aria-label="Target language"
            className="flex-1 bg-transparent px-2 py-1 text-[12px] font-medium text-[#18181B] outline-none cursor-pointer appearance-none text-center"
          >
            {ALL_LANGUAGES.filter((l) => l !== "Automatic").map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        {/* Textarea + Translate Button */}
        <div className="rounded-2xl border border-[#E3E3DD] bg-[#FFFFFF] shadow-sm focus-within:border-[#D6D6CF] focus-within:shadow-md transition-all">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleTranslate();
              }
            }}
            placeholder={`Enter text to translate into ${targetLang}...`}
            rows={2}
            className="w-full resize-none px-4 pt-3 pb-2 text-[13px] text-[#18181B] placeholder:text-[#8A8C88] bg-transparent outline-none border-none leading-relaxed max-h-[120px]"
          />
          <div className="flex items-center justify-between px-3 pb-2.5 pt-1 border-t border-[#E3E3DD]/40">
            <span className="text-[11px] text-[#8A8C88]">{sourceLang} → {targetLang}</span>
            <button
              onClick={handleTranslate}
              disabled={!inputText.trim()}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all shrink-0",
                inputText.trim()
                  ? "bg-[#D7D7D0] hover:bg-[#C9C9C1] text-[#18181B]"
                  : "bg-[#EEEEEA] text-[#8A8C88] cursor-not-allowed"
              )}
            >
              <Languages size={13} strokeWidth={1.75} />
              <span>Translate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
