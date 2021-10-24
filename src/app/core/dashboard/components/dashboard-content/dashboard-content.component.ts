import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { Avatar } from 'src/app/shared/components/avatar/avatar.component';
import { DropdownOptions } from 'src/app/shared/models/dropdown-options.model';
import { USER_NAV } from 'src/app/shared/typescript/navigation';



@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardContentComponent implements OnInit, OnDestroy {

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onExpand = new EventEmitter();

  @Input() dashboardPageTitle = '';
  @Input() isExpanded = true;

  nav = USER_NAV;
  iconsSize = '1.3rem';
  user: Avatar | null;
  userSubscription: Subscription;
  isMobileMenuOpened = false;
  options: DropdownOptions[] = [
    {
      type: 'group',
      childrens: [
        {
          name: 'Il mio account',
          url: '/dashboard/profile',
        },
      ]
    },
    {
      name: 'Esci',
      icon: IconNamesEnum.Power,
      value: 'logout',
      action: true
    }
  ];
  isHomeSelected: boolean;
  isWorkoutSelected: boolean;
  isFirstRun = true;
  readAllNotifications: boolean | undefined = undefined;
  hasToRead: boolean | undefined = undefined;
  destroyed = new Subject();

  constructor(
    private auth: AuthenticationService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.auth.user$
      .subscribe(user => {
        if (!user) return;
        this.user = {
          img: user.details?.imgUrl || '',
          fullName: user.name || '',
          email: user.email || '',
          color: user.details?.imgColorBg || 'indigo'
        };
        this.cdRef.detectChanges();
      });

    this.checkActiveUrl();

    this.router.events
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        this.checkActiveUrl();
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  notificationMenuToggled(open: boolean): void {
    if (open) this.readAllNotifications = !this.readAllNotifications;
  }

  updateToRead(value: boolean | undefined): void {
    if (value === undefined) return;
    this.hasToRead = value;
    this.cdRef.detectChanges();
  }

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
    this.onExpand.emit(this.isExpanded);
  }

  optClicked(option: DropdownOptions): void {
    if (option.value === 'logout') this.logout();
  }

  private logout(): void {
    this.auth.signOut();
  }

  private checkActiveUrl(): void {
    if (this.router.url === '/dashboard') {
      this.isHomeSelected = true;
    } else if (this.router.url.includes('/workout')) {
      this.isWorkoutSelected = true;
    }

    if (this.router.url !== '/dashboard') {
      this.isHomeSelected = false;
    }

    if (!this.router.url.includes('/workout')) {
      this.isWorkoutSelected = false;
    }
  }

}
