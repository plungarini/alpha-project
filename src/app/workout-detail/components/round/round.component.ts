import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WorkoutExerciseRound } from 'src/app/shared/models/workout-week.model';

@Component({
	selector: 'app-round',
	templateUrl: './round.component.html',
	styles: [` :host {display: block;} `],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoundComponent implements OnInit {

	@Input() rounds: WorkoutExerciseRound[] | undefined;
	@Input() isToday = false;

	@Output() showVimeo = new EventEmitter();
	@Output() completeEx = new EventEmitter();

	showOverlay = false;
	showExId = '';
	vimeo = {
		show: false,
		url: '',
	};

	constructor() { }

	ngOnInit(): void {
	}

	toggleOverlay(val: { show: boolean; id: string }): void {
		if (!val) return;
		this.showOverlay = !!val.show;
		this.showExId = val.id || '';
	}

	sanitizeTitle(str?: string): string | undefined {
		if (!str) return str;
		const capitalize = (word: string) => word[0].toUpperCase() + word.slice(1);
		const strArrFix: string[] = [];

		str.trim().toLowerCase().split(' ')
			.forEach(s => strArrFix.push(s.length <= 2 ? s : capitalize(s)));

		return strArrFix.join(' ');
	}

	sanitizeNote(str?: string): string | undefined {
		if (!str) return str;
		const capitalize = (words: string) => words[0].toUpperCase() + words.slice(1);
		const lbReplace = str.replace(/(\r\n|\n|\r)/gm, ' ');
		const finalStr = lbReplace.replace(/  +/g, ' ');

		return capitalize(finalStr);
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

	completeExercise(rId: number, eId: number, completed: boolean): void {
		if (!this.isToday) return;
		this.completeEx.emit({
			roundIndex: rId,
			exIndex: eId,
			completed
		});
	}

}
