import { NgModule } from '@angular/core';
import { MomentDatePipe } from '../../depe/pipe/mdate.pipe';

@NgModule({
  imports: [],
  declarations: [
    MomentDatePipe
  ],
  exports: [
    MomentDatePipe
  ]
})
export class MomentPipeModule {}