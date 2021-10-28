import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IconNamesEnum } from 'ngx-bootstrap-icons';


@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit {

  @Input('show') set showModal(value: boolean) {
		if (value !== undefined && value !== null) {
			this.toggleModal(value);
		}
	}
  @Input() title = 'Successfully saved!';
  @Input() desc = '';
  @Input() type: 'success' | 'warn' | 'error' | 'info' = 'info';
  @Input() icon = IconNamesEnum.Exclamation;

  transitionStarted = false;
  show = false;
  hide = true;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  toggleModal(value: boolean): void {
  	if (this.transitionStarted) return;
  	if (value === true) this.hide = false;
  	this.show = value;
  	this.transitionStarted = true;
  	this.cdRef.detectChanges();
  	setTimeout(() => {
  		this.transitionStarted = false;
  		if (value === false) this.hide = true;
  		this.cdRef.detectChanges();
  	}, 300);
  }
}
