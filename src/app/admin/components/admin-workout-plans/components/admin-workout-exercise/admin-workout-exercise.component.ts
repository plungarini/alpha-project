/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-workout-exercise',
  templateUrl: './admin-workout-exercise.component.html',
  styles: [` :host { display: block; } `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminWorkoutExerciseComponent implements OnInit {

  @Output() onExerciseDeleted = new EventEmitter();

  @Input() iconPath: string | undefined | null;
  @Input() exName: string | undefined | null = '';
  @Input() exNote: string | undefined | null = '';

  constructor() { }

  ngOnInit(): void {
  }

  deleteExercise(): void {
    this.onExerciseDeleted.emit();
  }

}
