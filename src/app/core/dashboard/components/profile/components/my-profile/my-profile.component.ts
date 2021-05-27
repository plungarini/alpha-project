/* eslint-disable @angular-eslint/no-output-on-prefix */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase/app';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/auth/models/user.model';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UsersService } from './../../../../../../auth/services/users.service';



@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyProfileComponent implements OnInit, OnDestroy {

  @Output() onAlert = new EventEmitter();

  user: User;
  fireUser: firebase.User;
  destroyed$ = new Subject();
  form = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required])
  });

  constructor(
    private authService: AuthenticationService,
    private storageService: StorageService,
    private userService: UsersService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.authService.user$.pipe(takeUntil(this.destroyed$))
      .subscribe(user => {
        if (!user) return;
        this.user = user;
        this.form.patchValue({
          firstName: user.name.split(' ')[0],
          lastName: user.name.split(' ')[1],
          email: user.email,
        });
        this.cdRef.detectChanges();
      });
    this.authService.fireUser$.pipe(takeUntil(this.destroyed$))
      .subscribe(user => {
        if (!user) return;
        this.fireUser = user;
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

  changeUserName(): void {
    const name = this.form.get('firstName')?.value || '';
    const lastName = this.form.get('lastName')?.value || '';
    const edits = {
      displayName: name + ' ' + lastName,
      photoUrl: this.fireUser.photoURL,
    };
    this.fireUser.updateProfile(edits).then(res => {
      this.userService.editOrCreate(this.fireUser, true, { roles: this.user.roles }).then(() => {
        this.onAlert.emit({
          type: 'success',
          title: 'Modifiche salvate con successo!'
        });
      });
    });
  }

  uploadImage(images: any | null): void {
    if (!images) return;
    const fileToUpload: File = images.files[0];
    const mediaFolderPath = `users/${this.user.id}/media/profile`;

    const { downloadUrl$, uploadProgress$, fileReference } =
      this.storageService.uploadFileAndGetMetadata(
        mediaFolderPath,
        fileToUpload,
      );

    downloadUrl$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((downloadUrl) => {
        if (downloadUrl) {
          this.updateProfileImage(downloadUrl, fileReference);
        }
      });
  }

  private async updateProfileImage(profileImage: string, path?: string): Promise<void> {
    const edits = { displayName: this.user.name, photoURL: profileImage };
    const details = { profileUrlRef: path, roles: this.user.roles };
    if (this.user.details?.profileUrlRef) {
      this.storageService.deleteFile(this.user.details?.profileUrlRef);
    }
    this.fireUser.updateProfile(edits).then(res => {
      this.userService.editOrCreate(this.fireUser, true, details).then(() => {
        this.onAlert.emit({
          type: 'success',
          title: 'Modifiche salvate con successo!'
        });
      });
    });
  };

}
