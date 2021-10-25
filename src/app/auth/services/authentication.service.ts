import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/functions';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FirestoreExtendedService } from 'src/app/shared/services/firestore-extended.service';
import { User } from '../models/user.model';
import { FirebaseErrorHandling } from '../namespaces/error-auth';
import { UsersService } from './users.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user$: Observable<User | null>;
  fireUser$: Observable<firebase.User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: FirestoreExtendedService,
    private userService: UsersService,
    private router: Router
  ) {
    this.initUser();
  }

  /**
   * Performs a Login with GOOGLE provider through Firebase.
   */
  googleLogin(): Promise<boolean> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  /**
   * Performs a Login with FACEBOOK provider through Firebase.
   */
  facebookLogin(): Promise<boolean> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  /**
   * Performs a Login with EMAIL provider through Firebase.
   */
  emailLogin(email: string, password: string): Promise<any>{
    return this.afAuth.signInWithEmailAndPassword(email, password).then(() => this.redirectAfterSignIn());
  }

  /**
   * Performs a Signup with EMAIL provider through Firebase.
   */
  async emailSignup(email: string, password: string, additionalDetails?: any): Promise<boolean | string> {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      if (!credential.user) throw new Error('User has not been created');
      await this.userService.editOrCreate(credential.user, additionalDetails, true);
      this.redirectAfterSignIn();
      return true;
    } catch (e: any) {
      return e;
    }
  }

  /**
   * This method will send an email with a verification code.
   *
   * @param email Requires user email to send a verification code.
   */
  sendResetPswEmail(email: string): any {
    const fFunctions = firebase.app().functions('europe-west2');
    const fn = fFunctions.httpsCallable('sendEmailActionCode');
    return fn(email);
  }

  /**
   * This method will reset the password with the provided one.
   *
   * @param code it should be set to the verification code sent by email to the user.
   * @param password it should be set to the new password to overwrite the old one.
   */
  resetPassword(code: string, password: string): Promise<any> {
    return this.afAuth.confirmPasswordReset(code, password).then(
      () => {
        this.router.navigate(['/auth/login'], {
          queryParams: {
            resetPassword: true
          }
        });
        return true;
      }, err => false
    );
  }

  /**
   * Signs out the user from the App.
   */
  signOut(): void {
    this.router.navigateByUrl('/auth/login');
    localStorage.clear();
    this.afAuth.signOut();
  }

  ///// Role-based Authorization //////

  /**
   * Defines role-based authorizations for reading data.
   *
   * @param user of type class User
   */
  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }

  /**
   * Defines role-based authorizations for editing data.
   *
   * @param user of type class User
   */
  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  /**
   * Defines role-based authorizations for deleting data.
   *
   * @param user of type class User
   */
  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  /**
   * Determines if user matches a role
   *
   * @param user of type class User
   * @param allowedRoles of types string[]
   */
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (const role of allowedRoles) {
      if ( (user.roles as any)[role] ) {
        return true;
      }
    }
    return false;
  }

  private initUser(): void {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          const user$ = this.db.doc$<User>(`users/${user.uid}`).pipe(map(userDb => ({ ...userDb, id: user.uid })));
          return user$;
        } else {
          return of(null);
        }
      })
    );
    this.fireUser$ = this.afAuth.authState;
  }

  private async oAuthLogin(provider: firebase.auth.AuthProvider): Promise<any> {
    try {
      const credential = await this.afAuth.signInWithPopup(provider);
      const forceEdits = credential.additionalUserInfo?.isNewUser;
      if (!credential.user) return;
      return this.userService.editOrCreate(credential.user, forceEdits).then(() => {
        this.redirectAfterSignIn();
      });
    } catch (err: any) {
      return FirebaseErrorHandling.convertMessage(err.code);
    }
  }

  private redirectAfterSignIn(): void {
    this.userService.initUserDb();
    const returnUrl = localStorage.getItem('returnUrl');
    if (returnUrl) {
      this.router.navigate([returnUrl]);
      localStorage.removeItem('returnUrl');
    } else
      this.router.navigate(['/']); // TODO Set custom redirect after login.
  }
}
