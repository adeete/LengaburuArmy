import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Planet } from '../model/planet';
import { Vehicle } from '../model/vehicle';
import { AttackFalcone } from '../model/attackFalcone';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private sUrl = 'https://findfalcone.herokuapp.com';
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMsg = `Message : ${error.message}\nError Code: ${error.status}`;
    return throwError(errorMsg);
  }

  /**
   * This function fetches the planets and vehicles from the API
   * @return {Observable} returns an Observable
   */
  fetchLengaburuArmy(): Observable<[Planet[], Vehicle[]]> {
    const planets = this.http.get<Planet[]>(`${this.sUrl}/planets`).pipe(catchError(this.handleError));
    const vehicles = this.http.get<Vehicle[]>(`${this.sUrl}/vehicles`).pipe(catchError(this.handleError));

    return forkJoin([planets, vehicles]);
  }
  
  /**
   * This function calls the AttackFalcone API and returns the response.
   * It first fetches the token and the sends the request.
   * @param {AttackFalcone} oAttackRequest - An Object param
   * @return {Observable} returns an observable
   */
  findFalcone(oAttackRequest: AttackFalcone): Observable<any> {
    const headers = new HttpHeaders({ Accept: 'application/json' });
    return this.http
      .post(`${this.sUrl}/token`, null, {
        headers: headers,
      })
      .pipe(
        catchError(this.handleError),
        map((token: any) => {
          oAttackRequest.token = token.token;
          headers.append('Content-Type', 'application/json');
          return oAttackRequest;
        }),
        mergeMap((data: AttackFalcone) =>
          this.http.post(`${this.sUrl}/find`, data, { headers: headers }).pipe(
            catchError(this.handleError)
          )
        )
      );
  }
}
