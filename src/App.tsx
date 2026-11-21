import { AddTaskPage } from './pages/AddTaskPage';

export default function App() {
  return (
    <>
      <header style={{ padding: '16px 24px', borderBottom: '1px solid #d1d5db', background: '#ffffff' }}>
        <h1 style={{ margin: 0, fontSize: 20 }}>タスク</h1>
      </header>
      <AddTaskPage />
    </>
  );
}
