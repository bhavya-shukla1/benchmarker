import { CompetitiveReport } from "../types";
import { 
  Building, Globe, Users, TrendingUp, Shield, Activity, 
  ExternalLink, CheckCircle, Award, Share2, Anchor, Star, 
  Calendar, DollarSign, LineChart
} from "lucide-react";

interface CompanyDashboardProps {
  report: CompetitiveReport;
}

export default function CompanyDashboard({ report }: CompanyDashboardProps) {
  // Format numeric values elegantly for display headers
  const getInitials = (name: string) => {
    return name
      ? name.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase()
      : "CO";
  };

  return (
    <div className="w-full space-y-8">
      {/* 1. Hero banner card panel */}
      <div className="relative bg-white border border-[#EBE5DA] rounded-3xl p-6 md:p-8 shadow-sm overflow-hidden mb-6">
        {/* Subtle decorative background watermark */}
        <div className="absolute right-0 bottom-0 opacity-[0.02] transform translate-x-12 translate-y-12 select-none pointer-events-none">
          <Building className="w-96 h-96" />
        </div>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            {/* Round company avatar using retrieved brand gradient */}
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${report.logoPlaceholder || "from-brand-primary to-brand-caution"} flex items-center justify-center text-white font-serif text-2xl font-bold tracking-wider shrink-0 shadow-inner shadow-black/10`}>
              {getInitials(report.name)}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
                  {report.name}
                </h1>
                <span className="bg-[#FAF6EE] px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider text-brand-cohesion border border-brand-cohesion/25">
                  Primary Profile
                </span>
                {report.wasSearchGrounded === false && (
                  <span className="bg-[#FEF2F2] text-[#B91C1C] border border-[#FECACA] px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse" />
                    Archive/KB Fallback
                  </span>
                )}
              </div>
              <p className="font-serif text-lg text-brand-primary italic leading-tight">
                {report.tagline}
              </p>
              
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-1 text-xs font-mono text-gray-500">
                <div className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5" />
                  <span>HQ: {report.companyDetails.hq}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Founded: {report.companyDetails.yearFounded}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" />
                  <a 
                    href={report.website.startsWith("http") ? report.website : `https://${report.website}`}
                    target="_blank" 
                    rel="noreferrer referrer" 
                    className="hover:text-brand-primary underline inline-flex items-center gap-0.5"
                  >
                    {report.website} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#F2ECE1]">
          <p className="text-gray-600 text-sm leading-relaxed max-w-4xl font-sans">
            {report.description}
          </p>
          {report.companyDetails.founders && report.companyDetails.founders.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2.5 text-xs font-sans">
              <span className="text-gray-400 font-mono">Founders:</span>
              {report.companyDetails.founders.map((founder, i) => (
                <span key={founder} className="bg-[#FAF8F5] text-brand-dark px-2.5 py-1 rounded-md border border-[#EBE5DA] font-medium">
                  {founder}
                </span>
              ))}
            </div>
          )}

          {report.wasSearchGrounded === false && (
            <div className="mt-5 p-4 bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl text-xs text-[#78350F] space-y-1">
              <span className="font-mono uppercase font-bold tracking-wider block text-[10px]">⚠️ Notice: Search Quota Rate-Limit Exceeded (Self-Healing Active)</span>
              <p className="font-sans leading-relaxed">
                Google Search Grounding reached its standard API daily usage quota. To keep your research session running without crashing, the Benchmarker Engine automatically switched to Gemini's extensive core-knowledge base! Facts and metrics are compiled matching the model's training records.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 2. Bento Grid of structured buckets */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* Bucket A: Startup Stage & Funding Tracker */}
        <div className="bg-white border border-[#EBE5DA] rounded-2.5xl p-5 md:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#FAF5EE]">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#FAF6EE] rounded-lg border border-[#E8DFD0] text-brand-primary">
                  <DollarSign className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-base font-semibold text-brand-dark">Stage & Capital</h3>
              </div>
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Financial Block</span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#FAFDFB] p-3 rounded-xl border border-[#EDF4F0]">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Startup Stage</span>
                  <span className="font-serif text-lg font-bold text-brand-cohesion">{report.startupStage.stage}</span>
                </div>
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#F2ECE1]">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Total Raised</span>
                  <span className="font-serif text-lg font-bold text-brand-primary">{report.startupStage.fundingTotal}</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-1.5 font-semibold">Key Venture Investors</span>
                {report.startupStage.keyInvestors && report.startupStage.keyInvestors.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {report.startupStage.keyInvestors.map((investor) => (
                      <span key={investor} className="bg-[#FAF8F5] text-[#1E1B18]/80 text-[11px] font-mono px-2 py-0.5 rounded border border-[#EBE5DA]">
                        {investor}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic">No key investors publicly available or self-funded.</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#FAF5EE] text-[11px] text-gray-500 font-mono flex items-center justify-between">
            <span>Last funding round index</span>
            <span className="font-bold text-brand-dark">{report.startupStage.lastFundingYear || "N/A"}</span>
          </div>
        </div>

        {/* Bucket B: Revenue, Headcount & Dynamic Growth */}
        <div className="bg-white border border-[#EBE5DA] rounded-2.5xl p-5 md:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#FAF5EE]">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#FAF6EE] rounded-lg border border-[#E8DFD0] text-brand-caution">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-base font-semibold text-brand-dark">Growth & Traction</h3>
              </div>
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Trajectory</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Estimated Annual Revenue</span>
                <span className="font-serif text-xl font-bold text-brand-dark">{report.revenueGrowth.estimatedAnnualRevenue}</span>
              </div>

              <div className="grid grid-cols-2 gap-3.5 pt-1">
                <div className="bg-[#FAF9F5] p-2.5 rounded-lg border border-[#EAE2D5]">
                  <span className="text-[10px] font-mono text-gray-400 block uppercase tracking-wider leading-none mb-1">Growth Trend</span>
                  <span className="text-xs font-medium text-brand-caution block leading-tight">{report.revenueGrowth.growthTrend}</span>
                </div>
                <div className="bg-[#FAFAF5] p-2.5 rounded-lg border border-[#EEEEE0]">
                  <span className="text-[10px] font-mono text-gray-400 block uppercase tracking-wider leading-none mb-1">Staff Headcount</span>
                  <span className="text-xs font-medium text-brand-cohesion block leading-tight">{report.companyDetails.employeeCount}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Headcount Speed</span>
                <p className="text-xs text-gray-600 leading-relaxed font-sans">
                  {report.revenueGrowth.headcountGrowth}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#FAF5EE] text-[11px] text-gray-500 font-mono flex items-center justify-between">
            <span>Core Pricing Archetype</span>
            <span className="font-bold text-brand-dark bg-[#FAF8F5] px-1.5 py-0.5 rounded text-[10px] uppercase border border-[#EBE5DA]">{report.strategy.pricingModel}</span>
          </div>
        </div>

        {/* Bucket C: Digital Traffic & Website Analytics */}
        <div className="bg-white border border-[#EBE5DA] rounded-2.5xl p-5 md:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#FAF5EE]">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#FAF6EE] rounded-lg border border-[#E8DFD0] text-brand-info">
                  <Activity className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-base font-semibold text-brand-dark">Website Metrics</h3>
              </div>
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Web Analytics</span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-[#F8FAFD] p-2 rounded-lg border border-[#Eef2f8]">
                  <span className="text-[9px] font-mono text-gray-400 block uppercase">Est. Visits</span>
                  <span className="font-serif text-sm font-bold text-brand-info">{report.websiteMetrics.estimatedMonthlyVisits}</span>
                </div>
                <div className="bg-[#FAF8F5] p-2 rounded-lg border border-[#F2ECE1]">
                  <span className="text-[9px] font-mono text-gray-400 block uppercase">Bounce Rate</span>
                  <span className="font-serif text-sm font-bold text-brand-primary">{report.websiteMetrics.bounceRate}</span>
                </div>
                <div className="bg-[#FAFAF5] p-2 rounded-lg border border-[#EEEEE0]">
                  <span className="text-[9px] font-mono text-gray-400 block uppercase">Duration</span>
                  <span className="font-serif text-sm font-bold text-brand-cohesion">{report.websiteMetrics.avgVisitDuration}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1.5 font-semibold">Relative Traffic Shares</span>
                {report.websiteMetrics.topTrafficSources && report.websiteMetrics.topTrafficSources.length > 0 ? (
                  <div className="space-y-2">
                    {report.websiteMetrics.topTrafficSources.map((src) => (
                      <div key={src.source} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono text-gray-600">
                          <span>{src.source}</span>
                          <span className="font-semibold text-brand-dark">{src.percentage}</span>
                        </div>
                        <div className="w-full bg-[#FAF5EE] h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-brand-info h-1.5 rounded-full"
                            style={{ width: src.percentage }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic">No segment channels data recorded.</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#FAF5EE] text-[11px] text-gray-500 font-mono text-right">
            <span>Visits represented monthly</span>
          </div>
        </div>

      </div>

      {/* 3. Competitive Moats & Unique Selling Propositions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        
        {/* USPs card */}
        <div className="bg-white border border-[#EBE5DA] rounded-2.5xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#FAF5EE]">
            <Award className="w-5 h-5 text-[#5C946E]" />
            <h3 className="font-serif text-lg font-semibold text-brand-dark">Unique Selling Propositions (USPs)</h3>
          </div>
          <p className="text-xs text-gray-500 font-sans mb-4">
            Key factors that differentiate this product/service from other market offerings. Why do buyers choose this company?
          </p>
          <div className="space-y-3.5">
            {report.strategy.usps && report.strategy.usps.length > 0 ? (
              report.strategy.usps.map((usp, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle className="w-4 h-4 text-brand-cohesion shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600 font-sans leading-snug">{usp}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 italic">No listed USPs found.</p>
            )}
          </div>
        </div>

        {/* Defense Moats card */}
        <div className="bg-white border border-[#EBE5DA] rounded-2.5xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#FAF5EE]">
            <Shield className="w-5 h-5 text-brand-primary" />
            <h3 className="font-serif text-lg font-semibold text-brand-dark">Proprietary Defensibility Moats</h3>
          </div>
          <p className="text-xs text-gray-500 font-sans mb-4">
            Structural barriers that prevent direct competitors from stealing market share (Intellectual Property, network effects, brand value, switching hurdles...).
          </p>
          <div className="space-y-3.5">
            {report.strategy.moats && report.strategy.moats.length > 0 ? (
              report.strategy.moats.map((moat, i) => (
                <div key={i} className="flex gap-3">
                  <Star className="w-4 h-4 text-[#D4A052] shrink-0 mt-0.5 fill-[#D4A052] opacity-85" />
                  <p className="text-sm text-gray-600 font-sans leading-snug">{moat}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 italic">No core defense moats analyzed.</p>
            )}
          </div>
        </div>

      </div>

      {/* 4. Social Media Analytics Audit */}
      <div className="bg-white border border-[#EBE5DA] rounded-2.5xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#FAF5EE]">
          <Share2 className="w-5 h-5 text-brand-info" />
          <h3 className="font-serif text-lg font-semibold text-brand-dark font-medium">Factual Social Media & Community Indicators</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-xl bg-[#F6F8FA] border border-[#EEEEEE]">
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block font-semibold">LinkedIn Profile</span>
            <span className="text-xs text-brand-dark font-sans leading-relaxed block mt-1.5">
              {report.socialMedia.linkedin || "N/A"}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#F4F8FB] border border-[#Eef4f8]">
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block font-semibold">Twitter / X</span>
            <span className="text-xs text-brand-dark font-sans leading-relaxed block mt-1.5">
              {report.socialMedia.twitter || "N/A"}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EFEADD]">
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block font-semibold">GitHub Stars / Activity</span>
            <span className="text-xs text-brand-dark font-sans leading-relaxed block mt-1.5">
              {report.socialMedia.github || "N/A"}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#FCF3F3] border border-[#F6EBEB]">
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block font-semibold">YouTube Status</span>
            <span className="text-xs text-brand-dark font-sans leading-relaxed block mt-1.5">
              {report.socialMedia.youtube || "N/A"}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#F7FAF8] border border-[#ECF2ED]">
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block font-semibold">Other Footprints</span>
            <span className="text-xs text-brand-dark font-sans leading-relaxed block mt-1.5">
              {report.socialMedia.other || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* 5. Google Grounded Citation Sources */}
      {report.sources && report.sources.length > 0 && (
        <div className="bg-[#FAF8F5] border border-[#E3DCCE] rounded-2.5xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Anchor className="w-4 h-4 text-brand-primary" />
            <h4 className="font-serif text-sm font-semibold text-brand-dark">Factual Search Sources Verified</h4>
          </div>
          <p className="text-xs text-gray-500 font-sans mb-3.5 leading-normal">
            Information was dynamically verified on Google Search from the following citations and online references:
          </p>
          <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto pr-2">
            {report.sources.map((source, i) => (
              <a
                key={i}
                href={source.url}
                target="_blank"
                rel="noreferrer referrer"
                className="inline-flex items-center gap-1.5 bg-white border border-[#E5DFD4] hover:bg-[#FAF5EE] text-gray-600 hover:text-brand-primary px-3 py-1.5 rounded-xl text-[11px] font-mono transition-colors max-w-full"
              >
                <span className="truncate max-w-[200px]">{source.title}</span>
                <ExternalLink className="w-2.5 h-2.5 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
