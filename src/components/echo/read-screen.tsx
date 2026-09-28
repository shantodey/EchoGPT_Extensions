"use client";

import { useState, useRef } from "react";
import { Link2, Upload, ArrowRight, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export function ReadScreen() {
  const [url, setUrl]           = useState("");
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef                 = useRef<HTMLInputElement>(null);

  const handleReadLink = () => {
    if (!url.trim()) return;
    // ponytail: stub — wire to EchoGPT read/summarize API
    alert(`Reading: ${url}`);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setFileName(file.name);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  return (
    <div className="flex flex-col flex-1 overflow-y-auto px-4 py-5 gap-5">
      {/* Link section */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Link2 size={13} strokeWidth={1.75} className="text-[#8A8C88]" />
          <span className="text-[11px] font-semibold text-[#8A8C88] uppercase tracking-widest">
            Read a link
          </span>
        </div>
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/article..."
            id="read-url-input"
            aria-label="Webpage URL to read"
            onKeyDown={(e) => e.key === "Enter" && handleReadLink()}
            className={cn(
              "flex-1 rounded-xl border border-[#E3E3DD] bg-[#FFFFFF] px-3 py-2.5",
              "text-[13px] text-[#18181B] placeholder:text-[#8A8C88]",
              "outline-none focus:border-[#D6D6CF] transition-colors"
            )}
          />
          <button
            onClick={handleReadLink}
            disabled={!url.trim()}
            id="read-link-btn"
            aria-label="Read this link"
            className={cn(
              "flex items-center justify-center px-3 rounded-xl transition-all",
              url.trim()
                ? "bg-[#D7D7D0] hover:bg-[#C9C9C1] text-[#18181B]"
                : "bg-[#EEEEEA] text-[#8A8C88] cursor-not-allowed"
            )}
          >
            <ArrowRight size={15} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#E3E3DD]" />
        <span className="text-[11px] text-[#8A8C88]">or</span>
        <div className="flex-1 h-px bg-[#E3E3DD]" />
      </div>

      {/* File upload */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <FileText size={13} strokeWidth={1.75} className="text-[#8A8C88]" />
          <span className="text-[11px] font-semibold text-[#8A8C88] uppercase tracking-widest">
            Read a file
          </span>
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          id="read-upload-zone"
          aria-label="Upload file to read"
          className={cn(
            "w-full rounded-2xl border-2 border-dashed transition-all py-10 flex flex-col items-center gap-2.5",
            dragging
              ? "border-[#D7D7D0] bg-[#F3F3EE]"
              : fileName
              ? "border-[#D7D7D0] bg-[#F3F3EE]"
              : "border-[#E3E3DD] bg-[#FFFFFF] hover:border-[#D6D6CF] hover:bg-[#F3F3EE]"
          )}
        >
          <div className={cn(
            "p-3 rounded-xl transition-colors",
            fileName ? "bg-[#D7D7D0]" : "bg-[#EEEEEA]"
          )}>
            <Upload size={18} strokeWidth={1.75} className={fileName ? "text-[#18181B]" : "text-[#8A8C88]"} />
          </div>
          {fileName ? (
            <div className="text-center">
              <p className="text-[13px] font-semibold text-[#18181B]">{fileName}</p>
              <p className="text-[11px] text-[#8A8C88] mt-0.5">Click to change file</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-[13px] font-semibold text-[#18181B]">Drop a file here</p>
              <p className="text-[11px] text-[#8A8C88] mt-0.5">or click to browse</p>
            </div>
          )}
          <p className="text-[10px] text-[#8A8C88]">PDF, DOCX, TXT supported</p>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
