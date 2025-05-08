import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../depe/services/product.service';
import { ErrorService } from '../../../depe/services/error.service';
import { AlertService } from '../../../depe/services/alert.service';

@Component({
  selector: 'app-shared-with-me',
  templateUrl: './shared-with-me.component.html'
})
export class SharedWithMeComponent implements OnInit {
  snackAlert = false;
  statusMsg = '';
  snackSucAlert = false;
  statusSucMsg = '';
  showloader:boolean = false;
  noData:boolean = false;

  productSharedByVendorsList = [];
  productSharedByVendorsData;

  constructor(
    private eS : ErrorService,
    private pS:ProductService,
    private alertS:AlertService
  ) { }

  ngOnInit() {
    this.getPSByVendors();
  }

  getPSByVendors(){
    let self = this;
    self.showloader = true;
    try {
      self.pS.getProductSharedWithVendors().subscribe((data) => {
        //console.log(data);
        if(data['status'] == 'true' && !!data['result']['list'] && data['result']['list'].length > 0){
          self.showloader = false;
          self.productSharedByVendorsData      =   data['result']['list'];
          self.productSharedByVendorsList      =   self.productSharedByVendorsData;
        }else{
          self.noData = true;
          self.showloader = false;
          let error = data['error'];
          self.alertS.errAlert(error);
          self.eS.errorFunc(error);
        }
      })
    }
    catch(err) {
      self.showloader = false;
      self.alertS.errAlert(err.message);
    }
  }
  
}
