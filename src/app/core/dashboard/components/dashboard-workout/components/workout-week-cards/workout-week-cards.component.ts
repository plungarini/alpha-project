/* eslint-disable max-len */
/* eslint-disable @angular-eslint/no-output-on-prefix */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WorkoutWeekDay } from 'src/app/shared/models/workout-week.model';

@Component({
  selector: 'app-workout-week-cards',
  templateUrl: './workout-week-cards.component.html',
  styles: [` :host { display: block; } `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutWeekCardsComponent implements OnInit {

  @Output() onDaySelected = new EventEmitter();

  @Input('week') set setWeek(week: WorkoutWeekDay[]) {
    if (week) this.week = week;
  }

  week: WorkoutWeekDay[];

  constructor() { }

  ngOnInit(): void {
  }

  selectDay(day: WorkoutWeekDay): void {
    this.onDaySelected.emit(day);
  }

}
