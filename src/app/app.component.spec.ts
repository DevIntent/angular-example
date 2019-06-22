/* tslint:disable:no-unused-variable */
import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {GlobalStylesComponent} from './shared/global-styles';
import {TopNavComponent} from './top-nav/top-nav.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatOptionModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BreakPointRegistry, FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NavService} from './nav.service';
import {UsersService} from './users.service';
import {FooterComponent} from './footer/footer.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
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
