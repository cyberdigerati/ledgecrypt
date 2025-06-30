'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { ExternalLink, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { SignalItem } from '../../types/signal';
import { cn } from '../../lib/utils';

interface SignalCardProps {
  signal: SignalItem;
  index: number;
}

export function SignalCard({ signal, index }: SignalCardProps) {
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
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={cn(
        'group relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300',
        'hover:scale-[1.02] hover:shadow-2xl cursor-pointer',
        curation.featured
          ? 'border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/5'
          : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
      )}
      whileHover={{ y: -4 }}
    >
      {/* Featured badge */}
      {curation.featured && (
        <div className="absolute -top-2 -right-2">
          <div className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-xs font-bold text-white shadow-lg">
            FEATURED
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Impact indicator */}
          <div
            className={cn(
              'w-3 h-3 rounded-full bg-gradient-to-r shadow-lg',
              getImpactColor(analysis.impactLevel)
            )}
          />

          {/* Source */}
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

        {/* Timestamp */}
        <span className="text-xs text-gray-500">
          {formatDistanceToNow(new Date(signal.publishedAt), {
            addSuffix: true,
          })}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white leading-tight group-hover:text-blue-300 transition-colors">
          {signal.title}
        </h3>

        <p className="text-gray-300 text-sm leading-relaxed">
          {signal.summary}
        </p>

        {/* Tags */}
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

        {/* Metrics */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center gap-4">
            {/* Sentiment */}
            <div className="flex items-center gap-1">
              {getSentimentIcon(analysis.sentiment)}
              <span className="text-xs text-gray-400 capitalize">
                {analysis.sentiment}
              </span>
            </div>

            {/* Volatility */}
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

          {/* External link */}
          <motion.a
            href={signal.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-xs font-medium text-blue-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Read More
            <ExternalLink className="w-3 h-3" />
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}
