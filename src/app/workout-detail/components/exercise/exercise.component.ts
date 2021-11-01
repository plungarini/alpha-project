/* eslint-disable radix */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WorkoutSingleExercise } from 'src/app/shared/models/workout-week.model';

@Component({
	selector: 'app-exercise',
	templateUrl: './exercise.component.html',
	styles: [` :host {display: block;} `],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseComponent implements OnInit {

	@Input() ex: WorkoutSingleExercise;
	@Input('showOverlay') set setOverlay(val: { show: boolean; id: string }) {
		const value = val.show === true || val.show === false;
		if (value && this.detailsOpen !== val.show && val.id === this.exId) {
			this.toggleDetails(val.show);
		}
	}
	@Input() readOnly = false;
	@Input() first = false;
	@Input() last = false;
	@Input() exId: string;

	@Output() exDetailsToggled = new EventEmitter();
	@Output() completeEx = new EventEmitter();
	@Output() showVimeo = new EventEmitter();

	fallbackIconLink = '/assets/icons/workout/pack-2/exercise-squat.svg';

	hide = true;
	detailsOpen = false;
	playerUrl = '';
  playerId = '';
  showVimeoPlayer = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDetails(val?: boolean): void {
  	if (this.readOnly && !this.ex.videoLink) return;
  	const value = val !== undefined ? val : !this.detailsOpen;
  	this.detailsOpen = value;
  	this.hide = value ? !value : this.hide;
  	this.exDetailsToggled.emit({ show: value, id: this.exId });
  	setTimeout(() => {
  		this.hide = !value ? !value : this.hide;
  	}, 500);
  }

  sanitizeTitle(str?: string): string | undefined {
  	if (!str) return str;
  	const capitalize = (word: string) => word[0].toUpperCase() + word.slice(1);
  	const strArrFix: string[] = [];

  	str.trim().toLowerCase().split(' ')
  		.forEach(s => strArrFix.push(s.length <= 2 ? s : capitalize(s)));

  	return strArrFix.join(' ');
  }

  getTime(): string {
  	const normEx = this.ex.isTime ? this.ex : this.ex.duration;
  	if (!this.ex || !normEx || (!this.ex.isTime && !this.ex.duration?.isTime)) return '';
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

  complete(): void {
  	if (this.readOnly) return;
  	this.completeEx.emit(!this.ex.completed);
  }

}
