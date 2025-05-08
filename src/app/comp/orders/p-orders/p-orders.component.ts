import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../depe/services/order.service';
import { ErrorService } from '../../../depe/services/error.service';
import { AlertService } from '../../../depe/services/alert.service';

@Component({
  selector: 'app-p-orders',
  templateUrl: './p-orders.component.html'
})
export class POrdersComponent implements OnInit {
  
  showloader = false;
  loading = false;
  pOrderData;

  constructor( 
    private eS:ErrorService, 
    private oS:OrderService,
    private alertS:AlertService
  ) { }

  ngOnInit(): void {
    this.pOrderList();
  }

  pOrderList(){
    let self = this;
    self.showloader = true;
    try {
      self.oS.getPlacedOrderList().subscribe(
        data => {
          let resData = data['status'];          
          if(resData == "true"){
            self.pOrderData = data['result']['list'];
            //console.log('self.pOrderData', self.pOrderData);
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
