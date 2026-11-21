import type { ReactNode } from 'react';
import './EmptyState.css';

export interface EmptyStateProps {
  title: string;
  description?: string;
  /** 次の操作。Button などを渡す */
  action?: ReactNode;
}

/** 見せる内容が無いときに、その理由と次の操作を示す。 */
export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="empty">
      <p className="empty__title">{title}</p>
      {description && <p className="empty__description">{description}</p>}
      {action}
    </div>
  );
}
