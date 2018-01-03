import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';

declare let ga: any;

@Injectable()
export class GoogleAnalyticsService {

  constructor() {
    ga('create', environment.googleAnalyticsTrackingId, 'auto');
    ga('require', 'linkid');
  }

  sendPageview(url: string) {
    if (url) {
      ga('send', 'pageview', url);
    } else {
      ga('send', 'pageview');
    }
  }

  setUserId(userId: string) {
    ga('set', 'userId', userId); // Set the user ID using signed-in user_id.
  }

  sendEvent(category: string, action: string, label?: string, value?: number) {
    ga('send', 'event', category, action, label, value);
  }
}
