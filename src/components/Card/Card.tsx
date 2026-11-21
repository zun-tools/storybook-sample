import type { ReactNode } from 'react';
import './Card.css';

export interface CardProps {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

/** 関係のある内容をひとまとまりに囲む枠。 */
export function Card({ title, children, footer }: CardProps) {
  return (
    <section className="card">
      {title && <h2 className="card__title">{title}</h2>}
      <div className="card__body">{children}</div>
      {footer && <div className="card__footer">{footer}</div>}
    </section>
  );
}
