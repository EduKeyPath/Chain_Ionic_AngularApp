import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../depe/services/order.service';
import { ErrorService } from '../../../depe/services/error.service';
import { AlertService } from '../../../depe/services/alert.service';

@Component({
  selector: 'app-r-orders',
  templateUrl: './r-orders.component.html'
})
export class ROrdersComponent implements OnInit {
  showloader = false;
  loading = false;
  rOrderData;

  constructor( 
    private eS:ErrorService, 
    private oS:OrderService,
    private alertS:AlertService
  ) { }

  ngOnInit(): void {
    this.rOrderList();
  }

  rOrderList(){
    let self = this;
    self.showloader = true;
    try {
      self.oS.getReceivedOrderList().subscribe(
        data => {
          let resData = data['status'];
          //console.log(data);
          if(resData == "true"){
            self.rOrderData = data['result']['list'];
            //console.log('self.rOrderData', self.rOrderData);
            self.showloader = false;
          }else{
            self.showloader = false;
            let error = data['error'];
            self.alertS.errAlert(error);
            self.eS.errorFunc(error);
          }
        }
      )
    }
    catch(err) {
      self.loading = false;
      self.alertS.errAlert(err.message);
    }
  }
  
}
