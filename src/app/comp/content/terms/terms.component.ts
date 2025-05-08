import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../depe/services/content.service';
import { ErrorService } from '../../../depe/services/error.service';
import { AlertService } from '../../../depe/services/alert.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html'
})
export class TermsComponent implements OnInit {
  termsContent;
  showloader = false;

  constructor(
    private cS:ContentService, 
    private eS : ErrorService,
    private alertS:AlertService
  ) { }

  ngOnInit() {
    this.getTermsData();
  }

  getTermsData(){
    let self = this; 
    self.showloader = true;
    try {
      self.cS.getContent('termsnconditions').subscribe(data => {
        //console.log(data);     
        if(data['status'] == 'true'){
          self.showloader = false;
          self.termsContent = data['result']['details']['desc'];
          //console.log(self.termsContent);
        }else{
          self.showloader = false;
          let error = data['error'];
          self.alertS.errAlert(error);
          self.eS.errorFunc(error);
        }
      })
    }
    catch(err) {
      self.showloader = false;
      self.alertS.errAlert(err.message);
    }
  }
  
}
