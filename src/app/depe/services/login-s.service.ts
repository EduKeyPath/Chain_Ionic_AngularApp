import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../config/config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginSService {
  userRegId = {};
  newUserToken = '';
  newUserRegIsError = false;
  
  constructor(private http : HttpClient, private router : Router) { 
    
  }
  
  newUserReg(signUpFV){    
    delete signUpFV['confirmPassword'];
    delete signUpFV['acceptTerms'];
    let objData = {...signUpFV}
    return this.http.post(config.serviceUrl +'data.php?act=auth&section=signUp', objData)
  }

  userVerify(verifyFV){
    let uId = localStorage.getItem('userId');
    let objData = {...verifyFV, userId : uId}
    return this.http.post(config.serviceUrl + 'data.php?act=auth&section=verifyOTP', objData);
  }

  resendOtp(){
    let uId = localStorage.getItem('userId');
    let objData = {userId : uId}
    return this.http.post(config.serviceUrl + 'data.php?act=auth&section=resendOTP', objData);
  }

  userLogin(objData){
    return this.http.post(config.serviceUrl + 'data.php?act=auth&section=signIn', objData)
  }

  userLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    localStorage.removeItem('userId');
  }
  
}
