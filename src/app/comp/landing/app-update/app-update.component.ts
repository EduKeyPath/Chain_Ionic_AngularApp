import { Component, OnInit } from '@angular/core';
import config from '../../../depe/config/config';

@Component({
  selector: 'app-app-update',
  templateUrl: './app-update.component.html'
})
export class AppUpdateComponent implements OnInit {
  logo = config.logoAlt;
  appLink = 'https://play.google.com/store/apps/details?id=com.product.chain';

  constructor() { }

  ngOnInit(): void {
  }

}
