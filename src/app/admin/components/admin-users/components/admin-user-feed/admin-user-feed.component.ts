/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { StripeUserInfo } from 'src/app/auth/models/user-stripe-session.model';
import { User } from 'src/app/auth/models/user.model';
import { environment } from 'src/environments/environment';



interface UserFeedItem {
  id: string;
  type: 'error' | 'success' | 'new_user' | 'updated_user' | 'unknown';
  title: string;
  desc: string;
  date: Date | null;
  timestamp: number | null;
  link?: string;
}

@Component({
	selector: 'app-admin-user-feed',
	templateUrl: './admin-user-feed.component.html',
	styleUrls: ['./admin-user-feed.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminUserFeedComponent implements OnInit {

  @Input('user') set setUser(value: User) {
		if (!value) return;
		this.user = value;
	}
  @Input('subsInfo') set info(value: StripeUserInfo) {
  	if (!value) return;
  	this.initFeed(value);
  }

  user: User;
  feedItems: UserFeedItem[];

  constructor() { }

  ngOnInit(): void {
  }

  getIconName(type: UserFeedItem['type']) {
  	switch (type) {
  	case 'error':
  		return 'x';
  	case 'success':
  		return 'check2';
  	case 'new_user':
  		return 'person-plus-fill';
  	case 'updated_user':
  		return 'person-lines-fill';
  	default:
  		return 'exclamation';
  	}
  }

  private initFeed(info: StripeUserInfo): void {
  	if (!info) return;
  	const res: UserFeedItem[] = [];

  	info.sessions.forEach(session => {
  		if (session.sessionId) return;
  		const errorTitle = 'Errore durante l\'aquisto.';
  		const errorDesc = `Errore durante l'acquisto dell'abbonamento ${this.priceToSubType(session.price)}:\n\n`;
  		const normed: UserFeedItem = {
  			id: this.makeId(10) + this.makeId(10),
  			type: session.error ? 'error' : 'unknown',
  			title: session.error ? errorTitle : '',
  			desc: session.error ? errorDesc + session.error.message : '',
  			date: session.updatedAt ? new Date(session.updatedAt.seconds * 1000) : null,
  			timestamp: session.updatedAt ? session.updatedAt.seconds : null,
  		};
  		if (normed.type !== 'unknown') res.push(normed);
  	});

  	if (this.user) {
  		res.push({
  			id: this.user.id + '_created',
  			type: 'new_user',
  			title: 'Iscrizione dell\'utente',
  			date: this.user.createdAt ? new Date(this.user.createdAt.seconds * 1000) : null,
  			timestamp: this.user.createdAt ? this.user.createdAt.seconds : null,
  		} as UserFeedItem);
  		res.push({
  			id: this.user.id + '_updated',
  			type: 'updated_user',
  			title: 'Modifiche all\'utente',
  			date: this.user.updatedAt ? new Date(this.user.updatedAt.seconds * 1000) : null,
  			timestamp: this.user.updatedAt ? this.user.updatedAt.seconds : null,
  		} as UserFeedItem);
  	}

  	info.subs.forEach(sub => {
  		const normed: UserFeedItem[] = [];

  		if (sub.canceled_at) {
  			normed.push({
  				id: sub.id + '_canceled',
  				type: 'error',
  				title: 'Pagamento ricorrente cancellato',
  				desc: `L'utente ha cancellato l'abbonamento con ID: ${sub.id}`,
  				link: sub.stripeLink,
  				date: sub.canceled_at ? new Date(sub.canceled_at.seconds * 1000) : null,
  				timestamp: sub.canceled_at ? sub.canceled_at.seconds : null,
  			});
  		}

  		normed.push({
  			id: sub.id + '_created',
  			type: 'success',
  			title: 'Pagamento ricorrente creato',
  			desc: `L'utente si è iscritto all'abbonamento con ID: ${sub.id}`,
  			link: sub.stripeLink,
  			date: sub.created ? new Date(sub.created.seconds * 1000) : null,
  			timestamp: sub.created ? sub.created.seconds : null,
  		});

  		normed.forEach(item => res.push(item));
  	});

  	res.sort((a, b) => b.timestamp!! - a.timestamp!!);
  	this.feedItems = res;
  }

  private priceToSubType(price: string): string {
  	const monthlySub = environment.stripeProducts.prod.month;
  	const yearlySub = environment.stripeProducts.prod.year;
  	return price === monthlySub ? 'mensile' : price === yearlySub ? 'annuale' : '';
  }

  private makeId(length: number): string {
  	let result = '';
  	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  	const charactersLength = characters.length;
  	for ( let i = 0; i < length; i++ ) {
  		result += characters.charAt(Math.floor(Math.random() * charactersLength));
  	}
  	return result;
  }

}
