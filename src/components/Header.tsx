import { BarChart, Sparkles, Compass } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-[#EBE5DA] bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Branding Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#C16C4E] to-[#FAF8F5] flex items-center justify-center border border-[#E3DCCE] shadow-sm shrink-0">
            <BarChart className="w-5 h-5 text-brand-primary" />
          </div>
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#5C946E] block leading-none font-bold">Competitive Research Engine</span>
            <h2 className="font-serif text-xl font-bold text-brand-dark tracking-tight mt-0.5">Benchmarker</h2>
          </div>
        </div>

        {/* Global Statistics */}
        <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
          <div className="flex items-center gap-1.5 bg-[#FAF8F5] px-3 py-1.5 rounded-lg border border-[#EBE5DA]">
            <Sparkles className="w-3.5 h-3.5 text-brand-caution animate-pulse" />
            <span>Factual Grounding Active</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#FAF8F5] px-3 py-1.5 rounded-lg border border-[#EBE5DA]">
            <Compass className="w-3.5 h-3.5 text-brand-info" />
            <span>Multi-competitor Mapping</span>
          </div>
        </div>
      </div>
    </header>
  );
}
