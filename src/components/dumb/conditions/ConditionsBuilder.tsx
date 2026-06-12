import type { Condition, Operator } from '@domainTypes/domain';
import { supportedMetrics, validateCondition } from '@utils/conditions/conditionsEngine';
import { Button } from '@components/dumb/common/Button';
import { ConditionCard } from './ConditionCard';
import './ConditionsBuilder.css';

export interface ConditionDraft {
  name: string;
  action: 'BUY' | 'SELL';
  metric: string;
  operator: Operator;
  value: number;
  base: string;
}

export interface ConditionsBuilderProps {
  conditions: Condition[];
  draft: ConditionDraft;
  onDraftChange: (draft: ConditionDraft) => void;
  onAddCondition: () => void;
}

export function ConditionsBuilder({
  conditions,
  draft,
  onDraftChange,
  onAddCondition
}: ConditionsBuilderProps) {
  const previewCondition = buildPreviewCondition(draft);
  const validation = validateCondition(previewCondition, draft.action === 'BUY' ? 'IDLE' : 'BOUGHT');
  const canAdd = validation.valid;

  return (
    <section className="conditions-builder" aria-label="Conditions builder">
      <div className="conditions-builder__editor">
        <label>
          <span>Condition Name</span>
          <input
            value={draft.name}
            onChange={(event) => onDraftChange({ ...draft, name: event.target.value })}
          />
        </label>
        <label>
          <span>Action</span>
          <select
            value={draft.action}
            onChange={(event) =>
              onDraftChange({ ...draft, action: event.target.value as ConditionDraft['action'] })
            }
          >
            <option value="BUY">BUY</option>
            <option value="SELL">SELL</option>
          </select>
        </label>
        <label>
          <span>Metric</span>
          <select
            value={draft.metric}
            onChange={(event) => onDraftChange({ ...draft, metric: event.target.value })}
          >
            {supportedMetrics.map((metric) => (
              <option key={metric} value={metric}>
                {metric}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Operator</span>
          <select
            value={draft.operator}
            onChange={(event) =>
              onDraftChange({ ...draft, operator: event.target.value as Operator })
            }
          >
            <option value="GREATER_THAN">Greater than</option>
            <option value="LESS_THAN">Less than</option>
            <option value="GREATER_OR_EQUAL">Greater or equal</option>
            <option value="LESS_OR_EQUAL">Less or equal</option>
            <option value="EQUAL">Equal</option>
            <option value="PERCENT_ABOVE">Percent above</option>
            <option value="PERCENT_BELOW">Percent below</option>
            <option value="BETWEEN">Between zero and value</option>
          </select>
        </label>
        <label>
          <span>Value</span>
          <input
            step="0.01"
            type="number"
            value={draft.value}
            onChange={(event) => onDraftChange({ ...draft, value: Number(event.target.value) })}
          />
        </label>
        <label>
          <span>Base Metric</span>
          <input
            placeholder="selectedMarketBuyPrice"
            value={draft.base}
            onChange={(event) => onDraftChange({ ...draft, base: event.target.value })}
          />
        </label>
      </div>

      {!validation.valid ? (
        <ul className="conditions-builder__errors">
          {validation.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) : null}

      <Button disabled={!canAdd} onClick={onAddCondition}>
        Add Condition
      </Button>

      {conditions.length === 0 ? (
        <div className="conditions-builder__empty">No conditions configured yet.</div>
      ) : (
        <div className="conditions-builder__list">
          {conditions.map((condition) => (
            <ConditionCard key={condition.id} condition={condition} />
          ))}
        </div>
      )}
    </section>
  );
}

function buildPreviewCondition(draft: ConditionDraft): Condition {
  return {
    id: 'preview',
    name: draft.name,
    enabled: true,
    action: draft.action,
    priority: 1,
    when: {
      metric: draft.metric,
      operator: draft.operator,
      value: draft.value,
      base: draft.base || undefined
    }
  };
}
