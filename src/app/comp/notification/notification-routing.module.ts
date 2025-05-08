import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService as Authguard } from '../../depe/services/authguard.service';
import { NotificationComponent } from './notification.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationComponent,
    canActivate: [Authguard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationRoutingModule {}
