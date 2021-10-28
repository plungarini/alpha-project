import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FirestoreExtendedService } from 'src/app/shared/services/firestore-extended.service';
import { UserStripeSubscription } from '../../../auth/models/user-stripe-subscription.model';
import { AuthenticationService } from '../../../auth/services/authentication.service';


@Injectable({
	providedIn: 'root'
})
export class SubscriptionGuard implements CanActivate {

	constructor(
        private fext: FirestoreExtendedService,
        private auth: AuthenticationService,
        private router: Router
	) { }

	canActivate(route: any, state: RouterStateSnapshot): Observable<boolean> {
		return this.auth.user$.pipe(
			map(user => {
				if (!user) return undefined;
				return { uid: user.id, isAdmin: user.roles.admin};
			}),
			switchMap(u => {
				if (!u || !u.uid) return of(null);
				return this.fext.col$<UserStripeSubscription>(
					`users/${u.uid}/subscriptions`,
					(ref: any) => ref.orderBy('created', 'desc')
				)
					.pipe(map((subs: UserStripeSubscription[]) => {
						let timestamp: number | null = null;
						let status: string | null = null;
						subs.forEach(sub => {
							if (!sub.status) return null;
							if (!timestamp) {
								timestamp = sub.created.seconds;
								status = sub.status;
								return null;
							}
							if (timestamp <= sub.created.seconds) {
								timestamp = sub.created.seconds;
								status = sub.status;
								return null;
							}
							return null;
						});
						if (u.isAdmin) status = 'active';
						return status;
					}));
			}),
			map(s => {

				// L'utente deve aggiornare
				// le informazioni di pagamento.
				if (
					s === 'past_due' ||
                    s === 'unpaid' ||
                    s === 'incomplete'
				) {
					// TODO Fare una pagina per aggiornare metodi di pagamento
					this.router.navigate(['/subscription'], {
						queryParams: {
							subReturnUrl: state.url,
						}
					});
					return false;
				}

				// L'utente deve creare una
				// nuova subscription
				else if (
					s === 'canceled' ||
                    s === 'incomplete_expired' ||
                    s === null
				) {
					this.router.navigate(['/subscription'], {
						queryParams: {
							subReturnUrl: state.url,
							firstSub: s === null,
						}
					});
					return false;
				}

				return true;
			})
		);
	}

}
