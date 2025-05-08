import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ROrdersRoutingModule } from './r-orders-routing.module';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MomentPipeModule } from '../moment.pipe';

import { ROrdersComponent } from './r-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ROrdersRoutingModule,
    MomentPipeModule,
    MatInputModule,
    MatFormFieldModule
  ],
  declarations: [
    ROrdersComponent,
    OrderDetailsComponent
  ]
})
export class ROrdersModule {}
