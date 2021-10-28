/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AdminWorkoutSingleExercise, WorkoutSingleExercise, WorkoutWeek, WorkoutWeekDay } from '../models/workout-week.model';
import { FirestoreExtendedService } from './firestore-extended.service';
import { WorkoutExercisesService } from './workout-exercises.service';

@Injectable({
	providedIn: 'root'
})
export class WorkoutWeeksService {

	constructor(
    private db: FirestoreExtendedService,
    private workoutExsService: WorkoutExercisesService,
    private router: Router
	) { }

	upsert(workoutWeek: WorkoutWeek): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (!workoutWeek) {
				return reject('C\'è stato un errore nel salvataggio della scheda. Riprova.');
			}
			const id = workoutWeek.weekId ? workoutWeek.weekId : this.db.generateId();
			const savedWeeks$ = this.getAll();
			savedWeeks$.pipe(take(1)).subscribe(savedWeeks => {
				if (workoutWeek.status === 'public') {
					let match = false;
					savedWeeks.forEach(week => {
						if (week.status === 'private' || workoutWeek.type !== week.type) return;

						if (
							week.weekId !== workoutWeek.weekId &&
              week.weekNumber === workoutWeek.weekNumber
						)
							match = true;
					});
					if (match) {
						// eslint-disable-next-line max-len
						return reject('Non puoi avere più schede impostate come "pubblico" con lo stesso indice (voce "Numero della settimana"). Cambia l\'indice o imposta lo stato su "privato".');
					}
				}

				const savedExs$ = this.workoutExsService.getAll();
				savedExs$.pipe(take(1)).subscribe(async (savedExs: AdminWorkoutSingleExercise[]) => {
					workoutWeek.weekId = id;
					workoutWeek.week.forEach(day => {
						this.elabSingleDay(savedExs, day, workoutWeek.status);
					});
					this.workoutExsService.commitBatch();
					await this.db.upsert<WorkoutWeek>(`workout-weeks/${id}`, workoutWeek);
					this.router.navigate(['admin/workout']);
				});

				return resolve();
			});
		});
	}

	get(id: string): Observable<WorkoutWeek> {
		return this.db.doc$<WorkoutWeek>(`workout-weeks/${id}`);
	}

	getAll(): Observable<WorkoutWeek[]> {
		return this.db.col$<WorkoutWeek>('workout-weeks');
	}

	delete(id: string): Promise<any> {
		return this.db.delete(`workout-weeks/${id}`);
	}

	private elabSingleDay(savedExs: AdminWorkoutSingleExercise[], day: WorkoutWeekDay, status: 'private' | 'public'): void {
		const mapdSavedExs = savedExs.map(ex => ({
			title: ex.title?.trim(),
			iconId: ex.iconId,
			iconSrc: ex.iconSrc?.trim(),
			videoLink: ex.videoLink?.trim(),
		}));
		day.exercises1?.forEach(exLv1 => {
			if ('hideView' in exLv1)
				delete (exLv1 as any).hideView;
			exLv1.exercises.forEach(ex => {
				if (!ex) return;
				if ('hideView' in ex)
					delete (ex as any).hideView;
				if (status === 'public')
					this.elabSingleExercise(mapdSavedExs, ex);
			});
		});
		day.exercises2?.forEach(exLv2 => {
			if ('hideView' in exLv2)
				delete (exLv2 as any).hideView;
			exLv2.exercises.forEach(ex => {
				if (!ex) return;
				if ('hideView' in ex)
					delete (ex as any).hideView;
				if (status === 'public')
					this.elabSingleExercise(mapdSavedExs, ex);
			});
		});
		day.exercises3?.forEach(exLv3 => {
			if ('hideView' in exLv3)
				delete (exLv3 as any).hideView;
			exLv3.exercises.forEach(ex => {
				if (!ex) return;
				if ('hideView' in ex)
					delete (ex as any).hideView;
				if (status === 'public')
					this.elabSingleExercise(mapdSavedExs, ex);
			});
		});
	}

	private elabSingleExercise(
		savedExs: AdminWorkoutSingleExercise[],
		ex: WorkoutSingleExercise
	): void {
		if (!ex) return;
		const normEx = {
			title: ex.title?.trim(),
			iconId: ex.iconId,
			iconSrc: ex.iconSrc?.trim(),
			note: ex.note?.trim(),
			videoLink: ex.videoLink?.trim()
		};

		if (!savedExs || !savedExs.length || savedExs.length < 0) {
			return this.workoutExsService.addToBatch(normEx);
		}

		let match = false;
		let len = savedExs.length;
		while (len-- && !match) {
			const saveEx = savedExs[len];
			match =
        (normEx.title?.trim().toLowerCase() === saveEx.title?.trim().toLowerCase() &&
          (
          	normEx.iconId === saveEx.iconId &&
            normEx.iconSrc?.trim().toLowerCase() === saveEx.iconSrc?.trim().toLowerCase()
          )
        ) ||
        normEx.title?.trim().toLowerCase() === saveEx.title?.trim().toLowerCase() ||
        normEx.videoLink?.trim().toLowerCase() === saveEx.videoLink?.trim().toLowerCase()
			;
		}
		if (!match)
			this.workoutExsService.addToBatch(normEx);
	}
}
