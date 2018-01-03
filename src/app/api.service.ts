import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class ApiService {
  public idTokenObservable: Observable<string>;

  constructor(private fbAuth: AngularFireAuth) {
    this.idTokenObservable = Observable.create((observer: Observer<string>) => {
      this.fbAuth.authState.subscribe((authState: firebase.User) => {
        if (authState) {
          authState.getIdToken().then((token: string) => {
            observer.next(token);
          });
        }
      });
    });
  }

  public getHeaders(token?) {
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
