import {Component, OnInit} from '@angular/core';
import {NavService} from '../nav.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor(public navService: NavService) {
    navService.backRoute = [];
    navService.title = 'Terms and Conditions';
  }

  ngOnInit() {}
}
