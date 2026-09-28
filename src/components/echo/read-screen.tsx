"use client";

import { useState, useRef } from "react";
import { Link2, Upload, ArrowRight, FileText, Globe, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ReadScreen() {
  const [query, setQuery]       = useState("");
  const [url, setUrl]           = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [readingState, setReadingState] = useState<string | null>(null);
  const fileRef                 = useRef<HTMLInputElement>(null);

  const handleReadCurrentTab = () => {
    setReadingState("Summarizing current active webpage...");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      setReadingState(`Reading document: ${file.name}`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setReadingState(`Reading document: ${file.name}`);
    }
  };

  const handleSend = () => {
    if (!query.trim() && !url.trim()) return;
    setReadingState(`Analyzing: ${url || query}...`);
    setQuery("");
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Middle: Canvas & Quick Read Actions */}
      <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0 space-y-3">
        {/* Current Tab Smart Action Card */}
        <div className="p-3.5 rounded-2xl border border-[#E3E3DD] bg-[#FFFFFF] shadow-sm hover:border-[#D6D6CF] transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#EEEEEA] text-[#18181B]">
                <Globe size={16} strokeWidth={1.75} />
              </div>
              <div>
                <h4 className="text-[13px] font-semibold text-[#18181B] leading-tight">
                  Current Webpage
                </h4>
                <p className="text-[11px] text-[#8A8C88] leading-tight mt-0.5">
                  Summarize or ask questions about this tab
                </p>
              </div>
            </div>
            <button
              onClick={handleReadCurrentTab}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#D7D7D0] hover:bg-[#C9C9C1] text-[#18181B] text-[11px] font-semibold transition-all shrink-0"
            >
              <Sparkles size={12} strokeWidth={2} />
              <span>Summarize</span>
            </button>
          </div>
        </div>

        {/* File Dropzone or Active State */}
        {readingState ? (
          <div className="rounded-2xl border border-[#E3E3DD] bg-[#FFFFFF] p-4 shadow-sm echo-mode-enter">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3E3DD]/60 mb-2">
              <span className="text-[11px] font-semibold text-[#8A8C88] uppercase tracking-wider">
                Analysis
              </span>
              <button
                onClick={() => { setReadingState(null); setFileName(null); setUrl(""); }}
                className="text-[#8A8C88] hover:text-[#18181B] p-1"
                aria-label="Clear analysis"
              >
                <X size={12} />
              </button>
            </div>
            <p className="text-[13px] text-[#18181B] leading-relaxed">
              {readingState}
            </p>
          </div>
        ) : (
          <button
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            aria-label="Upload document"
            className={cn(
              "w-full rounded-2xl border-2 border-dashed transition-all py-8 flex flex-col items-center justify-center gap-2 text-center",
              dragging
                ? "border-[#D7D7D0] bg-[#F3F3EE]"
                : fileName
                ? "border-[#D7D7D0] bg-[#F3F3EE]"
                : "border-[#E3E3DD] bg-[#FFFFFF] hover:border-[#D6D6CF] hover:bg-[#F3F3EE]"
            )}
          >
            <div className="p-2.5 rounded-xl bg-[#EEEEEA] text-[#5F625F]">
              <Upload size={16} strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-[#18181B]">
                {fileName || "Drop a document to read"}
              </p>
              <p className="text-[10px] text-[#8A8C88] mt-0.5">
                PDF, Word, or TXT · Click to browse
              </p>
            </div>
          </button>
        )}

        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
        />
      </div>

      {/* Bottom: Modern Read Composer with URL & Attach pills */}
      <div className="px-4 pb-4 shrink-0 space-y-2">
        {/* Optional URL Drawer */}
        {showUrlInput && (
          <div className="flex items-center gap-2 p-2 rounded-2xl border border-[#E3E3DD] bg-[#FFFFFF] shadow-sm echo-mode-enter">
            <Link2 size={13} strokeWidth={1.75} className="text-[#8A8C88] ml-1 shrink-0" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste article or webpage link..."
              className="flex-1 bg-transparent text-[12px] text-[#18181B] placeholder:text-[#8A8C88] outline-none"
            />
            <button
              onClick={() => setShowUrlInput(false)}
              className="p-1 text-[#8A8C88] hover:text-[#18181B]"
            >
              <X size={12} />
            </button>
          </div>
        )}

        {/* Unified Bottom Composer */}
        <div className="rounded-2xl border border-[#E3E3DD] bg-[#FFFFFF] shadow-sm focus-within:border-[#D6D6CF] focus-within:shadow-md transition-all">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={url ? "Ask about this link..." : "Ask about this page, link, or document..."}
            rows={2}
            aria-label="Question about content"
            className="w-full resize-none px-4 pt-3 pb-2 text-[13px] text-[#18181B] placeholder:text-[#8A8C88] bg-transparent outline-none border-none leading-relaxed max-h-[120px]"
          />

          <div className="flex items-center justify-between px-3 pb-2.5 pt-1 border-t border-[#E3E3DD]/40">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowUrlInput(!showUrlInput)}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all",
                  showUrlInput || url
                    ? "bg-[#D7D7D0] text-[#18181B]"
                    : "text-[#8A8C88] hover:text-[#18181B] hover:bg-[#EEEEEA]"
                )}
                title="Paste web link"
              >
                <Link2 size={12} strokeWidth={1.75} />
                <span>{url ? "Link attached" : "Paste link"}</span>
              </button>

              <button
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium text-[#8A8C88] hover:text-[#18181B] hover:bg-[#EEEEEA] transition-all"
                title="Upload file"
              >
                <FileText size={12} strokeWidth={1.75} />
                <span>Upload</span>
              </button>
            </div>

            <button
              onClick={handleSend}
              disabled={!query.trim() && !url.trim()}
              className={cn(
                "flex items-center justify-center w-7 h-7 rounded-lg transition-all",
                query.trim() || url.trim()
                  ? "bg-[#D7D7D0] hover:bg-[#C9C9C1] text-[#18181B]"
                  : "bg-[#EEEEEA] text-[#8A8C88] cursor-not-allowed"
              )}
              aria-label="Send reading query"
            >
              <ArrowRight size={14} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
