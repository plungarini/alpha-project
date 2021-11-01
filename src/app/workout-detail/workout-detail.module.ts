import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { SharedModule } from '../shared/shared.module';
import { HeadbarComponent } from './components/headbar/headbar.component';
import { HeaderComponent } from './components/header/header.component';
import { WorkoutDetailComponent } from './workout-detail.component';
import { RoundComponent } from './components/round/round.component';
import { ExerciseComponent } from './components/exercise/exercise.component';



@NgModule({
	declarations: [
		WorkoutDetailComponent,
		HeaderComponent,
		HeadbarComponent,
  RoundComponent,
  ExerciseComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		NgxBootstrapIconsModule.pick(allIcons),
		InlineSVGModule.forRoot(),
	],
	exports: [
		WorkoutDetailComponent
	],
})
export class WorkoutDetailModule { }
