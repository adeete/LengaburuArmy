import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  AttackFalconeRequest,
} from '@model/attackFalconeRequest.model';

@Injectable({
  providedIn: 'root',
})
export class LengaburuService {
  private warResultSource = new BehaviorSubject<any>({});
  warResult = this.warResultSource.asObservable();
  constructor() {}

  /**
   * This function form the attackFalcone request body to be sent to the API
   * @param {Army.Army[]} troops - An Object[] param
   * @return {AttackFalcone} returns request bpdy
   */
  sendTroops(selectedPlanets: string[], selectedVehicles: string[]): AttackFalconeRequest {
    let attackFalconeRequest = new AttackFalconeRequest();
    attackFalconeRequest.planet_names = selectedPlanets;
    attackFalconeRequest.vehicle_names = selectedVehicles;
    return attackFalconeRequest;
  }

  /**
   * This function sends the search response from the API to the ResultComponent
   * @param {any} troops
   * @return {void}
   */
  searchResult(oResult: any) {
    this.warResultSource.next(oResult);
  }
}
