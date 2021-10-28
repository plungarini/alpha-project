import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  isSidebarExpanded = true;
  componentReference: any;
  childPageTitle = '';

  hasError = false;
  errorTitle: string;
  errorText: string;

  constructor() { }

  ngOnInit(): void {
  	document.body.classList.add('dashboard');
  	const adminErr = localStorage.getItem('notAdminError');
  	if (adminErr === 'true') {
  		localStorage.removeItem('notAdminError');
  		this.hasError = true;
  		this.errorTitle = 'Non puoi accedere a questa pagina.';
  		this.errorText = 'Sei stato reindirizzato alla Dashboard.';
  		setTimeout(() => {
  			this.hasError = false;
  		}, 5000);
  	}
  }

  routeChanged(componentRef: any): void {
  	if (!componentRef) return;
  	this.componentReference = componentRef;
  	this.childPageTitle = this.componentReference.pageTitle;
  }

  sidebarExpand(value: boolean): void {
  	this.isSidebarExpanded = value;
  }

}
