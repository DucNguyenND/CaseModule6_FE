import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import {ReactiveFormsModule} from "@angular/forms";
import { DeltalComponent } from './deltal/deltal.component';


@NgModule({
  declarations: [
    HomepageComponent,
    DeltalComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        ReactiveFormsModule
    ]
})
export class AppUserModule { }
