import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegisterComponent } from './LoginAndRegister/Register/user-register/user-register.component';
import { EnterpriseRegisterComponent } from './LoginAndRegister/Register/enterprise-register/enterprise-register.component';
import { LoginComponent } from './LoginAndRegister/login/login.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import { ForgotPasComponent } from './LoginAndRegister/forgot-pass/forgot-pas.component';
import {DeltalComponent} from "./user/deltal/deltal.component";



@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    EnterpriseRegisterComponent,
    LoginComponent,
    ForgotPasComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud")
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
