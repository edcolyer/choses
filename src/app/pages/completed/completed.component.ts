import { Component } from '@angular/core';
import { FilterMode } from 'src/app/todo-list/todo-list.component';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent {
  public filterModeEnum = FilterMode;
}
