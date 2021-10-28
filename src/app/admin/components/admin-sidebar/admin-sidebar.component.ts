import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IconNamesEnum } from 'ngx-bootstrap-icons';

@Component({
	selector: 'app-admin-sidebar',
	templateUrl: './admin-sidebar.component.html',
	styles: [`:host { display: block; }`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSidebarComponent implements OnChanges {

  @Output() isOpen = new EventEmitter();
  @Input() status = false;

  overlayOpen = false;
  sidebarOpen = false;

  navigation = [
  	{
  		title: 'Dashboard',
  		icon: IconNamesEnum.HouseFill,
  		url: '/admin'
  	},
  	{
  		title: 'Schede',
  		icon: IconNamesEnum.FileMedicalFill,
  		url: '/admin/workout'
  	},
  	{
  		title: 'Utenti',
  		icon: IconNamesEnum.PeopleFill,
  		url: '/admin/users'
  	},
  	{
  		title: 'Video',
  		icon: IconNamesEnum.CameraVideoFill,
  		url: '/admin/video'
  	},
  	{
  		title: 'Annunci',
  		icon: IconNamesEnum.MegaphoneFill,
  		url: '/admin/news'
  	},
  ];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
  	if ('status' in changes) {
  		if (changes.status.currentValue) {
  			this.showSidebar();
  		} else if (!changes.status.currentValue) {
  			this.closeSidebar();
  		}
  	}
  }

  toggle(): void {
  	this.sidebarOpen = !this.sidebarOpen;
  	this.overlayOpen = !this.sidebarOpen;
  	this.isOpen.emit(this.sidebarOpen);
  }

  showSidebar(): void {
  	this.sidebarOpen = true;
  	this.overlayOpen = true;
  	this.isOpen.emit(true);
  }

  closeSidebar(): void {
  	this.sidebarOpen = false;
  	this.overlayOpen = false;
  	this.isOpen.emit(false);
  }

}
