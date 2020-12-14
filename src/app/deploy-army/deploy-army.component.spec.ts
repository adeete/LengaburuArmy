import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SortPipe } from '../shared/pipe/sort.pipe';
import { HttpService } from '../shared/services/http.service';
import { LengaburuService } from '../shared/services/lengaburu.service';
import { DeployArmyComponent } from './deploy-army.component';
import {mockArmy} from '../../assets/mockData/lenbaguruArmy.json';
import { mockSearchArmy } from '../../assets/mockData/lenbaguruSearchArmy.json';

describe('DeployArmyComponent', () => {
  let component: DeployArmyComponent;
  let fixture: ComponentFixture<DeployArmyComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeployArmyComponent, SortPipe],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [LengaburuService, HttpService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployArmyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update all available planets to select from', () => {
    const selectedPlanet = mockArmy[0].planets[0].name, troopNo = 0;
    component.Army = mockArmy;
    component.selectPlanet(selectedPlanet, troopNo);
    component.Army.forEach((troop, idx) => {
      if(idx !== troopNo) {
         expect(troop.availablePlanets.findIndex((planet) => planet.name === selectedPlanet)).toBe(-1);
      }
    })
  });

  it('should update all available vehicles to choose from', () => {
    const selectedVehNo = 3, troopNo = 0, noOfVehiclesAvailable = mockArmy[troopNo].availableVehicles[selectedVehNo].total_no;
    component.Army = mockArmy;
    
    component.updateArmy(selectedVehNo, troopNo);

    component.Army.forEach((troop, idx) => {
      if(idx !== troopNo) {
         expect(troop.availableVehicles[selectedVehNo].total_no).toBe(noOfVehiclesAvailable-1);
      }
    });
    
    expect(component.totalTimeTaken).toBe(25);
  });

  it('should not be  a valid army', ()=> {
    component.Army = mockArmy;
    expect(component.isValidArmy()).toBeFalsy();
  });

  it('should be  a valid army', ()=> {
    component.Army = mockSearchArmy;
    expect(component.isValidArmy()).toBeTruthy();
  });

});
