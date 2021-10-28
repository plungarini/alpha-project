import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { Subscription } from 'rxjs';
import { UserStripeSession } from 'src/app/auth/models/user-stripe-session.model';
import { UserStripeSubscription } from 'src/app/auth/models/user-stripe-subscription.model';
import { User } from 'src/app/auth/models/user.model';
import { UsersService } from 'src/app/auth/services/users.service';
import { Avatar } from 'src/app/shared/components/avatar/avatar.component';
import { environment } from 'src/environments/environment';
import { UserItem } from '../home/admin-users.component';



interface StripeDetails {
  spent: number | undefined;
  hasCanceled: boolean | undefined;
  canceledDate: Date | undefined;
  subStartDate: Date | undefined;
  subRecurring: Date | undefined;
  subType: 'Mensile' | 'Annuale' | undefined;
  subStatus: UserStripeSubscription['status'] | undefined;
  statusTranslated: string | undefined;
  statusColor: string | undefined;
}

@Component({
	selector: 'app-admin-user-details',
	templateUrl: './admin-user-details.component.html',
	styles: [` :host { width: 100%; } `],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminUserDetailsComponent implements OnInit {

  @Input('user') set setUser(user: UserItem) {
		if (!user || !user.id) return;
		this.user = user;
		if (this.$subs.length > 0)
			this.$subs.forEach(sub => {
				sub.unsubscribe();
			});
		const $sub =
      this.users.getSubscriptionInfo(user.id)
      	.subscribe(info => {
      		this.subsInfo = info;
      		this.setCurrentSub(info.subs);
      		this.cdRef.detectChanges();
      	});
		this.initUserStripeDetails();
		this.$subs.push($sub);
	}

  user: UserItem;
  subsInfo: {
    subs: UserStripeSubscription[];
    sessions: UserStripeSession[];
  };
  currentSub: UserStripeSubscription | undefined;
  stripeDetails: StripeDetails = {
  	spent: undefined,
  	hasCanceled: undefined,
  	canceledDate: undefined,
  	subStartDate: undefined,
  	subRecurring: undefined,
  	subType: undefined,
  	subStatus: undefined,
  	statusTranslated: undefined,
  	statusColor: undefined
  };
  ffn = firebase.app().functions('europe-west2');
  getStripeUserSpent = this.ffn.httpsCallable('getStripeUserSpent');
  $subs: Subscription[] = [];

  constructor(
    private users: UsersService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  getAvatarInfo(user: User): Avatar {
  	return {
  		img: user.details?.imgUrl || '',
  		fullName: user.name || '',
  		email: user.email,
  		color: user.details?.imgColorBg || 'indigo'
  	};
  }

  setCurrentSub(subs: UserStripeSubscription[]): void {
  	let timestamp: number | undefined;
  	let currentSub: UserStripeSubscription | undefined;
  	subs.forEach(sub => {
  		if (!sub.status) return;
  		if (
  			!timestamp ||
        timestamp <= sub.created.seconds
  		) {
  			timestamp = sub.created.seconds;
  			currentSub = sub;
  			return;
  		}
  		return;
  	});

  	const price = currentSub?.items[0].price.id;
  	if (currentSub && price === environment.stripeProducts.prod.month)
  		this.stripeDetails.subType = 'Mensile';
  	if (currentSub && price === environment.stripeProducts.prod.year)
  		this.stripeDetails.subType = 'Annuale';

  	const startPeriod = currentSub?.current_period_start.seconds || 0;
  	const endPeriod = currentSub?.current_period_end.seconds || 0;
  	this.stripeDetails.subStartDate = new Date(startPeriod * 1000);
  	this.stripeDetails.subRecurring = new Date(endPeriod * 1000);

  	this.stripeDetails.hasCanceled = !!currentSub?.canceled_at;
  	const cancelDate = currentSub?.canceled_at?.seconds || 0;
  	this.stripeDetails.canceledDate = new Date(cancelDate * 1000);

  	this.stripeDetails.subStatus = currentSub?.status;
  	this.translateSubStatus(currentSub?.status);
  }

  getUserCreationTime(): Date | undefined {
  	const seconds = this.user.createdAt?.seconds;
  	if (!seconds) return;
  	return new Date(seconds * 1000);
  }

  private translateSubStatus(status: UserStripeSubscription['status'] | undefined): void {
  	let text: string;
  	let color: string;
  	switch (status) {
  	case 'active':
  		text = 'Attivo'; color = 'text-green-500';
  		break;
  	case 'past_due':
  		text = 'Scaduto'; color = 'text-yellow-500';
  		break;
  	case 'unpaid':
  		text = 'Non pagato'; color = 'text-red-500';
  		break;
  	case 'canceled':
  		text = 'Cancellato'; color = 'text-red-500';
  		break;
  	case 'incomplete':
  		text = 'Incompleto'; color = 'text-yellow-500';
  		break;
  	case 'incomplete_expired':
  		text = 'Cancellato'; color = 'text-red-500';
  		break;
  	case 'trialing':
  		text = 'In prova gratuita'; color = 'text-green-500';
  		break;

  	default:
  		text = 'Nessun abbonamento'; color = 'text-grey-400';
  		break;
  	}

  	this.stripeDetails.statusTranslated = text;
  	this.stripeDetails.statusColor = color;
  }

  private async initUserStripeDetails(): Promise<void> {
  	if (!this.user || !this.user.stripeId) return;
  	const amount = await this.getStripeUserSpent(this.user.stripeId);
  	this.stripeDetails.spent = amount.data as number;
  	this.cdRef.detectChanges();
  }

}
