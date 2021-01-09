import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { Planet } from '@model/planet.model';

@Directive({
  selector: '[appValidPlanet]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ValidPlanetDirective, multi: true }]
})
export class ValidPlanetDirective implements Validator {
  @Input('appValidPlanet') currentPlanets: Planet[];
  constructor() { }

  validate(control: AbstractControl): { [key: string]: any} | null {
    if(!control.value) return null;
    
    const  val = control.value,
            idx = this.currentPlanets.findIndex((planet) => planet.name === val);
            
    if(idx === -1) return {invalidPlanet: false};
    return (!this.currentPlanets[idx].canBeSelected)?{invalidSelection: true}:null;
  }
  

}
