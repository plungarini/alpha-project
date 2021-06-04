import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { USER_NAV } from 'src/app/shared/typescript/navigation';


@Component({
  selector: 'app-global-sidebar',
  templateUrl: './global-sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalSidebarComponent implements OnInit, OnDestroy {

  @Input() isExpanded = true;

  nav = USER_NAV;
  iconsSize = '1.3rem';
  isHomeSelected: boolean;
  isWorkoutSelected: boolean;
  destroyed$ = new Subject();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkActiveUrl();

    this.router.events
      .pipe(takeUntil(this.destroyed$))
      .subscribe(data => {
        this.checkActiveUrl();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
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
