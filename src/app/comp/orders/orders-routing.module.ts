import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo : 'ReceivedOrders'
  },
  {
    path: 'ReceivedOrders',
    loadChildren: () => import('./r-orders/r-orders.module').then( m => m.ROrdersModule)
  },
  {
    path: 'PlacedOrders',
    loadChildren: () => import('./p-orders/p-orders.module').then( m => m.POrdersModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
