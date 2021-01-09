import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultResolver } from '@services/result-resolver.service';
import { DeployArmyComponent } from './deploy-army/deploy-army.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {path:'', component: DeployArmyComponent},
  {path:'result', component: ResultComponent, resolve: {result: ResultResolver}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
