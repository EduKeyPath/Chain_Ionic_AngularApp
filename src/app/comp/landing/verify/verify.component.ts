import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginSService } from '../../../depe/services/login-s.service';
import config from '../../../depe/config/config';
import { ErrorService } from '../../../depe/services/error.service';
import { AlertService } from '../../../depe/services/alert.service';
import { MenuService } from '../../../depe/services/menu.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html'
})
export class VerifyComponent implements OnInit {
  logo = config.logo;
  verifyFrom: FormGroup;
  submitted = false;
  loading = false;
  resendOtpD = false;
  
  constructor( 
    private fB:FormBuilder,
    private eS:ErrorService,
    private logS : LoginSService,
    private router : Router,
    private alertS:AlertService,
    private mS : MenuService
  ) { }

  ngOnInit(): void {
    this.verifyFrom = this.fB.group({
      otp : ['', Validators.required]
    })
    if(!!localStorage.getItem('token')){
      this.router.navigate(['/Dashboard']);
    }
  }

  userVerify(){
    let self = this;    
    try {
      if(self.verifyFrom.valid){
        self.submitted = true;
        self.loading = true;
        let verifyFV = self.verifyFrom.value;
        this.logS.userVerify(verifyFV).subscribe(data => {
          //console.log(data);
          let resData = data['status'];
          if(resData == "true"){
            //console.log('token',data['result'].token)
            localStorage.setItem('token', data['result'].token);
            //localStorage.setItem('userId', data['result'].userId);
            self.mS.loggedInMenu();
            self.router.navigate(['/Dashboard']);
          }else{
              self.loading = false;
              let error = data['error'];
              this.eS.errorFunc(error);
              self.alertS.errAlert(error);
              this.verifyFrom = this.fB.group({
                otp : ''
              })
              this.resendOtpD = true;
          }
        })
      }
    }
    catch(err) {
      self.loading = false;
      self.alertS.errAlert(err.message);
    }
  }

  resendOtp(){
    this.verifyFrom = this.fB.group({
      otp : ''
    });
    this.resendOtpD = false;
    let self = this;    
    try {
      this.logS.resendOtp().subscribe(data => {
        //console.log(data);
        let resData = data['status'];
        if(resData == "true"){
          let msg = data['result']['message'];
          self.alertS.succAlert(msg);
        }else{
            self.loading = false;
            let error = data['error'];
            self.alertS.errAlert(error);
            self.eS.errorFunc(error);
        }
      })
    }
    catch(err) {
      self.loading = false;
      self.alertS.errAlert(err.message);
    }
  }
  
}
