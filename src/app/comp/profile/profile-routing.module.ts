import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService as Authguard } from '../../depe/services/authguard.service';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo : 'ViewProfile',
    canActivate: [Authguard]
  },
  {
    path: 'ViewProfile',
    component: ViewProfileComponent,
    canActivate: [Authguard]
  },
  {
    path: 'EditProfile',
    component: EditProfileComponent,
    canActivate: [Authguard]
  },
  {
    path: 'ChangePassword',
    component: ChangePasswordComponent,
    canActivate: [Authguard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
