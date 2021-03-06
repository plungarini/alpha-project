import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WorkoutWeekDay } from 'src/app/shared/models/workout-week.model';



@Component({
	selector: 'app-workout-day-card',
	templateUrl: './workout-day-card.component.html',
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutDayCardComponent implements OnInit {

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onDaySelected = new EventEmitter();

	@Input('day') set setDay(value: WorkoutWeekDay | undefined) {
  	if (value) this.day = value;
  }
  @Input() more = false;
  @Input() rest = false;

	day: WorkoutWeekDay;
	placeholderDesc = 'Nonumy lorem eirmod sea invidunt dolores gubergren ipsum eos et.';

	constructor() { }

	ngOnInit(): void {
	}

	selectDay(): void {
  	this.onDaySelected.emit();
	}

}
