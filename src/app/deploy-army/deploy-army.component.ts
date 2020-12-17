import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { areValidTroops, Army, updateTimeTaken } from '@model/army';
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
  Army: Army[];
  noOfPlanetsAllowed = 4;
  totalTimeTaken = 0;
  private aSubscription: Subscription;
  constructor(
    private lengaburuService: LengaburuService,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit() {
    this.Army = this.lengaburuService.initializeTroops(this.noOfPlanetsAllowed);

    //fetch lengaburu's army and initialize all the troops present in the @param{Army} Army
    this.aSubscription = this.httpService.fetchLengaburuArmy().subscribe(
      (result) => {
        this.Army.forEach((troop) => {
          troop.planets = result[0];
          troop.availablePlanets = JSON.parse(JSON.stringify(result[0]));
          troop.availableVehicles = JSON.parse(JSON.stringify(result[1]));
        });
      },
      (error) => console.log(error)
    );
  }

  /**
   * This function adds the selected planet to the selectedPlanet field of the current troop and
   * remove the selected planet from the availablePlanets[] of other troop in order to
   * prevent other troops from selecting the same planet.
   * @param {string} planet - A string param
   * @param {number} armyNo - An Integer param
   * @return {void}
   */
  selectPlanet(planet: string, armyNo: number) {
    this.Army = this.lengaburuService.updateAvailablePlanets(
      this.Army,
      planet,
      armyNo
    );
  }

  /**
   * This function updates the vehicle selected for the current troop and also calculates the
   * total time taken - distance/speed
   * @param {number} vehicleNo - An Integer param
   * @param {number} armyNo - An Integer param
   * @return {void}
   */
  updateArmy(vehicleNo: number, armyNo: number) {
    this.Army = this.lengaburuService.updateAvailableVehicles(
      this.Army,
      vehicleNo,
      armyNo
    );
    this.totalTimeTaken = updateTimeTaken(this.Army);
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
      this.httpService
        .findFalcone(this.lengaburuService.sendTroops(this.Army))
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
    this.router.navigate(['/result', { timeTaken: this.totalTimeTaken }]);
  }

  /**
   * This function checks whether the army is valid or not
   * @return {boolean}
   */
  isValidArmy(): boolean {
    return areValidTroops(this.Army);
  }
  ngOnDestroy() {
    this.aSubscription.unsubscribe();
  }
}
