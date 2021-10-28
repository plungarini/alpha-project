import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/user.model';
import { FirestoreExtendedService } from 'src/app/shared/services/firestore-extended.service';



@Component({
	selector: 'app-welcome-banner',
	templateUrl: './welcome-banner.component.html',
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeBannerComponent implements OnInit {

  @Input('user') set setUser(user: User | null) {
		if (!user) return;
		this.user = user;
		if (!this.justUpdatedLogin) {
			this.firstLogin = user.details?.firstLogin;

			if (user.details && user.details.firstLogin) {
				user.details.firstLogin = false;
				this.justUpdatedLogin = true;
				this.db.upsert(`users/${user.id}`, user.details);
			}
		}
	}

  user: User;
  justUpdatedLogin = false;
  firstLogin: boolean | undefined;

  constructor(private db: FirestoreExtendedService) { }

  ngOnInit(): void {
  }

}
