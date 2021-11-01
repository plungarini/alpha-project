/* eslint-disable radix */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { DropdownOptions } from 'src/app/shared/models/dropdown-options.model';
import { WorkoutExerciseRound, WorkoutWeek, WorkoutWeekDay } from 'src/app/shared/models/workout-week.model';
import { UserWorkoutService } from '../../../../../../shared/services/user-workout.service';


export interface CompletedEx {
  roundIndex: number;
  exIndex: number;
  completed: boolean;
}

@Component({
	templateUrl: './workout-functional.component.html',
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutFunctionalComponent implements OnInit, OnDestroy {

  week: WorkoutWeek;
  weekSubscription: Subscription;
  showDayDetails = false;
  modalDaySelected: WorkoutWeekDay;
  modalDaySelectedDay = 1;
  difficultySelected: 1 | 2 | 3 = 1;
  userId: string;
  firstLoad = true;
  destroyed$ = new Subject();

  difficultySelectedText = 'Livello Principiante';
  difficultySelectedTextMobile = 'Lv.1';
  difficultyOptions: DropdownOptions[] = [
  	{
  		type: 'group',
  		childrens: [
  			{
  				name: 'Livello Principiante',
  				selected: true,
  				value: 1,
  				action: true
  			},
  			{
  				name: 'Livello Intermedio',
  				selected: false,
  				value: 2,
  				action: true
  			},
  			{
  				name: 'Livello Avanzato',
  				selected: false,
  				value: 3,
  				action: true
  			},
  		]
  	}
  ];

  constructor(
    private userWorkoutService: UserWorkoutService,
    private authService: AuthenticationService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  	this.authService.fireUser$
  		.pipe(takeUntil(this.destroyed$))
  		.subscribe(fUser => {
  			this.userId = fUser?.uid ? fUser.uid : '';
  			if (this.userId) this.initWeeks(this.userId);
  		});
  }

  ngOnDestroy(): void {
  	this.destroyed$.next(true);
  	this.destroyed$.complete();
  }

  initWeeks(uid: string): void {
  	this.userWorkoutService.getAll(uid, 'functional')
  		.pipe(takeUntil(this.destroyed$))
  		.subscribe(weeks => {
  			if (!weeks || weeks.length <= 0 || !weeks[0]) return;
  			weeks[0].week.forEach(day => {
  				day.selected = false;
  			});
  			this.week = this.userWorkoutService.selectToday(weeks[0]);
  			this.week.week[this.modalDaySelectedDay - 1].selected = true;
  			if (this.firstLoad) {
  				this.userWorkoutService.saveWeek(this.week, this.userId);
  				this.firstLoad = false;
  			}
  			if (this.showDayDetails) {
  				this.modalDaySelected = this.week.week[this.modalDaySelectedDay - 1];
  			}
  			const diff = localStorage.getItem('workoutWeekDifficulty');
  			this.changeDifficulty({ value: diff ? parseInt(diff) : undefined });
  			this.cdRef.detectChanges();
  		});
  }

  toggleDayModal(day?: WorkoutWeekDay): void {
  	if (!day) {
  		this.showDayDetails = false;
  		return;
  	}
  	this.showDayDetails = true;
  	this.modalDaySelected = day;
  	this.modalDaySelectedDay = day.day;
  }

  changeDifficulty(diff: { value: number | undefined }): void {
  	const invalidDiff = diff.value !== 1 && diff.value !== 2 && diff.value !== 3;
  	if (!diff.value || invalidDiff) diff.value = 1;
  	localStorage.setItem('workoutWeekDifficulty', diff.value + '');
  	this.difficultyOptions[0].childrens?.map(option => {
  		if (option.value === diff.value) {
  			option.selected = true;
  			const name = option.name as string;
  			this.difficultySelectedText = name;
  			this.difficultySelected = option.value;
  			this.difficultySelectedTextMobile =
          name.includes('Principiante') ? 'Lv.1' :
          	name.includes('Intermedio') ? 'Lv.2' :
          		name.includes('Avanzato') ? 'Lv.3' : 'Lv.1';
  			return option;
  		} else {
  			option.selected = false;
  			return option;
  		}
  	});
  	this.difficultySelected = diff.value as 1 | 2 | 3;
  	let rounds: WorkoutExerciseRound[] | undefined;
  	const day = this.week.week[this.modalDaySelectedDay - 1];
  	if (this.difficultySelected === 1) rounds = day.exercises1;
  	if (this.difficultySelected === 2) rounds = day.exercises2;
  	if (this.difficultySelected === 3) rounds = day.exercises3;
  	if (!rounds) return;
  	let dayCompleted = true;
  	rounds.forEach(round => {
  		round.exercises.forEach(ex => {
  			if (ex.isTime) return;
  			if (!ex.completed) dayCompleted = false;
  		});
  	});
  	day.completed = dayCompleted;
  	this.modalDaySelected = day;
  }

  completeEx(event: CompletedEx): void {
  	console.log(event);
  	let rounds: WorkoutExerciseRound[] | undefined;
  	const day = this.week.week[this.modalDaySelectedDay - 1];
  	if (this.difficultySelected === 1) rounds = day.exercises1;
  	if (this.difficultySelected === 2) rounds = day.exercises2;
  	if (this.difficultySelected === 3) rounds = day.exercises3;
  	if (!rounds) return;
  	rounds[event.roundIndex].exercises[event.exIndex].completed = event.completed;
  	let dayCompleted = true;
  	rounds.forEach(round => {
  		round.exercises.forEach(ex => {
  			if (ex.isTime) return;
  			if (!ex.completed) dayCompleted = false;
  		});
  	});
  	day.completed = dayCompleted;
  	this.userWorkoutService.saveWeek(this.week, this.userId);
  }

}
