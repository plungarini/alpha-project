import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminWorkoutPlansRoutingModule } from './admin-workout-plans-routing.module';
import { AdminNewWeekComponent } from './components/admin-new-week/admin-new-week.component';
import { AdminSavedExercisesComponent } from './components/admin-saved-exercises/admin-saved-exercises.component';
import { AdminSavedWeeksComponent } from './components/admin-saved-weeks/admin-saved-weeks.component';
import { AdminWorkoutExerciseComponent } from './components/admin-workout-exercise/admin-workout-exercise.component';
import { AdminWorkoutPlansComponent } from './components/admin-workout-plans/admin-workout-plans.component';



@NgModule({
  declarations: [
    AdminWorkoutPlansComponent,
    AdminSavedWeeksComponent,
    AdminSavedExercisesComponent,
    AdminWorkoutExerciseComponent,
    AdminNewWeekComponent
  ],
  imports: [
    CommonModule,
    AdminWorkoutPlansRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AdminWorkoutPlansModule { }
