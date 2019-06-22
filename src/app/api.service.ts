import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase/app';

@Injectable()
export class ApiService {
  public idTokenObservable: Observable<string>;

  constructor(private fbAuth: AngularFireAuth) {
    this.idTokenObservable = new Observable((observer: Observer<string>) => {
      this.fbAuth.authState.subscribe((authState: User) => {
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
