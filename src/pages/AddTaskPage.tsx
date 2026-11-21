import { useState } from 'react';
import type { FormEvent } from 'react';
import { createTask } from '../api/tasks';
import { Button, Card, Checkbox, Select, TextField } from '../components';
import { PRIORITY_LABELS } from '../types';
import type { Priority, Task } from '../types';
import './AddTaskPage.css';

const OPTIONS = Object.entries(PRIORITY_LABELS).map(([value, label]) => ({ value, label }));

export interface AddTaskPageProps {
  /** タスクを追加し終えたとき。「続けて入力する」がオンのときは呼ばれず、この画面に残る */
  onAdded?: (task: Task) => void;
}

export function AddTaskPage({ onAdded }: AddTaskPageProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [keepGoing, setKeepGoing] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError('タイトルを入れてください');
      return;
    }
    setError('');
    setSending(true);
    const task = await createTask({ title: title.trim(), priority });
    setSending(false);
    setTitle('');
    if (keepGoing) document.getElementById('task-title')?.focus();
    else onAdded?.(task);
  }

  return (
    <main className="add-page">
      <form onSubmit={handleSubmit}>
        <Card title="タスクを追加">
          <div className="add-page__fields">
            <TextField id="task-title" label="タイトル" value={title} onChange={setTitle} error={error} />
            <Select label="優先度" value={priority} onChange={(v) => setPriority(v as Priority)} options={OPTIONS} />
            <Checkbox label="追加したあとも続けて入力する" checked={keepGoing} onChange={setKeepGoing} />
            <div>
              <Button type="submit" loading={sending}>追加</Button>
            </div>
          </div>
        </Card>
      </form>
    </main>
  );
}
