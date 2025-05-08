import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import config from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : HttpClient, private router : Router) {
  }

  placeOrder(shipFV){
    let storCcart = JSON.parse(localStorage.getItem('cart'));
    let cartItems = storCcart.items || [];
    let items = [];
    cartItems.forEach(element => {
      delete element['createdOn'];
      delete element['image'];
      delete element['imgPath'];
      delete element['modifiedOn'];
      delete element['timezone'];
      items.push(element)
    });
    let cart = {
      items,
      totalItems: storCcart.totalItems,
      totalPrice: storCcart.totalPrice,
      vendorId : storCcart.vendorId
    }
    let shipping = shipFV;
    let objData = {cart, shipping}
    return this.http.post(config.serviceUrl +'data.php?act=order&section=placeOrder', objData);
  }

  approveOrder(aoData, oId){
    let aD = {shippingAmount : aoData, orderId : oId}
    let objData = {...aD}
    return this.http.post(config.serviceUrl + 'data.php?act=order&section=approveOrder', objData)
  }

  rejectOrder(roData, oId){
    let rD = {reason : roData, orderId : oId}
    let objData = {...rD}
    return this.http.post(config.serviceUrl + 'data.php?act=order&section=rejectOrder', objData)
  }

  paymentVerify(pvData, oId){
    let pvD = {...pvData, orderId : oId}
    let objData = {...pvD}
    return this.http.post(config.serviceUrl + 'data.php?act=order&section=paymentVerify', objData)
  }

  shippedOrder(soData, oId){
    let sD = {...soData, orderId : oId}
    let objData = {...sD}
    return this.http.post(config.serviceUrl + 'data.php?act=order&section=shippedOrder', objData)
  }

  getPlacedOrderList(){
    return this.http.get(config.serviceUrl +'data.php?act=order&section=placedOrderHistory');
  }

  cancelOrder(coData, oId){
    let coD = {reason : coData, orderId : oId}
    let objData = {...coD}
    return this.http.post(config.serviceUrl + 'data.php?act=order&section=cancelOrder', objData)
  }
}
