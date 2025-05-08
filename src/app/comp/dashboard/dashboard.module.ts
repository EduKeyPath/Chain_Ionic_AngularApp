import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import { MomentDatePipe } from '../../depe/pipe/mdate.pipe';
import { CharacterPipe } from '../../depe/pipe/char.pipe';
import { NotificationPipe } from '../../depe/pipe/noti.pipe';
import { SortByPipe } from '../../depe/pipe/sort.pipe';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UploadByMeComponent } from './upload-by-me/upload-by-me.component';
import { SharedByMeComponent } from './shared-by-me/shared-by-me.component';
import { SharedWithMeComponent } from './shared-with-me/shared-with-me.component';
import { DashboardComponent } from './dashboard-comoponent';
/* import { Contact } from '@ionic-native/contacts/ngx'; */




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardRoutingModule,
    MatInputModule,
    MatMenuModule,
    MatCheckboxModule
  ],
  declarations: [
    DashboardComponent,
    UploadByMeComponent,
    SharedByMeComponent,
    SharedWithMeComponent,
    MomentDatePipe,
    CharacterPipe,
    NotificationPipe,
    SortByPipe
  ],
  providers : [
    /* Contact */
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class DashboardModule {}
