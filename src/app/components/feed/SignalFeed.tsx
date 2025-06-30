'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Zap, Activity } from 'lucide-react';
import { CategoryFilter } from './CategoryFilter';
import { SignalCard } from './SignalCard';
import { useSignals } from '../../hooks/useSignals';
import { useCategoryCounts } from '../../hooks/useCategoryCounts';
import { cn } from '../../lib/utils';

export default function SignalFeed() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const {
    data: signals = [],
    isLoading,
    error,
    isFetching,
  } = useSignals({
    category: activeCategory,
    featured: showFeaturedOnly,
  });

  const { data: categoryCounts = {} } = useCategoryCounts();

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
            <Zap className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Signal Feed Offline</h2>
          <p className="text-gray-400">
            Unable to connect to intelligence network
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                <img
                  src="/logos/ledgecryptlogolarge.png"
                  alt="LedgeCrypt"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Signal Feed</h1>
                <p className="text-gray-400 text-sm">
                  Real-time intelligence • {signals.length} signals
                  {isFetching && (
                    <span className="inline-flex items-center gap-1 ml-2">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Updating
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className={cn(
                  'px-4 py-2 rounded-lg border transition-all duration-300',
                  showFeaturedOnly
                    ? 'border-amber-500/50 bg-amber-500/20 text-amber-300'
                    : 'border-white/20 bg-white/5 text-gray-300 hover:bg-white/10'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Featured Only
              </motion.button>

              <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-gray-300">Live</span>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            categoryCounts={categoryCounts}
          />
        </div>
      </div>

      {/* Signal Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto" />
              <p className="text-gray-400">Loading intelligence feed...</p>
            </div>
          </div>
        ) : signals.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto">
              <Activity className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              No Signals Found
            </h3>
            <p className="text-gray-400">
              {showFeaturedOnly
                ? 'No featured signals in this category'
                : 'No signals available in this category'}
            </p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${showFeaturedOnly}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {signals.map((signal, index) => (
                <SignalCard key={signal.id} signal={signal} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Load More */}
        {signals.length > 0 && signals.length % 20 === 0 && (
          <div className="text-center pt-12">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Signals
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
