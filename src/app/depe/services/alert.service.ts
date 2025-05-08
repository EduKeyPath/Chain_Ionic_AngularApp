import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  succAlert(msg){
    document.getElementById('alertMsg').innerHTML = `<div class="alert alert-success">
        ${msg}
    </div>`;
    document.getElementById('alertMsg').style.display = 'flex';
    setTimeout(function(){ 
      document.getElementById('alertMsg').style.display = 'none';           
    }, 3000);
  }

  errAlert(msg){
    document.getElementById('alertMsg').innerHTML = `<div class="alert alert-danger">
        ${msg}
    </div>`;
    document.getElementById('alertMsg').style.display = 'flex';
    setTimeout(function(){ 
      document.getElementById('alertMsg').style.display = 'none';           
    }, 3000);
  }
    
}
