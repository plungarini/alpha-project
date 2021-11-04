/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import firebase from 'firebase/app';
import { UsersService } from 'src/app/auth/services/users.service';
import { environment } from 'src/environments/environment';


@Injectable({
	providedIn: 'root'
})
export class PaymentService {

  public testMode = false;
  private generalError = 'Si è verificato un errore. Contatta l\'assistenza se il problema persiste.';

  private stripeApiTest = environment.stripe.test;
  private stripeApiPublic = environment.stripe.prod;

  private monthlyPriceTest = environment.stripeProducts.test.month;
  private yearlyPriceTest = environment.stripeProducts.test.year;

  private monhtlyPrice = environment.stripeProducts.prod.month;
  private yearlyPrice = environment.stripeProducts.prod.year;

  constructor(
    private db: AngularFirestore,
    private usersService: UsersService
  ) { }

  async buySubscription(monthly: boolean, successSlug?: string): Promise<void> {
  	return new Promise<void>(async (resolve, reject) => {
  		const uid = (await this.usersService.getCurrentFire())?.uid;
  		if (!uid) return reject(this.generalError);
  		let subPrice: string;

  		if (this.testMode)
  			subPrice = monthly ? this.monthlyPriceTest : this.yearlyPriceTest;
  		else
  			subPrice = monthly ? this.monhtlyPrice : this.yearlyPrice;

  		const docRef = await this.db
  			.collection('users')
  			.doc(uid)
  			.collection('checkout_sessions')
  			.add({
  				price: subPrice,
  				allow_promotion_codes: true, // Can delete this in Future
  				success_url: window.location.origin + (successSlug || '') || '/dashboard',
  				cancel_url: window.location.href,
  				updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  			});

  		return resolve(new Promise<void>((resolve2, reject2) => {
  			// Wait for the CheckoutSession to get attached by the extension
  			docRef.onSnapshot(async (snap) => {
  				if (!snap || !snap.data()) return reject2(this.generalError);
  				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  				const { error, sessionId } = snap.data()!!;
  				if (error) {
  					return reject2(error.message + ' | Contatta il supporto se il problema persiste.');
  				}
  				if (sessionId) {
  					// We have a session, let's redirect to Checkout
  					const stripe = await this.getStripe();
  					if (!stripe) return reject2(this.generalError);
  					await stripe.redirectToCheckout({ sessionId });
  					return resolve2();
  				}
  			});
  		}));
  	});
  }

  private getStripe(): Promise<Stripe | null> {
  	return loadStripe(
  		this.testMode ? this.stripeApiTest : this.stripeApiPublic
  	);
  }
}
