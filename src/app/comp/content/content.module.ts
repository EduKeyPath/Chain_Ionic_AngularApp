import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { ContentRoutingModule } from './content-routing.module';
import { SafePipe } from '../../depe/pipe/safe.pipe';

import { HelpComponent } from './help/help.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { SupportComponent } from './support/support.component';
import { TermsComponent } from './terms/terms.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentRoutingModule,
    MatMenuModule,
    MatExpansionModule,
    MatInputModule
  ],
  declarations: [
    HelpComponent,
    PrivacyComponent,
    SupportComponent,
    TermsComponent,
    SafePipe
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ContentModule {}
