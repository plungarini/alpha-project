import { switchMap, map } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/models/user.model';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';



@Component({
  templateUrl: './dashboard-home.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHomeComponent implements OnInit {

  pageTitle = 'Dashboard';
  user$: Observable<User | null>;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.user$ = this.authService.fireUser$.pipe(
      switchMap((fUser) => {
        if (!fUser) return this.authService.user$;
        return this.authService.user$.pipe(
          map(user => {
            if (!!user)
              user.id = fUser.uid;
            return user;
          })
        );
      })
    );
  }

}
