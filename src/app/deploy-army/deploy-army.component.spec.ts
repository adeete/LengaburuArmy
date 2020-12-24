import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SortPipe } from '../shared/pipe/sort.pipe';
import { HttpService } from '@services/http.service';
import { LengaburuService } from '@services/lengaburu.service';
import { DeployArmyComponent } from './deploy-army.component';
import {mockArmy} from 'src/assets/mockData/lenbaguruArmy.json';
import { mockSearchArmy } from 'src/assets/mockData/lenbaguruSearchArmy.json';
import { Army } from '@model/army.model';

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
    const selectedPlanet = mockArmy[0][0][0].name, troopNo = 0;
    component.army = new Army(4);
    component.army.deserialize(mockArmy[0]);
    component.selectPlanet(selectedPlanet, troopNo);
    component.army.troops.forEach((troop, idx) => {
      if(idx !== troopNo) {
         expect(troop.availablePlanets.findIndex((planet) => planet.name === selectedPlanet)).toBe(-1);
      }
    })
  });

  it('should update all available vehicles to choose from', () => {
    const selectedVehNo = 3, troopNo = 0, noOfVehiclesAvailable = mockArmy[0][1][0].totalNo;
    component.army = new Army(4);
    component.army.deserialize(mockArmy[0]);
    component.selectVehicle(selectedVehNo, troopNo);

    component.army.troops.forEach((troop, idx) => {
      if(idx !== troopNo) {
         expect(troop.availableVehicles[selectedVehNo].totalNo).toBe(noOfVehiclesAvailable-1);
      }
    });
    
    expect(component.army.timeTaken).toBe(25);
  });

  it('should not be  a valid army', ()=> {
    component.army = new Army(4);
    component.army.deserialize(mockArmy[0]);
    expect(component.isValidArmy()).toBeFalsy();
  });

  it('should be  a valid army', ()=> {
    component.army = new Army(4);
    component.army.deserialize(mockArmy[0]);
    expect(component.isValidArmy()).toBeTruthy();
  });

});
