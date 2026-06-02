import { CompetitiveReport, CompetitorBrief } from "../types";
import { 
  Building, Globe, DollarSign, Activity, Award, ExternalLink, 
  ArrowUpRight, ShieldCheck, Heart, Navigation, Layers 
} from "lucide-react";

interface CompetitorsComparisonProps {
  report: CompetitiveReport;
  onAnalyzeCompetitor: (name: string) => void;
  isLoading: boolean;
}

export default function CompetitorsComparison({ 
  report, 
  onAnalyzeCompetitor,
  isLoading
}: CompetitorsComparisonProps) {
  const { competitors } = report;

  if (!competitors || competitors.length === 0) {
    return (
      <div className="bg-white border border-[#EBE5DA] rounded-2.5xl p-8 text-center">
        <p className="text-sm font-sans text-gray-400 italic">No direct competitors discovered for this profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Competitors Brief Grid */}
      <div>
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          <div>
            <h2 className="font-serif text-2xl font-bold text-brand-dark">Direct Market Competitors</h2>
            <p className="text-gray-500 font-sans text-xs mt-0.5">
              Click on any competitor to trigger deep research and load their comprehensive intelligence profile.
            </p>
          </div>
          <div className="bg-[#FAF6EE] border border-[#E8DFD0] px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium text-brand-primary flex items-center gap-1.5 shrink-0 self-start">
            <Layers className="w-3.5 h-3.5" />
            <span>{competitors.length} Main Competitors Analyzed</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitors.map((comp) => (
            <div 
              key={comp.name} 
              className="bg-white border border-[#EBE5DA] hover:border-brand-primary/45 rounded-2.5xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Competitor Header */}
                <div className="flex items-start justify-between gap-3 mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${comp.logoPlaceholder || 'from-rose-500 to-pink-600'} flex items-center justify-center text-white text-xs font-serif font-bold uppercase`}>
                      {comp.name[0]}
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-bold text-brand-dark group-hover:text-brand-primary transition-colors leading-tight">
                        {comp.name}
                      </h3>
                      {comp.website && (
                        <a 
                          href={comp.website.startsWith("http") ? comp.website : `https://${comp.website}`}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[11px] font-mono text-gray-400 hover:text-brand-primary underline inline-flex items-center gap-0.5 leading-none"
                        >
                          {comp.website.replace(/(^\w+:|^)\/\//, "")} <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Analyze Me Hook Badge */}
                  <button
                    onClick={() => !isLoading && onAnalyzeCompetitor(comp.name)}
                    disabled={isLoading}
                    title={`Run deep competitive analysis on ${comp.name}`}
                    className="p-1 px-2.5 bg-[#FAF8F5] group-hover:bg-[#FAF1EC] border border-[#EBE5DA] group-hover:border-brand-primary/30 text-xs font-mono text-gray-500 group-hover:text-brand-primary rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    <span>Analyze</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>

                <p className="text-gray-600 text-xs font-sans leading-relaxed mb-4">
                  {comp.description}
                </p>

                {/* Comparative Key Metrics */}
                <div className="grid grid-cols-2 gap-2 mb-4 bg-[#FAF8F5] p-2.5 rounded-xl border border-[#FAF5EE]">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono uppercase text-gray-400 block tracking-wider font-semibold">Web Traffic</span>
                    <span className="text-[#546E9E] font-serif text-xs font-bold block">{comp.estimatedMonthlyVisits} visits/mo</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono uppercase text-gray-400 block tracking-wider font-semibold">Funding Round</span>
                    <span className="text-brand-primary font-serif text-xs font-bold block truncate">{comp.fundingStage}</span>
                  </div>
                </div>

                {/* USPs Mini List */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] font-mono uppercase text-gray-400 block tracking-wider font-bold">Key USPs</span>
                  {comp.usps && comp.usps.length > 0 ? (
                    comp.usps.map((usp, index) => (
                      <div key={index} className="flex gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-brand-cohesion shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-600 font-sans leading-tight">{usp}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400 italic">No direct USPs specified.</span>
                  )}
                </div>
              </div>

              {/* Actionable Comparison Summary */}
              <div className="pt-3 border-t border-[#F2ECE1] mt-2">
                <span className="text-[10px] font-mono uppercase text-brand-primary block tracking-wider mb-1 font-bold">How It Compares</span>
                <p className="text-[11px] text-gray-600 font-sans leading-relaxed italic bg-[#FDFCFB] p-2 rounded-lg border border-[#F2ECE1]">
                  "{comp.howItCompares}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Head-to-Head Comparison Matrix Table */}
      <div className="bg-white border border-[#EBE5DA] rounded-3xl overflow-hidden shadow-sm">
        <div className="bg-[#FAF8F5] px-6 py-4 border-b border-[#EBE5DA] flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-brand-dark">Head-to-Head Compare Matrix</h3>
            <p className="text-xs font-sans text-gray-500 mt-0.5">Structured dynamic benchmarks comparing the primary brand versus discovered competitors.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-xs">
            <thead>
              <tr className="border-b border-[#FAF5EE] bg-[#FCFAF7] text-[10px] font-mono uppercase text-gray-400 tracking-wider">
                <th className="py-3 px-4 font-semibold w-1/4">Metric Tracked</th>
                <th className="py-3 px-4 font-bold text-brand-primary">{report.name} (Primary)</th>
                {competitors.map((comp) => (
                  <th key={comp.name} className="py-3 px-4 font-medium text-brand-dark">{comp.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FAF5EE] text-gray-700 font-sans">
              
              {/* Row Website URL */}
              <tr>
                <td className="py-3 px-4 font-mono uppercase text-[10px] text-gray-400 font-semibold">Primary Domain</td>
                <td className="py-3 px-4 font-medium text-brand-cohesion max-w-[150px] truncate">{report.website}</td>
                {competitors.map((comp) => (
                  <td key={comp.name} className="py-3 px-4 italic text-brand-info max-w-[150px] truncate">{comp.website}</td>
                ))}
              </tr>

              {/* Row Monthly Web Traffic */}
              <tr>
                <td className="py-3 px-4 font-mono uppercase text-[10px] text-gray-400 font-semibold">Web Traffic (Mo.)</td>
                <td className="py-3 px-4 font-bold text-brand-dark">{report.websiteMetrics.estimatedMonthlyVisits}</td>
                {competitors.map((comp) => (
                  <td key={comp.name} className="py-3 px-4 text-brand-dark">{comp.estimatedMonthlyVisits}</td>
                ))}
              </tr>

              {/* Row Startup Capital / Round */}
              <tr>
                <td className="py-3 px-4 font-mono uppercase text-[10px] text-gray-400 font-semibold">Venture Funding Stage</td>
                <td className="py-3 px-4 text-brand-dark font-medium">
                  {report.startupStage.stage} ({report.startupStage.fundingTotal})
                </td>
                {competitors.map((comp) => (
                  <td key={comp.name} className="py-3 px-4 text-brand-dark">
                    {comp.fundingStage}
                  </td>
                ))}
              </tr>

              {/* Row HQ / Founders */}
              <tr>
                <td className="py-3 px-4 font-mono uppercase text-[10px] text-gray-400 font-semibold">Headquarters</td>
                <td className="py-3 px-4 text-brand-dark">{report.companyDetails.hq}</td>
                {competitors.map((comp) => (
                  <td key={comp.name} className="py-3 px-4 text-gray-500 font-mono">Location Online</td>
                ))}
              </tr>

              {/* Row Pricing Framework */}
              <tr>
                <td className="py-3 px-4 font-mono uppercase text-[10px] text-gray-400 font-semibold">Pricing Model</td>
                <td className="py-3 px-4 font-medium text-brand-dark">
                  <span className="bg-[#FAF8F5] px-1.5 py-0.5 border border-[#FAF5EE] rounded">{report.strategy.pricingModel}</span>
                </td>
                {competitors.map((comp) => (
                  <td key={comp.name} className="py-3 px-4 text-gray-500">Competitive Core</td>
                ))}
              </tr>

              {/* Row Core Differentiation */}
              <tr>
                <td className="py-3 px-4 font-mono uppercase text-[10px] text-gray-400 font-semibold">Positioning Gap</td>
                <td className="py-3 px-4 font-medium text-brand-primary">{report.tagline}</td>
                {competitors.map((comp) => (
                  <td key={comp.name} className="py-3 px-4 text-gray-600 truncate max-w-[200px]" title={comp.howItCompares}>
                    {comp.howItCompares}
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
