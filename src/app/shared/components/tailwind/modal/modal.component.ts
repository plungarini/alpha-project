import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styles: [` :host { display: block; } `],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit {

  @Input() modalTitle = 'Attenzione!';
  @Input() desc = '';
  @Input() showIcon = true;
  @Input() actions = false;
  @Input() body = false;
  @Input('show') set showModal(value: boolean) {
  	if (value !== undefined && value !== null) {
  		this.toggleModal(value);
  	}
  }

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
