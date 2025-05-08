import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginSService } from '../../../depe/services/login-s.service';
import { userValidationsService } from '../../../depe/services/user-validation.service';
import config from '../../../depe/config/config';
import { ErrorService } from '../../../depe/services/error.service';
import { AlertService } from '../../../depe/services/alert.service';
import { MenuService } from '../../../depe/services/menu.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  logo = config.logo;
  hide = true;
  loginForm:FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private fB:FormBuilder, 
    private eS:ErrorService,
    private logS:LoginSService, 
    private cValidS:userValidationsService,
    private router : Router,
    private alertS:AlertService,
    private mS : MenuService
  ) { }

  ngOnInit() {
    this.loginForm = this.fB.group({
      username : ['', Validators.required],
      password: ['', [Validators.required]]
    })

    if(!!localStorage.getItem('token')){
      this.router.navigate(['/Dashboard']);
    }
  }

  get loginFC(){
    return this.loginForm.controls;
  }

  userLogin(){    
    let self = this;    
    try {
      if(self.loginForm.valid){
        self.loading = true;
        self.submitted = true;     
        let loginFV = self.loginForm.value;
        //console.log(loginFV);
        self.logS.userLogin(loginFV).subscribe(
          data => {
            const dataRes = data['status'];
            if(dataRes == 'true'){
                localStorage.setItem('token', data['result'].token);
                localStorage.setItem('userId', data['result'].userId);
                self.mS.loggedInMenu();
                self.router.navigate(['/Dashboard']);
            }else{
              self.loading = false;
              let error = data['error'];
              self.alertS.errAlert(error);
              self.eS.errorFunc(error);
            }
          }
        );
      }
    }
    catch(err) {
      self.loading = false;
      self.alertS.errAlert(err.message);
    }    
  }
  

}
