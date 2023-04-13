import { Component } from '@angular/core';
import { Todo } from '../../models/todo.model';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  public todos: Todo[] = [];
  public newTodo: Todo = { id: 0, content: '', complete: false };

  public addTodo() {
    this.todos.push({ ...this.newTodo, id: Date.now() });
    this.newTodo.content = '';
  }

  public toggleComplete(todo: Todo) {
    todo.complete = !todo.complete;
  }
}
