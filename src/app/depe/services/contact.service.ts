import { Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../config/config';
import { Router } from '@angular/router';
declare var device;
declare var navigator: any;
declare var plugins: any;

declare var Contact: any;

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  mobileContactList: any = [
    {id : 4, displayName : 'Test 1', phoneNumbers : [{value : '242424242424'}]},
    {id : 5, displayName : 'Test 2', phoneNumbers : [{value : '242424242424'}]},
    {id : 6, displayName : 'Test 3', phoneNumbers : [{value : '242424242424'}]},
    {id : 7, displayName : 'Test 4', phoneNumbers : [{value : '242424242424'}]},
    {id : 8, displayName : 'Test 5', phoneNumbers : [{value : '242424242424'}]},
    {id : 9, displayName : 'Test 6', phoneNumbers : [{value : '242424242424'}]},
    {id : 10, displayName : 'Test 7', phoneNumbers : [{value : '242424242424'}]},
    {id : 11, displayName : 'Test 8', phoneNumbers : [{value : '242424242424'}]},
    {id : 12, displayName : 'Test 9', phoneNumbers : [{value : '242424242424'}]},
    {id : 13, displayName : 'Test 10', phoneNumbers : [{value : '242424242424'}]}
  ];

  constructor(private http : HttpClient, private router : Router) {
    
  }

  createGroup(addGroupFV, groupData){
    let objData = {...addGroupFV, contacts: groupData}
    return this.http.post(config.serviceUrl + 'data.php?act=groups&section=addGroup', objData)
  }

  getContactList() {
    return this.mobileContactList;
  }

  getGroupList(){
    return this.http.get(config.serviceUrl +'data.php?act=groups&section=groupList');
  }

  addGroupMember(addGM, grpId){
    let objData = {contacts: addGM, groupId:grpId}
    return this.http.post(config.serviceUrl + 'data.php?act=groups&section=addMembers', objData)
  }

  removeGroupMember(memId){
    let objData = {detailsId: [...memId]}
    return this.http.post(config.serviceUrl + 'data.php?act=groups&section=deleteMembers', objData)
  }


}
