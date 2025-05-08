import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductsRoutingModule } from './products-routing.module';
import {NgxImageCompressService} from 'ngx-image-compress';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CurrencyPipe } from '../../depe/pipe/curnc.pipe';
import { MomentDatePipe } from '../../depe/pipe/mdate.pipe';

import { AddProductsComponent } from './add-products/add-products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ProductShipComponent } from './product-ship/product-ship.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    ProductsRoutingModule
  ],
  declarations: [
    AddProductsComponent,
    ProductListComponent,
    CartComponent,
    PlaceOrderComponent,
    ProductShipComponent,
    CurrencyPipe,
    MomentDatePipe
  ],
  providers: [
    NgxImageCompressService
  ],
})
export class ProductsModule {}
