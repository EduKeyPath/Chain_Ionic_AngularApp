import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../../depe/services/contact.service';
import { ErrorService } from '../../../depe/services/error.service';
import { AlertService } from '../../../depe/services/alert.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html'
})
export class GroupDetailsComponent implements OnInit {
  
  searchText;
  //updateGroupForm:FormGroup;
  showloader:boolean = false;
  loading = false;
  pageLoading = false;
  showAddMemPopup = false;
  showEditGroupNamePopup = false;
  groupId:any;
  getGroupDetailsData;
  groupName:string = '';
  groupMultiple;
  contactList = [];
  selectMemContact = [];
  selectedContactData = [];
  selNumbers    = [];

  constructor(
    private eS:ErrorService, 
    private cS : ContactService, 
    private aR:ActivatedRoute, 
    private fB:FormBuilder,
    private alertS:AlertService
  ) { }

  ngOnInit(): void {
    this.aR.params.subscribe((item) => {this.groupId = item.id})
    //console.log('onin', this.groupId);
    this.getGroupDetails(this.groupId);
    /* this.getGroupDetailsData = this.cS.groupDetailsData;
    console.log(this.getGroupDetailsData); */
  }

  getGroupDetails(gId){
    //console.log('grp', gId);
    let self = this;
    self.showloader = true;
    try {
      self.cS.getGroupDetails(gId).subscribe(
        data => {
          //console.log(data);
          let resData = data['status'];
          //console.log(resData);
          if(resData == "true"){
            self.getGroupDetailsData = data['result']['details'];
            self.groupName = self.getGroupDetailsData.name;
            self.groupMultiple = self.getGroupDetailsData.multiple;
            self.showloader = false;
            self.selNumbers     = [];
            (self.getGroupDetailsData.members || []).forEach((member) => {
              self.selNumbers = self.selNumbers.concat(member.numbers);
            })
          }else{
            self.showloader = false;
            let error = data['error'];
            self.alertS.errAlert(error);
            self.eS.errorFunc(error);
          }
        }
      )
    }
    catch(err) {
      self.showloader = false;
      self.alertS.errAlert(err.message);
    }    
  }

  addMember(){
    this.showAddMemPopup = true;
    //this.contactList = this.cS.mobileContactList;
    this.contactList    = [];
    //console.log(this.contactList);
    //console.log(this.selNumbers);
    (this.cS.mobileContactList || []).forEach((contact, k) => {
      //console.log(k, contact.displayName);
      //console.log('Loop : ', contact);
      let index = (contact.phoneNumbers || []).findIndex((item) => {
        item  = item.value.replace(/\s/g, '');
        item  = item.substr(item.length - 10);
        console.log('Item : ', item, contact.displayName);
        return this.selNumbers.includes(item);
      });
      //console.log('Item : ', index, contact.displayName);
      //if(index > -1) {
        /* this.selectMemContact.push(contact.id);
        let num = contact['phoneNumbers'].map((item) => item.value);
        this.selectedContactData.push({
          key: contact.id,
          name: contact['displayName'],
          numbers: num.join(',')
        }) */
        //console.log(index, this.contactList);
        //this.contactList.splice(k, 1);
        //console.log(index, this.contactList);
      //}
      if(index === -1) {
        this.contactList.push(contact);
      }
    })
    //console.log('Updated Contact : ', this.contactList);
  }
  hideMemberPopup(){
    this.selectedContactData = [];
    this.searchText = '';
    this.showAddMemPopup = false;
    this.contactList = this.cS.mobileContactList;
  }
  
  removeMember(id){
    let detailsId = [id];    
    let self = this;    
    try {
      if(confirm('Are sure want to remove this member')){
        self.pageLoading = true;
        self.cS.removeGroupMember(detailsId).subscribe(
          data => {
            let resData = data['status'];
            //console.log(data);
            if(resData == "true"){
              self.ngOnInit();
              self.pageLoading = false;
              self.getGroupDetails(this.groupId);
              let msg = data['result']['message'];
              self.alertS.succAlert(msg);
            }else{
              //self.loading = false;
              self.pageLoading = false;
              let error = data['error'];
              self.alertS.errAlert(error);
              self.eS.errorFunc(error);
            }
          }
        )
      }
    }
    catch(err) {
      self.pageLoading = false;
      self.alertS.errAlert(err.message);
    }
  }

  editGroupName(){
    this.showEditGroupNamePopup = true;
  }
  hideEditGroupNamePopup(){
    this.showEditGroupNamePopup = false;
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
