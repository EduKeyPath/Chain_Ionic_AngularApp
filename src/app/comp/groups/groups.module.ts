import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {MatInputModule} from '@angular/material/input';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { AddGroupComponent } from './add-group/add-group.component';

import { SortByPipe } from '../../depe/pipe/sort.pipe';
import { CharacterPipe } from '../../depe/pipe/char.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupsRoutingModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  declarations: [
    GroupsComponent,
    GroupDetailsComponent,
    AddGroupComponent,
    SortByPipe,
    CharacterPipe
  ]
})
export class GroupsModule {}
