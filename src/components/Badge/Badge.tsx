import type { ReactNode } from 'react';
import './Badge.css';

export interface BadgeProps {
  /** 色の種類。success は済んだ物、danger は急ぐ物に使う */
  tone?: 'neutral' | 'info' | 'success' | 'danger';
  children: ReactNode;
}

/** 状態や種類を短い言葉で示す札。押せない。 */
export function Badge({ tone = 'neutral', children }: BadgeProps) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}
