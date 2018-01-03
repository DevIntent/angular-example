import {AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2, ViewChild} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {UsersService} from './users.service';
import {environment} from '../environments/environment';
import {NavService} from './nav.service';
import {GoogleAnalyticsService} from './google-analytics.service';
import {isPlatformBrowser} from '@angular/common';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  private firstUseOfCurrentRoute: boolean = true;

  constructor(public usersService: UsersService,
              private router: Router,
              public navService: NavService,
              private gaService: GoogleAnalyticsService,
              private renderer: Renderer2,
              @Inject(PLATFORM_ID) private platformId: Object) {
    if (environment.production) {
      router.events.subscribe(
        (event: Event) => {
          if (event instanceof NavigationEnd) {
            gaService.sendPageview(event.urlAfterRedirects);
          }
        }
      );
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Don't scrollTop on pages that have previously been visited
      window.onpopstate = (event: PopStateEvent) => {
        this.firstUseOfCurrentRoute = false;
      };

      // scrollTop on newly visited pages
      this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.firstUseOfCurrentRoute) {
          const scrollingElement = document.scrollingElement || document.documentElement;
          this.renderer.setProperty(scrollingElement, 'scrollTop', 0);
        } else {
          this.firstUseOfCurrentRoute = true;
        }
      });
    }
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

  logout() {
    this.navService.closeNav();
    this.usersService.logout();
  }

  openBlog() {
    const url = 'https://blog.devintent.com';
    this.navService.closeNav();
    this.gaService.sendPageview('blog');
    this.router.navigate(['/'])
    .then(() => window.location.href = url);
  }

  sendFeedback() {
    const url = 'https://www.devintent.com';
    this.navService.closeNav();
    this.gaService.sendPageview('submit_feedback');
    this.router.navigate(['/'])
    .then(() => window.location.href = url);
  }
}
