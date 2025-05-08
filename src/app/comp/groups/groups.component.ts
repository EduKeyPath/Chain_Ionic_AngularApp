import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { ContactService } from '../../depe/services/contact.service';
import { ErrorService } from '../../depe/services/error.service';
import { AlertService } from '../../depe/services/alert.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html'
})
export class GroupsComponent implements OnInit {
  groupList;
  showloader = true;
  noData:boolean = false; 

  constructor(
    private eS:ErrorService, 
    private cS : ContactService,
    private alertS:AlertService
  ) {
  }

  ngOnInit(): void {
    this.getContactGroupList();
  }
  
  getContactGroupList(){
    let self = this;
    self.showloader = true;
    try {      
      self.cS.getGroupList().subscribe((data) => {
        if(data['status'] == 'true' && !!data['result'] && data['result']['list'].length > 0){
          self.showloader = false;
          self.groupList = data['result']['list'];
          //console.log(this.groupList);
        }else{
          self.noData = true;
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
