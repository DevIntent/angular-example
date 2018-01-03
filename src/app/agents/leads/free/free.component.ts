import {Component, OnInit} from '@angular/core';
import {NavService} from '../../../nav.service';
import {UsersService} from '../../../users.service';

@Component({
  selector: 'app-free',
  templateUrl: './free.component.html',
  styleUrls: ['./free.component.scss']
})
export class FreeComponent implements OnInit {

  constructor(public usersService: UsersService,
              public navService: NavService) {
    navService.backRoute = [];
    navService.title = 'Research Tool Info';
  }

  ngOnInit() {}

  login() {
    this.usersService.login();
  }
}
