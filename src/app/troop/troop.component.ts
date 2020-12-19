import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Troop } from '@model/troop.model';

@Component({
  selector: 'app-troop',
  templateUrl: './troop.component.html',
  styleUrls: ['./troop.component.scss']
})
export class TroopComponent implements OnInit {
  title: string = "destination";
  vehcInptitle: string = "vehicle";
  bPrevValid: boolean = false;
  invalidPlanetErr: string = "Please select a valid planet";
  emptyPlanetErr: string = "Planet cannot be empty";
  @Input() troopNo: number;
  @Input() troop: Troop;
  @Output() newPlanet = new EventEmitter<string>();
  @Output() newVehicle = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  selectPlanet(bValid: boolean, planetName: string) {
    if(bValid) {
      this.bPrevValid = true;
      this.newPlanet.emit(planetName);
      return;
    }
    if(this.bPrevValid) this.newPlanet.emit('');
    this.bPrevValid = false;
  }

  selectVehicle(vehcNo: number) {
    this.newVehicle.emit(vehcNo);
  }
}
