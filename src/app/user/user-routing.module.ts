import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "../LoginAndRegister/login/login.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {DeltalComponent} from "./deltal/deltal.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'deltal', component: DeltalComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
