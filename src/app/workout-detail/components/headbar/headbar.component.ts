import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-headbar',
	templateUrl: './headbar.component.html',
	styles: [`:host { display: block; }`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeadbarComponent implements OnInit {

	@Input() title = '';
	@Input() completed = false;
	@Input() preview = false;

	@Output() closeEvent = new EventEmitter();

	constructor() { }

	ngOnInit(): void {
	}

	closeModal(): void {
		this.closeEvent.emit('');
	}

}
