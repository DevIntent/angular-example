import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {ProfileComponent} from './profile/profile.component';
import {PrivacyComponent} from './privacy/privacy.component';
import {TermsComponent} from './terms/terms.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {UsersService} from './users.service';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: LandingComponent, children: []},
  {path: 'agents', loadChildren: () => import('./agents/agents.module').then(m => m.AgentsModule)},
  {path: 'profile/:id', component: ProfileComponent, canActivate: [UsersService], children: []},
  {path: 'terms', component: TermsComponent, children: []},
  {path: 'privacy', component: PrivacyComponent, children: []},
  {path: '**', component: PageNotFoundComponent, children: []}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
