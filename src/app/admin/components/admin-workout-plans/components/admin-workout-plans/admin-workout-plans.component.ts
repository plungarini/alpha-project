import { WorkoutExercisesService } from './../../../../../shared/services/workout-exercises.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminWorkoutSingleExercise, WorkoutWeek } from 'src/app/shared/models/workout-week.model';
import { WorkoutWeeksService } from 'src/app/shared/services/workout-weeks.service';

@Component({
	selector: 'app-admin-workout-plans',
	templateUrl: './admin-workout-plans.component.html',
	styles: [` :host { display: block; } `],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminWorkoutPlansComponent implements OnInit, OnDestroy {

  pageTitle = 'Schede di allenamento';
  pageDesc = 'Gestisci tutte le schede di allenamento di Alpha Project.';

  weeks: WorkoutWeek[] = [];
  destroyed$ = new Subject();
  exercises: AdminWorkoutSingleExercise[] = [];

  constructor(
    private weeksService: WorkoutWeeksService,
    private exercisesService: WorkoutExercisesService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  	this.weeksService.getAll()
  		.pipe(takeUntil(this.destroyed$))
  		.subscribe(workoutWeeks => {
  			this.weeks = workoutWeeks;
  			this.cdRef.detectChanges();
  		});
  	this.exercisesService.getAll()
  		.pipe(takeUntil(this.destroyed$))
  		.subscribe(exercises => {
  			this.exercises = exercises;
  			this.cdRef.detectChanges();
  		});
  }

  ngOnDestroy(): void {
  	this.destroyed$.next(true);
  	this.destroyed$.complete();
  }

  deleteSingleExercise(exId: string): void {
  	this.exercisesService.delete(exId);
  }

}
