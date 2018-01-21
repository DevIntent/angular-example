import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';

declare let ga: any;

@Injectable()
export class GoogleAnalyticsService {

  constructor() {
    if (environment.production) {
      ga('create', environment.googleAnalyticsTrackingId, 'auto');
      ga('require', 'linkid');
    }
  }

  sendPageview(url: string) {
    if (environment.production) {
      if (url) {
        ga('send', 'pageview', url);
      } else {
        ga('send', 'pageview');
      }
    }
  }

  setUserId(userId: string) {
    if (environment.production) {
      ga('set', 'userId', userId); // Set the user ID using signed-in user_id.
    }
  }

  sendEvent(category: string, action: string, label?: string, value?: number) {
    if (environment.production) {
      ga('send', 'event', category, action, label, value);
    }
  }
}
