import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as Army from '../model/army';
import {
  AttackFalcone,
  initializeAttackFalconeRequest,
} from '../model/attackFalcone';
import * as Planet from '../model/planet';
import { findVehicle } from '../model/vehicle';

@Injectable({
  providedIn: 'root',
})
export class LengaburuService {
  private warResultSource = new BehaviorSubject<any>({});
  warResult = this.warResultSource.asObservable();
  constructor() {}

  /**
   * This function initializes troops and adds it the to army
   * @param {number} noOfPlanetsAllowed - An integer param
   * @return {Army.Army[]} returns updated army
   */
  initializeTroops(noOfPlanetsAllowed: number): Army.Army[] {
    let troops: Army.Army[] = [];
    for (let i = 0; i < noOfPlanetsAllowed; i++) {
      troops.push(Army.initializeArmy());
    }
    return troops;
  }

  /**
   * This function updates the planet selected and removes it from the other troops selection.
   * If selectedPlanet is an empty string then the previous selected planet is added back to
   * all the troops selection
   * @param {Army.Army[]} troops - An Object[] param
   * @param {string} selectedPlanet - A string param
   * @param {number} troopNo - An integer param
   * @return {Army.Army[]} returns updated army
   */
  updateAvailablePlanets(
    troops: Army.Army[],
    selectedPlanet: string,
    troopNo: number
  ): Army.Army[] {
    if (!troops || troops.length === 0) return troops;
    const pIdx = Planet.findPlanet(troops[troopNo].planets, selectedPlanet);

    if (pIdx > -1) {
      Army.updateAllTroopsDestPlanet(troops, troopNo, selectedPlanet);
      troops[troopNo].selectedPlanet = { ...troops[troopNo].planets[pIdx] };
      troops[troopNo].isSelected = true;
      return troops;
    }

    return Army.resetTroops(troops, troopNo);
  }

  /**
   * This function updates the vehicle selected and reduces their counts
   * from other troop's vehicles
   * @param {Army.Army[]} troops - An Object[] param
   * @param {number} selectedVehicleNo - An Integer param
   * @param {number} troopNo - An integer param
   * @return {Army.Army[]} returns updated army
   */
  updateAvailableVehicles(
    troops: Army.Army[],
    selectedVehicleNo: number,
    troopNo: number
  ): Army.Army[] {
    if (!troops || troops.length === 0) return troops;
    const prevSelectedVechNO = findVehicle(
      troops[troopNo].availableVehicles,
      troops[troopNo].selectedVehicle.name
    );

    troops = Army.updateAllTroopsVehicle(
      troops,
      troopNo,
      prevSelectedVechNO,
      selectedVehicleNo
    );
    troops[troopNo].selectedVehicle =
      troops[troopNo].availableVehicles[selectedVehicleNo];

    return troops;
  }

  /**
   * This function form the attackFalcone request body to be sent to the API
   * @param {Army.Army[]} troops - An Object[] param
   * @return {AttackFalcone} returns request bpdy
   */
  sendTroops(troops: Army.Army[]): AttackFalcone {
    let attackFalconeRequest = initializeAttackFalconeRequest();
    if (!troops || troops.length === 0) return attackFalconeRequest;
    troops.forEach((troop) => {
      attackFalconeRequest.planet_names.push(troop.selectedPlanet.name);
      attackFalconeRequest.vehicle_names.push(troop.selectedVehicle.name);
    });
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
