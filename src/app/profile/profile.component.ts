import {Component, OnDestroy, ViewContainerRef, OnInit} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {UsersService} from '../users.service';
import {Subscription} from 'rxjs/Subscription';
import {NavService} from '../nav.service';
import {User} from '../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public userSnapshot: User;
  private userSubscription: Subscription;

  constructor(private usersService: UsersService,
              public navService: NavService,
              private snackBar: MatSnackBar,
              private viewContainerRef: ViewContainerRef,
              private router: Router) {
    navService.backRoute = [];
    navService.title = 'Profile';
  }

  ngOnInit() {
    this.userSubscription = this.usersService.getUser().subscribe((user: User) => {
      if (user) {
        this.userSnapshot = Object.assign({}, user);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  saveUserInfo(userSnapshot) {
    this.usersService.updateUser(userSnapshot);
    const config = new MatSnackBarConfig();
    config.viewContainerRef = this.viewContainerRef;
    this.snackBar.open('Profile saved.', 'CLOSE', config);
  }
}
