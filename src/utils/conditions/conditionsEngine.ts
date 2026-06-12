import type { BotState, Condition, ConditionExpression, Operator } from '@domainTypes/domain';

export interface ConditionEvaluationContext {
  metrics: Record<string, number | undefined>;
}

export interface ConditionEvaluationResult {
  passed: boolean;
  error?: string;
}

export interface ConditionValidationResult {
  valid: boolean;
  errors: string[];
}

export const supportedMetrics = [
  'weightedAveragePrice',
  'marketPrice',
  'positionProfitPercent',
  'profitAfterFeesPercent',
  'slippagePercent',
  'spreadPercent',
  'positionAgeMs',
  'quoteAgeMs',
  'liquidityUsd',
  'timeAfterLastTradeMs',
  'gasFee'
] as const;

export function evaluateConditionExpression(
  expression: ConditionExpression,
  context: ConditionEvaluationContext
): ConditionEvaluationResult {
  const metricValue = context.metrics[expression.metric];

  if (metricValue === undefined || Number.isNaN(metricValue)) {
    return { passed: false, error: `Metric ${expression.metric} is missing.` };
  }

  const baseValue = expression.base ? context.metrics[expression.base] : undefined;

  if (requiresBase(expression.operator) && (baseValue === undefined || Number.isNaN(baseValue))) {
    return { passed: false, error: `Base metric ${expression.base ?? ''} is missing.` };
  }

  return {
    passed: evaluateOperator(expression.operator, metricValue, expression.value, baseValue)
  };
}

export function evaluateOperator(
  operator: Operator,
  metricValue: number,
  targetValue: number,
  baseValue?: number
): boolean {
  switch (operator) {
    case 'GREATER_THAN':
      return metricValue > targetValue;
    case 'LESS_THAN':
      return metricValue < targetValue;
    case 'GREATER_OR_EQUAL':
      return metricValue >= targetValue;
    case 'LESS_OR_EQUAL':
      return metricValue <= targetValue;
    case 'EQUAL':
      return metricValue === targetValue;
    case 'PERCENT_ABOVE':
      return baseValue !== undefined && metricValue >= baseValue * (1 + targetValue / 100);
    case 'PERCENT_BELOW':
      return baseValue !== undefined && metricValue <= baseValue * (1 - targetValue / 100);
    case 'BETWEEN':
      return metricValue >= 0 && metricValue <= targetValue;
  }
}

export function validateCondition(condition: Condition, botState: BotState): ConditionValidationResult {
  const errors: string[] = [];

  if (!condition.name.trim()) {
    errors.push('Condition name is required.');
  }

  if (!supportedMetrics.includes(condition.when.metric as (typeof supportedMetrics)[number])) {
    errors.push(`Unsupported metric: ${condition.when.metric}.`);
  }

  if (Number.isNaN(condition.when.value)) {
    errors.push('Condition value must be a number.');
  }

  if (requiresBase(condition.when.operator) && !condition.when.base) {
    errors.push('Base metric is required for percent operators.');
  }

  if (condition.action === 'BUY' && botState !== 'IDLE') {
    errors.push('BUY conditions are allowed only when bot state is IDLE.');
  }

  if (condition.action === 'SELL' && botState !== 'BOUGHT') {
    errors.push('SELL conditions are allowed only when bot state is BOUGHT.');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

function requiresBase(operator: Operator): boolean {
  return operator === 'PERCENT_ABOVE' || operator === 'PERCENT_BELOW';
}
