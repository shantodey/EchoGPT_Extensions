"use client";

import { useState } from "react";
import { Sparkles, ImageIcon, VideoIcon, SlidersHorizontal, Download, Ratio, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

type StudioType = "image" | "video";

interface GenerationStudioProps {
  type: StudioType;
}

const IMAGE_RATIOS = ["1:1", "16:9", "9:16", "4:3", "3:2"];
const VIDEO_RATIOS = ["16:9", "9:16", "1:1"];
const IMAGE_MODELS = ["Nano Banana 2 Lite", "Nano Banana 2", "Nano Banana Pro"];
const VIDEO_MODELS = ["EchoVideo 1", "EchoVideo 1 Pro"];
const IMAGE_COUNTS = ["1", "2", "4"];

const INSPIRATIONS: Record<StudioType, string[]> = {
  image: [
    "Cyberpunk neon street at twilight, rainy reflection",
    "Minimalist ceramic coffee mug on brutalist concrete table",
    "Futuristic sleek glass AI robot in zen bamboo garden",
  ],
  video: [
    "Slow drone cinematic flyover above misty emerald mountains",
    "Hyper-realistic macro droplet falling into still indigo pool",
    "Camera tracking shot through neon Tokyo alley at night",
  ],
};

export function GenerationStudio({ type }: GenerationStudioProps) {
  const isImage = type === "image";

  const [prompt, setPrompt] = useState("");
  const [ratio, setRatio] = useState(isImage ? "1:1" : "16:9");
  const [model, setModel] = useState(isImage ? IMAGE_MODELS[0] : VIDEO_MODELS[0]);
  const [count, setCount] = useState("1");
  const [showSettings, setShowSettings] = useState(false);
  const [creations, setCreations] = useState<string[]>([]);

  const ratios = isImage ? IMAGE_RATIOS : VIDEO_RATIOS;
  const models = isImage ? IMAGE_MODELS : VIDEO_MODELS;

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    const stub = `${isImage ? "Image" : "Video"} generated: "${prompt}" · ${ratio} · ${model}`;
    setCreations((prev) => [stub, ...prev]);
    setPrompt("");
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Middle: Canvas & Creations Feed (Clean, distraction-free) */}
      <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0 flex flex-col">
        {creations.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4 text-[#8A8C88]">
            <div className="w-12 h-12 rounded-2xl bg-[#EEEEEA] flex items-center justify-center mb-3 text-[#5F625F]">
              {isImage ? <ImageIcon size={22} strokeWidth={1.75} /> : <VideoIcon size={22} strokeWidth={1.75} />}
            </div>
            <h3 className="text-[14px] font-semibold text-[#18181B]">
              {isImage ? "Image Studio" : "Video Studio"}
            </h3>
            <p className="text-[12px] text-[#8A8C88] mt-1 max-w-[220px] leading-relaxed">
              {isImage
                ? "Generate studio-grade visuals from prompt"
                : "Describe your scene and generate cinema videos"}
            </p>

            {/* Inspiration Prompt Pills */}
            <div className="mt-5 w-full space-y-1.5 text-left">
              <span className="text-[10px] font-semibold text-[#8A8C88] uppercase tracking-wider block px-1">
                Try an idea:
              </span>
              {INSPIRATIONS[type].map((idea, i) => (
                <button key={i} onClick={() => setPrompt(idea)} className="w-full text-left p-2.5 rounded-xl border border-[#E3E3DD] bg-[#FFFFFF]
                 hover:border-[#D6D6CF] hover:bg-[#F3F3EE] transition-all text-[11px] text-[#5F625F] leading-snug line-clamp-1">
                  "{idea}"
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <span className="text-[10px] font-semibold text-[#8A8C88] uppercase tracking-wider block">
              Creations ({creations.length})
            </span>
            <div className="grid gap-2.5">
              {creations.map((c, i) => (
                <div key={i} className="p-3.5 rounded-2xl border border-[#E3E3DD] bg-[#FFFFFF] shadow-sm echo-mode-enter">
                  <p className="text-[12px] text-[#18181B] leading-relaxed">{c}</p>
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#E3E3DD]/40 text-[10px] text-[#8A8C88]">
                    <span>{ratio} · {model}</span>
                    <button className="flex items-center gap-1 hover:text-[#18181B] transition-colors">
                      <Download size={11} />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom: Modern ChatGPT-Style Command Bar */}
      <div className="px-4 pb-4 shrink-0 space-y-2">
        {/* Floating Settings Drawer */}
        {showSettings && (
          <div className="p-3 rounded-2xl border border-[#E3E3DD] bg-[#FFFFFF] shadow-sm space-y-2.5 echo-mode-enter">
            <div>
              <label className="block text-[10px] font-semibold text-[#8A8C88] uppercase tracking-widest mb-1">
                Model
              </label>
              <select value={model} onChange={(e) => setModel(e.target.value)} className="w-full rounded-xl border border-[#E3E3DD] 
              bg-[#FFFFFF] px-2.5 py-1.5 text-[12px] text-[#18181B] outline-none cursor-pointer">
                {models.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-[10px] font-semibold text-[#8A8C88] uppercase tracking-widest block mb-1">
                  Aspect Ratio
                </span>
                <div className="flex items-center gap-1">
                  {ratios.map((r) => (
                    <button key={r} onClick={() => setRatio(r)} className={cn("px-2 py-0.5 rounded-lg text-[10px] font-medium border transition-all",
                      ratio === r ? "bg-[#D7D7D0] border-[#D6D6CF] text-[#18181B]" : "border-[#E3E3DD] text-[#8A8C88] hover:text-[#18181B]"
                    )} >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {isImage && (
                <div>
                  <span className="text-[10px] font-semibold text-[#8A8C88] uppercase tracking-widest block mb-1">  Count</span>
                  <div className="flex items-center gap-1">
                    {IMAGE_COUNTS.map((c) => (
                      <button key={c} onClick={() => setCount(c)} className={cn("w-5 h-5 rounded-md text-[10px] font-medium border transition-all",
                        count === c ? "bg-[#D7D7D0] border-[#D6D6CF] text-[#18181B]" : "border-[#E3E3DD] text-[#8A8C88] hover:text-[#18181B]")}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Prompt Input with Docked Control Pills */}
        <div className="rounded-2xl border border-[#E3E3DD] bg-[#FFFFFF] shadow-sm focus-within:border-[#D6D6CF] focus-within:shadow-md transition-all">
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleGenerate(); }
          }} placeholder={`Describe what you want to imagine...`} rows={2} aria-label={`${type} prompt`} className="w-full resize-none px-4 pt-3
           pb-2 text-[13px] text-[#18181B] placeholder:text-[#8A8C88] bg-transparent outline-none border-none leading-relaxed max-h-[120px]" />

          {/* Quick Config Pills & Generate Action */}
          <div className="flex items-center justify-between px-3 pb-2.5 pt-1 border-t border-[#E3E3DD]/40">
            <div className="flex items-center gap-1">
              {/* Ratio badge */}
              <button  onClick={() => setShowSettings(!showSettings)}   className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] 
              font-medium bg-[#EEEEEA] text-[#5F625F] hover:bg-[#D7D7D0] hover:text-[#18181B] transition-colors" title="Change Aspect Ratio">
                <Ratio size={11} strokeWidth={1.75} />
                <span>{ratio}</span>
              </button>

              {/* Model badge */}
              <button onClick={() => setShowSettings(!showSettings)} className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-medium bg-[#EEEEEA] text-[#5F625F] hover:bg-[#D7D7D0]
               hover:text-[#18181B] transition-colors truncate max-w-[110px]"  title="Change Model">
                <Layers size={11} strokeWidth={1.75} />
                <span className="truncate">{model.replace("Nano Banana", "NB")}</span>
              </button>

              {/* Settings toggle icon */}
              <button onClick={() => setShowSettings(!showSettings)} className={cn(
                  "p-1 rounded-lg text-[#8A8C88] hover:text-[#18181B] hover:bg-[#EEEEEA] transition-colors",
                  showSettings && "bg-[#D7D7D0] text-[#18181B]"
                )}
                title="All settings"
              >
                <SlidersHorizontal size={11} strokeWidth={1.75} />
              </button>
            </div>

            {/* Generate Action Button */}
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim()}
              id={`${type}-generate-btn`}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all shrink-0",
                prompt.trim()
                  ? "bg-[#D7D7D0] hover:bg-[#C9C9C1] text-[#18181B]"
                  : "bg-[#EEEEEA] text-[#8A8C88] cursor-not-allowed"
              )}
            >
              <Sparkles size={13} strokeWidth={1.75} />
              <span>Generate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
