import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReportsRoutingModule } from './reports-routing.module';

import { ReportsComponent } from './reports.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportsRoutingModule
  ],
  declarations: [ReportsComponent]
})
export class ReportsModule {}
