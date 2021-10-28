import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { DropdownOptions } from 'src/app/shared/models/dropdown-options.model';
import { WorkoutExerciseRound, WorkoutWeek, WorkoutWeekDay } from 'src/app/shared/models/workout-week.model';
import { UserWorkoutService } from 'src/app/shared/services/user-workout.service';
import { CompletedEx } from '../workout-functional/workout-functional.component';



@Component({
	templateUrl: './workout-gym.component.html',
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutGymComponent implements OnInit, OnDestroy {

  week: WorkoutWeek;
  weekSubscription: Subscription;
  showDayDetails = false;
  modalDaySelected: WorkoutWeekDay;
  modalDaySelectedDay = 1;
  userId: string;
  firstLoad = true;
  destroyed$ = new Subject();

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
  	this.userWorkoutService.getAll(uid, 'gym')
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

  completeEx(event: CompletedEx): void {
  	const day = this.week.week[this.modalDaySelectedDay - 1];
  	const rounds = day.exercises1;
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
