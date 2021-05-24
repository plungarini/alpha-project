import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { UsersService } from 'src/app/auth/services/users.service';
import { PaymentService } from '../../services/payment.service';



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
})
export class PaymentComponent implements OnInit {

  returnUrl: string | undefined;
  firstSub: boolean;
  disableBtn = false;
  loadingBtnMonth = false;
  loadingBtnYear = false;
  errorMsg = '';

  constructor(
    private payService: PaymentService,
    private auth: AuthenticationService,
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    /**
     * For test purpose only
     */
    // Stripe Test RestrictedApiKey
    // rk_test_51HwSHjAM7M4RC2nW1TJRMTt4Jjck436n8VDg8sbFpRCOGH22BSjlJNkD45Fe3hvq5mkiY1chHSLHrUeRyfZCICQc00Qzz6uU0T
    /* this.payService.testMode = true; */
    this.userService.userSubscriptionStatus().then(status => {
      if (status === 'active' || status === 'trialing') {
        this.router.navigateByUrl('/dashboard');
      }
    });
    this.returnUrl = this.route.snapshot.queryParamMap.get('subReturnUrl') || undefined;
    this.firstSub = !(this.route.snapshot.queryParamMap.get('firstSub') === 'false');
  }

  buyMonthly(): void {
    this.disableBtn = true;
    this.loadingBtnMonth = true;
    this.payService.buySubscription(true, this.returnUrl)
      .then(res => {
        this.loadingBtnMonth = false;
        this.disableBtn = false;
        console.log(res);
      })
      .catch(err => {
        this.loadingBtnMonth = false;
        this.disableBtn = false;
        this.errorMsg = err;
        setTimeout(() => {
          this.errorMsg = '';
        }, 7000);
      })
      .finally(() => {
        this.loadingBtnMonth = false;
        this.disableBtn = false;
      });
  }

  buyYearly(): void {
    this.disableBtn = true;
    this.loadingBtnYear = true;
    this.payService.buySubscription(false)
      .then(res => {
        this.loadingBtnYear = false;
        this.disableBtn = false;
        console.log(res);
      })
      .catch(err => {
        this.loadingBtnYear = false;
        this.disableBtn = false;
        this.errorMsg = err;
        setTimeout(() => {
          this.errorMsg = '';
        }, 7000);
      })
      .finally(() => {
        this.loadingBtnYear = false;
        this.disableBtn = false;
      });
  }

  logout(): void {
    this.auth.signOut();
  }

}
