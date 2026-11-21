import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Spinner } from '../Spinner';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary はその画面の主な操作、secondary はそれ以外 */
  variant?: 'primary' | 'secondary';
  /** 処理中。押せなくなり、Spinner が出る */
  loading?: boolean;
  children: ReactNode;
}

/** 画面の中で操作を実行するボタン。別の画面への移動には使わない。 */
export function Button({ variant = 'primary', loading = false, disabled, type = 'button', children, ...rest }: ButtonProps) {
  return (
    <button type={type} className={`btn btn--${variant}`} disabled={disabled || loading} {...rest}>
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
}
