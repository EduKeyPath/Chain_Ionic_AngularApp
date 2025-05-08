import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../depe/services/content.service';
import { ErrorService } from '../../../depe/services/error.service';
import { AlertService } from '../../../depe/services/alert.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html'
})
export class PrivacyComponent implements OnInit {
  privacyContent;
  showloader = true;

  constructor(private alertS:AlertService, private cS:ContentService, private eS : ErrorService) { }

  ngOnInit() {
    this.getTermsData();
  }

  getTermsData(){
    try {
      this.cS.getContent('privacypolicy').subscribe(data => {
        if(data['status'] == 'true'){
          this.showloader = false;
          this.privacyContent = data['result']['details']['desc'];
        }else{
          this.showloader = false;
          let error = data['error'];
          this.alertS.errAlert(error);
          this.eS.errorFunc(error);
        }
      })
    }
    catch(err) {
      this.showloader = false;
      this.alertS.errAlert(err.message);
    }
  }

}
