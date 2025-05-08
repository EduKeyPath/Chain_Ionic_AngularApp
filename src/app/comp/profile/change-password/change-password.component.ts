import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userValidationsService } from '../../../depe/services/user-validation.service';
import { ProfileService } from '../../../depe/services/profile.service';
import { ErrorService } from '../../../depe/services/error.service';
import { AlertService } from '../../../depe/services/alert.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
  changePassForm : FormGroup;
  hide = true;
  oldHide = true;
  reHide = true;
  loading = false;
  pageLoading = false;
  submitted = false;

  constructor(
    private router:Router, 
    private eS:ErrorService, 
    private fB:FormBuilder,
    private pS:ProfileService, 
    private cValidS : userValidationsService,
    private alertS : AlertService
  ) { }

  ngOnInit(): void {
    this.changePassForm = this.fB.group({
      oldpassword : ['', Validators.required],
      password : ['', Validators.required],
      newConfPass : ['', Validators.required]
    },
    {
      validator: this.cValidS.MatchPassword('password', 'newConfPass'),
    })
  }

  get changePassFC() {
    return this.changePassForm.controls;
  }

  changePassword(){    
    let self = this;    
    try {
      if(self.changePassForm.valid){
        self.loading = true;
        //self.pageLoading = true;
        self.submitted = true;     
        const changePassFv = this.changePassForm.value;
        delete changePassFv['newConfPass'];
        self.pS.userChangePass(changePassFv).subscribe(
          data => {
            let resData = data['status'];
            //console.log(data);
            if(resData == "true"){
              let msg = data['result']['message'];
              self.alertS.succAlert(msg);
              self.loading = false;
              self.router.navigate(['/Profile']);
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
