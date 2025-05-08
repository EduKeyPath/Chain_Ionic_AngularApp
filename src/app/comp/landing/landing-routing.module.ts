import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService as Authguard } from '../../depe/services/authguard.service';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { AppUpdateComponent } from './app-update/app-update.component';
import { UnauthorisedComponent } from './unauthorised/unauthorised.component';

const routes: Routes = [
  {
    path: '',
    redirectTo : 'Login'
  },
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: 'Register',
    component: RegisterComponent
  },
  {
    path: 'ForgetPassword',
    component: ForgetPasswordComponent
  },
  {
    path: 'Verify',
    component: VerifyComponent
  },
  {
    path : 'AppUpdate',
    component : AppUpdateComponent
  },
  {
    path : 'Unauthorised',
    component : UnauthorisedComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
