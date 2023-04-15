import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodosService } from '../todos.service';
import { isSameDay, startOfDay, toDate } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { endOfDay, isAfter, isBefore, parseISO, startOfTomorrow } from 'date-fns';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input() allowCreate = true;
  @Input() filterMode: FilterMode = FilterMode.ALL;

  public todos: Todo[] = [];
  public newTodo: Todo = {
    id: this.generateId(),
    content: '',
    complete: false,
    estimation: null,
    dueDate: toDate(
      parseISO(
        startOfDay(utcToZonedTime(new Date(), 'Australia/Sydney')).toISOString()
      )
    ),
    state: 'expanded',
  };
  public selectedTodo: Todo | null = null;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.todosService.todos$.subscribe((todos) => {
      this.updateFilteredTodos(todos);
    });
  }  

  private updateFilteredTodos(todos: Todo[]): void {
    switch (this.filterMode) {
      case FilterMode.TODAY:
        this.todos = todos.filter((todo) => {
          if (todo.complete) return false;
          if (!todo.dueDate) return true;
          const today = new Date();
          return (
            isBefore(todo.dueDate, endOfDay(today)) ||
            isSameDay(todo.dueDate, today)
          );
        });
        break;

      case FilterMode.UPCOMING:
        this.todos = todos.filter((todo) => {
          if (todo.complete) return false;
          if (!todo.dueDate) return false;
          const tomorrow = startOfTomorrow();
          return isAfter(todo.dueDate, tomorrow);
        });
        break;

      case FilterMode.COMPLETED:
        this.todos = todos.filter((todo) => todo.complete);
        break;

      case FilterMode.ALL:
      default:
        this.todos = todos;
        break;
    }
  }
  

  public createNewTodo() {
    if (this.todos.some((todo) => !todo.content)) {
      return;
    }

    const newTodo: Todo = {
      id: this.generateId(),
      content: '',
      complete: false,
      estimation: null,
      dueDate: toDate(
        parseISO(
          startOfDay(
            utcToZonedTime(new Date(), 'Australia/Sydney')
          ).toISOString()
        )
      ),
      state: 'expanded',
    };

    this.todosService.addTodo(newTodo);

    this.updateFilteredTodos(this.todosService.getTodos());
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
    if (
      this.selectedTodo &&
      (event.key === 'Delete' || event.key === 'Backspace')
    ) {
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

  public handleExpand(expandedTodo: Todo) {
    this.todos.forEach((todo) => {
      if (todo !== expandedTodo && todo.state === 'expanded') {
        todo.state = 'resting';
      }
    });
  }

  public deleteSelectedTodo(event: KeyboardEvent) {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      const selectedTodo = this.todos.find((todo) => todo.state === 'selected');
      if (selectedTodo) {
        this.deleteTodo(selectedTodo);
      }
    }
  }
}

export enum FilterMode {
  TODAY,
  UPCOMING,
  COMPLETED,
  ALL,
}
