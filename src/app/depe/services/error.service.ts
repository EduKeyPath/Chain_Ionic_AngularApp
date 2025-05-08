import { Injectable } from '@angular/core';
import { LoginSService } from './login-s.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(private logS:LoginSService, private router : Router) { }

  errorFunc(data){      
    if (data == 'Outdated'){
      this.logS.userLogout();
    }else if(data == 'Unauthorised Access'){
      this.logS.userLogout();
    }else{
        console.log(data);
    }
  }




}
