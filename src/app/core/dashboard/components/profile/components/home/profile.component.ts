import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { IconNamesEnum } from 'ngx-bootstrap-icons';



@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  pageTitle = 'Impostazioni';
  showSaved = true;

  settingsNav = [
  	{ id: 1, selected: true, icon: IconNamesEnum.PersonCircle, title: 'Profilo' },
  	{ id: 2, selected: false, icon: IconNamesEnum.GearFill, title: 'Preferenze' },
  	{ id: 3, selected: false, icon: IconNamesEnum.BellFill, title: 'Notifiche' },
  	{ id: 4, selected: false, icon: IconNamesEnum.CreditCardFill, title: 'Pagamenti' },
  ];
  showMyProfile = false;
  showPreferences = false;
  showNotifications = false;
  showAlert = false;
  alertTitle = '';
  alertDesc = '';
  alertIcon = '';
  alertType: 'success' | 'warn' | 'error' | 'info' = 'info';
  ffn = firebase.app().functions('europe-west2');
  getStripePortalLink = this.ffn.httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');

  constructor() { }

  ngOnInit(): void {
  	this.toggleSection(1);
  }

  toggleSection(id: number): void {
  	if (!id || id > this.settingsNav.length) return;
  	this.showMyProfile = false;
  	this.showPreferences = false;
  	this.showNotifications = false;
  	this.settingsNav.forEach(item => item.selected = false);
  	this.settingsNav[id - 1].selected = true;
  	if (id === 1) this.showMyProfile = true;
  	else if (id === 2) this.showPreferences = true;
  	else if (id === 3) this.showNotifications = true;
  	else if (id === 4) this.navigateToPortalLink();
  }

  toggleAlert(event: {
    type: 'success' | 'warn' | 'error' | 'info';
    title: string;
  }) {
  	this.showAlert = true;
  	this.alertTitle = event.title;
  	this.alertType = event.type;
  	setTimeout(() => {
  		this.showAlert = false;
  	}, 3000);
  }

  private async navigateToPortalLink(): Promise<void> {
  	this.showAlert = true;
  	this.alertTitle = 'Attendi...';
  	this.alertDesc = 'Stiamo creando un accesso sicuro al tuo portale.';
  	this.alertIcon = 'cloudArrowDownFill';
  	this.alertType = 'info';
  	const { data: portalLink } = await this.getStripePortalLink({ returnUrl: window.location.href });
  	window.open(portalLink.url, '_self');
  }

}
