import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { CountryService } from '../../../depe/services/country.service';
import { ProfileService } from '../../../depe/services/profile.service';
import { ErrorService } from '../../../depe/services/error.service';
import { AlertService } from '../../../depe/services/alert.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent implements OnInit {
  profileData = {
    name : '',
    gender : '',
    mobile : '',
    altMobile : '',
    email : '',
    address : '',
    city : '',
    pincode : '',
    state : '',
    country : 'India'
  }
  //editProfileForm:FormGroup;
  contryList = [];
  stateList = []
  loading = false;
  //pageLoading = false;

  constructor(
    private fB:FormBuilder, 
    private eS:ErrorService, 
    private router:Router, 
    private pS:ProfileService, 
    private cS:CountryService,
    private alertS:AlertService
  ) { 
    this.contryList = this.cS.getContry();
    this.getProfileDetails();
  }

  ngOnInit() {
  }

  getProfileDetails(){
    let self = this;
    try {
      self.pS.getProfileDetails().subscribe(
        data => {
          //console.log(data);
          let resData = data['status'];
          if(resData == "true"){
            self.profileData   =   data['result']['details'];
            self.profileData.country = (!!self.profileData.country) ? self.profileData.country:'India';
            //console.log('profileData', this.profileData);
          }else{
            let error = data['error'];
            self.alertS.errAlert(error);
            self.eS.errorFunc(error);
          }
        }
      )
    }
    catch(err) {
      self.alertS.errAlert(err.message);
    }    
  }

  onCountryChange(cI){
    this.stateList = this.cS.getState(cI);
    //console.log(this.stateList)
  }

  /* editProfile(){
    console.log(this.profileData)
  } */

  editProfile(){    
    let self = this;
    self.loading = true;
    //self.pageLoading = true;
    let editPV = this.profileData;
    try {
      self.pS.updateProfile(editPV).subscribe(
        data => {
          let resData = data['status'];
          //console.log(data);
          if(resData == "true"){
            let msg = data['result']['message'];
            self.alertS.succAlert(msg);
            self.loading = false;
            self.router.navigate(['/Profile']);
            //self.pageLoading = false;
          }else{
            self.loading = false;
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
