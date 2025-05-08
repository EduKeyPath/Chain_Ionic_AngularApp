import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../../../depe/services/contact.service';
import { ErrorService } from '../../../depe/services/error.service';
import { AlertService } from '../../../depe/services/alert.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html'
})
export class AddGroupComponent implements OnInit {
  searchText;
  searchbar = false;
  addGroupForm:FormGroup;
  submitted = false;
  loading = false;
  pageLoading = false;
  groupData = [];
  contactList = [];
  selectedContactList = [];
  selectContact = [];
  selectedContactData = [];

  constructor(
    private router:Router, 
    private eS:ErrorService, 
    private fB:FormBuilder, 
    private cS : ContactService,
    private alertS:AlertService
  ) { }

  ngOnInit(): void {
    this.addGroupForm = this.fB.group({
      name : ['', Validators.required],
      multiple : [''] 
    });    
    this.contactList = this.cS.mobileContactList;
    //console.log('contatc List', this.contactList);    
  }

  showSearchBar(){
    this.searchbar = true;
  }
  hideSearchBar(){
    this.searchbar = false;
    this.searchText = '';
    this.contactList = this.cS.mobileContactList;
  }

  selectContactForGroup(data) {
    if(this.selectContact.includes(data.id)){
      let index = this.selectContact.indexOf(data.id)
      this.selectContact.splice(index,1);
      this.groupData.splice(index,1);
    }else {
      this.selectContact.push(data.id);
      let num = data['phoneNumbers'].map((item) => {
        item  = item.value.replace(/\s/g, '');
        item  = item.substr(item.length - 10);
        return item;
      })
      this.groupData.push({
        key : data.id,
        name: data['displayName'],
        numbers: num.join(',')
      })
    }
    //console.log(this.selectContact, this.groupData);
  }
  removeSelContact(i:number, key){
    this.groupData.splice(i,1);
    let index = this.selectContact.indexOf(key);
    this.selectContact.splice(index,1);
  }

  addGroup(){    
    let self = this;
    try {
      if(self.groupData.length == 0){
        self.alertS.errAlert('Please select any contact');
      }        
      if(self.addGroupForm.valid && self.groupData.length != 0){
        self.loading = true;
        //self.pageLoading = true;
        self.submitted = true;
        let addGroupFV = this.addGroupForm.value;
        self.cS.createGroup(addGroupFV, self.groupData).subscribe(
          data => {
            let resData = data['status'];
            //console.log(data);
            if(resData == "true"){
              let msg = data['result']['message'];
              self.alertS.errAlert(msg);
              self.loading = false;
              //self.pageLoading = false;
              self.groupData = [];
            }else{
              self.loading = false;
              //self.pageLoading = false;
              let error = data['error'];
              self.alertS.errAlert(error);
              self.eS.errorFunc(error);
            }
          }
        )
      }
    }
    catch(err) {
      self.loading = false;
      self.alertS.errAlert(err.message);
    }    
  }

  contactFilter(event:any){
    let self = this;
    let searchTxt = event.target.value;
    let contacts = self.cS.mobileContactList;
    //console.log(searchTxt);
    if(!!searchTxt){
      //console.log('!!searchTxt', !!searchTxt);
      if(contacts.length > 0){
          self.contactList = contacts.filter(item => {
          //console.log(item)
          return item.displayName.toLowerCase().includes(searchTxt.toLowerCase());
        });
      }
    }else{
      self.contactList = self.cS.mobileContactList;
    }
  }


}
