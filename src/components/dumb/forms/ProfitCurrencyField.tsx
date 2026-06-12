import './ProfitCurrencyField.css';

export interface ProfitCurrencyFieldProps {
  value: string;
}

export function ProfitCurrencyField({ value }: ProfitCurrencyFieldProps) {
  return (
    <div className="profit-currency-field" aria-label="Profit currency">
      <span>Profit Currency</span>
      <strong>{value || 'Auto'}</strong>
    </div>
  );
}
