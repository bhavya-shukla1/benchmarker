import React from "react";
import { TrackedItem } from "../types";
import { History, Trash2, ArrowRightCircle, Sparkles, Layout } from "lucide-react";

interface TrackedSidebarProps {
  items: TrackedItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onCompareMode: () => void;
  isCompareMode: boolean;
}

export default function TrackedSidebar({
  items,
  selectedId,
  onSelect,
  onRemove,
  onCompareMode,
  isCompareMode
}: TrackedSidebarProps) {
  return (
    <div className="w-full bg-white border border-[#EBE5DA] rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-5 select-none">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-brand-primary" />
          <h2 className="font-serif text-lg font-semibold text-brand-dark">Tracked Portfolio</h2>
        </div>
        <span className="bg-[#FAF6EE] px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold text-gray-500 border border-[#EBE5DA]">
          {items.length} Tracked
        </span>
      </div>

      {items.length === 0 ? (
        <div className="py-8 text-center px-4">
          <p className="text-sm font-sans text-gray-400 italic mb-2">No companies tracked yet.</p>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            Submit any company in the search box to automatically include them into your interactive tracking lists.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {/* Compare Matrix Toggle Button */}
          <button
            onClick={onCompareMode}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              isCompareMode
                ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                : "bg-[#FAF8F5] text-brand-primary hover:bg-[#F2EDDF] border-[#E5DFD4]"
            }`}
          >
            <div className="flex items-center gap-2">
              <Layout className="w-3.5 h-3.5" />
              <span>Head-to-Head Compare</span>
            </div>
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </button>

          <div className="h-0 w-full border-t border-[#EBE5DA] my-2" />

          <p className="text-[10px] uppercase font-mono tracking-wider text-gray-400 mb-1 ml-1 font-semibold">
            Tracked Report Cards
          </p>

          <div className="flex flex-col gap-2 max-h-[350px] overflow-y-auto pr-1">
            {items.map((item) => {
              const report = item.report;
              const isSelected = selectedId === item.id && !isCompareMode;
              return (
                <div
                  key={item.id}
                  className={`group relative flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? "bg-[#FAF5EE] border-brand-primary/50 shadow-sm"
                      : "bg-[#FDFDFD] hover:bg-[#FAF8F5] border-[#ECE6DB]"
                  }`}
                >
                  <button
                    onClick={() => onSelect(item.id)}
                    className="flex-1 text-left mr-2 min-w-0"
                  >
                    <div className="flex items-center gap-2">
                      {/* Round tiny logo representations based on grading class */}
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-tr ${report.logoPlaceholder || 'from-orange-500 to-amber-500'} shrink-0`} />
                      <span className="font-serif text-sm font-medium text-brand-dark block truncate">
                        {report.name}
                      </span>
                    </div>
                    <span className="font-sans text-[11px] text-gray-500 block truncate leading-tight">
                      {report.tagline || report.companyDetails.hq}
                    </span>
                  </button>

                  <div className="flex items-center gap-1.5 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onSelect(item.id)}
                      title="View full report"
                      className="p-1 text-gray-400 hover:text-brand-primary roundedtransition-colors cursor-pointer"
                    >
                      <ArrowRightCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      title="Remove from tracking"
                      className="p-1 text-gray-400 hover:text-brand-friction rounded transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
