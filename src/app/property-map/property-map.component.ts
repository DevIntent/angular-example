import {Component, Input, AfterViewInit, ViewChild} from '@angular/core';
import {AgmMap} from '@agm/core';
import {PropertyLocation} from '../models/property-location';

@Component({
  selector: 'app-property-map',
  templateUrl: 'property-map.component.html',
  styleUrls: ['property-map.component.scss']
})
export class PropertyMapComponent implements AfterViewInit {
  @Input() location: PropertyLocation;
  @ViewChild('map') map: AgmMap;

  constructor() {}

  ngAfterViewInit() {
    // Fix map failing to load tiles after first viewing
    this.map.triggerResize();
  }
}
