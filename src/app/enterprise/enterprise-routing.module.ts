import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainEnterpriseComponent} from "./main-enterprise/main-enterprise.component";

const routes: Routes = [
  {path: '', component: MainEnterpriseComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnterpriseRoutingModule { }
