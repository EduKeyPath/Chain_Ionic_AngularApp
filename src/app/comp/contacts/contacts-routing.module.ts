import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService as Authguard } from '../../depe/services/authguard.service';
import { ContactsComponent } from './contacts.component';

const routes: Routes = [
  {
    path: '',
    redirectTo : 'ContactList',
    canActivate: [Authguard]
  },
  {
    path: 'ContactList',
    component: ContactsComponent,
    canActivate: [Authguard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsRoutingModule {}
