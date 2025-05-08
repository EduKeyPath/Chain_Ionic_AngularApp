import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../config/config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient, private router : Router) {
  }

  getProductsList(){
    return this.http.get(config.serviceUrl +'data.php?act=gallery&section=products');
  }

  getProductsDetails(pIds){
    let objData = {productIds : pIds}
    return this.http.post(config.serviceUrl +'data.php?act=gallery&section=productListByIds', objData);
  }

  downloadImages(pIds){
    let objData = {productIds : pIds}
    return this.http.post(config.serviceUrl +'data.php?act=gallery&section=saveImages', objData);
  }

  uploadProducts(productImg){
    let objData = {...productImg}
    return this.http.post(config.serviceUrl +'data.php?act=gallery&section=upload', objData);
  }

  deleteProduct(pIds){
    let objData = {...pIds}
    return this.http.post(config.serviceUrl +'data.php?act=gallery&section=deleteProduct', objData);
  }
  
}
