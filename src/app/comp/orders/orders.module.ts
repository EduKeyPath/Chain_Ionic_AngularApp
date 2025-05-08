import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrdersRoutingModule } from './orders-routing.module';
import { MomentPipeModule } from './moment.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersRoutingModule,
    MomentPipeModule,
  ],
  declarations: [
    
  ]
})
export class OrdersModule {}
