import { useState } from 'react';
import { AddTaskPage } from './pages/AddTaskPage';
import { TaskListPage } from './pages/TaskListPage';
import './App.css';

type View = 'list' | 'add';

const VIEWS: { value: View; label: string }[] = [
  { value: 'list', label: '一覧' },
  { value: 'add', label: '追加' },
];

export default function App() {
  const [view, setView] = useState<View>('list');

  return (
    <>
      <header className="app-header">
        <h1 className="app-header__title">タスク</h1>
        <nav aria-label="画面の切り替え">
          <ul className="app-nav">
            {VIEWS.map(({ value, label }) => (
              <li key={value}>
                <button
                  type="button"
                  className="app-nav__item"
                  aria-current={view === value ? 'page' : undefined}
                  onClick={() => setView(value)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      {view === 'list' ? <TaskListPage /> : <AddTaskPage onAdded={() => setView('list')} />}
    </>
  );
}
