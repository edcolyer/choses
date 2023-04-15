import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private todos: Todo[] = [];
  private todosSubject = new BehaviorSubject<Todo[]>(this.todos);
  todos$: Observable<Todo[]> = this.todosSubject.asObservable();

  constructor() {}

  public addTodo(todo: Todo) {
    this.todos.push(todo);
    this.todosSubject.next(this.todos);
  }

  public toggleComplete(todo: Todo) {
    todo.complete = !todo.complete;
    this.todosSubject.next(this.todos);
  }

  public deleteTodo(todoToDelete: Todo) {
    this.todos = this.todos.filter((todo) => todo.id !== todoToDelete.id);
    this.todosSubject.next(this.todos);
  }

  public getTodos(): Todo[] {
    return this.todos;
  }
}
