/* eslint-disable radix */
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { WorkoutWeek } from 'src/app/shared/models/workout-week.model';
import { FirestoreExtendedService } from 'src/app/shared/services/firestore-extended.service';



@Injectable({
	providedIn: 'root'
})
export class UserWorkoutService {

	constructor(
    private db: FirestoreExtendedService
	) {
		moment.locale('it');
	}

	getAll(uid: string, type: 'functional' | 'gym' | 'pro'): Observable<WorkoutWeek[] | undefined> {
		if (!uid) return of(undefined);
		const dbWeeks$ = (ref?: any) => ref ?
			this.db.col$<WorkoutWeek>('workout-weeks', ref) :
			this.db.col$<WorkoutWeek>('workout-weeks');
		let completedWeeks = 0;
		return this.db.col$<WorkoutWeek>(
			`users/${uid}/${type}-workout`,
			(ref) => ref.where('type', '==', type).where('completed', '!=', true)
		).pipe(
			switchMap(uWeeks => {
				const normDbWeeks$ = (ref?: any) => dbWeeks$(ref).pipe(map(dbWeeks => {
					if (!dbWeeks || dbWeeks.length <= 0) return [];
					dbWeeks.filter(week => week.type === type);
					dbWeeks.filter(week => week.weekNumber > completedWeeks);
					return dbWeeks;
				}));
				if (!uWeeks || uWeeks.length <= 0)
					return normDbWeeks$((ref: any) => ref.where('weekNumber', '==', 1));
				uWeeks.sort((a, b) => a.weekNumber - b.weekNumber);
				uWeeks.forEach(week => {
					if (week.completed) completedWeeks += 1;
				});
				if (completedWeeks === uWeeks.length)
					return normDbWeeks$((ref: any) => ref.where('weekNumber', '>', completedWeeks));
				uWeeks.filter(week => week.type === type);
				return of(uWeeks);
			})
		);
	}

	saveWeek(week: WorkoutWeek, uid?: string): void {
		if (!week || !uid) return;
		const path = this.getWeekPath(uid, week);
		week = this.normalizeWeek(week);
		this.db.upsert(path, week);
	}

	isTodayCompleted(uid: string): Observable<boolean> {
		let week: WorkoutWeek;
		return this.getAll(uid, 'functional')
			.pipe(
				take(1),
				switchMap(weeks => {
					const falsy = of(false);
					const truthy = of(true);
					if (!weeks || weeks.length <= 0 || !weeks[0]) return falsy;
					weeks[0].week.forEach(day => {
						day.selected = false;
					});
					week = this.selectToday(weeks[0]);
					let completed = false;
					week.week.forEach(day => {
						if (!day.selected) return;
						completed = day.completed || false;
					});
					return completed ? truthy : falsy;
				})
			);
	}

	selectToday(workoutWeek: WorkoutWeek): WorkoutWeek {
		workoutWeek.week.sort((a, b) => a.day - b.day);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		console.log(workoutWeek.createdAt, new Date(workoutWeek.createdAt?.seconds!! * 1000));
		const started = workoutWeek.createdAt ?
			moment.unix(workoutWeek.createdAt.seconds) :
			moment();
		const dayDiff = Math.abs(started.diff(moment(), 'days'));
		workoutWeek.week.forEach(day => {
			day.completed = day.completed || false;
			day.selected = false;
			day.hideView = false;
		});
		// eslint-disable-next-line no-underscore-dangle
		console.log((started as any)._d, dayDiff);
		if (dayDiff <= 0) {
			workoutWeek.week[0].selected = true;
		} else {
			workoutWeek.week.forEach((day, i) => {
				if (i <= dayDiff) {
					if (dayDiff === i) {
						day.selected = true;
						day.hideView = false;
					} else {
						day.completed = true;
						day.hideView = true;
					}
				} else {
					day.completed = day.completed || false;
					day.hideView = false;
				}
			});
		}
		return workoutWeek;
	}

	private normalizeWeek(week: WorkoutWeek): WorkoutWeek {
		week.week.forEach(day => {
			day.selected = false;
			day.exercises1?.forEach(rounds => {
				if (!rounds) return;
				rounds.exercises.forEach(ex => {
					ex.selected = false;
				});
			});
			day.exercises2?.forEach(rounds => {
				if (!rounds) return;
				rounds.exercises.forEach(ex => {
					ex.selected = false;
				});
			});
			day.exercises3?.forEach(rounds => {
				if (!rounds) return;
				rounds.exercises.forEach(ex => {
					ex.selected = false;
				});
			});
		});
		return week;
	}

	private getWeekPath(uid: string, week?: WorkoutWeek): string {
		if (!uid || !week) return '';
		let path = `users/${uid}/functional-workout/`;
		let wNum = week.weekNumber.toString();
		if (wNum.length === 1) wNum = '0' + wNum;
		return path += wNum;
	}
}
