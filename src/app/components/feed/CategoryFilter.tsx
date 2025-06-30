'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SIGNAL_CATEGORIES } from '../../data/categories';
import { cn } from '../../lib/utils';
import * as Icons from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  categoryCounts: Record<string, number>;
}

export function CategoryFilter({
  activeCategory,
  onCategoryChange,
  categoryCounts,
}: CategoryFilterProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-3 min-w-max px-6 py-4">
        {SIGNAL_CATEGORIES.map((category) => {
          const IconComponent = Icons[
            category.icon as keyof typeof Icons
          ] as React.ComponentType<{ className?: string }>;
          const isActive = activeCategory === category.id;
          const count = categoryCounts[category.id] || 0;

          return (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                'relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
                'border backdrop-blur-sm group hover:scale-105',
                isActive
                  ? 'border-white/20 bg-white/10 shadow-lg'
                  : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10'
              )}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background gradient */}
              {isActive && (
                <motion.div
                  className={cn(
                    'absolute inset-0 rounded-xl bg-gradient-to-r opacity-20',
                    category.color
                  )}
                  layoutId="activeCategory"
                  initial={false}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Icon */}
              <div
                className={cn(
                  'relative z-10 p-2 rounded-lg bg-gradient-to-r',
                  category.color,
                  isActive ? 'shadow-lg' : 'opacity-70 group-hover:opacity-100'
                )}
              >
                {IconComponent && (
                  <IconComponent className="w-5 h-5 text-white" />
                )}
              </div>

              {/* Content */}
              <div className="relative z-10 text-left">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'font-semibold text-sm transition-colors',
                      isActive
                        ? 'text-white'
                        : 'text-gray-300 group-hover:text-white'
                    )}
                  >
                    {category.name}
                  </span>
                  {count > 0 && (
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-full text-xs font-bold',
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-600 text-gray-300'
                      )}
                    >
                      {count}
                    </span>
                  )}
                </div>
                <p
                  className={cn(
                    'text-xs transition-colors',
                    isActive ? 'text-gray-200' : 'text-gray-400'
                  )}
                >
                  {category.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
