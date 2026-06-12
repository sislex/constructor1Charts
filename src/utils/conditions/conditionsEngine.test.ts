import { describe, expect, it } from 'vitest';
import { evaluateConditionExpression, evaluateOperator, validateCondition } from './conditionsEngine';
import type { Condition } from '@domainTypes/domain';

describe('conditionsEngine', () => {
  it('evaluates comparison operators', () => {
    expect(evaluateOperator('GREATER_THAN', 2, 1)).toBe(true);
    expect(evaluateOperator('LESS_THAN', 2, 1)).toBe(false);
    expect(evaluateOperator('GREATER_OR_EQUAL', 2, 2)).toBe(true);
    expect(evaluateOperator('LESS_OR_EQUAL', 2, 2)).toBe(true);
    expect(evaluateOperator('EQUAL', 2, 2)).toBe(true);
  });

  it('evaluates percent operators with base metric', () => {
    expect(evaluateOperator('PERCENT_ABOVE', 101, 1, 100)).toBe(true);
    expect(evaluateOperator('PERCENT_BELOW', 99, 1, 100)).toBe(true);
  });

  it('returns missing metric errors', () => {
    expect(
      evaluateConditionExpression(
        { metric: 'marketPrice', operator: 'GREATER_THAN', value: 100 },
        { metrics: {} }
      )
    ).toEqual({ passed: false, error: 'Metric marketPrice is missing.' });
  });

  it('validates condition fields and bot state rules', () => {
    const condition: Condition = {
      id: 'condition-1',
      name: 'Buy spread',
      enabled: true,
      action: 'BUY',
      priority: 1,
      when: {
        metric: 'spreadPercent',
        operator: 'LESS_OR_EQUAL',
        value: 0.2
      }
    };

    expect(validateCondition(condition, 'IDLE').valid).toBe(true);
    expect(validateCondition(condition, 'BOUGHT').errors).toContain(
      'BUY conditions are allowed only when bot state is IDLE.'
    );
  });

  it('requires base metric for percent operators', () => {
    const condition: Condition = {
      id: 'condition-1',
      name: 'Percent above',
      enabled: true,
      action: 'BUY',
      priority: 1,
      when: {
        metric: 'weightedAveragePrice',
        operator: 'PERCENT_ABOVE',
        value: 0.2
      }
    };

    expect(validateCondition(condition, 'IDLE').errors).toContain(
      'Base metric is required for percent operators.'
    );
  });
});
