export interface Todo {
  id: string;
  content: string;
  complete: boolean;
  estimation: number | null;
  dueDate: Date | null;
  editMode?: boolean;
}
