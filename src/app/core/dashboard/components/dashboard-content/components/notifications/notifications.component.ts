import { Timestamp } from './../../../../../../auth/models/timestamp.model';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { switchMap, map, takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { Announcement } from 'src/app/shared/models/announce.model';
import { UserNotificationsService } from 'src/app/shared/services/user-notifications.service';
import * as moment from 'moment';



@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent implements OnInit, OnDestroy {

  @Input('readAll') set readAll(value: boolean | undefined) {
    if (value === undefined) return;
    setTimeout(() => {
      this.userNotifications.readAllNotifications(this.notifications);
    }, 2500);
  }
  @Output() hasToRead = new EventEmitter();

  notifications: Announcement[] = [];
  timersHide: string[] = [];
  timersDiff: string[] = [];
  userId: string;
  showItemDetail = false;
  detailTransition = false;
  hideDetail = true;
  detailNotification: Announcement;
  destroyed$ = new Subject();

  constructor(
    private userNotifications: UserNotificationsService,
    private authService: AuthenticationService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.authService.user$.pipe(
      takeUntil(this.destroyed$),
    ).subscribe(user => {
      if (!user || !user.id) return;
      this.userId = user.id;
      this.initNotifications();
      this.initHasToRead();
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

  hideItemByDate(item: Announcement, index: number): boolean {
    if (!item.sendAt) return false;
    const time = moment.unix(((item.sendAt) as Timestamp).seconds);
    const diff = moment().diff(time, 'seconds');
    if (
        diff < 0 && Math.abs(diff) < 3600
        && this.timersHide.indexOf(index + '') === -1
      ) {
      this.timersHide.push(index + '');
      setTimeout(() => {
        const item2 = this.notifications[index];
        const iToDelete = this.timersHide.indexOf(index + '');
        this.timersHide.splice(iToDelete, 1);
        item2.hideByDate = this.hideItemByDate(item2, index);
        this.cdRef.detectChanges();
      }, (Math.abs(diff) + 5) * 1000);
    }
    return diff < 0 ? true : false;
  }

  getItemTimeDiff(item: Announcement, index: number): string {
    if (!item.sendAt) return '';
    const time = moment.unix(((item.sendAt) as Timestamp).seconds);
    const diff = moment().diff(time, 'seconds');
    if (
        Math.abs(diff) <= 3600
        && this.timersDiff.indexOf(index + '') === -1
      ) {
      this.timersDiff.push(index + '');
      setTimeout(() => {
        const item2 = this.notifications[index];
        const iToDelete = this.timersDiff.indexOf(index + '');
        this.timersDiff.splice(iToDelete, 1);
        item2.timeDiff = this.getItemTimeDiff(item2, index);
        this.cdRef.detectChanges();
      }, 60 * 1000);
    }
    return time.fromNow();
  }

  selectNotification(index: number): void {
    if (index < 0) return;
    this.detailNotification = this.notifications[index];
    this.notifications.forEach((item, i) => {
      if (i === index) item.showDetails = true;
      else item.showDetails = false;
    });
    this.toggleDetail(true);
  }

  toggleDetail(value: boolean): void {
    if (this.detailTransition) return;
    if (value === true) this.hideDetail = false;
    this.showItemDetail = value;
    this.detailTransition = true;
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.detailTransition = false;
      if (value === false) this.hideDetail = true;
      this.cdRef.detectChanges();
    }, 300);
  }

  private initNotifications(): void {
    this.userNotifications.getByUser(this.userId).pipe(
      takeUntil(this.destroyed$),
      map(notifications => {
        notifications.sort((a, b) => {
          const timeA = (a.sendAt as Timestamp).seconds;
          const timeB = (b.sendAt as Timestamp).seconds;
          return timeB - timeA;
        });
        notifications.forEach((item, i) => {
          item.hideByDate = this.hideItemByDate(item, i);
          item.timeDiff = this.getItemTimeDiff(item, i);
        });
        return notifications;
      })
    ).subscribe(notifications => {
      this.notifications = notifications;
      this.cdRef.detectChanges();
    });
  }

  private initHasToRead(): void {
    this.userNotifications.userHasToRead(this.userId).pipe(
      takeUntil(this.destroyed$),
    ).subscribe(hasToRead => {
      if (hasToRead === undefined) return;
      this.hasToRead.emit(hasToRead);
    });
  }

}
