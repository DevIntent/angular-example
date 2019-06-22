import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgentsRoutingModule} from './agents-routing.module';
import {FreeComponent} from './leads/free/free.component';
import {SharedModule} from '../shared';
import {AgmCoreModule} from '@agm/core';
import {environment} from '../../environments/environment';
import {PropertyMapComponent} from '../property-map/property-map.component';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AgentsRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapsApiKey
    }),
    MatExpansionModule
  ],
  declarations: [
    FreeComponent,
    PropertyMapComponent
  ],
  providers: []
})
export class AgentsModule {}
