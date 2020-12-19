import { Planet } from "./planet.model";
import { Vehicle } from "./vehicle.model";

export class Troop {
  selectedPlanet: Planet;
  selectedVehicle: Vehicle;
  isSelected: boolean = false;
  availablePlanets: Planet[];
  availableVehicles: Vehicle[];

  constructor() {
    this.selectedPlanet = new Planet();
    this.selectedVehicle = new Vehicle();
    this.availablePlanets = [];
    this.availableVehicles = [];
  }


  setAvailablePlanets(planets: any[]) {
    this.availablePlanets = planets.map((planet) => new Planet().deserialize(planet));
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
