export interface SignalItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
    icon?: string;
    reliability: number;
  };
  analysis: {
    tags: string[];
    volatilityScore: number; // 1-10
    impactLevel: 'low' | 'medium' | 'high' | 'critical';
    sentiment: 'bullish' | 'bearish' | 'neutral';
    confidence: number; // AI confidence 0-1
  };
  curation: {
    featured: boolean;
    manualOverride: boolean;
    curatorNotes?: string;
    hidden: boolean;
  };
}

export interface SignalCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  count: number;
}
