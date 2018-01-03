import {Component, OnInit} from '@angular/core';
import {NavService} from '../nav.service';
import {UsersService} from '../users.service';

@Component({
  selector: 'app-landing',
  templateUrl: 'landing.component.html',
  styleUrls: ['landing.component.scss'],
})
export class LandingComponent implements OnInit {

  constructor(public navService: NavService,
              public usersService: UsersService) {
    navService.backRoute = [];
    navService.title = '';
  }

  ngOnInit() {}

  login() {
    this.usersService.login();
  }
}
