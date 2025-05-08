import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpComponent } from './help/help.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { SupportComponent } from './support/support.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  {
    path: '',
    redirectTo : 'Help'
  },
  {
    path: 'Help',
    component: HelpComponent
  },
  {
    path: 'Privacy',
    component: PrivacyComponent
  },
  {
    path: 'Support',
    component: SupportComponent
  },
  {
    path: 'Terms',
    component: TermsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
