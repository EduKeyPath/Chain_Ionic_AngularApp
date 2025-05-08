import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

import { LandingRoutingModule } from './landing-routing.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { AppUpdateComponent } from './app-update/app-update.component';
import { UnauthorisedComponent } from './unauthorised/unauthorised.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    IonicModule,
    LandingRoutingModule
  ],
  declarations: [
    VerifyComponent,
    RegisterComponent,
    LoginComponent,
    ForgetPasswordComponent,
    AppUpdateComponent,
    UnauthorisedComponent
  ],  
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LandingModule {}
