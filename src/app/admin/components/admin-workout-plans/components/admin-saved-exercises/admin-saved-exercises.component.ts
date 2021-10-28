/* eslint-disable @angular-eslint/no-output-on-prefix */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminWorkoutSingleExercise } from 'src/app/shared/models/workout-week.model';
import WORKOUT_IMAGES from 'src/app/shared/typescript/workout-images';



@Component({
	selector: 'app-admin-saved-exercises',
	templateUrl: './admin-saved-exercises.component.html',
	styles: [` :host { display: block; } `],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSavedExercisesComponent implements OnInit {

  @Output() onExerciseDeleted = new EventEmitter();
  @Input() exercises: AdminWorkoutSingleExercise[] = [];
  icons = WORKOUT_IMAGES;

  constructor() { }

  ngOnInit(): void {
  }

  getIconPath(id: number | undefined | null): string {
  	const resIcon = this.icons.filter(icon => icon.id === id)[0];
  	if (resIcon && resIcon.path)
  		return resIcon.path;
  	return '';
  }

  deleteExercise(exId: string | undefined | null): void {
  	if (exId)
  		this.onExerciseDeleted.emit(exId);
  }

}
