export type TodoStatus = 'todo' | 'in-progress' | 'done';

export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
  id: ReturnType<typeof crypto.randomUUID>;
  title: string;
  description?: string;
  status: TodoStatus;
  priority: TodoPriority;
  createdAt: string;
}

export type TodoCreate = Omit<Todo, 'id' | 'createdAt'>;
