import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styles: [`:host { display: block; }`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

	@Input() description = '';

	constructor() { }

	ngOnInit(): void {
	}

}
