import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { WorkoutComponent } from './components/home/workout.component';
import { WorkoutDayCardComponent } from './components/workout-day-card/workout-day-card.component';
import { WorkoutFunctionalComponent } from './components/workout-functional/workout-functional.component';
import { WorkoutGymComponent } from './components/workout-gym/workout-gym.component';
import { WorkoutLorenzComponent } from './components/workout-lorenz/workout-lorenz.component';
import { WorkoutWeekCardsComponent } from './components/workout-week-cards/workout-week-cards.component';
import { WorkoutRoutingModule } from './workout-routing.module';



@NgModule({
  declarations: [
    WorkoutComponent,
    WorkoutFunctionalComponent,
    WorkoutGymComponent,
    WorkoutLorenzComponent,
    WorkoutDayCardComponent,
    WorkoutWeekCardsComponent,
  ],
  imports: [
    CommonModule,
    WorkoutRoutingModule,
    SharedModule
  ]
})
export class WorkoutModule { }
