import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodosService } from '../todos.service';
import { startOfDay, toDate } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { isBefore } from 'date-fns';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() allowCreate = true;
  @Input() showCompleted = false;

  public todos: Todo[] = [];
  public newTodo: Todo = { id: this.generateId(), content: '', complete: false, estimation: null, dueDate: toDate(startOfDay(utcToZonedTime(new Date(), 'Australia/Sydney'))) };
  public selectedTodo: Todo | null = null;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.todosService.todos$.subscribe((todos) => {
      this.todos = todos.filter(
        (todo) => todo.complete === this.showCompleted
      );
    });
  }

  public createNewTodo() {
    if (this.todos.some((todo) => todo.content === '')) {
      return;
    }
  
    this.todos.unshift({
      id: this.generateId(),
      content: '',
      complete: false,
      estimation: null,
      dueDate: toDate(startOfDay(utcToZonedTime(new Date(), 'Australia/Sydney'))),
    });
  }  

  public toggleComplete(todo: Todo) {
    this.todosService.toggleComplete(todo);
  }

  public deleteTodo(todoToDelete: Todo): void {
    if (todoToDelete) {
      this.todosService.deleteTodo(todoToDelete);
    }
  }  

  public selectTodo(todo: Todo) {
    this.selectedTodo = this.selectedTodo === todo ? null : todo;
  }
  
  public updateTodoContent(todo: Todo, newContent: string) {
    todo.content = newContent;
  }
  
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.selectedTodo && (event.key === 'Delete' || event.key === 'Backspace')) {
      this.deleteTodo(this.selectedTodo);
      this.selectedTodo = null;
    }
  }

  public isBeforeToday(date: Date): boolean {
    return isBefore(date, startOfDay(new Date()));
  }

  private generateId(): string {
    return Date.now().toString();
  }  
}
