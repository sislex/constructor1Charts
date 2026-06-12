import type { Condition } from '@domainTypes/domain';
import './ConditionsBuilder.css';

export interface ConditionCardProps {
  condition: Condition;
}

export function ConditionCard({ condition }: ConditionCardProps) {
  return (
    <article className="condition-card">
      <div>
        <strong>{condition.name}</strong>
        <span>{condition.enabled ? 'Enabled' : 'Disabled'}</span>
      </div>
      <p>
        {condition.action} if {condition.when.metric} {condition.when.operator} {condition.when.value}
      </p>
    </article>
  );
}
