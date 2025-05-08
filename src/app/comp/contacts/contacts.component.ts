import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../depe/services/contact.service';
import { AlertService } from '../../depe/services/alert.service';

declare var device;
declare var navigator: any;
declare var Contact: any;
declare var plugins: any;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit {
  searchText: string;
  searchbar = false;
  mobileContactList = [];
  showloader = false; 

  constructor(private cS : ContactService, private alertS:AlertService) {
  }

  ngOnInit(): void {
    this.mobileContactList = this.cS.mobileContactList;
  }
  
  showSearchBar(){
    this.searchbar = true;
  }
  hideSearchBar(){
    this.searchbar = false;
    this.searchText = '';
    this.mobileContactList = this.cS.mobileContactList;
  }

  contactFilter(event:any){
    try {
      let self = this;
      let searchTxt = event.target.value;
      let contacts = self.cS.mobileContactList;
      if(!!searchTxt){
        if(contacts.length > 0){
            self.mobileContactList = contacts.filter(item => {
            return item.displayName.toLowerCase().includes(searchTxt.toLowerCase());
          });
        }
      }else{
        self.mobileContactList = self.cS.mobileContactList;
      }
    }
    catch(err) {      
      this.alertS.errAlert(err.message);
    }
  }

}
