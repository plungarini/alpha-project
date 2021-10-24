/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-len */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminWorkoutSingleExercise, WorkoutWeekDay } from 'src/app/shared/models/workout-week.model';
import { WorkoutExercisesService } from 'src/app/shared/services/workout-exercises.service';
import { WorkoutWeeksService } from 'src/app/shared/services/workout-weeks.service';
import { WeekFormService } from '../../services/week-form.service';

@Component({
  templateUrl: './admin-new-week.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminNewWeekComponent implements OnInit, OnDestroy {

  pageTitle = 'Aggiungi una scheda';
  pageDesc = 'Inserisci i dati che preferisci per creare la nuova scheda di allenamento.';

  weekFormHided = false;
  dayFormHided = true;
  roundFormHided = true;

  viewDifficulty: 1 | 2 | 3 = 1;
  daySelected = 1;
  serverError = '';
  showPreview = false;
	destroyed$ = new Subject();

	lockIcon = IconNamesEnum.Lock;
	unlockIcon = IconNamesEnum.Unlock;

  workoutWeek = this.weekFB.workoutWeek;
  savedExercises: AdminWorkoutSingleExercise[] = [];

  constructor(
    private weekS: WorkoutWeeksService,
    private weekFB: WeekFormService,
    private exerS: WorkoutExercisesService,
    public cdRef: ChangeDetectorRef,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const weekType = this.route.snapshot.paramMap.get('weekType');
    if (weekType) {
      this.workoutWeek.patchValue({ type: weekType });
    }
    if (id) {
      const week$ = this.weekS.get(id);
      week$
        .pipe(takeUntil(this.destroyed$))
        .subscribe(workoutWeek => {
          if (workoutWeek) {
            this.workoutWeek = this.weekFB.parseDbWeek(workoutWeek);
            this.cdRef.detectChanges();
          }
        });
    }
    this.exerS.getAll()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(exercises => {
        this.savedExercises = exercises;
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  get selectedDay(): WorkoutWeekDay | undefined {
    return this.workoutWeek.get('week')?.value[this.daySelected - 1];
  }

  submitAndSave(): void {
    const form = this.workoutWeek;
    this.weekS.upsert(form.value)
      .catch(err => {
        this.serverError = err;
        this.cdRef.detectChanges();
        setTimeout(() => {
          this.serverError = '';
          this.cdRef.detectChanges();
        }, 8000);
      });
  }

  get weekDaysArray(): FormArray {
    return this.workoutWeek.get('week') as FormArray;
  }

  duplicateExercise(iRound: number, iEx: number, e: Event): void {
    e.preventDefault();
    e.stopImmediatePropagation();
    const arr = this.getRoundExercisesFormArray(iRound);
    const exercise = this.weekFB.singleExercise;
    exercise.patchValue(arr.at(iEx).value);
    arr.push(exercise);
    const len = arr.length;
    arr.at(len - 2)?.get('hideView')?.patchValue(true);
    arr.at(len - 1)?.get('hideView')?.patchValue(false);
  }

  duplicateRound(index: number, e: Event): void {
    e.preventDefault();
    e.stopImmediatePropagation();
    const arr = this.getRoundsFormArray();
    const round = this.weekFB.exerciseRound(this.viewDifficulty);
    const copyValue = arr.at(index).value;
    round.patchValue(copyValue);
    (round.get('exercises') as FormArray).clear();
    copyValue.exercises.forEach((ex: any) => {
      const normedEx = this.weekFB.singleExercise;
      normedEx.patchValue(ex);
      (round.get('exercises') as FormArray).push(normedEx);
    });
    arr.push(round);
    const len = arr.length;
    arr.at(len - 2)?.get('hideView')?.patchValue(true);
    arr.at(len - 1)?.get('hideView')?.patchValue(false);
  }

  copyFromDifficultyBefore(): void {
    const day = this.weekDaysArray.at(this.daySelected - 1);
    const previousRound = day.get('exercises' + (this.viewDifficulty - 1))?.value;
    const thisRound = day.get('exercises' + this.viewDifficulty) as FormArray;
    thisRound.clear();
    previousRound.forEach((round: any) => {
      const normedRound = this.weekFB.exerciseRound(this.viewDifficulty);
      round.difficulty = this.viewDifficulty;
      normedRound.patchValue(round);
      (normedRound.get('exercises') as FormArray)?.clear();
      round.exercises.forEach((ex: any) => {
        const normedEx = this.weekFB.singleExercise;
        normedEx.patchValue(ex);
        (normedRound.get('exercises') as FormArray)?.push(normedEx);
      });
      thisRound.push(
        normedRound
      );
    });
  }

  deleteExercise(iRound: number, iEx: number, e: Event): void {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.getRoundExercisesFormArray(iRound).removeAt(iEx);
  }

  deleteRound(index: number, e: Event): void {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.getRoundsFormArray().removeAt(index);
  }

  addRound(): void {
    const rounds = this.getRoundsFormArray();
    rounds.push(this.weekFB.exerciseRound(this.viewDifficulty));
    const len = rounds.length;
    rounds.at(len - 2)?.get('hideView')?.patchValue(true);
  }

  addRest(roundIndex: number): void {
    const ex = this.weekFB.singleRestExercise;
    const arr = this.getRoundExercisesFormArray(roundIndex);
    arr.push(ex);
    const length = arr.length;
    arr.at(length - 2)?.get('hideView')?.patchValue(true);
  }

  addExercise(roundIndex: number, preset?: AdminWorkoutSingleExercise): void {
    const ex = this.weekFB.singleExercise;
    if (preset) ex.patchValue(preset);
    const arr = this.getRoundExercisesFormArray(roundIndex);
    arr.push(ex);
    const length = arr.length;
    arr.at(length - 2)?.get('hideView')?.patchValue(true);
  }

  setExerciseIcon(
    icon: { id: number; tags: string; path: string },
    iParent: number, iChild: number
  ): void {
    this.getRoundExercisesFormArray(iParent).at(iChild).patchValue({
      iconId: icon.id,
      iconSrc: icon.path
    });
  }

  getRoundExercisesFormArray(index: number): FormArray {
    return this.getRoundsFormArray().at(index).get('exercises') as FormArray;
  }

  getRoundsFormArray(): FormArray {
    return this.weekDaysArray.at(this.daySelected - 1).get('exercises' + this.viewDifficulty) as FormArray;
  }

  changeDifficulty(diff: number): void {
    if (diff === 1 || diff === 2 || diff === 3)
      this.viewDifficulty = diff;
  }

  getDifficultyName(diff: 1 | 2 | 3): string {
    switch (diff) {
      case 1: return 'Principiante';
      case 2: return 'Intermedio';
      case 3: return 'Avanzato';
    }
  }

  getDayName(weekDay: number, full = false): string {
    if (!full) {
      switch (weekDay) {
        case 1: return 'L';
        case 2: return 'M';
        case 3: return 'M';
        case 4: return 'G';
        case 5: return 'V';
        case 6: return 'S';
        case 7: return 'D';
        default: return '';
      }
    } else {
      switch (weekDay) {
        case 1: return 'Lunedì';
        case 2: return 'Martedì';
        case 3: return 'Mercoledì';
        case 4: return 'Giovedì';
        case 5: return 'Venerdì';
        case 6: return 'Sabato';
        case 7: return 'Domenica';
        default: return '';
      }
    }
  }

  setFormValue(path: string, value: any): void {
    this.workoutWeek.get(path)?.patchValue(value);
  }

}
