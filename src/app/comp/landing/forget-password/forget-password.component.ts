import { Component, OnInit } from '@angular/core';
import config from '../../../depe/config/config';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html'
})
export class ForgetPasswordComponent implements OnInit {
  /* public pageName: string;
  defaultHref = ''; */
  logo = config.logo;

  constructor() { }

  ngOnInit() {
   /*  const path = window.location.pathname.split('/')[2];
    this.pageName = path; */
  }

  /* ionViewDidEnter() {
    this.defaultHref = `/User/Login`;
  } */


}
