import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Announcement } from 'src/app/shared/models/announce.model';



@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styles: [ ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationDetailComponent implements OnInit {

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onCloseDetail = new EventEmitter();
  @Input() detailNotification: Announcement;
  @Input() widthFix = true;

  constructor() { }

  ngOnInit(): void {
  }

  closeDetail(): void {
    this.onCloseDetail.emit(false);
  }

}
