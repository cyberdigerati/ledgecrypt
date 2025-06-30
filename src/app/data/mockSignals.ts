import { SignalItem } from '../types/signal';

export const mockSignals: SignalItem[] = [
  {
    id: 1,
    title: 'SEC Approves Bitcoin ETF Applications from BlackRock, Fidelity',
    summary:
      'In a landmark decision, the Securities and Exchange Commission has approved spot Bitcoin ETF applications from major institutional players, marking a significant shift in cryptocurrency regulation and mainstream adoption.',
    content: 'Full content here...',
    url: 'https://example.com/news/1',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    source: {
      name: 'CoinDesk',
      reliability: 4,
    },
    analysis: {
      tags: ['regulation', 'bitcoin', 'institutional', 'SEC'],
      volatilityScore: 8,
      impactLevel: 'critical' as const,
      sentiment: 'bullish' as const,
      confidence: 0.9,
    },
    curation: {
      featured: true,
      manualOverride: false,
      hidden: false,
    },
  },
  {
    id: 2,
    title: 'OpenAI Announces GPT-5 with Advanced Reasoning Capabilities',
    summary:
      'The next generation of GPT models promises significant improvements in logical reasoning, code generation, and multimodal understanding, potentially reshaping AI applications across industries.',
    content: 'Full content here...',
    url: 'https://example.com/news/2',
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    source: {
      name: 'TechCrunch',
      reliability: 5,
    },
    analysis: {
      tags: ['AI', 'OpenAI', 'GPT-5', 'reasoning'],
      volatilityScore: 6,
      impactLevel: 'high' as const,
      sentiment: 'bullish' as const,
      confidence: 0.85,
    },
    curation: {
      featured: false,
      manualOverride: false,
      hidden: false,
    },
  },
  {
    id: 3,
    title: 'New AI Safety Standards Proposed for Federal Contractors',
    summary:
      'The Department of Defense has released draft guidelines requiring enhanced AI transparency and safety measures for all contractors working on government AI projects.',
    content: 'Full content here...',
    url: 'https://example.com/news/3',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    source: {
      name: 'Federal Register',
      reliability: 5,
    },
    analysis: {
      tags: ['compliance', 'AI safety', 'federal', 'DoD'],
      volatilityScore: 4,
      impactLevel: 'medium' as const,
      sentiment: 'neutral' as const,
      confidence: 0.8,
    },
    curation: {
      featured: false,
      manualOverride: false,
      hidden: false,
    },
  },
];
