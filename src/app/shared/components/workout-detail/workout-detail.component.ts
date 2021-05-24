import { WorkoutExerciseRound } from 'src/app/shared/models/workout-week.model';
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable max-len */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WorkoutSingleExercise, WorkoutWeekDay } from 'src/app/shared/models/workout-week.model';

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
    if (value === true || value === false) {
      this.toggleModal(value);
    }
  };
  @Input('day') set setDay(value: WorkoutWeekDay | undefined) {
    if (value) this.day = value;
    this.cdRef.detectChanges();
  }
  @Input('difficulty') difficultySelected: 1 | 2 | 3 = 1;
  @Input() fixed = true;
  @Input() preview = false;

  day: WorkoutWeekDay;
  exActionOverlay = false;
  playerUrl = '';
  showPlayer = false;

  transitionStarted = false;
  show = false;
  hide = true;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.toggleModal(true);
  }

  getTime(ex: WorkoutSingleExercise): string {
    const normEx = ex.isTime ? ex : ex.duration;
    if (!ex || !normEx || (!ex.isTime && !ex.duration?.isTime)) return '';
    const hours = normEx.hours;
    const minutes = normEx.minutes;
    const seconds = normEx.seconds;
    let res = '';

    if (hours) {
      if (minutes && seconds) {
        res = hours + 'h ' + minutes + 'min ' + seconds + 'sec';
      } else if (minutes) {
        res = hours + 'h ' + minutes + 'min';
      } else {
        res = hours + 'h';
      }
    } else if (minutes) {
      if (seconds) {
        res = minutes + 'min ' + seconds + 'sec';
      } else {
        res = minutes + 'min';
      }
    } else if (seconds) {
      res = seconds + 'sec';
    }

    return res;
  }

  getTimeRound(round: WorkoutExerciseRound): string {
    const normRound = round.duration;
    if (!round || !normRound || !normRound.isTime) return '';
    const hours = normRound.hours;
    const minutes = normRound.minutes;
    const seconds = normRound.seconds;
    let res = '';

    if (hours) {
      if (minutes && seconds) {
        res = hours + 'h ' + minutes + 'min ' + seconds + 'sec';
      } else if (minutes) {
        res = hours + 'h ' + minutes + 'min';
      } else {
        res = hours + 'h';
      }
    } else if (minutes) {
      if (seconds) {
        res = minutes + 'min ' + seconds + 'sec';
      } else {
        res = minutes + 'min';
      }
    } else if (seconds) {
      res = seconds + 'sec';
    }

    return res;
  }

  selectExercise(event?: MouseEvent, roundIndex?: number, exIndex?: number): void {
    event?.stopPropagation();
    const rounds =
      this.difficultySelected === 1 ? this.day.exercises1 :
      this.difficultySelected === 2 ? this.day.exercises2 :
      this.difficultySelected === 3 ? this.day.exercises3 :
      undefined;
    ;
    if (!rounds) return;
    if (
      exIndex !== undefined
      && roundIndex !== undefined
    ) {
      if (!rounds[roundIndex].exercises[exIndex].selected) {
        rounds[roundIndex].exercises.forEach((ex: any) => ex.selected = false);
        this.exActionOverlay = true;
        rounds[roundIndex].exercises[exIndex].selected = true;
      } else {
        this.exActionOverlay = false;
        rounds[roundIndex].exercises[exIndex].selected = false;
      }
    } else {
      this.exActionOverlay = false;
      rounds.forEach((round: any) => {
        round.exercises.forEach((ex: any) => {
          if (ex.isTime) return;
          ex.selected = false;
        });
      });
    }
  }

  showVimeoPlayer(event: MouseEvent, url: string): void {
    event.stopPropagation();
    if (!url) return;
    this.playerUrl = url;
    this.showPlayer = true;
  }

  completeEx(roundIndex: number, exIndex: number, completed: boolean): void {
    this.selectExercise();
    this.onCompleteEx.emit({roundIndex, exIndex, completed});
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

  private toggleModal(value: boolean): void {
    if (this.transitionStarted) return;
    if (value === true) this.hide = false;
    this.show = value;
    this.transitionStarted = true;
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.transitionStarted = false;
      if (value === false) this.hide = true;
      this.cdRef.detectChanges();
    }, 500);
  }

}
