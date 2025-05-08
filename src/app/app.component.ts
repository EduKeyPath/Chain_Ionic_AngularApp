import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import *as moment from 'moment-timezone';
import config from './depe/config/config';
import { LoginSService } from './depe/services/login-s.service';
import { NotificationService } from './depe/services/notification.service';
import { MenuService } from './depe/services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  selectedIndex = 0;
  sideMenu:any = []
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loginS : LoginSService,
    private nS : NotificationService,
    private mS : MenuService
  ) {
    this.initializeApp();
    let timezone = moment.tz.guess();
    localStorage.setItem('timezone', timezone);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.mS.menuList$.subscribe(item => {this.sideMenu = item});
    if(!!localStorage.getItem('token')){
      this.loginMenu();
    }else{
      this.logoutMenu();
    }
    const path = window.location.pathname.split('/')[1];
    if (path !== undefined) {
      let pageIndx = this.sideMenu.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
      this.selectedIndex = (pageIndx > -1) ? pageIndx:0
    }
    let self = this;
    self.nS.getNotification();

    

  }
  
  loginMenu(){
    this.mS.loggedInMenu();
  }
  logoutMenu(){
    this.mS.loggOutMenu();
  }
  logOut(){
    this.mS.loggOutMenu();
    this.loginS.userLogout();
  }
  
}
