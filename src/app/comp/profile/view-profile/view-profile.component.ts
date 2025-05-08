import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../depe/services/profile.service';
import { ErrorService } from '../../../depe/services/error.service';
import { AlertService } from '../../../depe/services/alert.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html'
})
export class ViewProfileComponent implements OnInit {
  profileData;
  paymentType;
  bankData;
  brandData;
  upiData;
  addUpiData = { UPI: '', number: '' };
  addBankData = { account_type:'', bank_name: '', account_name:'', account_no:'', IFSC_code:'' };
  UBankData = {id : '', account_type:'', bank_name: '', account_name:'', account_no:'', IFSC_code:'' };
  panelOpenState = false;
  showloader = false;
  loading = false;
  //pageLoading = false;
  submitted = false;
  brandDetailsPopup = false;
  addPaymentDetailsPopup = false;
  editPaymentDetailsPopup = false;
  editUPIPopup = false;
  editBankPopup = false;

  constructor(
    private eS:ErrorService, 
    private pS:ProfileService,
    private alertS:AlertService
  ) { }

  ngOnInit() {
    this.profileDetails();
  }

  profileDetails(){
    let self = this;  
    self.showloader = true;  
    try {
      self.pS.getProfileDetails().subscribe(
        data => {
          self.showloader = false;
          let resData = data['status'];
          if(resData == "true"){
            self.profileData   =   data['result']['details'];
            self.brandData = data['result']['brand'];
            self.bankData = data['result']['bank'];
            self.upiData = data['result']['upi'];
          }else{
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
  
  showBrandDetailsPopup(){
    this.brandDetailsPopup = true;
  }
  hideBrandDetailsPopup(){
    this.brandDetailsPopup = false;
  }
  updateBankD(){
    let self = this;
    try {
      if(!!self.UBankData){
        self.loading = true;
        //self.pageLoading = true;
        self.submitted = true;     
        const bankData = self.UBankData
        self.pS.updateBank(bankData).subscribe(
          data => {
            let resData = data['status'];
            //console.log(data);
            if(resData == "true"){
              self.ngOnInit();
              self.editBankPopup = false;
              self.UBankData = {id : '', account_type:'', bank_name: '', account_name:'', account_no:'', IFSC_code:'' };
              let msg = data['result']['message'];
              self.alertS.succAlert(msg);
              self.loading = false;
              //self.pageLoading = false;
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
