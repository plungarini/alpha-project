import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Subject } from 'rxjs';
import { AuthenticationService } from './auth/services/authentication.service';
import { UsersService } from './auth/services/users.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject();

  constructor(private usersService: UsersService, private afAuth: Auth, private auth: AuthenticationService) { }

  ngOnInit(): void {
		this.usersService.initUserDb();
		/* this.afAuth.onAuthStateChanged()
    this.afAuth.authState.pipe(takeUntil(this.destroyed$)).subscribe(console.log);
    this.auth.user$.pipe(takeUntil(this.destroyed$)).subscribe(console.log); */
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
