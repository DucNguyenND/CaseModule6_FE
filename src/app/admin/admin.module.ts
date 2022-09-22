import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MainComponent } from './table/main.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TurnoverComponent } from './turnover/turnover.component';
import {AppComponent} from "../app.component";

@NgModule({
  declarations: [
    MainComponent,
    TurnoverComponent,
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: []
})
export class AdminModule { }
