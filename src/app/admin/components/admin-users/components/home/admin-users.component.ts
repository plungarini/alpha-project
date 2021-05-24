import { User } from '../../../../../auth/models/user.model';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UsersService } from 'src/app/auth/services/users.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Avatar } from 'src/app/shared/components/avatar/avatar.component';
import { FormControl } from '@angular/forms';



export interface UserItem extends User {
  selected: boolean;
}

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminUsersComponent implements OnInit, OnDestroy {

  pageTitle = 'Tutti gli utenti';

  users: UserItem[] = [];
  filteredUsers: UserItem[];
  selectedUser: UserItem;
  searchInput = new FormControl();

  destroyed$ = new Subject();

  constructor(
    private userService: UsersService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.userService.getAll()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(users => {
        if (!users) return;
        this.users = users.map((u, i) => ({ ...u, selected: i === 0 }));
        if (!this.filteredUsers) this.filteredUsers = this.users;
        const user = this.users.filter(u => u.selected)[0];
        this.selectUser(user.id);
        this.cdRef.detectChanges();
      });
    this.searchInput.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(value => {
        if (!value) {
          this.filteredUsers = this.users;
          return;
        };
        this.filteredUsers = this.filterUsers(value);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

  selectUser(id: string | undefined): void {
    if (!id) return;
    this.users.map(user => {
      user.selected = user.id === id;
      if (user.selected) this.selectedUser = user;
      return user;
    });
  }

  getAvatarInfo(user: User): Avatar {
    return {
      img: user.details?.imgUrl || '',
      fullName: user.name || '',
      email: user.email,
      color: user.details?.imgColorBg || 'indigo'
    };
  }

  private filterUsers(key: string): UserItem[] {
    const normKey = key.toLowerCase();
    return this.users.filter(user => {
      const normName = user.name.toLowerCase();
      const normEmail = user.email.toLowerCase();
      const normRole = user.roles.admin ? 'admin' : user.roles.editor ? 'editor' : '';
      return normName.includes(normKey) || normEmail.includes(normKey) || normRole.includes(normKey);
    });
  }

}
