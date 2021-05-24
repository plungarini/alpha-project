import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminNewWeekComponent } from './components/admin-new-week/admin-new-week.component';
import { AdminWorkoutPlansComponent } from './components/admin-workout-plans/admin-workout-plans.component';



const routes: Routes = [
  {
    path: '',
    component: AdminWorkoutPlansComponent
  },
  {
    path: 'new/:weekType',
    component: AdminNewWeekComponent
  },
  {
    path: 'edit/:id',
    component: AdminNewWeekComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminWorkoutPlansRoutingModule { }
