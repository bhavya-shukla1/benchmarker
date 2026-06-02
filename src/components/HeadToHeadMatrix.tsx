import { TrackedItem } from "../types";
import { 
  Building, Globe, Users, TrendingUp, Shield, Activity, 
  Trash2, X, Plus, ExternalLink, Columns, Layers 
} from "lucide-react";

interface HeadToHeadMatrixProps {
  items: TrackedItem[];
  onRemove: (id: string) => void;
  onSelect: (id: string) => void;
  onAddMore: () => void;
}

export default function HeadToHeadMatrix({ 
  items, 
  onRemove, 
  onSelect,
  onAddMore 
}: HeadToHeadMatrixProps) {
  if (items.length === 0) {
    return (
      <div className="bg-white border border-[#EBE5DA] rounded-3xl p-8 text-center max-w-xl mx-auto">
        <Layers className="w-12 h-12 text-brand-primary mx-auto mb-4 opacity-75" />
        <h3 className="font-serif text-xl font-bold text-brand-dark mb-2">No Companies in Portfolio</h3>
        <p className="text-sm font-sans text-gray-500 mb-5 leading-relaxed">
          You must research some companies first to add them to your tracked portfolio and compare them side-by-side.
        </p>
        <button
          onClick={onAddMore}
          className="bg-brand-primary hover:bg-[#A9573B] text-white px-5 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-colors inline-flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Research Now</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">Side-by-Side Portfolio Comparison</h2>
          <p className="text-xs font-sans text-gray-500 mt-1">
            Analyzing and benchmarking all of your tracked startup entities side-by-side using real-time grounding facts.
          </p>
        </div>
        <button 
          onClick={onAddMore}
          className="bg-[#FAF8F5] text-brand-primary hover:bg-[#F2EDDF] border border-brand-primary/20 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-colors inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Company</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
        {items.map((item) => {
          const report = item.report;
          return (
            <div 
              key={item.id} 
              className="bg-white border-2 border-[#EBE5DA] hover:border-brand-primary/40 rounded-2.5xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Corner Trash Action */}
              <button
                onClick={() => onRemove(item.id)}
                title="Remove from comparison list"
                className="absolute top-3 right-3 p-1.5 bg-[#FAF8F5] hover:bg-[#FDF1F2] text-gray-400 hover:text-brand-friction border border-[#EBE5DA] rounded-lg transition-colors cursor-pointer z-10"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="space-y-4">
                {/* Header info */}
                <div>
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${report.logoPlaceholder || 'from-orange-500 to-amber-600'} flex items-center justify-center text-white font-serif text-sm font-bold mb-2.5`}>
                    {report.name[0]}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-brand-dark pr-6 truncate leading-tight">
                    {report.name}
                  </h3>
                  <a 
                    href={report.website.startsWith("http") ? report.website : `https://${report.website}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs font-mono text-brand-cohesion hover:underline inline-flex items-center gap-0.5"
                  >
                    {report.website} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-[#F2ECE1] space-y-3.5">
                  {/* Category: HQ */}
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono uppercase text-gray-400 block tracking-wider font-semibold">Headquarters</span>
                    <span className="text-xs text-brand-dark font-sans block leading-normal">{report.companyDetails.hq}</span>
                  </div>

                  {/* Category: Stage & Capital */}
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono uppercase text-gray-400 block tracking-wider font-semibold">Stage & Capital</span>
                    <span className="bg-[#FAF8F5] px-2 py-1 rounded inline-block text-xs font-serif font-bold text-brand-primary border border-[#FAF5EE]">
                      {report.startupStage.stage} • {report.startupStage.fundingTotal}
                    </span>
                  </div>

                  {/* Category: Web Visits */}
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono uppercase text-gray-400 block tracking-wider font-semibold">Est. Web Traffic</span>
                    <div className="flex items-center gap-1.5 text-xs text-brand-dark font-mono font-medium">
                      <Activity className="w-3.5 h-3.5 text-brand-info" />
                      <span>{report.websiteMetrics.estimatedMonthlyVisits} visitors / mo</span>
                    </div>
                  </div>

                  {/* Category: Estimated Revenue */}
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono uppercase text-gray-400 block tracking-wider font-semibold">Est. Annual Revenue</span>
                    <span className="text-xs font-semibold text-brand-dark font-sans block">{report.revenueGrowth.estimatedAnnualRevenue}</span>
                  </div>

                  {/* Category: pricing model */}
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono uppercase text-gray-400 block tracking-wider font-semibold">Pricing Model</span>
                    <span className="text-xs text-gray-600 block">{report.strategy.pricingModel}</span>
                  </div>

                  {/* Category: USPs & Moats */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono uppercase text-gray-400 block tracking-wider font-semibold">USPs</span>
                    <div className="space-y-1 max-h-[100px] overflow-y-auto">
                      {report.strategy.usps.slice(0, 3).map((usp, index) => (
                        <div key={index} className="flex gap-1">
                          <span className="text-brand-cohesion text-[9px] font-mono shrink-0 mt-0.5">✓</span>
                          <span className="text-[11px] text-gray-600 leading-tight font-sans">{usp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              <div className="mt-6 pt-3.5 border-t border-[#F2ECE1]">
                <button
                  onClick={() => onSelect(item.id)}
                  className="w-full bg-[#FAF8F5] hover:bg-brand-primary hover:text-white border border-[#E5DFD4] hover:border-brand-primary text-brand-dark font-mono text-xs font-bold uppercase py-2 rounded-xl transition-all duration-200 cursor-pointer text-center block"
                >
                  Inspect Full Report
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
