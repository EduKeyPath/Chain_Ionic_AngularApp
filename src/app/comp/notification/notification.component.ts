import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../depe/services/notification.service';
/* import { FCM } from '@ionic-native/fcm/ngx'; */

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit {  
  notficationData;

  constructor(private nS : NotificationService/* , private fcm: FCM */) { 
    this.nS.notficationList$.subscribe(item => this.notficationData = item);
  }

  ngOnInit() {

    /* this.fcm.subscribeToTopic('marketing');

    this.fcm.getToken().then(token => {
      backend.registerToken(token);
    });

    this.fcm.onNotification().subscribe(data => {
      if(data.wasTapped){
        console.log("Received in background");
      } else {
        console.log("Received in foreground");
      };
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      backend.registerToken(token);
    });

    this.fcm.hasPermission().then(hasPermission => {
      if (hasPermission) {
        console.log("Has permission!");
      }
    })

    this.fcm.clearAllNotifications();

    this.fcm.unsubscribeFromTopic('marketing'); */
    
  }




}
