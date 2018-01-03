/* tslint:disable:no-unused-variable */
import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {GlobalStylesComponent} from './shared/global-styles';
import {TopNavComponent} from './top-nav/top-nav.component';
import {
  MatAutocompleteModule,
  MatButtonModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatOptionModule, MatSidenavModule, MatToolbarModule
} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BreakPointRegistry, FlexLayoutModule, MediaService} from '@angular/flex-layout';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NavService} from './nav.service';
import {UsersService} from './users.service';
import {FooterComponent} from './footer/footer.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {environment} from '../environments/environment';

// TODO mock GoogleAnalyticsService
describe('AppComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FlexLayoutModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatMenuModule,
        MatListModule,
        MatToolbarModule,
        MatInputModule,
        MatAutocompleteModule,
        MatOptionModule,
        ReactiveFormsModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebaseConfig, environment.firebaseConfig.projectId),
        AngularFireAuthModule
      ],
      declarations: [
        AppComponent,
        TopNavComponent,
        GlobalStylesComponent,
        FooterComponent
      ],
      providers: [
        UsersService,
        NavService,
        MediaService,
        BreakPointRegistry
      ]
    }).compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have a sidenav', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.mat-sidenav').textContent).toBeTruthy();
    const app = fixture.debugElement.componentInstance;
    expect(app.appDrawer).toBeTruthy();
  }));
});
