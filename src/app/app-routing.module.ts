import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeployArmyComponent } from './deploy-army/deploy-army.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {path:'', component: DeployArmyComponent},
  {path:'result', component: ResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
