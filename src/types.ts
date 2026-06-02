export interface TrafficSource {
  source: string;
  percentage: string;
}

export interface CompanyDetails {
  hq: string;
  founders: string[];
  yearFounded: string;
  employeeCount: string;
}

export interface StartupStage {
  stage: string;
  fundingTotal: string;
  lastFundingYear: string;
  keyInvestors: string[];
}

export interface Strategy {
  usps: string[];
  moats: string[];
  pricingModel: string;
}

export interface WebsiteMetrics {
  estimatedMonthlyVisits: string;
  bounceRate: string;
  avgVisitDuration: string;
  topTrafficSources: TrafficSource[];
}

export interface RevenueGrowth {
  estimatedAnnualRevenue: string;
  growthTrend: string;
  headcountGrowth: string;
}

export interface SocialMedia {
  linkedin: string;
  twitter: string;
  github: string;
  youtube: string;
  other: string;
}

export interface CompetitorBrief {
  name: string;
  website: string;
  description: string;
  logoPlaceholder: string;
  estimatedMonthlyVisits: string;
  fundingStage: string;
  usps: string[];
  howItCompares: string;
}

export interface SearchSource {
  title: string;
  url: string;
}

export interface CompetitiveReport {
  name: string;
  tagline: string;
  website: string;
  description: string;
  logoPlaceholder: string;
  companyDetails: CompanyDetails;
  startupStage: StartupStage;
  strategy: Strategy;
  websiteMetrics: WebsiteMetrics;
  revenueGrowth: RevenueGrowth;
  socialMedia: SocialMedia;
  competitors: CompetitorBrief[];
  sources?: SearchSource[];
  wasSearchGrounded?: boolean;
  fallbackReason?: string;
}

export interface TrackedItem {
  id: string; // usually company name lowercase
  timestamp: number;
  report: CompetitiveReport;
}
