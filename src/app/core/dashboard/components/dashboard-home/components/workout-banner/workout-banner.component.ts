import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { UserWorkoutService } from 'src/app/shared/services/user-workout.service';



@Component({
  selector: 'app-workout-banner',
  templateUrl: './workout-banner.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutBannerComponent implements OnInit, OnDestroy {

  workoutCompleted = false;
  destroyed$ = new Subject();

  constructor(
    private userWeekService: UserWorkoutService,
    private authService: AuthenticationService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.authService.user$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(user => {
      if (!user || !user.id) return;
      this.userWeekService.isTodayCompleted(user.id).pipe(
        takeUntil(this.destroyed$)
      ).subscribe(isToday => {
        this.workoutCompleted = isToday;
        this.cdRef.detectChanges();
      });
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

}
