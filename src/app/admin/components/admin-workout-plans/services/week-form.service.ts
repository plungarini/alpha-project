import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { WorkoutWeek } from 'src/app/shared/models/workout-week.model';

@Injectable({
	providedIn: 'root'
})
export class WeekFormService {

	constructor() { }

	get workoutWeek(): FormGroup {
		return new FormGroup({
			weekNumber: new FormControl(null, [Validators.required]),
			status: new FormControl('private', [Validators.required]),
			type: new FormControl('functional', [Validators.required]),
			week: new FormArray([
				this.workoutWeekDay(1),
				this.workoutWeekDay(2),
				this.workoutWeekDay(3),
				this.workoutWeekDay(4),
				this.workoutWeekDay(5),
				this.workoutWeekDay(6),
				this.workoutWeekDay(7),
			]),
			weekId: new FormControl('')
		});
	}

	get singleRestExercise(): FormGroup {
		return new FormGroup({
			title: new FormControl('Riposo', [Validators.required]),
			isTime: new FormControl(true, [Validators.required]),
			seconds: new FormControl(),
			minutes: new FormControl(),
			hours: new FormControl(),
			iconSrc: new FormControl('./../../../assets/icons/workout/workout-rest-icon.svg'),
			iconId: new FormControl(0),
			note: new FormControl(''),
			hideView: new FormControl(false)
		});
	}

	get singleExercise(): FormGroup {
		return new FormGroup({
			title: new FormControl('', [Validators.required]),
			isTime: new FormControl(false, [Validators.required]),
			seconds: new FormControl(0),
			minutes: new FormControl(0),
			hours: new FormControl(0),
			iconSrc: new FormControl(''),
			iconId: new FormControl(null),
			quantity: new FormControl(1, [Validators.required]),
			duration: this.singleRestExercise,
			note: new FormControl(''),
			videoLink: new FormControl(''),
			hideView: new FormControl(false)
		});
	}

	exerciseRound(difficulty: number): FormGroup {
		return new FormGroup({
			title: new FormControl(''),
			difficulty: new FormControl(difficulty, [Validators.required]),
			exercises: new FormArray([this.singleExercise]),
			duration: this.singleRestExercise,
			repetitions: new FormControl(1),
			note: new FormControl(''),
			hideView: new FormControl(false)
		});
	}

	workoutWeekDay(day: number): FormGroup {
		return new FormGroup({
			day: new FormControl(day),
			exDayName: new FormControl('', [Validators.required]),
			exDayDesc: new FormControl(''),
			restDay: new FormControl(false, [Validators.required]),
			exDone: new FormControl(0),
			exToDo: new FormControl(0),
			selected: new FormControl(false),
			exercises1: new FormArray([this.exerciseRound(1)]),
			exercises2: new FormArray([this.exerciseRound(2)]),
			exercises3: new FormArray([this.exerciseRound(3)])
		});
	}

	parseDbWeek(w: WorkoutWeek): FormGroup {
		return new FormGroup({
			weekNumber: new FormControl(w.weekNumber),
			status: new FormControl(w.status),
			weekId: new FormControl(w.weekId),
			type: new FormControl(w.type),
			week: new FormArray(w.week.map(day => new FormGroup({
				day: new FormControl(day.day),
				exDayName: new FormControl(day.exDayName),
				exDayDesc: new FormControl(day.exDayDesc),
				restDay: new FormControl(day.restDay),
				exDone: new FormControl(day.exDone),
				exToDo: new FormControl(day.exToDo),
				selected: new FormControl(day.selected),
				exercises1: new FormArray(day.exercises1?.map((ex1, i) => new FormGroup({
					title: new FormControl(ex1.title),
					difficulty: new FormControl(1),
					repetitions: new FormControl(ex1.repetitions),
					note: new FormControl(ex1.note),
					hideView: new FormControl(i !== 0),
					duration: new FormGroup({
						isTime: new FormControl(ex1.duration?.isTime),
						seconds: new FormControl(ex1.duration?.seconds),
						minutes: new FormControl(ex1.duration?.minutes),
						hours: new FormControl(ex1.duration?.hours),
						iconSrc: new FormControl(ex1.duration?.iconSrc),
						iconId: new FormControl(ex1.duration?.iconId),
						hideView: new FormControl(!ex1.duration?.isTime),
					}),
					exercises: new FormArray(ex1.exercises.map((exs, iExs) => new FormGroup({
						title: new FormControl(exs.title),
						isTime: new FormControl(exs.isTime),
						seconds: new FormControl(exs.seconds),
						minutes: new FormControl(exs.minutes),
						hours: new FormControl(exs.hours),
						iconSrc: new FormControl(exs.iconSrc),
						iconId: new FormControl(exs.iconId),
						quantity: new FormControl(exs.quantity),
						note: new FormControl(exs.note),
						videoLink: new FormControl(exs.videoLink),
						hideView: new FormControl(iExs !== 0),
						duration: new FormGroup({
							isTime: new FormControl(exs.duration?.isTime),
							seconds: new FormControl(exs.duration?.seconds),
							minutes: new FormControl(exs.duration?.minutes),
							hours: new FormControl(exs.duration?.hours),
							iconSrc: new FormControl(exs.duration?.iconSrc),
							iconId: new FormControl(exs.duration?.iconId),
							hideView: new FormControl(!exs.duration?.isTime),
						})
					}))),
				})) || [this.exerciseRound(1)]),
				exercises2: new FormArray(day.exercises2?.map((ex2, i) => new FormGroup({
					title: new FormControl(ex2.title),
					difficulty: new FormControl(2),
					repetitions: new FormControl(ex2.repetitions),
					note: new FormControl(ex2.note),
					hideView: new FormControl(i !== 0),
					duration: new FormGroup({
						isTime: new FormControl(ex2.duration?.isTime),
						seconds: new FormControl(ex2.duration?.seconds),
						minutes: new FormControl(ex2.duration?.minutes),
						hours: new FormControl(ex2.duration?.hours),
						iconSrc: new FormControl(ex2.duration?.iconSrc),
						iconId: new FormControl(ex2.duration?.iconId),
						hideView: new FormControl(!ex2.duration?.isTime),
					}),
					exercises: new FormArray(ex2.exercises.map((exs, iExs) => new FormGroup({
						title: new FormControl(exs.title),
						isTime: new FormControl(exs.isTime),
						seconds: new FormControl(exs.seconds),
						minutes: new FormControl(exs.minutes),
						hours: new FormControl(exs.hours),
						iconSrc: new FormControl(exs.iconSrc),
						iconId: new FormControl(exs.iconId),
						quantity: new FormControl(exs.quantity),
						note: new FormControl(exs.note),
						videoLink: new FormControl(exs.videoLink),
						hideView: new FormControl(iExs !== 0),
						duration: new FormGroup({
							isTime: new FormControl(exs.duration?.isTime),
							seconds: new FormControl(exs.duration?.seconds),
							minutes: new FormControl(exs.duration?.minutes),
							hours: new FormControl(exs.duration?.hours),
							iconSrc: new FormControl(exs.duration?.iconSrc),
							iconId: new FormControl(exs.duration?.iconId),
							hideView: new FormControl(!exs.duration?.isTime),
						})
					}))),
				})) || [this.exerciseRound(2)]),
				exercises3: new FormArray(day.exercises3?.map((ex3, i) => new FormGroup({
					title: new FormControl(ex3.title),
					difficulty: new FormControl(3),
					repetitions: new FormControl(ex3.repetitions),
					note: new FormControl(ex3.note),
					hideView: new FormControl(i !== 0),
					duration: new FormGroup({
						isTime: new FormControl(ex3.duration?.isTime),
						seconds: new FormControl(ex3.duration?.seconds),
						minutes: new FormControl(ex3.duration?.minutes),
						hours: new FormControl(ex3.duration?.hours),
						iconSrc: new FormControl(ex3.duration?.iconSrc),
						iconId: new FormControl(ex3.duration?.iconId),
						hideView: new FormControl(!ex3.duration?.isTime),
					}),
					exercises: new FormArray(ex3.exercises.map((exs, iExs) => new FormGroup({
						title: new FormControl(exs.title),
						isTime: new FormControl(exs.isTime),
						seconds: new FormControl(exs.seconds),
						minutes: new FormControl(exs.minutes),
						hours: new FormControl(exs.hours),
						iconSrc: new FormControl(exs.iconSrc),
						iconId: new FormControl(exs.iconId),
						quantity: new FormControl(exs.quantity),
						note: new FormControl(exs.note),
						videoLink: new FormControl(exs.videoLink),
						hideView: new FormControl(iExs !== 0),
						duration: new FormGroup({
							isTime: new FormControl(exs.duration?.isTime),
							seconds: new FormControl(exs.duration?.seconds),
							minutes: new FormControl(exs.duration?.minutes),
							hours: new FormControl(exs.duration?.hours),
							iconSrc: new FormControl(exs.duration?.iconSrc),
							iconId: new FormControl(exs.duration?.iconId),
							hideView: new FormControl(!exs.duration?.isTime),
						})
					}))),
				})) || [this.exerciseRound(3)]),
			})))
		});
	}
}
