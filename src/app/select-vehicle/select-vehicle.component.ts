import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Vehicle } from '@model/vehicle.model';

@Component({
  selector: 'app-select-vehicle',
  templateUrl: './select-vehicle.component.html',
  styleUrls: ['./select-vehicle.component.scss']
})
export class SelectVehicleComponent implements OnInit {
  title: string = 'vehicle';
  @Input() vehicles: Vehicle[];
  @Input() troopNo: number;
  @Input() distance: number;
  @Output('selectVehicle') newVehicle = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
    console.log(this.vehicles);
    
  }

  selectVehicle(vehcNo: number) {
    this.newVehicle.emit(vehcNo);
  }
}
