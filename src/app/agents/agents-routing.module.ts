import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FreeComponent} from './leads/free/free.component';

const routes: Routes = [
  {path: '', component: FreeComponent, children: []}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AgentsRoutingModule {}
