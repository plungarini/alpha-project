import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Roles } from '../models/roles.model';
import { UserDetails } from '../models/user-details.model';
import { UserStripeSession } from '../models/user-stripe-session.model';
import { UserStripeSubscription, USS_Status } from '../models/user-stripe-subscription.model';
import { User } from '../models/user.model';
import { FirestoreExtendedService } from './../../shared/services/firestore-extended.service';


@Injectable({
	providedIn: 'root'
})
export class UsersService {

  public currentUserDb$: ReplaySubject<User> = new ReplaySubject(1);

  private defaultRoles: Roles = {
  	subscriber: true,
  	editor: false,
  	admin: false,
  };
  private colors:
    ('gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink')[]
  = [
  	'gray',
  	'red',
  	'yellow',
  	'green',
  	'blue',
  	'indigo',
  	'purple',
  	'pink'
  ];

  constructor(private db: FirestoreExtendedService, private afAuth: AngularFireAuth) { }

  /**
   * Initialize User db
   */
  public initUserDb() {
  	this.getCurrentDb().then(user$ => {
  		if (!user$) return;
  		user$.subscribe(user => {
  			this.currentUserDb$.next(user);
  		});
  	});
  }

  /**
   * Update or create a user.
   *
   * @param user User details as firebase.User interface.
   * @param additionalDetails If provides, set additional details to the UserDetails.additional interface.
   * @param roles If provided, set the roles of the user as a Roles interface.
   */
  async editOrCreate(user: firebase.User, forceEdits: boolean = true, additionalDetails?: any, isSignup?: boolean): Promise<boolean> {
  	try {
  		const toFirebaseUser: User = {
  			id: user.uid || '',
  			name: user.displayName || '',
  			email: user.email || '',
  			disabled: false,
  			roles: additionalDetails?.roles || this.defaultRoles,
  			details: ({
  				imgUrl: user.photoURL || null,
  				imgColorBg: additionalDetails?.imgColorBg || this.colors[Math.floor(Math.random() * this.colors.length)],
  				phoneNumber: user.phoneNumber || (additionalDetails)?.phoneNumber || null,
  				lastLogin: user.metadata.lastSignInTime,
  				profileUrlRef: additionalDetails?.profileUrlRef || null,
  				firstLogin: isSignup ? true : false,
  			} as UserDetails)
  		};

  		if (forceEdits || isSignup) {
  			await this.db.upsert(`/users/${user.uid}`, toFirebaseUser);
  		}

  		return true;
  	} catch (err) {
  		console.error(err);
  		return false;
  	}
  }

  /**
   * Get all Users with a query (if set).
   *
   * @returns an Observable with a list of Users.
   */
  getAll(query?: any): Observable<User[]> {
  	return this.db.colWithIds$('users', query);
  }

  /**
   * Get a single user.
   *
   * @param id Set it to firebase.User.uid
   */
  get(id: string): Observable<User> {
  	return this.db.doc$(`users/${id}`);
  }

  getSubscriptionInfo(uid: string):
    Observable<{
      subs: UserStripeSubscription[];
      sessions: UserStripeSession[];
    }>
  {
  	const subs$ = this.db.colWithIds$<UserStripeSubscription>(`users/${uid}/subscriptions`);
  	const sessions$ = this.db.colWithIds$<UserStripeSession>(`users/${uid}/checkout_sessions`);
  	return combineLatest([subs$, sessions$])
  		.pipe(map(([subs, sessions]) => ({
  			subs,
  			sessions
  		})));
  }

  /**
   * Return the status of the subscription.
   * If the user is not subscribed, returns null
   *
   * @returns subscription status
   */
  async userSubscriptionStatus(): Promise<USS_Status | null> {
  	const uid = (await this.getCurrentFire())?.uid;
  	if (!uid) return null;
  	return new Promise((resolve, reject) => {
  		this.db.colWithIds$<UserStripeSubscription>(
  			`users/${uid}/subscriptions`,
  			(ref: any) => ref.orderBy('created', 'desc')
  		)
  			.pipe(take(1))
  			.subscribe((subs: UserStripeSubscription[]) => {
  				let timestamp: number | null = null;
  				let status: string | null = null;
  				subs.forEach(sub => {
  					if (!sub.status) return;
  					if (
  						!timestamp ||
                timestamp <= sub.created.seconds
  					) {
  						timestamp = sub.created.seconds;
  						status = sub.status;
  						return;
  					}
  					return;
  				});
  				resolve(status);
  			});
  	});
  }

  /**
   * Get current user from Firebase.
   */
  getCurrentFire(): Promise<firebase.User | null> {
  	return this.afAuth.currentUser;
  }

  /**
   * Get current user from db.
   */
  private async getCurrentDb(): Promise<Observable<User> | null> {
  	const afUser = await this.getCurrentFire();
  	if (!afUser) return null;
  	return this.get(afUser.uid);
  }

}
