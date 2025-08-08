import { NextRequest, NextResponse } from 'next/server';

// RSS Sources organized by category
const RSS_SOURCES = {
  AI: [
    {
      url: 'https://news.ycombinator.com/rss',
      name: 'Hacker News',
      reliability: 4,
      description: 'Tech community discussions and AI developments',
    },
    {
      url: 'https://www.oreilly.com/content/feed/',
      name: "O'Reilly Radar",
      reliability: 5,
      description: 'Technology trends and AI insights',
    },
    {
      url: 'https://venturebeat.com/feed/',
      name: 'VentureBeat',
      reliability: 4,
      description: 'AI and technology news',
    },
  ],
  Web3: [
    {
      url: 'https://cointelegraph.com/rss',
      name: 'Cointelegraph',
      reliability: 5,
      description: 'Web3 and blockchain developments',
    },
    {
      url: 'https://thedefiant.io/api/feed',
      name: 'The Defiant',
      reliability: 5,
      description: 'DeFi and Web3 news',
    },
    {
      url: 'https://decrypt.co/feed',
      name: 'Decrypt',
      reliability: 4,
      description: 'Web3 and crypto culture',
    },
  ],
  'Crypto Blockchain': [
    {
      url: 'https://coindesk.com/arc/outboundfeeds/rss/',
      name: 'CoinDesk',
      reliability: 5,
      description: 'Bitcoin and cryptocurrency news',
    },
    {
      url: 'https://bitcoinmagazine.com/rss',
      name: 'Bitcoin Magazine',
      reliability: 5,
      description: 'Bitcoin and blockchain technology',
    },
    {
      url: 'https://www.newsbtc.com/feed/',
      name: 'NewsBTC',
      reliability: 4,
      description: 'Cryptocurrency market analysis',
    },
  ],
  Robotics: [
    {
      url: 'https://spectrum.ieee.org/rss/robotics/fulltext',
      name: 'IEEE Spectrum Robotics',
      reliability: 5,
      description: 'Advanced robotics research and development',
    },
    {
      url: 'https://www.therobotreport.com/feed/',
      name: 'The Robot Report',
      reliability: 4,
      description: 'Industrial and service robotics news',
    },
  ],
  'AR VR': [
    {
      url: 'https://uploadvr.com/feed/',
      name: 'UploadVR',
      reliability: 4,
      description: 'Virtual reality news and reviews',
    },
    {
      url: 'https://www.roadtovr.com/feed/',
      name: 'Road to VR',
      reliability: 4,
      description: 'VR industry analysis and news',
    },
  ],
  Drones: [
    {
      url: 'https://dronelife.com/feed/',
      name: 'DroneLife',
      reliability: 4,
      description: 'Commercial drone industry news',
    },
    {
      url: 'https://www.suasnews.com/feed/',
      name: 'sUAS News',
      reliability: 4,
      description: 'Unmanned aircraft systems news',
    },
  ],
  Fintech: [
    {
      url: 'https://feeds.bloomberg.com/markets/news.rss',
      name: 'Bloomberg Markets',
      reliability: 5,
      description: 'Financial markets and fintech developments',
    },
    {
      url: 'https://techcrunch.com/category/fintech/feed/',
      name: 'TechCrunch Fintech',
      reliability: 4,
      description: 'Financial technology startups and innovation',
    },
  ],
  Security: [
    {
      url: 'https://krebsonsecurity.com/feed/',
      name: 'Krebs on Security',
      reliability: 5,
      description: 'Cybersecurity news and analysis',
    },
    {
      url: 'https://www.darkreading.com/rss.xml',
      name: 'Dark Reading',
      reliability: 4,
      description: 'Enterprise security news',
    },
  ],
};

interface Signal {
  id: string;
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
    reliability: number;
    category: string;
  };
  analysis: {
    tags: string[];
    volatilityScore: number;
    impactLevel: 'low' | 'medium' | 'high' | 'critical';
    sentiment: 'bullish' | 'bearish' | 'neutral';
  };
  curation: {
    featured: boolean;
  };
  type: string;
  category: string;
}

// Enhanced keyword analysis for better categorization
function analyzeContent(
  title: string,
  description: string,
  category: string
): {
  tags: string[];
  volatilityScore: number;
  impactLevel: 'low' | 'medium' | 'high' | 'critical';
  sentiment: 'bullish' | 'bearish' | 'neutral';
} {
  const content = `${title} ${description}`.toLowerCase();

  // Category-specific keyword analysis
  const categoryKeywords = {
    AI: {
      keywords: [
        'ai',
        'artificial intelligence',
        'machine learning',
        'neural',
        'gpt',
        'llm',
        'openai',
        'anthropic',
      ],
      highImpact: [
        'breakthrough',
        'agi',
        'superintelligence',
        'billion',
        'trillion',
      ],
      bearish: ['regulation', 'ban', 'risk', 'danger', 'lawsuit'],
    },
    Web3: {
      keywords: [
        'web3',
        'defi',
        'dapp',
        'smart contract',
        'protocol',
        'dao',
        'nft',
      ],
      highImpact: ['hack', 'exploit', 'billion', 'ethereum 2.0', 'layer 2'],
      bearish: ['hack', 'exploit', 'crash', 'regulation'],
    },
    'Crypto Blockchain': {
      keywords: [
        'bitcoin',
        'ethereum',
        'crypto',
        'blockchain',
        'mining',
        'wallet',
        'exchange',
      ],
      highImpact: ['etf', 'adoption', 'regulation', 'halving', '$50k', '$100k'],
      bearish: ['crash', 'bear market', 'regulation', 'ban', 'hack'],
    },
    Robotics: {
      keywords: [
        'robot',
        'automation',
        'humanoid',
        'industrial robot',
        'boston dynamics',
      ],
      highImpact: ['breakthrough', 'commercial', 'factory', 'warehouse'],
      bearish: ['malfunction', 'accident', 'job loss'],
    },
    'AR VR': {
      keywords: [
        'vr',
        'ar',
        'metaverse',
        'headset',
        'mixed reality',
        'apple vision',
      ],
      highImpact: ['apple', 'meta', 'mass adoption', 'enterprise'],
      bearish: ['flop', 'cancel', 'expensive', 'nausea'],
    },
    Drones: {
      keywords: ['drone', 'uav', 'unmanned', 'delivery', 'surveillance'],
      highImpact: ['faa', 'commercial', 'military', 'delivery'],
      bearish: ['crash', 'accident', 'regulation', 'privacy'],
    },
  };

  const categoryData = categoryKeywords[
    category as keyof typeof categoryKeywords
  ] || {
    keywords: [],
    highImpact: [],
    bearish: [],
  };

  // Extract tags based on category keywords
  const tags = categoryData.keywords.filter((keyword) =>
    content.includes(keyword)
  );

  // Add general tech tags
  const generalKeywords = [
    'startup',
    'funding',
    'ipo',
    'acquisition',
    'innovation',
    'breakthrough',
  ];
  tags.push(...generalKeywords.filter((keyword) => content.includes(keyword)));

  // Determine impact level
  let impactLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
  if (categoryData.highImpact.some((keyword) => content.includes(keyword))) {
    impactLevel = 'high';
  }
  if (
    content.includes('billion') ||
    content.includes('trillion') ||
    content.includes('breakthrough')
  ) {
    impactLevel = 'critical';
  }
  if (tags.length > 3) {
    impactLevel = impactLevel === 'low' ? 'medium' : impactLevel;
  }

  // Determine sentiment
  let sentiment: 'bullish' | 'bearish' | 'neutral' = 'neutral';
  const bullishWords = [
    'breakthrough',
    'success',
    'growth',
    'adoption',
    'innovation',
    'funding',
  ];
  const bearishWords = [
    'crash',
    'hack',
    'regulation',
    'ban',
    'risk',
    'concern',
  ];

  if (
    categoryData.bearish.some((keyword) => content.includes(keyword)) ||
    bearishWords.some((word) => content.includes(word))
  ) {
    sentiment = 'bearish';
  } else if (bullishWords.some((word) => content.includes(word))) {
    sentiment = 'bullish';
  }

  // Calculate volatility score (1-10)
  const volatilityScore = Math.min(
    10,
    Math.max(
      1,
      tags.length +
        (impactLevel === 'critical'
          ? 4
          : impactLevel === 'high'
            ? 3
            : impactLevel === 'medium'
              ? 2
              : 1) +
        (sentiment !== 'neutral' ? 2 : 0)
    )
  );

  return {
    tags: tags.slice(0, 6), // Limit to 6 tags
    volatilityScore,
    impactLevel,
    sentiment,
  };
}

async function fetchRSSFeed(
  url: string,
  sourceName: string,
  category: string,
  reliability: number
): Promise<Signal[]> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'LedgeCrypt-Signal-Feed/1.0',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch ${sourceName}: ${response.status}`);
      return [];
    }

    const xmlText = await response.text();

    // Parse RSS XML
    const items: Signal[] = [];
    const itemMatches = xmlText.match(/<item[^>]*>[\s\S]*?<\/item>/gi) || [];

    for (const item of itemMatches.slice(0, 5)) {
      // Limit to 5 items per source
      const title =
        item.match(
          /<title[^>]*><!\[CDATA\[(.*?)\]\]><\/title>|<title[^>]*>(.*?)<\/title>/i
        )?.[1] ||
        item.match(
          /<title[^>]*><!\[CDATA\[(.*?)\]\]><\/title>|<title[^>]*>(.*?)<\/title>/i
        )?.[2] ||
        'Untitled';

      const description =
        item.match(
          /<description[^>]*><!\[CDATA\[(.*?)\]\]><\/description>|<description[^>]*>(.*?)<\/description>/i
        )?.[1] ||
        item.match(
          /<description[^>]*><!\[CDATA\[(.*?)\]\]><\/description>|<description[^>]*>(.*?)<\/description>/i
        )?.[2] ||
        '';

      const link =
        item.match(/<link[^>]*>(.*?)<\/link>/i)?.[1] ||
        item.match(/<guid[^>]*>(.*?)<\/guid>/i)?.[1] ||
        '';

      const pubDate =
        item.match(/<pubDate[^>]*>(.*?)<\/pubDate>/i)?.[1] ||
        new Date().toISOString();

      // Clean up extracted content
      const cleanTitle = title.replace(/<[^>]*>/g, '').trim();
      const cleanDescription =
        description
          .replace(/<[^>]*>/g, '')
          .trim()
          .substring(0, 200) + '...';
      const cleanLink = link.trim();

      if (cleanTitle && cleanLink) {
        const analysis = analyzeContent(cleanTitle, cleanDescription, category);

        items.push({
          id: `${sourceName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: cleanTitle,
          summary: cleanDescription,
          url: cleanLink,
          publishedAt: new Date(pubDate).toISOString(),
          source: {
            name: sourceName,
            reliability,
            category,
          },
          analysis,
          curation: {
            featured:
              analysis.impactLevel === 'critical' ||
              (analysis.impactLevel === 'high' && reliability >= 5),
          },
          type: 'rss',
          category,
        });
      }
    }

    return items;
  } catch (error) {
    console.error(`Error fetching RSS from ${sourceName}:`, error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '40');
  const categoryFilter = searchParams.get('category'); // New: filter by category

  try {
    const allSignals: Signal[] = [];

    // Determine which categories to fetch
    const categoriesToFetch = categoryFilter
      ? [categoryFilter]
      : Object.keys(RSS_SOURCES);

    // Fetch from selected categories
    for (const category of categoriesToFetch) {
      if (RSS_SOURCES[category as keyof typeof RSS_SOURCES]) {
        const sources = RSS_SOURCES[category as keyof typeof RSS_SOURCES];

        const categoryPromises = sources.map((source) =>
          fetchRSSFeed(source.url, source.name, category, source.reliability)
        );

        const categoryResults = await Promise.all(categoryPromises);
        allSignals.push(...categoryResults.flat());
      }
    }

    // Sort by publication date (newest first)
    allSignals.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    // Apply limit
    const limitedSignals = allSignals.slice(0, limit);

    // Group by category for response
    const signalsByCategory = limitedSignals.reduce(
      (acc, signal) => {
        if (!acc[signal.category]) {
          acc[signal.category] = [];
        }
        acc[signal.category].push(signal);
        return acc;
      },
      {} as Record<string, Signal[]>
    );

    return NextResponse.json({
      success: true,
      count: limitedSignals.length,
      totalCategories: Object.keys(signalsByCategory).length,
      categories: Object.keys(RSS_SOURCES),
      signals: categoryFilter ? limitedSignals : signalsByCategory,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('RSS API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch RSS feeds',
        signals: [],
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
