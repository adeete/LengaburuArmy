import { Deserializable } from "./deserializable.model";
import { Troop } from "./troop.model";

export class Army implements Deserializable {
  troops: Troop[];
  timeTaken: number;
  constructor(noOfTroops: number) {
    this.troops = [...Array(noOfTroops)].map((troop) => new Troop());
    this.timeTaken = 0;
  }
  deserialize(input: any[]): this {
    this.troops.map((troop) => {
      troop.setAvailablePlanets(input[0]);
      troop.setAvailableVehicles(input[1]);
    });

    return this;
  }

  updateTroopsPlanetOnSelection(troopNo: number, selectedPlanet: string) {
    if (!this.troops) return;
    const pIdx = this.troops[troopNo].getPlanetIndex(selectedPlanet);
    if (pIdx > -1) {
      this.updateTroopsPlanetsAvailability(troopNo, pIdx);
      this.troops[troopNo].setSelectedPlanet(pIdx);
    } else {
      this.resetAvailablePlanets(troopNo);
    }
  }

  updateTroopsVehiclesOnSelection(selectedVehcNo: number, troopNo: number) {
    if (this.troops.length === 0) return;
    const troop = this.troops[troopNo],
      prevSelectedVehcNO = troop.getVehicleIndex(troop.selectedVehicle.name);
    this.updateAllTroopsAvailableVehicle(prevSelectedVehcNO, selectedVehcNo);
    troop.setSelectedVehicle(selectedVehcNo);
    this.updateTimeTaken();
  }

  getSelectedPlanetsName(): string[] {
    return this.troops.reduce((planetNames: string[], troop) => {
      planetNames.push(troop.selectedPlanet.name);
      return planetNames;
    }, []);
  }

  getSelectedVehiclesName(): string[] {
    return this.troops.reduce((vehicleNames: string[], troop) => {
      vehicleNames.push(troop.selectedVehicle.name);
      return vehicleNames;
    }, []);
  }

  areValidTroops(): boolean {
    if (!this.troops || this.troops.length === 0) return false;
    return this.troops.reduce(
      (isValid, troop) =>
        isValid &&
        troop.selectedPlanet.name.length > 0 &&
        troop.selectedVehicle.name.length > 0,
      true
    );
  }

  private updateTroopsPlanetsAvailability(
    troopNo: number,
    selectedPlanetNo: number
  ) {
    if (this.troops[troopNo]) {
      this.troops = this.troops.map((troop, idx) => {
        if (idx !== troopNo) {
          this.addBackSelectedPlanet(troop, troopNo);
          troop.updatePlanetSelection(selectedPlanetNo, false);
        }
        return troop;
      });
    }
  }

  private updateAllTroopsAvailableVehicle(
    prevSelectedVechNO: number,
    selectedVehicleNo: number
  ) {
    if (!this.troops) return;
    this.troops = this.troops.map((troop) => {
      if (prevSelectedVechNO > -1)
        troop.updateTotalNoForVehicle(prevSelectedVechNO, 1);
      
      troop.updateTotalNoForVehicle(selectedVehicleNo, -1);
      return troop;
    });
  }

  private resetAvailablePlanets(troopNo: number) {
    if (!this.troops || this.troops.length === 0) return;
    const prevSelectedVehc = this.troops[troopNo].selectedVehicle.name;
    this.troops = this.troops.map((troop, idx) => {
      if (idx !== troopNo) {
        this.addBackSelectedPlanet(troop, troopNo);
      }
      troop.resetVehicleCount(prevSelectedVehc);
      return troop;
    });
    
    this.troops[troopNo].resetSelectedVehicle();
    this.troops[troopNo].resetSelectedPlanet();
  }

  private addBackSelectedPlanet(troop: Troop, troopNo: number) {
    const selectedTroop = this.troops[troopNo],
      prevSelectedPlanet = selectedTroop.selectedPlanet.name,
      pIdx = selectedTroop.getPlanetIndex(prevSelectedPlanet);

    if (pIdx > -1) troop.updatePlanetSelection(pIdx, true);
  }

  private resetAllPlanetsCount() {

  }

  private updateTimeTaken() {
    if (!this.troops || this.troops.length === 0) return 0;
    this.timeTaken = this.troops.reduce((timeTaken, troop) => {
      timeTaken += troop.selectedVehicle.speed
        ? troop.selectedPlanet.distance / troop.selectedVehicle.speed
        : 0;
      return timeTaken;
    }, 0);
  }
}
