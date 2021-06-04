import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/auth/models/user.model';
import { UsersService } from 'src/app/auth/services/users.service';
import { Avatar } from 'src/app/shared/components/avatar/avatar.component';
import { UserItem } from '../../../admin-users/components/home/admin-users.component';



@Component({
  selector: 'app-admin-news-users',
  templateUrl: './admin-news-users.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminNewsUsersComponent implements OnInit, OnDestroy {

  @Input('resetForm') set resetForm(value: boolean | undefined) {
    if (value === undefined) return;
    this.users = this.users.map(u => ({ ...u, selected: false }));
    this.filteredUsers = this.users;
    this.selectedUsers.emit(this.users);
  };
  @Output() selectedUsers = new EventEmitter();

  users: UserItem[] = [];
  filteredUsers: UserItem[];
  searchInput = new FormControl();
  allSelected = false;

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
        const normUsers = users.sort((a, b) => (a.name > b.name) ? 1 : -1);
        this.users = normUsers.map(u => ({ ...u, selected: false }));
        this.selectedUsers.emit(this.users);
        if (!this.filteredUsers) this.filteredUsers = this.users;
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
    this.destroyed$.complete();
  }

  selectUser(id: string | undefined): void {
    if (!id) return;
    this.users.forEach(user => {
      if (user.id === id) user.selected = !user.selected;
    });
    this.allSelected = true;
    this.users.forEach(user => {
      if (!user.selected) this.allSelected = false;
    });
    this.filterUsers();
    this.updateSelectedUsers();
  }

  selectAllUsers(): void {
    this.users.map(user => {
      user.selected = !this.allSelected;
    });
    this.allSelected = !this.allSelected;
    this.filterUsers();
    this.users.sort((a, b) => (a.name > b.name) ? 1 : -1);
    this.updateSelectedUsers();
  }

  updateSelectedUsers(): void {
    this.selectedUsers.emit(this.users);
  }

  getAvatarInfo(user: User): Avatar {
    return {
      img: user.details?.imgUrl || '',
      fullName: user.name || '',
      email: user.email,
      color: user.details?.imgColorBg || 'indigo'
    };
  }

  private filterUsers(key?: string): UserItem[] {
    const normKey = (key || '').toLowerCase();
    let users = this.users.sort((a, b) => (a.name > b.name) ? 1 : -1);
    const filterByKeyUsers = users.filter(user => {
      const normName = user.name.toLowerCase();
      const normEmail = user.email.toLowerCase();
      const normRole = user.roles.admin ? 'admin' : user.roles.editor ? 'editor' : '';
      return normName.includes(normKey) || normEmail.includes(normKey) || normRole.includes(normKey);
    });
    users = users.sort((a, b) => (a.selected === b.selected) ? 0 : a.selected ? -1 : 1);
    return !!key ? filterByKeyUsers : users;
  }

}
