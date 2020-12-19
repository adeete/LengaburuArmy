import { Planet } from "./planet.model";
import { Vehicle } from "./vehicle.model";

export class Troop {
  selectedPlanet: Planet = new Planet();
  selectedVehicle: Vehicle = new Vehicle();
  availablePlanets: Planet[] = [];
  availableVehicles: Vehicle[] = [];

  setAvailablePlanets(planets: any[]) {
    this.availablePlanets = planets.map((planet) =>
      new Planet().deserialize(planet)
    );
  }

  setAvailableVehicles(vehicles: any[]) {
    this.availableVehicles = vehicles.map((vehicle) => {
      const { total_no, max_distance, ...nVehicle } = vehicle;
      nVehicle.maxDistance = max_distance;
      nVehicle.totalNo = total_no;
      return new Vehicle().deserialize(nVehicle);
    });
  }

  getPlanetIndex(planetName: string): number {
    return this.availablePlanets.findIndex(
      (planet) => planet.name === planetName
    );
  }

  getVehicleIndex(vechName: string): number {
    return this.availableVehicles.findIndex(
      (vehicle) => vehicle.name === vechName
    );
  }

  resetSelectedPlanet() {
    this.selectedPlanet = new Planet();
  }

  resetSelectedVehicle() {
    this.selectedVehicle = new Vehicle();
  }

  resetVehicleCount(sVehcName: string) {
    if(sVehcName.length > 0) {
      const idx = this.getVehicleIndex(sVehcName);
      if(idx > -1) this.updateTotalNoForVehicle(idx, 1);
    }
  }
  setSelectedPlanet(selectedPlanetNo: number) {
    this.selectedPlanet = new Planet().deserialize(
      this.availablePlanets[selectedPlanetNo]
    );
  }

  setSelectedVehicle(selectedVehcNo: number) {
    this.selectedVehicle = new Vehicle().deserialize(
      this.availableVehicles[selectedVehcNo]
    );
  }

  updatePlanetSelection(selectedPlanet: number, canBeSelected: boolean) {
    this.availablePlanets[selectedPlanet].canBeSelected = canBeSelected;
  }

  updateTotalNoForVehicle(vehcIdx: number, byN: number) {
    this.availableVehicles[vehcIdx].updateTotalNo(byN);
  }

  addPlanetToAvailablePlanets(planet: Planet) {
    this.availablePlanets.push(planet);
  }
}
