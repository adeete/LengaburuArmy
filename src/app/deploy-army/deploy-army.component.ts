import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Army } from '@model/army.model';
import { HttpService } from '@services/http.service';
import { LengaburuService } from '@services/lengaburu.service';
@Component({
  selector: 'app-deploy-army',
  templateUrl: './deploy-army.component.html',
  styleUrls: ['./deploy-army.component.scss'],
})

/*
Component to form army for searching Falcone.
*/
export class DeployArmyComponent implements OnInit, OnDestroy {
  army: Army;
  noOfTroopsAllowed = 4;
  private aSubscription: Subscription;
  constructor(
    private lengaburuService: LengaburuService,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit() {
    this.army = new Army(this.noOfTroopsAllowed);

    //fetch lengaburu's army and initialize all the troops present in the @param{Army} Army
    this.aSubscription = this.httpService.fetchLengaburuArmy().subscribe(
      (result) => {
        this.army.deserialize(result);
      },
      (error) => console.log(error)
    );
  }

  /**
   * This function adds the selected planet to the selectedPlanet field of the current troop and
   * remove the selected planet from the availablePlanets[] of other troop in order to
   * prevent other troops from selecting the same planet.
   * @param {string} planet - A string param
   * @param {number} troopNo - An Integer param
   * @return {void}
   */
  selectPlanet(planet: string, troopNo: number) {
    this.army.updateTroopsPlanetOnSelection(troopNo, planet);
    console.log(this.army);
    
  }

  /**
   * This function updates the vehicle selected for the current troop and also calculates the
   * total time taken - distance/speed
   * @param {number} vehicleNo - An Integer param
   * @param {number} troopNo - An Integer param
   * @return {void}
   */
  updateArmy(vehicleNo: number, troopNo: number) {
    this.army.updateTroopsVehiclesOnSelection(vehicleNo, troopNo)
    this.army.updateTimeTaken();
  }

  /**
   * This function initiates the search process for falcon.
   * It checks whether all planets and vehicles for the troops have been selected.
   * If it's valid then sends the request to get the final outcome and displays the
   * result.
   * @return {void}
   */
  findFalcone() {
    if (this.isValidArmy()) {
      const selectedPlanets = this.army.getSelectedPlanetsName(),
            selectedVehicles = this.army.getSelectedVehiclesName();
      this.httpService
        .findFalcone(this.lengaburuService.sendTroops(selectedPlanets, selectedVehicles))
        .subscribe(
          (result) => {
            this.lengaburuService.searchResult(result);
            this.displayResult();
          },
          (error) => console.log(error)
        );
    }
  }

  /**
   * This function routes to the ResultComponent to display the search outcome
   * @return {void}
   */
  displayResult() {
    this.router.navigate(['/result', { timeTaken: this.army.timeTaken }]);
  }

  /**
   * This function checks whether the army is valid or not
   * @return {boolean}
   */
  isValidArmy(): boolean {
    return this.army.areValidTroops();
  }
  ngOnDestroy() {
    this.aSubscription.unsubscribe();
  }
}
