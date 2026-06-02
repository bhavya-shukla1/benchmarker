import { useState, useEffect } from "react";
import Header from "./components/Header";
import LandingSearch from "./components/LandingSearch";
import CompanyDashboard from "./components/CompanyDashboard";
import CompetitorsComparison from "./components/CompetitorsComparison";
import TrackedSidebar from "./components/TrackedSidebar";
import HeadToHeadMatrix from "./components/HeadToHeadMatrix";
import { CompetitiveReport, TrackedItem } from "./types";
import { 
  Building2, Sparkles, Layout, Globe, Activity, ArrowLeft, 
  Layers, Search, RefreshCw, BarChart, FileText
} from "lucide-react";

export default function App() {
  const [trackedPortfolio, setTrackedPortfolio] = useState<TrackedItem[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isCompareMode, setIsCompareMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "competitors">("dashboard");

  // Research State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [navbarSearch, setNavbarSearch] = useState<string>("");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const persisted = localStorage.getItem("benchmarker_portfolio-v1");
      if (persisted) {
        const parsed = JSON.parse(persisted) as TrackedItem[];
        setTrackedPortfolio(parsed);
        if (parsed.length > 0) {
          // Select the most recently updated item
          const sorted = [...parsed].sort((a, b) => b.timestamp - a.timestamp);
          setCurrentId(sorted[0].id);
        }
      }
    } catch (e) {
      console.error("Failed to load local tracking portfolio on start", e);
    }
  }, []);

  // Save to localStorage whenever portfolio updates
  const savePortfolio = (newPortfolio: TrackedItem[]) => {
    try {
      localStorage.setItem("benchmarker_portfolio-v1", JSON.stringify(newPortfolio));
      setTrackedPortfolio(newPortfolio);
    } catch (e) {
      console.error("Failed to save tracked portfolio items to localStorage", e);
    }
  };

  // Launch research request calling Express API route
  const handleResearch = async (companyName: string) => {
    if (!companyName.trim()) return;
    setIsLoading(true);
    setError(null);
    setIsCompareMode(false);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName: companyName.trim() }),
      });

      const body = await response.json();

      if (!response.ok || !body.success) {
        throw new Error(body.error || "Failed to analyze the company due to research error.");
      }

      const report: CompetitiveReport = body.data;
      const id = report.name.toLowerCase().replace(/\s+/g, "-");

      // Build updated list
      const updatedItem: TrackedItem = {
        id,
        timestamp: Date.now(),
        report,
      };

      const filtered = trackedPortfolio.filter((item) => item.id !== id);
      const newPortfolio = [updatedItem, ...filtered];
      
      savePortfolio(newPortfolio);
      setCurrentId(id);
      setActiveTab("dashboard");
      setNavbarSearch("");
    } catch (err: any) {
      console.error("Research Error:", err);
      setError(err.message || "Failed to establish research connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveTracked = (id: string) => {
    const updated = trackedPortfolio.filter((item) => item.id !== id);
    savePortfolio(updated);
    if (currentId === id) {
      if (updated.length > 0) {
        setCurrentId(updated[0].id);
      } else {
        setCurrentId(null);
        setIsCompareMode(false);
      }
    }
  };

  const handleSelectTracked = (id: string) => {
    setCurrentId(id);
    setIsCompareMode(false);
    setActiveTab("dashboard");
  };

  // Find currently focused corporate report
  const currentItem = trackedPortfolio.find((item) => item.id === currentId);
  const currentReport = currentItem ? currentItem.report : null;

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark flex flex-col font-sans selection:bg-brand-primary/10 selection:text-brand-primary">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8">
        
        {/* If no items have ever been analysed, show the landing page search block */}
        {trackedPortfolio.length === 0 && !currentReport && (
          <div className="py-12">
            <LandingSearch 
              onSearch={handleResearch} 
              isLoading={isLoading} 
              error={error} 
            />
          </div>
        )}

        {/* Full Interactive Benchmarking Dashboard */}
        {(trackedPortfolio.length > 0 || currentReport) && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            
            {/* Sidebar Tracked Portfolio List column */}
            <div className="lg:col-span-1 space-y-6">
              <TrackedSidebar 
                items={trackedPortfolio}
                selectedId={currentId}
                onSelect={handleSelectTracked}
                onRemove={handleRemoveTracked}
                onCompareMode={() => setIsCompareMode(true)}
                isCompareMode={isCompareMode}
              />

              {/* Research Another company mini widget */}
              <div className="bg-white border border-[#EBE5DA] rounded-2xl p-4 shadow-sm">
                <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400 font-semibold block mb-3">Add Entity to Tracker</span>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (navbarSearch.trim()) handleResearch(navbarSearch);
                  }}
                  className="flex gap-2"
                >
                  <input 
                    type="text" 
                    value={navbarSearch}
                    onChange={(e) => setNavbarSearch(e.target.value)}
                    placeholder="Company name..."
                    disabled={isLoading}
                    className="flex-1 bg-[#FAF8F5] border border-[#E5DFD4] placeholder-gray-400 text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-brand-primary"
                  />
                  <button 
                    type="submit"
                    disabled={isLoading || !navbarSearch.trim()}
                    className="bg-brand-primary hover:bg-[#A9573B] text-white p-2 rounded-xl transition-colors shrink-0 flex items-center justify-center disabled:opacity-40"
                  >
                    {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  </button>
                </form>
                {error && (
                  <p className="text-[11px] text-brand-friction font-sans mt-2.5 leading-snug">
                    Error tracking: {error}
                  </p>
                )}
                {isLoading && (
                  <div className="mt-3.5 space-y-1 bg-[#FAF7F2] p-2.5 rounded-lg border border-[#EDE5DA] text-[10px] font-mono text-gray-500">
                    <div className="flex items-center gap-1.5 text-brand-primary font-bold">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>CRAWLING GOOGLE SEARCH...</span>
                    </div>
                    <p className="leading-tight">Searching matching tech logs, investments, and competitor sites live...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Central Work Environment area */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Scenario 1: Loading bar details when main landing screen is loading or error occurs when nothing selected */}
              {isLoading && !currentReport && (
                <div className="py-16 text-center">
                  <div className="inline-block animate-spin text-brand-primary mb-4">
                    <RefreshCw className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-brand-dark mb-2">Analyzing Corporation...</h3>
                  <p className="text-sm font-sans text-gray-500 max-w-md mx-auto">
                    Retrieving domain traffic, USPs, financing stages, and market peers using live Search Grounding algorithms.
                  </p>
                </div>
              )}

              {/* Scenario 2: Head-to-Head Portfolio Compare Matrix View */}
              {!isLoading && isCompareMode && (
                <div className="transition-all duration-300">
                  <HeadToHeadMatrix 
                    items={trackedPortfolio}
                    onRemove={handleRemoveTracked}
                    onSelect={handleSelectTracked}
                    onAddMore={() => {
                      setIsCompareMode(false);
                      // Trigger prompt focus by resetting active
                      setNavbarSearch("");
                    }}
                  />
                </div>
              )}

              {/* Scenario 3: Individual Company Report (Dashboard vs Competitors tabs) */}
              {!isCompareMode && currentReport && (
                <div className="space-y-6">
                  {/* Top Bar for tab selections & Back button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#FAF5EE] pb-4 gap-4">
                    {/* Tabs toggler */}
                    <div className="flex gap-2 bg-[#F1ECE4]/70 p-1.5 rounded-2xl border border-[#E8DFD0] self-start font-sans">
                      <button
                        onClick={() => setActiveTab("dashboard")}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                          activeTab === "dashboard"
                            ? "bg-white text-brand-primary shadow-sm"
                            : "text-gray-500 hover:text-brand-dark"
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Corporate Profile</span>
                      </button>
                      <button
                        onClick={() => setActiveTab("competitors")}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                          activeTab === "competitors"
                            ? "bg-white text-brand-primary shadow-sm"
                            : "text-gray-500 hover:text-brand-dark"
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Competitors Benchmarking</span>
                      </button>
                    </div>

                    {/* Meta indicator */}
                    <div className="text-xs text-right text-gray-400 font-mono flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#F2ECE1]">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-cohesion animate-pulse" />
                      <span>Factual Report Generated: {new Date(currentItem?.timestamp || Date.now()).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Tab Contents */}
                  <div className="transition-all duration-300">
                    {activeTab === "dashboard" ? (
                      <CompanyDashboard report={currentReport} />
                    ) : (
                      <CompetitorsComparison 
                        report={currentReport} 
                        onAnalyzeCompetitor={handleResearch}
                        isLoading={isLoading}
                      />
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </main>

      {/* Modern, humble footer */}
      <footer className="border-t border-[#EBE5DA] py-6 bg-white mt-16 text-center text-xs text-gray-400 font-mono">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} Benchmarker Engine • Powered by Google Gemini 3.5 & Google Search Grounding</p>
        </div>
      </footer>
    </div>
  );
}
