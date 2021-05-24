import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import firebase from 'firebase/app';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UsersService } from './auth/services/users.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject();

  constructor(private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.initUserDb();
    /* this.initFirebase(); */
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

}
