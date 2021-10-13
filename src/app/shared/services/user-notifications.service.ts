import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { Announcement } from '../models/announce.model';
import { FirestoreExtendedService } from './firestore-extended.service';



@Injectable({
  providedIn: 'root'
})
export class UserNotificationsService {

  path = '/notifications/';

  constructor(
    private db: FirestoreExtendedService,
    private auth: AuthenticationService
  ) { }

  async add(msg: Announcement): Promise<void> {
    const id = msg.id ? msg.id : null;
    msg.sendTo.forEach(user => {
      const normMsg = msg;
      normMsg.toRead = true;
      normMsg.sendTo = [];
      this.db.upsert('users/' + user.id + this.path + id, normMsg);
    });
    this.db.upsert('announcements/' + id, msg);
  }

  getByUser(uid: string): Observable<Announcement[]> {
    return this.db.col$<Announcement>(`users/${uid}${this.path}`);
  }

  userHasToRead(uid: string): Observable<boolean> {
    return this.db.col$<Announcement>(`users/${uid}${this.path}`).pipe(
      switchMap(items => {
        let hasToRead = false;
        items.forEach(item => {
          hasToRead = item.toRead ? true : hasToRead;
        });
        return of(hasToRead);
      })
    );
  }

  readAllNotifications(items: Announcement[]): void {
    items.forEach(item => {
      if (!item.toRead) return;
      this.auth.user$.pipe(take(1)).subscribe(user => {
        if (!user) return;
        item.toRead = false;
        this.db.upsert('users/' + user.id + this.path + item.id, item);
      });
    });
  }

}
