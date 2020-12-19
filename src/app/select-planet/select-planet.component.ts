import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Planet } from '@model/planet.model';

@Component({
  selector: 'app-select-planet',
  templateUrl: './select-planet.component.html',
  styleUrls: ['./select-planet.component.scss']
})
export class SelectPlanetComponent implements OnInit {
  @Input() planets: Planet;
  @Input() troopNo: number;
  @Output('selectPlanet') planet =  new EventEmitter<string>();
  distance: number;
  constructor() { }

  ngOnInit(): void {
  }

  selectPlanet(name: string) {
    this.planet.emit(name);
  }

}
