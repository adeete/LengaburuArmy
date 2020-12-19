import { Deserializable } from "./deserializable.model";
import { Planet } from "./planet.model";
import { Troop } from "./troop.model";
import { Vehicle } from "./vehicle.model";

export class Army implements Deserializable {
  troops: Troop[];
  timeTaken: number;
  constructor(noOfTroops: number) {
    this.troops = [...Array(noOfTroops)].map(troop => new Troop());
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
      this.updateTroopsPlanetsAvailability(troopNo, pIdx)
    } else {
      this.resetAvailablePlanets(troopNo);
    }
  }

  updateTroopsPlanetsAvailability(troopNo: number, selectedPlanetNo: number) {
    if (this.troops[troopNo]) {
      this.troops = this.troops.map((troop, idx) => {
        if (idx !== troopNo) {
          this.addBackSelectedPlanet(troop, troopNo);
          troop.updatePlanetSelection(selectedPlanetNo, false);
        }
        return troop;
      });

      this.troops[troopNo].selectedPlanet = new Planet().deserialize(
        this.troops[troopNo].availablePlanets[selectedPlanetNo]
      );
      this.troops[troopNo].isSelected = true;
      console.log(this.troops);
      
    }
  }

  updateTroopsVehiclesOnSelection(selectedVehcNo: number,
    troopNo: number) {
      if(this.troops.length === 0) return;
      const troop = this.troops[troopNo],
            prevSelectedVehcNO = troop.getVehicleIndex(troop.selectedVehicle.name);
      this.updateAllTroopsAvailableVehicle(prevSelectedVehcNO, selectedVehcNo);

      troop.selectedVehicle = new Vehicle().deserialize(troop.availableVehicles[selectedVehcNo]);
  }

  updateAllTroopsAvailableVehicle(
    prevSelectedVechNO: number,
    selectedVehicleNo: number
  ) {
    if (!this.troops) return;
    this.troops = this.troops.map((troop, idx) => {
      if (prevSelectedVechNO > -1)
        troop.updateTotalNoForVehicle(prevSelectedVechNO, 1);

      troop.updateTotalNoForVehicle(selectedVehicleNo, -1);
      return troop;
    });
  }

  resetAvailablePlanets(troopNo: number) {
    if (!this.troops || this.troops.length === 0) return;

    this.troops = this.troops.map((troop, idx) => {
      if (idx !== troopNo) {
        this.addBackSelectedPlanet(troop, troopNo);
      }
      return troop;
    });
    this.troops[troopNo].resetSelectedPlanet();
  }

  addBackSelectedPlanet(troop: Troop, troopNo: number) {
    const selectedTroop = this.troops[troopNo],
    prevSelectedPlanet = selectedTroop.selectedPlanet.name,
          pIdx = selectedTroop.getPlanetIndex(prevSelectedPlanet);
    
    if(pIdx > -1) troop.updatePlanetSelection(pIdx, true);
  }

  areValidTroops(): boolean {
    if (!this.troops || this.troops.length === 0) return false;
    return this.troops.reduce((isValid, troop) => {
      return (
        isValid &&
        troop.selectedPlanet.name.length > 0 &&
        troop.selectedVehicle.name.length > 0
      );
    }, true);
  }

  updateTimeTaken() {
    if (!this.troops || this.troops.length === 0) return 0;
    this.timeTaken = this.troops.reduce((timeTaken, troop) => {
      timeTaken += troop.selectedVehicle.speed
        ? troop.selectedPlanet.distance / troop.selectedVehicle.speed
        : 0;
      return timeTaken;
    }, 0);
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
}
