import { Component } from '@angular/core';
import { FilterMode } from 'src/app/todo-list/todo-list.component';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent {
  public filterModeEnum = FilterMode;
}
