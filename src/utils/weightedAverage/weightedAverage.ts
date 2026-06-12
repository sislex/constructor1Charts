import type { WeightedAverageSource } from '@domainTypes/domain';

export interface WeightedAverageValidation {
  valid: boolean;
  errors: string[];
  totalWeight: number;
}

const epsilon = 0.000001;

export function normalizeWeights(sources: WeightedAverageSource[]): WeightedAverageSource[] {
  const total = sources.reduce((sum, source) => sum + source.weight, 0);

  if (sources.length === 0 || Math.abs(total) < epsilon) {
    return sources;
  }

  const divisor = total > 1 + epsilon ? 100 : total;

  return sources.map((source) => ({
    ...source,
    weight: source.weight / divisor
  }));
}

export function validateWeights(sources: WeightedAverageSource[]): WeightedAverageValidation {
  const errors: string[] = [];

  if (sources.length === 0) {
    errors.push('At least one weighted average source is required.');
  }

  for (const source of sources) {
    if (source.weight < 0) {
      errors.push(`Weight for ${source.key} must be positive.`);
    }
  }

  const totalWeight = sources.reduce((sum, source) => sum + source.weight, 0);
  const normalizedTotal = totalWeight > 1 + epsilon ? totalWeight / 100 : totalWeight;

  if (Math.abs(normalizedTotal - 1) > epsilon) {
    errors.push('Weights sum must be equal to 1.0 or 100%.');
  }

  return {
    valid: errors.length === 0,
    errors,
    totalWeight
  };
}

export function calculateWeightedAverage(
  prices: Record<string, number | undefined>,
  sources: WeightedAverageSource[]
): number | undefined {
  const normalizedSources = normalizeWeights(sources);
  let hasMissingPrice = false;

  const value = normalizedSources.reduce((sum, source) => {
    const price = prices[source.key];

    if (price === undefined || Number.isNaN(price)) {
      hasMissingPrice = true;
      return sum;
    }

    return sum + price * source.weight;
  }, 0);

  return hasMissingPrice || normalizedSources.length === 0 ? undefined : value;
}
