import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../config/config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http : HttpClient, private router : Router) {
  }

  getProfileDetails(){    
    return this.http.get(config.serviceUrl +'data.php?act=profile&section=getDetails');
  }

  updateProfile(objData){
    return this.http.post(config.serviceUrl + 'data.php?act=profile&section=editProfile', objData);
  }

  userChangePass(objData){
    return this.http.post(config.serviceUrl + 'data.php?act=profile&section=changePassword', objData);
  }

  



}
