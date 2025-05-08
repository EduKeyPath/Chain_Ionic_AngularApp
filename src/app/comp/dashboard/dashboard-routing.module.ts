import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService as Authguard } from '../../depe/services/authguard.service';
import { DashboardComponent } from './dashboard-comoponent';
import { UploadByMeComponent } from './upload-by-me/upload-by-me.component';
import { SharedByMeComponent } from './shared-by-me/shared-by-me.component';
import { SharedWithMeComponent } from './shared-with-me/shared-with-me.component';

const routes: Routes = [
  {
    path: '',
    redirectTo : 'UploadByMe',
    canActivate: [Authguard]
  },
  {
    path: 'UploadByMe',
    component: DashboardComponent,
    canActivate: [Authguard]
  },
  {
    path: 'SharedByMe',
    component: SharedByMeComponent,
    canActivate: [Authguard]
  },
  {
    path: 'SharedWithMe',
    component: SharedWithMeComponent,
    canActivate: [Authguard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
