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
  poD;
  thumbnailPath = '';
  paymentPopup = false;
  paymentDPopup = false;
  modeOfPayment;
  bankData;
  upiData;
  paymentTypeErrMsg = '';
  selectedPaymentM = {
    id : '',
    modeOfPayment : '',
    name : '',
    number : '',
    accno : ''
  };
  transactionId : '';
  rejectPopup = false;
  cancelReason = '';

  constructor(
    private eS:ErrorService, 
    private aR:ActivatedRoute, 
    private oS:OrderService,
    private alertS:AlertService
  ) { }

  ngOnInit(): void {
    this.aR.params.subscribe((item) => {this.orderId = item.id})
    this.orderDetails(this.orderId);
  }

  orderDetails(oId){
    let self = this;
    self.showloader = true;
    try {
      self.oS.getPOrderDetails(oId).subscribe(
        data => {
          //console.log(data);
          let resData = data['status'];
          //console.log(resData);
          if(resData == "true"){
            self.poD = data['result']['details'];
            self.thumbnailPath = data['result']['thumbnailPath'];
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

  showRejectPopup(){
    this.rejectPopup = true;
  }
  hideRejectPopup(){
    this.rejectPopup = false;
    this.loading = false;
  }
  hidePaymentDPopup(){
    this.paymentDPopup = false;
  }

  showPaymentPopup(){
    if(this.selectedPaymentM.id == ''){
      this.paymentTypeErrMsg = 'Please select any payment option';  
      return false;    
    }else{
      this.paymentTypeErrMsg = '';  
      this.paymentPopup = true;
      this.paymentDPopup = false;
    }
  }
  hidePaymentPopup(){
    this.paymentPopup = false;
  }
  makePayment(){
    let self = this;
    try {
      if(true){
        self.loading = true;
        //self.pageLoading = true;
        self.submitted = true;     
        //const pData = self.selectedPaymentM;
        let pData;
        if(self.selectedPaymentM.modeOfPayment == 'UPI'){
          pData = {
            orderId: self.orderId,
            modeOfPayment: self.selectedPaymentM.modeOfPayment,
            transactionId: self.transactionId,
            upiId: self.selectedPaymentM.id,
            upiName: self.selectedPaymentM.name,
            upiNo: self.selectedPaymentM.number
          };
        }else if(self.selectedPaymentM.modeOfPayment == 'Bank Transfer') {
          pData = {
            orderId: self.orderId,
            modeOfPayment: self.selectedPaymentM.modeOfPayment,
            transactionId: self.transactionId,
            bankId: self.selectedPaymentM.id,
            bankName: self.selectedPaymentM.name,
            accountNo: self.selectedPaymentM.accno
          };
        }
        self.oS.paymentSent(pData).subscribe(
          data => {
            let resData = data['status'];
            //console.log(data);
            if(resData == "true"){
              let msg = data['result']['message'];
              self.alertS.succAlert(msg);
              self.ngOnInit();
              self.paymentPopup = false;
              //self.pageLoading = false;
              this.selectedPaymentM = {
                id : '',
                modeOfPayment : '',
                name : '',
                number : '',
                accno : ''
              }
              self.loading = false;
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
