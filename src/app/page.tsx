'use client';

import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Minus,
  Loader2,
  RefreshCw,
  Filter,
  Brain,
  Globe,
  Bitcoin,
  Bot,
  Glasses,
  Plane,
  DollarSign,
  Shield,
} from 'lucide-react';

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

interface SignalCardProps {
  signal: Signal;
}

// Category configuration with icons and colors
const CATEGORIES = {
  AI: {
    icon: Brain,
    color: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-500/10',
  },
  Web3: {
    icon: Globe,
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-500/10',
  },
  'Crypto Blockchain': {
    icon: Bitcoin,
    color: 'from-orange-500 to-orange-600',
    bg: 'bg-orange-500/10',
  },
  Robotics: {
    icon: Bot,
    color: 'from-green-500 to-green-600',
    bg: 'bg-green-500/10',
  },
  'AR VR': {
    icon: Glasses,
    color: 'from-pink-500 to-pink-600',
    bg: 'bg-pink-500/10',
  },
  Drones: {
    icon: Plane,
    color: 'from-cyan-500 to-cyan-600',
    bg: 'bg-cyan-500/10',
  },
  Fintech: {
    icon: DollarSign,
    color: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-500/10',
  },
  Security: {
    icon: Shield,
    color: 'from-red-500 to-red-600',
    bg: 'bg-red-500/10',
  },
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function CategoryBadge({ category }: { category: string }) {
  const categoryConfig = CATEGORIES[category as keyof typeof CATEGORIES];
  if (!categoryConfig) return null;

  const Icon = categoryConfig.icon;

  return (
    <div
      className={cn(
        'flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium',
        categoryConfig.bg,
        'text-white'
      )}
    >
      <Icon className="w-3 h-3" />
      {category}
    </div>
  );
}

function SignalCard({ signal }: SignalCardProps) {
  const { analysis, curation, source } = signal;

  const getImpactColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'from-red-500 to-red-600';
      case 'high':
        return 'from-orange-500 to-orange-600';
      case 'medium':
        return 'from-yellow-500 to-yellow-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'bearish':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <article
      className={cn(
        'group relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300',
        'hover:scale-[1.02] hover:shadow-2xl cursor-pointer',
        curation.featured
          ? 'border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/5'
          : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
      )}
    >
      {curation.featured && (
        <div className="absolute -top-2 -right-2">
          <div className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-xs font-bold text-white shadow-lg">
            FEATURED
          </div>
        </div>
      )}

      <div className="absolute -top-2 -left-2">
        <CategoryBadge category={signal.category} />
      </div>

      <div className="flex items-start justify-between mb-4 mt-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'w-3 h-3 rounded-full bg-gradient-to-r shadow-lg',
              getImpactColor(analysis.impactLevel)
            )}
          />

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-300">
              {source.name}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-1 h-1 rounded-full',
                    i < source.reliability ? 'bg-green-400' : 'bg-gray-600'
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <span className="text-xs text-gray-500">
          {formatDistanceToNow(new Date(signal.publishedAt), {
            addSuffix: true,
          })}
        </span>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white leading-tight group-hover:text-blue-300 transition-colors">
          {signal.title}
        </h3>

        <p className="text-gray-300 text-sm leading-relaxed">
          {signal.summary}
        </p>

        <div className="flex flex-wrap gap-2">
          {analysis.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-white/10 rounded-lg text-xs font-medium text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {getSentimentIcon(analysis.sentiment)}
              <span className="text-xs text-gray-400 capitalize">
                {analysis.sentiment}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-1 h-2 rounded-sm',
                      i < analysis.volatilityScore
                        ? 'bg-blue-400'
                        : 'bg-gray-700'
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400">
                Vol: {analysis.volatilityScore}/10
              </span>
            </div>
          </div>

          <a
            href={signal.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-xs font-medium text-blue-300 transition-all hover:scale-105"
          >
            Read More
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </article>
  );
}

function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  signalCounts,
}: {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  signalCounts: Record<string, number>;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onCategoryChange(null)}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
          selectedCategory === null
            ? 'bg-blue-500 text-white'
            : 'bg-white/10 text-gray-300 hover:bg-white/20'
        )}
      >
        <Filter className="w-4 h-4" />
        All Categories
        <span className="px-2 py-1 bg-white/20 rounded text-xs">
          {Object.values(signalCounts).reduce((a, b) => a + b, 0)}
        </span>
      </button>

      {categories.map((category) => {
        const categoryConfig = CATEGORIES[category as keyof typeof CATEGORIES];
        if (!categoryConfig) return null;

        const Icon = categoryConfig.icon;

        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
              selectedCategory === category
                ? cn('bg-gradient-to-r text-white', categoryConfig.color)
                : cn(
                    'text-gray-300 hover:text-white transition-colors',
                    categoryConfig.bg
                  )
            )}
          >
            <Icon className="w-4 h-4" />
            {category}
            <span className="px-2 py-1 bg-white/20 rounded text-xs">
              {signalCounts[category] || 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function HomePage() {
  const [signalsByCategory, setSignalsByCategory] = useState<
    Record<string, Signal[]>
  >({});
  const [allSignals, setAllSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  const fetchSignals = async (category?: string) => {
    try {
      setRefreshing(true);
      const url = category
        ? `/api/rss?limit=20&category=${encodeURIComponent(category)}`
        : `/api/rss?limit=40`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        if (category) {
          // Single category response
          setAllSignals(data.signals as Signal[]);
          setSignalsByCategory({ [category]: data.signals as Signal[] });
        } else {
          // All categories response
          setSignalsByCategory(data.signals as Record<string, Signal[]>);
          setAllSignals(
            Object.values(data.signals as Record<string, Signal[]>).flat()
          );
        }
        setAvailableCategories(data.categories || []);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch signals');
      }
    } catch (err) {
      setError('Network error - unable to fetch signals');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSignals();

    // Auto-refresh every 5 minutes
    const interval = setInterval(() => fetchSignals(), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      fetchSignals(category);
    } else {
      fetchSignals();
    }
  };

  const displaySignals = selectedCategory
    ? signalsByCategory[selectedCategory] || []
    : allSignals;

  const signalCounts = Object.keys(signalsByCategory).reduce(
    (acc, category) => {
      acc[category] = signalsByCategory[category].length;
      return acc;
    },
    {} as Record<string, number>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto" />
          <h2 className="text-xl font-bold text-white">Loading Signal Feed</h2>
          <p className="text-gray-400">
            Aggregating intelligence from multiple sources...
          </p>
        </div>
      </div>
    );
  }

  if (error && displaySignals.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
            <ExternalLink className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Signal Feed Offline</h2>
          <p className="text-gray-400">{error}</p>
          <button
            onClick={() => fetchSignals()}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center mb-8">
          <img
            src="/logos/ledgecryptlogolarge.png"
            alt="LedgeCrypt Logo"
            className="w-100 h-50 object-contain mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-white">
            LedgeCrypt Signal Feed
          </h1>
          <p className="text-gray-400">
            Real-time intelligence monitoring from live sources
          </p>

          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">
                Live Feed • {displaySignals.length} signals
                {selectedCategory && ` • ${selectedCategory}`}
              </span>
            </div>

            <button
              onClick={() => fetchSignals(selectedCategory || undefined)}
              disabled={refreshing}
              className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-xs font-medium text-blue-300 transition-colors disabled:opacity-50"
            >
              <RefreshCw
                className={cn('w-3 h-3', refreshing ? 'animate-spin' : '')}
              />
              Refresh
            </button>
          </div>

          {error && (
            <div className="mt-2 text-xs text-orange-400">
              Warning: {error} (showing cached signals)
            </div>
          )}
        </div>

        <CategoryFilter
          categories={availableCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          signalCounts={signalCounts}
        />

        {selectedCategory ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              {selectedCategory} Signals
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {displaySignals.map((signal) => (
                <SignalCard key={signal.id} signal={signal} />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(signalsByCategory).map(([category, signals]) => (
              <div key={category} className="space-y-4">
                <div className="flex items-center gap-3">
                  <CategoryBadge category={category} />
                  <h2 className="text-xl font-bold text-white">{category}</h2>
                  <span className="text-sm text-gray-400">
                    {signals.length} signals
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {signals.slice(0, 4).map((signal) => (
                    <SignalCard key={signal.id} signal={signal} />
                  ))}
                </div>

                {signals.length > 4 && (
                  <button
                    onClick={() => handleCategoryChange(category)}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                  >
                    View all {signals.length} {category} signals →
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {displaySignals.length === 0 && !loading && (
          <div className="text-center py-20">
            <h3 className="text-lg font-semibold text-white mb-2">
              No Signals Available
            </h3>
            <p className="text-gray-400">
              {selectedCategory
                ? `No signals found for ${selectedCategory}`
                : 'Unable to load signals from RSS sources'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
