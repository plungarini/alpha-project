/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable max-len */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompletedEx } from '../core/dashboard/components/dashboard-workout/components/workout-functional/workout-functional.component';
import { WorkoutExerciseRound, WorkoutWeekDay } from '../shared/models/workout-week.model';

@Component({
	selector: 'app-workout-detail',
	templateUrl: './workout-detail.component.html',
	styleUrls: ['./workout-detail.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutDetailComponent implements OnInit {

  @Output() onCompleteEx = new EventEmitter();
  @Output() onCloseModal = new EventEmitter();

	@Input('show') set showModal(value: boolean) {
  	const isVal = value === true || value === false;
  	if (isVal && value !== this.show) {
  		this.toggleModal(value);
  	}
  }
	@Input('day') set setDay(value: WorkoutWeekDay | undefined) {
		if (!value) return;
		this.day = value;
	}
  @Input('difficulty') difficultySelected: 1 | 2 | 3 = 1;
  @Input() fixed = true;
  @Input() preview = false;

  day: WorkoutWeekDay;
  exActionOverlay = false;
  playerUrl = '';
	showPlayer = false;
	vimeo = {
		show: false,
		url: '',
	};

  transitionStarted = false;
  show = false;
  hide = true;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  completeEx(val: CompletedEx): void {
  	this.onCompleteEx.emit(val);
  }

  closeModal(): void {
  	this.day.exercises1?.forEach(rounds => {
  		if (!rounds) return;
  		rounds.exercises.forEach(ex => {
  			ex.selected = false;
  		});
  	});
  	this.day.exercises2?.forEach(rounds => {
  		if (!rounds) return;
  		rounds.exercises.forEach(ex => {
  			ex.selected = false;
  		});
  	});
  	this.day.exercises3?.forEach(rounds => {
  		if (!rounds) return;
  		rounds.exercises.forEach(ex => {
  			ex.selected = false;
  		});
  	});
  	this.exActionOverlay = false;
  	this.onCloseModal.emit();
  }

  get getExercises(): WorkoutExerciseRound[] | undefined {
  	switch (this.difficultySelected) {
  	case 1: return this.day.exercises1;
  	case 2: return this.day.exercises2;
  	case 3: return this.day.exercises3;
  	default: return this.day.exercises1;
  	}
  }

  private toggleModal(value: boolean): void {
  	console.log(this.day);
  	if (this.transitionStarted) return;
  	if (value === true) this.hide = false;
  	this.show = value;
  	this.transitionStarted = true;
  	setTimeout(() => {
  		this.transitionStarted = false;
  		if (value === false) this.hide = true;
  		this.cdRef.detectChanges();
  	}, 500);
  }

}
