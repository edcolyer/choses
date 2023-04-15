import { Component } from '@angular/core';
import { FilterMode } from '../../todo-list/todo-list.component';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent {
  public filterModeEnum = FilterMode;
}
