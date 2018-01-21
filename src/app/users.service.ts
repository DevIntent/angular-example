import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {GoogleAnalyticsService} from './google-analytics.service';
import {FullStoryService} from './fullstory.service';
import {User} from './models/user';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {CodeConfirmationDialog} from './code-confirmation-dialog/code-confirmation.dialog';
import {MatDialog} from '@angular/material';

@Injectable()
export class UsersService implements CanActivate {
  private adminSubscription: Subscription;
  private userSubscription: Subscription;
  public authState: firebase.User;
  public isLoggedIn: boolean = false;
  public isAdmin: boolean = false;
  public currentUser: User;
  private userBehaviorSubject: BehaviorSubject<User>;
  public firebaseUserObservable: Observable<User>;
  public firebaseUser: AngularFireObject<User>;

  constructor(public db: AngularFireDatabase,
              private fbAuth: AngularFireAuth,
              private gaService: GoogleAnalyticsService,
              public dialog: MatDialog,
              private fullStoryService: FullStoryService) {
    this.userBehaviorSubject = new BehaviorSubject(null);
    this.handleRedirect();

    this.fbAuth.authState.subscribe((authState: firebase.User) => {
      this.authState = authState;

      if (authState) {
        this.setCurrentLoggedInUser(this.authState);
      } else {
        this.fbAuth.auth.signInAnonymously().catch((error) => console.error(error));
      }
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.isLoggedIn) {
      // Firebase can take a couple seconds to renew tokens and get the user logged in
      // Don't prompt the user to login unless Firebase wasn't able to log them back in.
      setTimeout(() => {
        if (!this.isLoggedIn) {
          this.login();
        }
      }, 2000);
    }

    return this.isLoggedIn;
  }

  login(): void {
    this.gaService.sendEvent('accounts', 'login');
    if (this.authState && this.authState.isAnonymous) {
      this.fbAuth.auth.currentUser.linkWithRedirect(new firebase.auth.GoogleAuthProvider())
      .catch((error: any) => {
        if (error.credential) {
          this.signInWithCredential(error.credential);
        } else {
          console.error(`linkWithRedirect failed: ${JSON.stringify(error)}`);
          this.gaService.sendEvent('accounts', 'linkWithRedirect_failure');
        }
      });
    } else {
      this.fbAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      .catch((error) => {
        console.error(`signInWithRedirect failed: ${JSON.stringify(error)}`);
        this.gaService.sendEvent('accounts', 'signInWithRedirect_failure');
      });
    }
  }

  handleRedirect(): void {
    this.fbAuth.auth.getRedirectResult().then((result) => {
      this.setCurrentLoggedInUser(result.user);
      // As this API can be used for sign-in, linking and reauthentication,
      // check the operationType to determine what triggered this redirect operation.
      this.gaService.sendEvent('accounts', result.operationType);
    })
    .catch((error) => {
      if (error.credential) {
        this.signInWithCredential(error.credential);
      } else if (error.code) {
        console.error(`getRedirectResult failed: ${JSON.stringify(error)}`);
        this.gaService.sendEvent('accounts', 'getRedirectResult_failure');
      }
    });
  }

  signInWithCredential(credential: firebase.auth.AuthCredential): void {
    this.fbAuth.auth.signInWithCredential(credential)
    .catch((signInError) => {
      console.error(`signInWithCredential failed: ${JSON.stringify(signInError)}`);
      this.gaService.sendEvent('accounts', 'signInWithCredential_failure');
    });
  }

  openConfirmationDialog() {
    const phoneNumber = '+13215551234';
    const dialogRef = this.dialog.open(CodeConfirmationDialog, {
      data: {phoneNumber: phoneNumber}
    });

    dialogRef.afterClosed().subscribe((code: string) => {
      console.log(`Confirmation Code: ${code}`);
    });
  }

  private setCurrentLoggedInUser(authState: firebase.User) {
    this.isLoggedIn = !!authState && !authState.isAnonymous;
    this.gaService.setUserId(authState.uid);
    this.fullStoryService.setUser(authState.uid,
      authState.displayName || 'Anonymous', authState.email || 'anonymous@marketamplified.com');

    if (!authState.isAnonymous) {
      this.firebaseUser = this.db.object<User>('/users/' + authState.uid);
      this.firebaseUserObservable = this.firebaseUser.valueChanges();

      // Add the authData to Firebase if this is the first time the user is logging in
      this.userSubscription = this.firebaseUserObservable.subscribe((data: User) => {
        this.userBehaviorSubject.next(data);

        if (!data || !data.provider) {
          const providerData = authState.providerData[0];
          this.currentUser = {
            provider: providerData.providerId,
            photoURL: providerData.photoURL,
            displayName: providerData.displayName,
            email: providerData.email,
            refreshToken: authState.refreshToken,
            uid: authState.uid,
            providerUids: [providerData.uid]
          };
          this.getPermissions(this.currentUser);
          this.firebaseUser.update(this.currentUser)
            .then(() => {
              this.gaService.sendEvent('accounts', 'creation');
            })
            .catch((error) => {
              this.gaService.sendEvent('accounts', 'creation_failed');
              console.error(`Updating user ${this.currentUser.displayName} failed: ${JSON.stringify(error)}`);
            });
        } else {
          this.currentUser = {
            provider: data.provider,
            photoURL: data.photoURL,
            displayName: data.displayName,
            email: data.email,
            refreshToken: data.refreshToken,
            uid: data.uid,
            providerUids: data.providerUids
          };
          this.getPermissions(this.currentUser);
        }
      });
    }
  }

  getUser(): BehaviorSubject<User> {
    return this.userBehaviorSubject;
  }

  updateUser(user: User): void {
    this.firebaseUser.update(user).catch((error) => {
      console.error(`Updating user ${this.currentUser.displayName} failed: ${error}`);
    });
  }

  logout(): void {
    this.fbAuth.auth.signOut().then(() => {
      this.gaService.sendEvent('accounts', 'logout');
      this.cancelSubscriptions();
      this.currentUser = undefined;
      this.userBehaviorSubject.next(null);
    });
  }

  cancelSubscriptions(): void {
    if (this.adminSubscription) {
      this.adminSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  getPermissions(user: User) {
    const isAdminObservable: Observable<any> = this.db.object('/admins/' + user.uid).valueChanges();
    this.adminSubscription = isAdminObservable.subscribe(
      data => {
        if (data) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      },
      err => {
        console.error('Failed to read from ' + '/admins/' + user.uid + ': ' + err);
      }
    );
  }
}
