import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { startOfDay } from 'date-fns';
import { isBefore } from 'date-fns';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  @Input() todo!: Todo;
  @Output() onComplete = new EventEmitter<Todo>();
  @Output() onDelete = new EventEmitter<Todo>();
  @Output() onUpdateContent = new EventEmitter<{ todo: Todo; newContent: string }>();
  @Output() onSelect = new EventEmitter<Todo>();

  selected = false;

  constructor() {}

  public toggleComplete() {
    this.onComplete.emit(this.todo);
  }

  private toggleEditMode() {
    this.todo.editMode = !this.todo.editMode;
  }  

  public updateContent(event: FocusEvent) {
    const target = event.target as HTMLElement;
    if (target.textContent !== null) {
      const newContent = target.textContent.trim();
      this.onUpdateContent.emit({ todo: this.todo, newContent });
    }
  }

  public select() {
    this.selected = !this.selected;
    this.onSelect.emit(this.todo);
  }

  public isBeforeToday(date: Date): boolean {
    return isBefore(date, startOfDay(new Date()));
  }
}
