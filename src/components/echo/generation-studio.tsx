"use client";

import { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp, ImageIcon, VideoIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StudioType = "image" | "video";

interface GenerationStudioProps {
  type: StudioType;
}

const IMAGE_RATIOS  = ["1:1", "16:9", "9:16", "4:3", "3:2"];
const VIDEO_RATIOS  = ["16:9", "9:16", "1:1"];
const IMAGE_MODELS  = ["Nano Banana 2 Lite", "Nano Banana 2", "Nano Banana Pro"];
const VIDEO_MODELS  = ["EchoVideo 1", "EchoVideo 1 Pro"];
const IMAGE_COUNTS  = ["1", "2", "4"];

export function GenerationStudio({ type }: GenerationStudioProps) {
  const isImage = type === "image";

  const [prompt, setPrompt]       = useState("");
  const [ratio, setRatio]         = useState(isImage ? "1:1" : "16:9");
  const [model, setModel]         = useState(isImage ? IMAGE_MODELS[0] : VIDEO_MODELS[0]);
  const [count, setCount]         = useState("1");
  const [showAdv, setShowAdv]     = useState(false);
  const [creations, setCreations] = useState<string[]>([]);

  const ratios  = isImage ? IMAGE_RATIOS  : VIDEO_RATIOS;
  const models  = isImage ? IMAGE_MODELS  : VIDEO_MODELS;

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    // ponytail: stub — wire to EchoGPT image/video generation API
    const stub = isImage
      ? `Image: "${prompt}" (${ratio}, ${model})`
      : `Video: "${prompt}" (${ratio}, ${model})`;
    setCreations((prev) => [stub, ...prev]);
    setPrompt("");
  };

  return (
    <div className="flex flex-col flex-1 overflow-y-auto px-4 py-4 gap-4">
      {/* Heading */}
      <div>
        <div className="flex items-center gap-2 mb-0.5">
          {isImage ? (
            <ImageIcon size={15} strokeWidth={1.75} className="text-[#8A8C88]" />
          ) : (
            <VideoIcon size={15} strokeWidth={1.75} className="text-[#8A8C88]" />
          )}
          <h2 className="text-[15px] font-semibold text-[#18181B] tracking-tight">
            {isImage ? "Image Studio" : "Video Studio"}
          </h2>
        </div>
        <p className="text-[11px] text-[#8A8C88] leading-relaxed">
          {isImage
            ? "Create images that stop the scroll."
            : "Describe what you imagine, and the video makes itself."}
        </p>
      </div>

      {/* Prompt */}
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={`Describe the ${type} you want to create...`}
        rows={3}
        id={`${type}-prompt`}
        aria-label={`${isImage ? "Image" : "Video"} prompt`}
        className={cn(
          "w-full resize-none rounded-xl border border-[#E3E3DD] bg-[#FFFFFF]",
          "px-3 py-2.5 text-[13px] text-[#18181B] placeholder:text-[#8A8C88]",
          "outline-none focus:border-[#D6D6CF] transition-colors leading-relaxed"
        )}
      />

      {/* Basic controls */}
      <div className={cn("flex items-center gap-2", isImage ? "flex-wrap" : "")}>
        {/* Ratio pills */}
        <div className="flex items-center gap-1 flex-wrap">
          {ratios.map((r) => (
            <button
              key={r}
              onClick={() => setRatio(r)}
              aria-pressed={ratio === r}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all",
                ratio === r
                  ? "bg-[#D7D7D0] border-[#D6D6CF] text-[#18181B]"
                  : "bg-[#FFFFFF] border-[#E3E3DD] text-[#5F625F] hover:border-[#D6D6CF] hover:bg-[#F3F3EE]"
              )}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Count (image only) */}
        {isImage && (
          <div className="flex items-center gap-1 ml-auto">
            {IMAGE_COUNTS.map((c) => (
              <button
                key={c}
                onClick={() => setCount(c)}
                aria-pressed={count === c}
                className={cn(
                  "w-7 h-7 rounded-lg text-[11px] font-medium border transition-all",
                  count === c
                    ? "bg-[#D7D7D0] border-[#D6D6CF] text-[#18181B]"
                    : "bg-[#FFFFFF] border-[#E3E3DD] text-[#5F625F] hover:border-[#D6D6CF] hover:bg-[#F3F3EE]"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Advanced settings toggle */}
      <button
        onClick={() => setShowAdv(!showAdv)}
        className="flex items-center justify-between px-3 py-2 rounded-xl border border-[#E3E3DD] bg-[#FFFFFF] text-[12px] text-[#5F625F] hover:border-[#D6D6CF] hover:bg-[#F3F3EE] transition-all"
      >
        <span className="font-medium">Advanced settings</span>
        <div className="flex items-center gap-1.5 text-[#8A8C88]">
          <span className="text-[11px] truncate max-w-[120px]">{model}</span>
          {showAdv ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </div>
      </button>

      {showAdv && (
        <div className="echo-mode-enter">
          <label className="block text-[10px] font-semibold text-[#8A8C88] uppercase tracking-widest mb-1.5">
            Model
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            aria-label="Generation model"
            id={`${type}-model-select`}
            className="w-full rounded-xl border border-[#E3E3DD] bg-[#FFFFFF] px-3 py-2 text-[12px] text-[#18181B] outline-none focus:border-[#D6D6CF] transition-colors appearance-none cursor-pointer"
          >
            {models.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      )}

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={!prompt.trim()}
        id={`${type}-generate-btn`}
        className={cn(
          "flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[13px] font-semibold transition-all",
          prompt.trim()
            ? "bg-[#D7D7D0] hover:bg-[#C9C9C1] text-[#18181B]"
            : "bg-[#EEEEEA] text-[#8A8C88] cursor-not-allowed"
        )}
      >
        <Sparkles size={14} strokeWidth={1.75} />
        Generate
      </button>

      {/* Creations */}
      <div>
        <p className="text-[10px] font-semibold text-[#8A8C88] uppercase tracking-widest mb-2">
          Your creations
        </p>
        {creations.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 rounded-xl border border-dashed border-[#E3E3DD]">
            {isImage ? (
              <ImageIcon size={20} strokeWidth={1.5} className="text-[#C9C9C1]" />
            ) : (
              <VideoIcon size={20} strokeWidth={1.5} className="text-[#C9C9C1]" />
            )}
            <p className="text-[12px] font-medium text-[#8A8C88]">No {type}s yet</p>
            <p className="text-[11px] text-[#8A8C88]">
              Start by describing what you want to create.
            </p>
          </div>
        ) : (
          <div className={cn("grid gap-2", isImage ? "grid-cols-2" : "grid-cols-1")}>
            {creations.map((c, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-xl border border-[#E3E3DD] bg-[#F3F3EE] p-3 echo-mode-enter",
                  "text-[11px] text-[#5F625F] leading-snug"
                )}
              >
                {c}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
