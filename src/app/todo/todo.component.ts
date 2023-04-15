import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Todo } from '../../models/todo.model';
import { isBefore, parseISO, startOfDay } from 'date-fns';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements AfterViewInit {
  @Input() todo!: Todo;
  @Output() onComplete = new EventEmitter<Todo>();
  @Output() onDelete = new EventEmitter<Todo>();
  @Output() onUpdateContent = new EventEmitter<{
    todo: Todo;
    newContent: string;
  }>();
  @Output() onSelect = new EventEmitter<Todo>();
  @Output() onExpand = new EventEmitter<Todo>();

  @ViewChild('contentInput') contentInput!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    if (this.todo.state === 'expanded') {
      this.contentInput.nativeElement.focus();
    }
  }

  get dueDateInput(): string {
    return this.todo.dueDate ? this.todo.dueDate.toISOString().substring(0, 10) : '';
  }
  
  set dueDateInput(value: string) {
    this.todo.dueDate = value ? new Date(value) : null;
  }

  public toggleComplete() {
    this.onComplete.emit(this.todo);
  }

  public select() {
    if (this.todo.state === 'resting') {
      this.todo.state = 'selected';
    } else if (this.todo.state === 'selected') {
      this.todo.state = 'resting';
    }
  }

  public expand() {
    if (this.todo.state !== 'expanded') {
      this.todo.state = 'expanded';
      this.onExpand.emit(this.todo);

      setTimeout(() => {
        this.contentInput.nativeElement.focus();
      }, 0);
    }
  }

  public focusContentInput() {
    this.contentInput.nativeElement.focus();
  }

  public updateContent(event: FocusEvent) {
    const target = event.target as HTMLInputElement;
    if (target.value !== null) {
      const newContent = target.value.trim();
      this.onUpdateContent.emit({ todo: this.todo, newContent });
    }
  }

  public handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (this.todo.state === 'expanded') {
        this.todo.state = 'selected';
      } else if (this.todo.state === 'selected') {
        this.todo.state = 'expanded';
      }
    }
  }

  public isBeforeToday(date: Date): boolean {
    return isBefore(parseISO(date.toString()), new Date());
  }
}
