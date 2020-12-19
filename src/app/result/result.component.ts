import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AttackFalconeResult } from "@model/attackFalconeResult.model";
import { LengaburuService } from "@services/lengaburu.service";
import { Location } from "@angular/common";
import { Subscription } from "rxjs";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.scss"],
})

/*
Component to display search outcome.
*/
export class ResultComponent implements OnInit, OnDestroy {
  totalTimeTaken: number;
  private readonly successResultMsg =
    "Success! Congratulations on Finding Falcone. King Shah is mighty pleased.";
  private readonly successResultStatusTitle = "Found Falcone!";
  private readonly failureResultStatusTitle = "Mission Failed!";
  private readonly failureResultMsg =
    "Could not find the queen AI Falcone, try searching in different planets.";
  private readonly missionOnSuccessMsg = "Start Again";
  private readonly missionOnFailureMsg = "Retry";
  status: boolean;
  statusTitle: string;
  statusMsg: string;
  planetName: string;
  newMissionMsg: string;
  private subscription$: Subscription;
  constructor(
    private lengaburuService: LengaburuService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //Get the search result
    this.subscription$ = this.lengaburuService.warResult.subscribe((result) => {
      if (Object.keys(result).length > 0) this.displayResult(result);
      this.totalTimeTaken = parseInt(
        this.route.snapshot.paramMap.get("timeTaken")
      );
    });
  }

  /**
   * This function updates the display based on search status
   * @param {AttackFalconeResult} attackResult - an object param
   * @return {void}
   */
  displayResult(attackResult: AttackFalconeResult) {
    if (attackResult.status === "success") {
      this.updateStatus(
        this.successResultStatusTitle,
        this.successResultMsg,
        true,
        this.missionOnSuccessMsg,
        attackResult.planetName
      );
    } else {
      this.updateStatus(
        this.failureResultStatusTitle,
        this.failureResultMsg,
        false,
        this.missionOnFailureMsg
      );
    }
  }

  /**
   * This function updates the status variables
   * @param {string} resultTitle - A string param
   * @param {string} resultMsg - A string param
   * @param {boolean} resultStatus - A boolean param
   * @param {string} newMissionMsg - A string param
   * @param {string} planetName - An optional string param
   * @return {void}
   */
  private updateStatus(
    resultTitle: string,
    resultMsg: string,
    resultStatus: boolean,
    newMissionMsg: string,
    planetName?: string
  ) {
    this.statusTitle = resultTitle;
    this.statusMsg = resultMsg;
    this.status = resultStatus;
    this.newMissionMsg = newMissionMsg;
    if (planetName) this.planetName = planetName;
  }

  /**
   * This function restarts the search
   * @return {void}
   */
  restart() {
    this.location.back();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
