import type { ReactNode } from 'react';
import './Button.css';

export interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
}

export function Button({
  children,
  type = 'button',
  variant = 'secondary',
  disabled = false,
  ariaLabel,
  onClick
}: ButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      className={`button button--${variant}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
