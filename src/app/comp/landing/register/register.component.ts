import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginSService } from '../../../depe/services/login-s.service';
import { userValidationsService } from '../../../depe/services/user-validation.service';
import config from '../../../depe/config/config';
import { ErrorService } from '../../../depe/services/error.service';
import { AlertService } from '../../../depe/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  logo = config.logo;
  hide = true;
  reHide = true;
  registerForm: FormGroup;  
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  submitted = false;
  loading = false;

  constructor(
    private fB:FormBuilder,
    private eS:ErrorService,
    private logS : LoginSService, 
    private cValidS : userValidationsService,
    private router : Router,
    private alertS:AlertService
    /* private EDS : EncrDecrService */
  ) {
    
  }

  ngOnInit() {
    this.registerForm = this.fB.group({
      name: ['', Validators.required],
      /* email: ['', [Validators.required, Validators.email]], */
      mobile: ['', Validators.required],
      //username: ['', [Validators.required], this.cValidS.userNameValidator.bind(this.cValidS)],
      //password: ['', Validators.compose([Validators.required, this.cValidS.patternValidator()])],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      /* acceptTerms: ['', [Validators.required]], */
    },
      {
        validator: this.cValidS.MatchPassword('password', 'confirmPassword'),
      }
    );
    if(!!localStorage.getItem('token')){
      this.router.navigate(['/Dashboard']);
    }
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  userRegister(){    
    let self = this;    
    try {
      if(self.registerForm.valid){
        localStorage.removeItem('token');
        self.submitted = true;
        self.loading = true;
        let singUpFormValue = this.registerForm.value;
        this.logS.newUserReg(singUpFormValue).subscribe(data => {
          //console.log(data);
          let resData = data['status'];
          if(resData == "true"){
            //localStorage.setItem('token', data['result'].token);
            localStorage.setItem('userId', data['result'].userId);
            self.router.navigate(['/User/Verify']);
          }else{
              self.loading = false;
              let error = data['error'];
              self.alertS.succAlert(error);
              self.eS.errorFunc(error);
          }
        })
      }
    }
    catch(err) {
      self.loading = false;
      self.alertS.errAlert(err.message);
    }
  }

}
