import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';

import 'hammerjs';
import {
  MatAutocompleteModule, MatMenuModule, MatSidenavModule, MatSnackBarModule, MatToolbarModule
} from '@angular/material';
import './rxjs.extensions';

import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared';
import {NavService} from './nav.service';
import {UsersService} from './users.service';
import {GoogleAnalyticsService} from './google-analytics.service';
import {FullStoryService} from './fullstory.service';

import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {TopNavComponent} from './top-nav/top-nav.component';

import {LandingComponent} from './landing/landing.component';
import {ProfileComponent} from './profile/profile.component';

import {FooterComponent} from './footer/footer.component';
import {TermsComponent} from './terms/terms.component';
import {PrivacyComponent} from './privacy/privacy.component';
import {GlobalStylesComponent} from './shared/global-styles';
import {ApiService} from './api.service';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    LandingComponent,
    ProfileComponent,
    FooterComponent,
    TermsComponent,
    PrivacyComponent,
    GlobalStylesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, environment.firebaseConfig.projectId),
    MatSidenavModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatMenuModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    SharedModule
  ],
  providers: [
    ApiService,
    NavService,
    UsersService,
    GoogleAnalyticsService,
    FullStoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
