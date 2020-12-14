import { Planet } from './planet';
import { Vehicle } from './vehicle';

export interface Army {
  selectedPlanet: Planet;
  selectedVehicle: Vehicle;
  isSelected?: boolean;
  planets?: Planet[];
  availablePlanets: Planet[];
  availableVehicles: Vehicle[];
}

//Helper functions for army
export function initializeArmy(): Army {
  return {
    selectedPlanet: {
      name: '',
      distance: 0,
    },
    selectedVehicle: {
      name: '',
      max_distance: 0,
      speed: 0,
      total_no: 0,
    },
    availablePlanets: [],
    availableVehicles: [],
  };
}
export function resetTroops(troops: Army[], troopNo: number) {
  if(!troops || troops.length === 0) return troops;

  troops = troops.map((troop, idx) => {
    if (idx !== troopNo)
      troop.availablePlanets = [
        ...addPrevSelectedPlanetToTroops(troops, troopNo, idx),
      ];
    return troop;
  });
  troops[troopNo].selectedPlanet.name = '';
  troops[troopNo].selectedPlanet.distance = 0;
  troops[troopNo].isSelected = false;
  return troops;
}

export function updateAllTroopsDestPlanet(
  troops: Army[],
  troopNo: number,
  selectedPlanet: string
) {
  if(!troops) return troops;
  return troops.map((troop, idx) => {
    if (idx !== troopNo) {
      troop.availablePlanets = [
        ...addPrevSelectedPlanetToTroops(troops, troopNo, idx),
      ];
      troop.availablePlanets = removePlanetFromTroop(
        troop.availablePlanets,
        selectedPlanet
      );
    }
    return troop;
  });
}

export function updateAllTroopsVehicle(
  troops: Army[],
  troopNo: number,
  prevSelectedVechNO: number,
  selectedVehicleNo: number
) {
  if(!troops) return troops;
  return troops.map((troop, idx) => {
    if (idx !== troopNo) {
      if (prevSelectedVechNO > -1)
        troops[idx].availableVehicles[prevSelectedVechNO].total_no += 1;

      troop.availableVehicles[selectedVehicleNo].total_no -= 1;
    }
    return troop;
  });
}

export function areValidTroops(troops: Army[]): boolean {
  if(!troops || troops.length === 0) return false;
  return troops.reduce((isValid, troop) => {
    return (
      isValid &&
      troop.selectedPlanet.name.length > 0 &&
      troop.selectedVehicle.name.length > 0
    );
  }, true);
}

export function updateTimeTaken(troops: Army[]): number {
  if(!troops || troops.length === 0) return 0;
  return troops.reduce((timeTaken, troop) => {
    timeTaken += troop.selectedVehicle.speed
      ? troop.selectedPlanet.distance / troop.selectedVehicle.speed
      : 0;
    return timeTaken;
  }, 0);
}

function addPrevSelectedPlanetToTroops(
  troops: Army[],
  troopNo: number,
  currentTroop: number
): Planet[] {
  if(!troops || troops.length === 0) return [];
  const prevSelectedPlanet = getPrevSelectedPlanetOfTroop(troops, troopNo);

  if (prevSelectedPlanet.name.length > 0)
    troops[currentTroop].availablePlanets.push(prevSelectedPlanet);

  return troops[currentTroop].availablePlanets;
}

function getPrevSelectedPlanetOfTroop(troops: Army[], troopNo: number): Planet {
  if(!troops || troops.length === 0) return null;
  
  const prevSelectedPlanet = { ...troops[troopNo].selectedPlanet };

  return prevSelectedPlanet;
}

function removePlanetFromTroop(planets: Planet[], selectedPlanet: string): Planet[] {
  if ( !planets ) return planets;
  return planets.filter((planet) => planet.name !== selectedPlanet);
}