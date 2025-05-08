import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService as Authguard } from '../../depe/services/authguard.service';
import { GroupsComponent } from './groups.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { AddGroupComponent } from './add-group/add-group.component';

const routes: Routes = [
  {
    path: '',
    redirectTo : 'GroupList',
    canActivate: [Authguard]
  },
  {
    path: 'GroupList',
    component: GroupsComponent,
    canActivate: [Authguard]
  },
  {
    path : 'AddGroup',
    component : AddGroupComponent,
    canActivate: [Authguard]
  },
  {
    path: 'GroupDetails/:id',
    component : GroupDetailsComponent,
    canActivate: [Authguard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsRoutingModule {}
