import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService as Authguard } from '../../depe/services/authguard.service';
import { AddProductsComponent } from './add-products/add-products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { ProductShipComponent } from './product-ship/product-ship.component';
import { PlaceOrderComponent } from './place-order/place-order.component';


const routes: Routes = [
  {
    path: '',
    redirectTo : 'AddProducts',
    canActivate: [Authguard]
  },
  {
    path: 'AddProducts',
    component: AddProductsComponent,
    canActivate: [Authguard]
  },
  {
    path: 'ProductList/:id/:name/:bn',
    component: ProductListComponent,
    canActivate: [Authguard]
  },
  {
    path: 'Cart',
    component: CartComponent,
    canActivate: [Authguard]
  },
  {
    path: 'ProductShiping',
    component: ProductShipComponent,
    canActivate: [Authguard]
  },
  {
    path: 'PlaceOrder',
    component: PlaceOrderComponent,
    canActivate: [Authguard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
