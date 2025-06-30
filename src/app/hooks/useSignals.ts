'use client';

import { useQuery } from '@tanstack/react-query';
import { SignalItem } from '../types/signal';
import { mockSignals } from '../data/mockSignals';

interface UseSignalsOptions {
  category?: string;
  limit?: number;
  featured?: boolean;
}

export function useSignals(options: UseSignalsOptions = {}) {
  return useQuery({
    queryKey: ['signals', options],
    queryFn: async (): Promise<SignalItem[]> => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      let filteredSignals = [...mockSignals];

      // Filter by featured
      if (options.featured) {
        filteredSignals = filteredSignals.filter(
          (signal) => signal.curation.featured
        );
      }

      // Filter by category
      if (options.category && options.category !== 'all') {
        filteredSignals = filteredSignals.filter((signal) =>
          signal.analysis.tags.some((tag) =>
            tag.toLowerCase().includes(options.category!.toLowerCase())
          )
        );
      }

      // Apply limit
      if (options.limit) {
        filteredSignals = filteredSignals.slice(0, options.limit);
      }

      return filteredSignals;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 15000, // Consider data stale after 15 seconds
  });
}
