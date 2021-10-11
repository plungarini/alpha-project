import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from './auth/services/users.service';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from './auth/services/authentication.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject();

  constructor(private usersService: UsersService, private afAuth: AngularFireAuth, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.usersService.initUserDb();
    this.afAuth.authState.pipe(takeUntil(this.destroyed$)).subscribe(console.log);
    this.auth.user$.pipe(takeUntil(this.destroyed$)).subscribe(console.log);
    firebase.firestore.setLogLevel('debug');
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
