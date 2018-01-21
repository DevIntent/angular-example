import {Component, OnInit} from '@angular/core';
import {NavService} from '../../../nav.service';
import {UsersService} from '../../../users.service';
import {of} from 'rxjs/observable/of';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-free',
  templateUrl: './free.component.html',
  styleUrls: ['./free.component.scss']
})
export class FreeComponent implements OnInit {
  data: Array<Object>;

  constructor(public usersService: UsersService,
              public navService: NavService) {
    navService.backRoute = [];
    navService.title = 'Research Tool Info';
  }

  ngOnInit() {
    // Just adding in some operators since they were all removed from this lazy loaded module when making a public example
    of([])
    .pipe(
      take(1)
    )
    .subscribe(data => this.data = data);
  }

  onOpenDialog() {
    this.usersService.openConfirmationDialog();
  }
}
