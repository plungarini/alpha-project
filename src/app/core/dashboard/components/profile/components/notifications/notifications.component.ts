import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-notifications',
	templateUrl: './notifications.component.html',
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
