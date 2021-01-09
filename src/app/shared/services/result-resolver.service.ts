import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import {LengaburuService} from '@services/lengaburu.service';
import { HttpService } from '@services/http.service';
import { catchError, map } from 'rxjs/operators';
import { AttackFalconeResult } from '@model/attackFalconeResult.model';

@Injectable({
  providedIn: 'root'
})
export class ResultResolver implements Resolve<Observable<any>>{

  constructor(private httpService: HttpService, private lengaburuService: LengaburuService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const selectedPlanets = route.params['selectedPlanet'].split(','),
          selectedVehicles = route.params['selectedVehicles'].split(',');
    return this.httpService
        .findFalcone(this.lengaburuService.sendTroops(selectedPlanets, selectedVehicles))
        .pipe(
          map((value) => new AttackFalconeResult().deserialize(value)),
          catchError((err) => { 
            console.log(err);
            return null;
          })
        );
  }
}
