import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeployArmyComponent } from './deploy-army/deploy-army.component';
import { ResultComponent } from './result/result.component';
import { SortPipe } from './shared/pipe/sort.pipe';
import { ValidPlanetDirective } from './shared/directive/valid-planet.directive';
import { TroopComponent } from './troop/troop.component';

@NgModule({
  declarations: [
    AppComponent,
    DeployArmyComponent,
    ResultComponent,
    SortPipe,
    ValidPlanetDirective,
    TroopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
