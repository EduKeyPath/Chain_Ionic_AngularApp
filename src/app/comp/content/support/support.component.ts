import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import config from '../../../depe/config/config';
import { ProfileService } from '../../../depe/services/profile.service';
import { ErrorService } from '../../../depe/services/error.service';
import { AlertService } from '../../../depe/services/alert.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html'
})
export class SupportComponent implements OnInit {
  contactForm:FormGroup;
  profileData = {
    name : '',
    mobile : '',
    email : '',
    address : '',
    message : ''
  }
  loading = false;
  submitted = false;

  constructor(
    private fB:FormBuilder, 
    private eS:ErrorService,
    private http:HttpClient, 
    private router : Router,
    private pS:ProfileService,
    private alertS:AlertService
  ) { }

  ngOnInit(): void {
    let userToken = localStorage.getItem('token');
    if(!!userToken){
        this.profileDetails();
    }
  }

  profileDetails(){
    let self = this;    
    try {
      self.pS.getProfileDetails().subscribe(
        data => {
          //console.log(data);
          let resData = data['status'];
          if(resData == "true"){
            self.profileData   =   data['result']['details'];
          }else{
            let error = data['error'];
            self.alertS.errAlert(error);
          }
        }
      )
    }
    catch(err) {
      self.alertS.errAlert(err.message);
    }
  }

  contactUs(){
    let self = this;
    let cFV = self.profileData; 
    try {
      if(!!cFV){
        self.loading = true;
        self.submitted = true;
        self.http.post(config.serviceUrl +'data.php?act=content&section=contactUs', cFV).subscribe(
          data => {
            //console.log(data);
            let resData = data['status'];
            if(resData == "true"){
              let msg = data['result']['message'];
              self.alertS.succAlert(msg);
              self.loading = false;
            }else{
              self.loading = false;
              let error = data['error'];
              self.alertS.errAlert(error);
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
