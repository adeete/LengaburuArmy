import { TestBed } from '@angular/core/testing';

import { LengaburuService } from './lengaburu.service';
import { mockArmy } from 'src/assets/mockData/lenbaguruArmy.json';
import { mockSearchArmy } from 'src/assets/mockData/lenbaguruSearchArmy.json';

describe('LengaburuService', () => {
  let service: LengaburuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LengaburuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update available planets in other troops when a planet is selected in a particular troop', () => {
    const selectedPlanet = mockArmy[0].planets[0].name, troopNo = 0;
    const updatedArmy = service.updateAvailablePlanets(mockArmy, selectedPlanet, troopNo);
    updatedArmy.forEach((troop, idx) => {
      if(idx !== troopNo) {
         expect(troop.availablePlanets.findIndex((planet) => planet.name === selectedPlanet)).toBe(-1);
      }
    })
  });

  it('should update available vehicles for other troops when a vehicle is selected in a particular troop', () => {
    const selectedVehNo = 3, troopNo = 0, noOfVehiclesAvailable = mockArmy[troopNo].availableVehicles[selectedVehNo].total_no;
    
    const updatedArmy = service.updateAvailableVehicles(mockArmy, selectedVehNo, troopNo);
    
    updatedArmy.forEach((troop, idx) => {
      if(idx !== troopNo) {
         expect(troop.availableVehicles[selectedVehNo].total_no).toBe(noOfVehiclesAvailable-1);
      }
    })
  });

  it('attackFalcone request should be set before starting the search', ()=> {
    expect(service.sendTroops(mockSearchArmy)).toEqual({
      token: "",
      planet_names: ["Donlon", "Jebing", "Enchai", "Lerbin"],
      vehicle_names: ["Space ship","Space rocket", "Space pod", "Space ship"]
    });
  })
});
