import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService as Authguard } from '../../../depe/services/authguard.service';
import { ROrdersComponent } from './r-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  {
    path: '',
    component: ROrdersComponent,
    canActivate: [Authguard]
  },
  {
    path: 'OrderDetails/:id',
    component: OrderDetailsComponent,
    canActivate: [Authguard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ROrdersRoutingModule {}
