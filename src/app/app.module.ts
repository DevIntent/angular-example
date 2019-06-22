import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';

import 'hammerjs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatRippleModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';

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
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWithDelay:5000'
    })
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
