import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http : HttpClient) {
  }
  
  getContent(pageName){
    return this.http.get(config.serviceUrl +'data.php?act=content&section='+pageName);
  }





}
