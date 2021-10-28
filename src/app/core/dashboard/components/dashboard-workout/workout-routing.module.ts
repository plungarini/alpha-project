import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutComponent } from './components/home/workout.component';
import { WorkoutFunctionalComponent } from './components/workout-functional/workout-functional.component';
import { WorkoutGymComponent } from './components/workout-gym/workout-gym.component';
import { WorkoutLorenzComponent } from './components/workout-lorenz/workout-lorenz.component';

const routes: Routes = [
	{
		path: '',
		component: WorkoutComponent
	},
	{
		path: 'functional',
		component: WorkoutFunctionalComponent
	},
	{
		path: 'gym',
		component: WorkoutGymComponent
	},
	{
		path: 'lorenz',
		component: WorkoutLorenzComponent
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class WorkoutRoutingModule { }
