import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodayComponent } from './pages/today/today.component';
import { CompletedComponent } from './pages/completed/completed.component';
import { UpcomingComponent } from './pages/upcoming/upcoming.component';

const routes: Routes = [
  { path: '', redirectTo: '/today', pathMatch: 'full' },
  { path: 'today', component: TodayComponent },
  { path: 'completed', component: CompletedComponent },
  { path: 'upcoming', component: UpcomingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
