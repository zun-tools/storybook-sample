import type { NewTask, Task } from '../types';

const KEY = 'tasks';
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function load(): Task[] {
  const raw = localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as Task[]) : [];
}

function save(tasks: Task[]) {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}

export async function fetchTasks(): Promise<Task[]> {
  await wait(300);
  return load();
}

export async function createTask(input: NewTask): Promise<Task> {
  await wait(300);
  const task: Task = { ...input, id: crypto.randomUUID(), done: false, createdAt: new Date().toISOString() };
  save([...load(), task]);
  return task;
}

export async function toggleTask(id: string): Promise<Task | undefined> {
  await wait(300);
  const tasks = load().map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  save(tasks);
  return tasks.find((t) => t.id === id);
}
