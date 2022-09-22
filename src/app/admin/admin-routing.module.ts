import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./table/main.component";
import {TurnoverComponent} from "./turnover/turnover.component";

const routes: Routes = [
  {path: "", component: MainComponent},
  {path: "turnover", component: TurnoverComponent},
  {path: "tables", component: MainComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
