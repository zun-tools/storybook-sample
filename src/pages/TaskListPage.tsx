import { useEffect, useState } from 'react';
import { fetchTasks } from '../api/tasks';
import { Badge, Card, EmptyState, Select, Spinner, TextField } from '../components';
import type { BadgeProps } from '../components';
import { PRIORITY_LABELS } from '../types';
import type { Priority, Task } from '../types';
import './TaskListPage.css';

type StatusFilter = 'all' | 'open' | 'done';

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'open', label: '未完了' },
  { value: 'done', label: '完了' },
];

const PRIORITY_TONES: Record<Priority, NonNullable<BadgeProps['tone']>> = {
  high: 'danger',
  medium: 'info',
  low: 'neutral',
};

export function TaskListPage() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');

  useEffect(() => {
    let active = true;
    fetchTasks()
      .then((result) => {
        if (active) setTasks(result);
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const needle = query.trim().toLowerCase();
  const visible = (tasks ?? []).filter((task) => {
    if (status === 'open' && task.done) return false;
    if (status === 'done' && !task.done) return false;
    return !needle || task.title.toLowerCase().includes(needle);
  });

  function renderBody() {
    if (failed) {
      return <EmptyState title="タスクを読み込めませんでした" description="時間をおいて、もう一度開いてください。" />;
    }
    if (tasks === null) {
      return (
        <div className="task-list__loading">
          <Spinner label="タスクを読み込み中" />
        </div>
      );
    }
    if (tasks.length === 0) {
      return <EmptyState title="タスクはまだありません" description="最初のタスクを追加しましょう。" />;
    }
    if (visible.length === 0) {
      return <EmptyState title="条件に合うタスクはありません" description="検索の言葉や状態の絞り込みを変えてみてください。" />;
    }
    return (
      <ul className="task-list__items" aria-label="タスク">
        {visible.map((task) => (
          <li key={task.id} className="task-list__item">
            <span className={task.done ? 'task-list__title task-list__title--done' : 'task-list__title'}>
              {task.title}
            </span>
            <span className="task-list__badges">
              <Badge tone={PRIORITY_TONES[task.priority]}>優先度 {PRIORITY_LABELS[task.priority]}</Badge>
              <Badge tone={task.done ? 'success' : 'neutral'}>{task.done ? '完了' : '未完了'}</Badge>
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <main className="task-list">
      <Card title="タスク一覧">
        <div className="task-list__filters">
          <TextField
            id="task-search"
            type="search"
            label="検索"
            placeholder="タイトルで探す"
            value={query}
            onChange={setQuery}
          />
          <Select
            id="task-status"
            label="状態"
            value={status}
            onChange={(v) => setStatus(v as StatusFilter)}
            options={STATUS_OPTIONS}
          />
        </div>
        <div aria-live="polite">{renderBody()}</div>
      </Card>
    </main>
  );
}
