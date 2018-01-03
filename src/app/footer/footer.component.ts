import {Component, OnInit} from '@angular/core';
import {UsersService} from '../users.service';
import {Router} from '@angular/router';
import {GoogleAnalyticsService} from '../google-analytics.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public usersService: UsersService,
              public router: Router,
              private gaService: GoogleAnalyticsService) {}

  ngOnInit() {}

  onBlogClick() {
    this.gaService.sendPageview('blog');
  }

  onFeedbackClick() {
    this.gaService.sendPageview('submit_feedback');
  }
}
