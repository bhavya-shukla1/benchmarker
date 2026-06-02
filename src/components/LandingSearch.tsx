import React, { useState, useEffect } from "react";
import { Search, Sparkles, AlertCircle, RefreshCw } from "lucide-react";

interface LandingSearchProps {
  onSearch: (name: string) => void;
  isLoading: boolean;
  error: string | null;
}

const POPULAR_COMPANIES = ["Stripe", "Figma", "Linear", "Vercel", "Airbnb"];

const LOADING_STATUSES = [
  "Firing Google Search API request to query real-time public records...",
  "Retrieving company details, founders, headquarters, and creation date...",
  "Querying estimated domain traffic, page bounce, and traffic channels...",
  "Accessing funding stage information, valuation, and verified key investors...",
  "Evaluating proprietary Unique Selling Propositions (USPs) and core defense moats...",
  "Scraping social media presence, follower count indices, and repository activity...",
  "Mapping competitive landscaping matrix to pinpoint direct competitors...",
  "Fact-checking data points against live citations to secure fully verified intelligence..."
];

export default function LandingSearch({ onSearch, isLoading, error }: LandingSearchProps) {
  const [query, setQuery] = useState("");
  const [statusIdx, setStatusIdx] = useState(0);

  // Rotate loading messages dynamically
  useEffect(() => {
    if (!isLoading) {
      setStatusIdx(0);
      return;
    }
    const interval = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % LOADING_STATUSES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-4 flex flex-col items-center">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#F1ECE4] px-4 py-1.5 rounded-full text-xs font-mono text-brand-primary mb-4 border border-[#E8DFD0]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>REAL-TIME GOOGLE SEARCH GROUNDED</span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark tracking-tight leading-tight mb-4">
          Competitive Intelligence, <br />
          <span className="italic font-normal text-brand-primary">Factually Grounded.</span>
        </h1>
        <p className="text-gray-600 font-sans text-base max-w-lg mx-auto">
          No hallucinated metrics. We crawl search results instantly to compile reliable startup metrics, traffic logs, funding records, and key competitors.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full relative mb-6">
        <div className="relative flex items-center bg-white border-2 border-[#E3DCCE] focus-within:border-brand-primary rounded-2xl shadow-sm transition-all duration-300 overflow-hidden px-4 py-2.5">
          <Search className="text-gray-400 w-6 h-6 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter any company name (e.g. Figma, Notion, Miro...)"
            disabled={isLoading}
            className="w-full bg-transparent text-lg text-brand-dark placeholder-gray-400 focus:outline-none font-sans"
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="bg-brand-primary hover:bg-[#A9573B] text-white px-5 py-2 rounded-xl text-sm font-sans font-medium transition-colors disabled:opacity-40 disabled:hover:bg-brand-primary shrink-0"
          >
            {isLoading ? "Researching..." : "Analyze"}
          </button>
        </div>
      </form>

      {/* Loading State */}
      {isLoading && (
        <div className="w-full bg-[#FAF5EE] rounded-2xl p-6 border border-[#E3DCCE] shadow-sm animate-pulse mb-8 max-w-xl">
          <div className="flex items-center gap-3 text-brand-primary mb-3">
            <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
            <span className="font-mono text-xs tracking-wider uppercase font-semibold">Active Research Pipeline</span>
          </div>
          <p className="text-sm font-serif text-brand-dark italic mb-2">
            "{LOADING_STATUSES[statusIdx]}"
          </p>
          <div className="w-full bg-[#EFE9DD] rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-brand-primary h-1.5 rounded-full transition-all duration-[4500ms] ease-out"
              style={{ width: `${((statusIdx + 1) / LOADING_STATUSES.length) * 100}%` }}
            />
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <span className="text-[11px] text-gray-500 font-mono">
              Analyzing query: "{query}" • Current stage: {statusIdx + 1}/{LOADING_STATUSES.length}
            </span>
            <span className="text-[10px] text-gray-400 font-mono">
              Note: Deep search takes up to 10-15 seconds to fetch accurate multi-source results.
            </span>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="w-full max-w-xl bg-[#FDF1F2] border border-brand-friction/30 rounded-2xl p-4 flex gap-3 text-brand-friction mb-8">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm font-sans">
            <p className="font-semibold text-[#8C3D43]">Research Error occured</p>
            <p className="text-[#A25258] mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Popular Suggestions */}
      {!isLoading && (
        <div className="text-center font-sans">
          <p className="text-xs font-mono tracking-wider text-gray-500 uppercase mb-3">
            Quick Analysis Sandbox
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {POPULAR_COMPANIES.map((company) => (
              <button
                key={company}
                onClick={() => {
                  setQuery(company);
                  onSearch(company);
                }}
                className="bg-white hover:bg-[#EFEADA] border border-[#E3DCCE] text-brand-dark px-3.5 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors"
              >
                {company}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
