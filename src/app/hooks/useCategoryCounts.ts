'use client';

import { useQuery } from '@tanstack/react-query';
import { mockSignals } from '../data/mockSignals';

export function useCategoryCounts() {
  return useQuery({
    queryKey: ['category-counts'],
    queryFn: async (): Promise<Record<string, number>> => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      const counts: Record<string, number> = {
        all: mockSignals.length,
        ai: 0,
        crypto: 0,
        compliance: 0,
        automation: 0,
        markets: 0,
        critical: 0,
      };

      mockSignals.forEach((signal) => {
        signal.analysis.tags.forEach((tag) => {
          const lowerTag = tag.toLowerCase();
          if (
            lowerTag.includes('ai') ||
            lowerTag.includes('openai') ||
            lowerTag.includes('gpt')
          ) {
            counts.ai++;
          }
          if (
            lowerTag.includes('bitcoin') ||
            lowerTag.includes('crypto') ||
            lowerTag.includes('blockchain')
          ) {
            counts.crypto++;
          }
          if (
            lowerTag.includes('compliance') ||
            lowerTag.includes('regulation') ||
            lowerTag.includes('federal')
          ) {
            counts.compliance++;
          }
          if (lowerTag.includes('automation') || lowerTag.includes('robot')) {
            counts.automation++;
          }
          if (lowerTag.includes('market') || lowerTag.includes('trading')) {
            counts.markets++;
          }
        });

        if (signal.analysis.impactLevel === 'critical') {
          counts.critical++;
        }
      });

      return counts;
    },
    refetchInterval: 60000, // Refetch every minute
  });
}
