// For deployment to production only.
import {Observable} from 'rxjs/Observable';

export function getServiceWorkerObservable() {
  return new Observable(observer => {
    setTimeout(() => {
      observer.next();
    }, 10000);
  });
}

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: 'AIzaSyCG5P0ZrbWcC212QZsEebyyGwj2KRgs700',
    authDomain: 'devintent-angular-example.firebaseapp.com',
    databaseURL: 'https://devintent-angular-example.firebaseio.com',
    projectId: 'devintent-angular-example',
    storageBucket: 'devintent-angular-example.appspot.com',
    messagingSenderId: '1003263481418'
  },
  googleAnalyticsTrackingId: '',
  mapsApiKey: 'AIzaSyCG5P0ZrbWcC212QZsEebyyGwj2KRgs700',
  serviceWorkerStrategy: 'registerDelay:5000'
  // serviceWorkerStrategy: 'registerImmediately'
  // serviceWorkerStrategy: 'registerWhenStable'
  // serviceWorkerStrategy: getServiceWorkerObservable
};
