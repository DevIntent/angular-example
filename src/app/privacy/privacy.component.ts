import {Component, OnInit} from '@angular/core';
import {NavService} from '../nav.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  constructor(public navService: NavService) {
    navService.backRoute = [];
    navService.title = 'Privacy Policy';
  }

  ngOnInit() {}
}
