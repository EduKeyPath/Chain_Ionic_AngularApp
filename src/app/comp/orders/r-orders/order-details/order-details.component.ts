import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../../depe/services/order.service';
import { ErrorService } from '../../../../depe/services/error.service';
import { AlertService } from '../../../../depe/services/alert.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent implements OnInit {
  
  loading = false;
  //pageLoading = false;
  showloader = false;
  submitted = false;
  orderId:number;
  oD;
  /* oDSd;
  oDPl; */
  thumbnailPath;
  shippingPopup = false;
  trackingPopup = false;
  rejectPopup = false;
  shippingPrice = '';
  cancelReason = '';
  tracking = {
    courier : '',
    trackingId : ''
  }

  constructor(
    private aR:ActivatedRoute, 
    private eS:ErrorService, 
    private oS:OrderService,
    private alertS:AlertService
  ) { }

  ngOnInit(): void {
    this.aR.params.subscribe((item) => {this.orderId = item.id});
    this.orderDetails(this.orderId);
  }

  orderDetails(oId){
    let self = this;
    self.showloader = true;
    try {
      this.oS.getROrderDetails(oId).subscribe(
        data => {
          //console.log(data);
          let resData = data['status'];
          //console.log(resData);
          if(resData == "true"){
            self.oD = data['result']['details'];
            //self.oDSd = data['result']['details']['shipping'];
            //self.oDPl = data['result']['details']['list'];
            //console.log('self.oDPl', self.oDPl)
            self.thumbnailPath = data['result']['thumbnailPath'];
            self.showloader = false;
          }else{
            self.showloader = false;
            let error = data['error'];
            self.alertS.errAlert(error);
            self.eS.errorFunc(error);
            //alert(error);
          }
        }
      )
    }
    catch(err) {
      self.showloader = false;
      self.alertS.errAlert(err.message);
    }    
  }

  showRejectPopup(){
    this.rejectPopup = true;
  }
  hideRejectPopup(){
    this.rejectPopup = false;
    this.loading = false;
  }
  rejectOrder(){
    let self = this;
    try {
      if(!!self.cancelReason){
        self.loading = true;
        //self.pageLoading = true;
        self.submitted = true;     
        const cRData = self.cancelReason
        self.oS.rejectOrder(cRData, self.orderId).subscribe(
          data => {
            let resData = data['status'];
            //console.log(data);
            if(resData == "true"){
              let msg = data['result']['message'];
              self.alertS.succAlert(msg);
              self.ngOnInit();
              self.rejectPopup = false;
              self.loading = false;
              //self.pageLoading = false;
              setTimeout(function(){
                self.cancelReason = '';
              }, 3000);
              //alert(msg);              
            }else{
              self.loading = false;
              //self.pageLoading = false;
              let error = data['error'];
              self.alertS.errAlert(error);
              self.eS.errorFunc(error);
            }
          }
        )
      }
    }
    catch(err) {
      self.loading = false;
      self.alertS.errAlert(err.message);
    }
  }

  showShippingPopup(){
    this.shippingPopup = true;
  }
  hideShippingPopup(){
    this.shippingPopup = false;
  }
  approvOrder(){
    let self = this;
    try {
      if(!!self.shippingPrice){
        self.loading = true;
        //self.pageLoading = true;
        self.submitted = true;     
        const sPData = self.shippingPrice
        self.oS.approveOrder(sPData, self.orderId).subscribe(
          data => {
            let resData = data['status'];
            //console.log(data);
            if(resData == "true"){
              let msg = data['result']['message'];
              self.alertS.succAlert(msg);
              self.ngOnInit();
              self.shippingPopup = false;
              self.loading = false;
              //self.pageLoading = false;
              setTimeout(function(){ 
                self.shippingPrice = '';
              }, 3000);
            }else{
              self.loading = false;
              //self.pageLoading = false;
              let error = data['error'];
              self.alertS.errAlert(error);
              self.eS.errorFunc(error);
            }
          }
        )
      }
    }
    catch(err) {
      self.loading = false;
      self.alertS.errAlert(err.message);
    }
  }

  paymentVerify(payId){
    let self = this;
    let pId = {
      paymentId : payId
    }
    try {
      if(confirm('Did you received the amount')){
        self.loading = true;
        //self.pageLoading = true;
        self.oS.paymentVerify(pId, self.orderId).subscribe(
          data => {
            let resData = data['status'];
            //console.log(data);
            if(resData == "true"){
              //self.pageLoading = false;
              let msg = data['result']['message'];
              self.alertS.succAlert(msg);
              self.ngOnInit();
              self.loading = false;
            }else{
              self.loading = false;
              //self.pageLoading = false;
              let error = data['error'];
              self.eS.errorFunc(error);
              self.alertS.errAlert(error);
            }
          }
        )
      }
    }
    catch(err) {
      self.loading = false;
      self.alertS.errAlert(err.message);
    }
  }
  hideTrackingPopup(){
    this.trackingPopup = false;
  }
  addTrackingD(){
    let self = this;
    try {
      if(!!self.tracking.courier){
        self.loading = true;
        //self.pageLoading = true;
        self.submitted = true;     
        const TData = self.tracking;
        self.oS.shippedOrder(TData, self.orderId).subscribe(
          data => {
            let resData = data['status'];
            //console.log(data);
            if(resData == "true"){
              let msg = data['result']['message'];
              self.ngOnInit();
              self.trackingPopup = false;
              self.loading = false;
              //self.pageLoading = false;
              setTimeout(function(){
                self.tracking = { courier : '', trackingId : '' }
              }, 3000);
            }else{
              self.loading = false;
              //self.pageLoading = false;
              let error = data['error'];
              self.alertS.errAlert(error);
              self.eS.errorFunc(error);
            }
          }
        )
      }
    }
    catch(err) {
      self.loading = false;
      self.alertS.errAlert(err.message);
    }
  }

  
}
