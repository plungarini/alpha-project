import { Timestamp } from './../../../../../auth/models/timestamp.model';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Announcement } from 'src/app/shared/models/announce.model';
import { UserNotificationsService } from 'src/app/shared/services/user-notifications.service';
import { UserItem } from '../../../admin-users/components/home/admin-users.component';
import * as moment from 'moment';



@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminNewsComponent implements OnInit {

  pageTitle = 'Invia un annuncio';
  pageDesc = 'Crea un annuncio che puoi indirizzare ad una lista di utenti o a tutti.';

  selectedUsers: UserItem[];
  errorMessage = '';
  successMessage = '';
  announcement: Announcement;
  timersDiff: string[] = [];
  resetForm: boolean | undefined = undefined;

  constructor(
    private cdRef: ChangeDetectorRef,
    private userNotification: UserNotificationsService
  ) { }

  ngOnInit(): void {
    moment.locale('it');
    this.setAnnouncementPreview();
  }

  updateSelectedUsers(users: UserItem[]): void {
    if (!users) return;
    this.selectedUsers = users;
    this.announcement.sendTo = users.filter(user => user.selected);
  }

  sendMessage(message: Announcement): void {
    if (!!message)
      message.sendTo = this.selectedUsers.filter(user => user.selected);
    message = this.validateMessage(message);
    if (!message || this.errorMessage) return;
    this.userNotification.add(message).then(() => {
      this.successMessage = 'Annuncio salvato correttamente';
      this.resetForm = !this.resetForm;
      setTimeout(() => {
        this.successMessage = '';
        this.cdRef.detectChanges();
      }, 4000);
    });
  }

  setAnnouncementPreview(item?: Announcement): void {
    if (!item) {
      item = {
        senderImg: 'assets/icons/no-user-ph.png',
        senderName: 'Inserisci un mittente',
        senderMessage: 'Scrivi qualcosa per vederlo qui...',
        sendTo: [],
        sendAt: {
          seconds: moment().unix(),
          nanoseconds: 0
        } as Timestamp
      };
    } else {
      item.senderImg = item.senderImg || 'assets/icons/no-user-ph.png';
      item.senderName = item.senderName || 'Inserisci un mittente';
      item.senderMessage = item.senderMessage || 'Scrivi qualcosa per vederlo qui...';
      item.sendTo = item.sendTo || [];
      item.sendAt = {
        seconds: moment(item.sendAt || new Date()).unix(),
        nanoseconds: 0
      } as Timestamp;
    }
    item.timeDiff = this.getItemTimeDiff(item, 1);
    this.announcement = item;
  }

  private getItemTimeDiff(item: Announcement, index: number): string {
    if (!item.sendAt) return '';
    const time = moment.unix(((item.sendAt) as Timestamp).seconds);
    const diff = moment().diff(time, 'seconds');
    if (
        Math.abs(diff) <= 3600
        && this.timersDiff.indexOf(index + '') === -1
      ) {
      this.timersDiff.push(index + '');
      setTimeout(() => {
        const item2 = this.announcement;
        const iToDelete = this.timersDiff.indexOf(index + '');
        this.timersDiff.splice(iToDelete, 1);
        item2.timeDiff = this.getItemTimeDiff(item2, index);
        this.cdRef.detectChanges();
      }, 60 * 1000);
    }
    return time.fromNow();
  }

  private validateMessage(msg: Announcement): Announcement {
    let errMsg = '';

    if (!msg) errMsg = 'L\'annuncio non è valido. Completa tutti i dati necessari.';
    if (!msg.senderName) errMsg = 'Il nome del mittente non è valido.';
    if (!msg.senderImg) errMsg = 'L\'immagine del mittente non è valida.';
    if (msg.sendTo.length <= 0) errMsg = 'Seleziona almeno un destinatario.';
    if (
      !msg.senderMessage ||
      msg.senderMessage.length < 15
    ) errMsg = 'Il messaggio dell\'annuncio non è valido. Deve contenere almeno 15 caratteri.';
    if (
      msg.senderLink &&
      !this.validateURL(msg.senderLink)
    ) errMsg = 'Il link inserito nell\'annuncio non è valido.';

    if (!!errMsg) {
      this.errorMessage = errMsg;
      setTimeout(() => {
        this.errorMessage = '';
        this.cdRef.detectChanges();
      }, 3500);
    } else this.errorMessage = '';

    return msg;
  }

  private validateURL(str: string) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

}
