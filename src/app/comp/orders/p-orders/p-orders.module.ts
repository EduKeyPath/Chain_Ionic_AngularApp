import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { POrdersRoutingModule } from './p-orders-routing.module';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MomentPipeModule } from '../moment.pipe';

import { POrdersComponent } from './p-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    POrdersRoutingModule,
    MomentPipeModule,
    MatInputModule,
    MatFormFieldModule
  ],
  declarations: [
    OrderDetailsComponent,
    POrdersComponent,
  ]
})
export class POrdersModule {}
