export interface Todo {
  id: string;
  content: string;
  complete: boolean;
  estimation: number | null;
  dueDate: Date | null;
  state: 'resting' | 'selected' | 'expanded';
}
