import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';

declare let FS: any;

@Injectable()
export class FullStoryService {

  constructor() {
    if (environment.production) {
      (function (m, n, e, t, l, o, g, y) {
        if (e in m && m.console && m.console.log) {
          m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');
          return;
        }
        g = m[e] = function (a, b) {
          g.q ? g.q.push([a, b]) : g._api(a, b);
        };
        g.q = [];
        o = n.createElement(t);
        o.async = 1;
        o.src = 'https://fullstory.com/s/fs.js';
        y = n.getElementsByTagName(t)[0];
        y.parentNode.insertBefore(o, y);
        g.identify = function (i, v) {
          g(l, {uid: i});
          if (v) {
            g(l, v);
          }
        };
        g.setUserVars = function (v) {
          g(l, v);
        };
        g.identifyAccount = function (i, v) {
          o = 'account';
          v = v || {};
          v.acctId = i;
          g(o, v);
        };
        g.clearUserCookie = function (c, d, i) {
          if (!c || document.cookie.match('fs_uid=[`;`]*`[`;`]*`[`;`]*`')) {
            d = n.domain;
            while (1) {
              n.cookie = 'fs_uid=;domain=' + d +
                ';path=/;expires=' + new Date(0).toUTCString();
              i = d.indexOf('.');
              if (i < 0) {
                break;
              }
              d = d.slice(i + 1);
            }
          }
        };
      })(window, document, window['_fs_namespace'], 'script', 'user');
    }
  }

  setUser(userId: string, displayName: string, email: string) {
    if (environment.production) {
      FS.identify(userId, {
        displayName: displayName,
        email: email,
        // Add your own custom user variables here, details at http://help.fullstory.com/develop-js/setuservars.
      });
    }
  }
}
