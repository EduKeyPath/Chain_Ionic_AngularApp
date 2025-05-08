import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SortByPipe } from '../../depe/pipe/sort.pipe';
import { CharacterPipe } from '../../depe/pipe/char.pipe';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactsRoutingModule
  ],
  declarations: [
    ContactsComponent,
    SortByPipe,
    CharacterPipe
  ]
})
export class ContactsModule {}
