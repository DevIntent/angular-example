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
  MatAutocompleteModule, MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatProgressSpinnerModule, MatRippleModule, MatSidenavModule, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';

import {AppRoutingModule} from './app-routing.module';
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
import {CodeConfirmationDialog} from './code-confirmation-dialog/code-confirmation.dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    LandingComponent,
    ProfileComponent,
    FooterComponent,
    TermsComponent,
    PrivacyComponent,
    GlobalStylesComponent,
    PageNotFoundComponent,
    CodeConfirmationDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, environment.firebaseConfig.projectId),
    MatSidenavModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatChipsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    FlexLayoutModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production,
       registrationStrategy: environment.serviceWorkerStrategy})
  ],
  providers: [
    ApiService,
    NavService,
    UsersService,
    GoogleAnalyticsService,
    FullStoryService
  ],
  entryComponents: [
    CodeConfirmationDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
