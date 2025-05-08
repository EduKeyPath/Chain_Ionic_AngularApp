import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../depe/services/content.service';
import { ErrorService } from '../../../depe/services/error.service';
import { AlertService } from '../../../depe/services/alert.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html'
})
export class HelpComponent implements OnInit {
  public pageName: string;
  panelOpenState = false;
  showloader = true;
  helpContent;

  constructor(private alertS:AlertService, private cS:ContentService, private eS : ErrorService) { }

  ngOnInit() {
    const path = window.location.pathname.split('/')[2];
    this.pageName = path;
    this.getHelpData();
  }

  getHelpData(){
    try {
      this.cS.getContent('help').subscribe(data => {
        //console.log(data);     
        if(data['status'] == 'true'){
          this.showloader = false;
          this.helpContent = data['result']['list'];
          //console.log(this.helpContent);
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
