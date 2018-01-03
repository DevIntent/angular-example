import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UsersService} from '../users.service';
import {NavService} from '../nav.service';
import {Router} from '@angular/router';
import {ObservableMedia} from '@angular/flex-layout';

@Component({
  selector: 'app-top-nav',
  templateUrl: 'top-nav.component.html',
  styleUrls: ['top-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopNavComponent implements OnInit {

  constructor(public usersService: UsersService,
              private router: Router,
              public navService: NavService,
              public mediaService: ObservableMedia) {}

  ngOnInit() {}

  login() {
    this.usersService.login();
  }

  logout() {
    this.usersService.logout();
  }

  openProfile() {
    this.router.navigate(['profile', this.usersService.currentUser.uid]);
  }

  openHome() {
    this.router.navigate(['']);
  }
}
