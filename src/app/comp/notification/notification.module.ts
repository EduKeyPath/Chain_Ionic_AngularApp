import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { MomentDatePipe } from '../../depe/pipe/mdate.pipe';
/* import { FCM } from '@ionic-native/fcm/ngx'; */


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationRoutingModule
  ],
  declarations: [
    NotificationComponent,
    MomentDatePipe
  ],
  providers : [
   /*  FCM */
  ]
})
export class NotificationModule {}
