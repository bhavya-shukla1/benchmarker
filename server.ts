import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded GoogleGenAI client to avoid crashes if API Key is not set yet
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not configured. Please add it in the Secrets panel in AI Studio UI.");
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      }
    }
  });
}

// 1. Defined structured JSON response schema
const analysisResponseSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Official company name." },
    tagline: { type: Type.STRING, description: "A short, descriptive tagline." },
    website: { type: Type.STRING, description: "Primary URL/website address." },
    description: { type: Type.STRING, description: "A clear, descriptive paragraph explaining what the company builds or does." },
    logoPlaceholder: { type: Type.STRING, description: "Tailwind CSS gradient wrapper class, e.g., 'from-orange-500 to-amber-600', 'from-emerald-500 to-teal-600', or 'from-blue-600 to-indigo-700'." },
    companyDetails: {
      type: Type.OBJECT,
      properties: {
        hq: { type: Type.STRING, description: "Headquarters location, city, state and country." },
        founders: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING }, 
          description: "List of the founders of the company." 
        },
        yearFounded: { type: Type.STRING, description: "The year the company was founded." },
        employeeCount: { type: Type.STRING, description: "Estimated list or headcount of employees, e.g., '1,500+' or '100-250'." }
      },
      required: ["hq", "founders", "yearFounded", "employeeCount"]
    },
    startupStage: {
      type: Type.OBJECT,
      properties: {
        stage: { type: Type.STRING, description: "Current company stage, e.g., Public, Series B, Bootstrapped, Acquisition, Seed." },
        fundingTotal: { type: Type.STRING, description: "Total funding raised, e.g., '$1.2B', '$15M', 'N/A' for bootstrapped." },
        lastFundingYear: { type: Type.STRING, description: "Year of the latest funding round." },
        keyInvestors: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING }, 
          description: "Top Venture Capital firms or individual key investors." 
        }
      },
      required: ["stage", "fundingTotal", "lastFundingYear", "keyInvestors"]
    },
    strategy: {
      type: Type.OBJECT,
      properties: {
        usps: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING }, 
          description: "Provide at least 3 distinct Unique Selling Propositions (USPs) for the company." 
        },
        moats: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING }, 
          description: "Provide at least 3 robust defensive strategies/moats (e.g., brand, switching costs, technology, network effects)." 
        },
        pricingModel: { type: Type.STRING, description: "Primary pricing structure, e.g., SaaS Subscription, Usage-Based, Freemium, Open Core, Transactional." }
      },
      required: ["usps", "moats", "pricingModel"]
    },
    websiteMetrics: {
      type: Type.OBJECT,
      properties: {
        estimatedMonthlyVisits: { type: Type.STRING, description: "Estimated monthly unique web traffic visits, e.g., '2.4M', '45K' or 'N/A'." },
        bounceRate: { type: Type.STRING, description: "Average estimated user bounce rate, e.g., '38.4%'." },
        avgVisitDuration: { type: Type.STRING, description: "Average user visit duration, e.g., '2m 15s'." },
        topTrafficSources: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              source: { type: Type.STRING, description: "e.g., Direct, Organic Search, Referrals, Social, Paid, Email" },
              percentage: { type: Type.STRING, description: "Traffic source percentage, e.g., '45%'" }
            },
            required: ["source", "percentage"]
          },
          description: "List of the top 3 traffic sources and percentages."
        }
      },
      required: ["estimatedMonthlyVisits", "bounceRate", "avgVisitDuration", "topTrafficSources"]
    },
    revenueGrowth: {
      type: Type.OBJECT,
      properties: {
        estimatedAnnualRevenue: { type: Type.STRING, description: "Estimated annual revenue run-rate (e.g., '$10M - $50M' or '$5.4B')." },
        growthTrend: { type: Type.STRING, description: "YoY growth dynamic, e.g., 'Hypergrowth (x2 YoY)', 'Consistent Growth (+25%)', 'Stable', 'Declining'." },
        headcountGrowth: { type: Type.STRING, description: "Staff head count change trends or growth rate in the last 12-24 months." }
      },
      required: ["estimatedAnnualRevenue", "growthTrend", "headcountGrowth"]
    },
    socialMedia: {
      type: Type.OBJECT,
      properties: {
        linkedin: { type: Type.STRING, description: "Followers status / details, e.g., '1.2M followers, active posting' or 'No profile'." },
        twitter: { type: Type.STRING, description: "X/Twitter presence stats / follower size, e.g., '340K followers' or 'N/A'." },
        github: { type: Type.STRING, description: "GitHub repository stars, activity summary or 'N/A' if non-software." },
        youtube: { type: Type.STRING, description: "YouTube content activity/subscribers or 'N/A'." },
        other: { type: Type.STRING, description: "Other digital footprints like Discord, ProductHunt listings, Reddit communities, or Instagram." }
      },
      required: ["linkedin", "twitter", "github", "youtube", "other"]
    },
    competitors: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Competitor company name." },
          website: { type: Type.STRING, description: "Competitor core URL." },
          description: { type: Type.STRING, description: "Brief actionable summary of this competitor." },
          logoPlaceholder: { type: Type.STRING, description: "Tailwind CSS gradient, e.g., 'from-rose-500 to-pink-600', 'from-amber-500 to-orange-600'." },
          estimatedMonthlyVisits: { type: Type.STRING, description: "Estimated monthly Visits, e.g., '140K', '2M'." },
          fundingStage: { type: Type.STRING, description: "Funding status of competitor, e.g. Series C ($120M Raised), Bootstrapped, etc." },
          usps: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 2-3 key unique selling points of competitor." },
          howItCompares: { type: Type.STRING, description: "Relative point of difference compared to the queried parent company (pricing, audience, features, lock-in, etc.)." }
        },
        required: ["name", "website", "description", "logoPlaceholder", "estimatedMonthlyVisits", "fundingStage", "usps", "howItCompares"]
      },
      description: "Provide exactly 3 or 4 competitor companies in depth."
    }
  },
  required: [
    "name",
    "tagline",
    "website",
    "description",
    "logoPlaceholder",
    "companyDetails",
    "startupStage",
    "strategy",
    "websiteMetrics",
    "revenueGrowth",
    "socialMedia",
    "competitors"
  ]
};

// API Endpoint: Perform grounded research on a company name
app.post("/api/analyze", async (req, res) => {
  const { companyName } = req.body;
  if (!companyName || typeof companyName !== "string" || !companyName.trim()) {
    res.status(400).json({ error: "Please enter a valid company name to analyze." });
    return;
  }

  try {
    const ai = getGeminiClient();
    
    const systemInstruction = 
      "You are a top-tier market research and competitive intelligence AI analyst. " +
      "Your objective is to provide professional, realistic, up-to-date, and fact-grounded analysis of any company requested. " +
      "First, execute necessary Google Search queries to discover the actual company details, website URL, Founders, HQ location, founding year, " +
      "social media stats, funding/startup stage history, estimated traffic/visits (e.g. from public analytics estimations), USPs, Moats, and its EXACT top 3-4 competitors. " +
      "Then compile all metrics accurately matching the actual, public records. Double check traffic and size estimates. " +
      "Output the complete report structure strictly fitting the provided json schema.";

    const prompt = `Analyze the company "${companyName.trim()}". Return the complete competitive analysis schema containing all realistic and grounded public information about the company and its top 3 or 4 competitors. Make sure to perform web searches for accurate, real-world numbers and facts.`;

    let response;
    let wasSearchGrounded = true;
    let fallbackReason = "";

    try {
      response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: analysisResponseSchema,
          temperature: 0.2, // low temperature for precise research facts
        }
      });
    } catch (groundingError: any) {
      console.warn("Search-grounded generation failed. Initiating fallback without tools:", groundingError);
      wasSearchGrounded = false;
      fallbackReason = groundingError?.message || "Search Quota Exceeded";

      // Fallback: clear the tools parameter and use core model knowledge base
      response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction + " (Note: The search tool is currently unavailable due to API rate-limits. Please rely on your extensive pre-trained knowledge base to reconstruct and compile accurate, realistic, and coherent metrics for this company as carefully as possible without hallucinating.)",
          responseMimeType: "application/json",
          responseSchema: analysisResponseSchema,
          temperature: 0.3,
        }
      });
    }

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("No output generated from Gemini. Please try again.");
    }

    // Parse the JSON output safely
    const parsedData = JSON.parse(textOutput);

    // Extract search grounding sources to display trustful materials
    const sources: { title: string; url: string }[] = [];
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks && Array.isArray(groundingChunks)) {
      groundingChunks.forEach(chunk => {
        if (chunk.web?.uri) {
          sources.push({
            title: chunk.web.title || chunk.web.uri,
            url: chunk.web.uri
          });
        }
      });
    }

    // Embed sources and fallback markers into response data
    parsedData.sources = sources;
    parsedData.wasSearchGrounded = wasSearchGrounded;
    parsedData.fallbackReason = fallbackReason;

    res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error("Analysis API Error:", error);
    res.status(500).json({ 
      error: error.message || "Failed to analyze the company due to server error.",
      details: error.toString()
    });
  }
});

// Vite middleware development setup
async function startViteMiddleware() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Competitive Analysis server running on port ${PORT}`);
  });
}

startViteMiddleware().catch((err) => {
  console.error("Vite server failed to start:", err);
});
