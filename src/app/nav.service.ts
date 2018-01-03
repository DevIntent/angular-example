import {Injectable} from '@angular/core';
import {Location as NgLocation} from '@angular/common';
import {Router} from '@angular/router';

@Injectable()
export class NavService {
  public appDrawer: any;
  private _backRoute: string[];
  private _title: string;

  constructor(private ngLocation: NgLocation, private router: Router) {}

  public closeNav() {
    this.appDrawer.close();
  }

  public openNav() {
    this.appDrawer.open();
  }

  public goToPreviousRoute() {
    if (this.backRoute[0] === 'useHistory') {
      this.back();
    } else {
      this.router.navigate(this.backRoute);
    }
  }

  public back() {
    this.ngLocation.back();
  }

  get backRoute(): string[] {
    return this._backRoute;
  }

  set backRoute(value: string[]) {
    this._backRoute = value;
  }
  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
}
