import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import config from '../config/config';
import { ErrorService } from '../../depe/services/error.service';
import { AlertService } from '../../depe/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notficationData = [];

  private notficationList: BehaviorSubject<any> = new BehaviorSubject<any>(this.notficationData);
  public notficationList$: Observable<string> = this.notficationList.asObservable();

  constructor(
    private http : HttpClient, 
    private eS:ErrorService, 
    private alertS:AlertService
  ) {
    
  }

  getNotification(){
    let self = this;
    try {
      this.http.get(config.serviceUrl +'data.php?act=order&section=getNotification').subscribe(
        data => {
          let resData = data['status'];
          if(resData == "true"){
            let notiList  =  data['result']['list'];
            let notfiData = notiList.map(item => {
              let msg = '';
              let url = '';
              let notifyIcon = '';
              let tz = item.timezone;
              let cO = item.createdOn;
              let notiStatus = item.status;
              let params = item.params || {};
              let vendor = params.vendorName || params.vendorBrandName;
  
              switch(item.title){
                /** Vendor Notification **/
  
                case 'New Order' :
                  msg = `${params.customerName} has placed an order of Amount ${params.orderAmount} and order no. is ${params.orderNumber}.`;
                  url = `/Orders/ReceivedOrders/${params.orderId}`;
                  notifyIcon = 'shopping_cart'
                break;
  
                case 'Order Cancelled' :
                  msg = `${params.customerName} has cancelled order ${params.orderNumber}.`;
                  url = `/Orders/ReceivedOrders/${params.orderId}`;
                  notifyIcon = 'backspace'
                break;
  
                case 'Payment Sent' :
                  msg = `${params.customerName} has paid amount ${params.orderAmount} for order no. ${params.orderNumber} via ${params.modeOfPayment}`;
                  url = `/Orders/ReceivedOrders/${params.orderId}`;
                  notifyIcon = 'credit_card'
                break;
  
                /** Customer Notification **/
                case 'Products Shared' :
                  msg = `${vendor} has shared images with you.`;
                  url = `/Products/ProductList/${params.vendorId}/${params.vendorName}/${params.vendorBrandName}`;
                  notifyIcon = 'share'
                break;
  
                case 'Order Delivered' :
                  msg = `Order no ${params.orderNumber} has been delivered.`;
                  url = `Orders/PlacedOrders/${params.orderId}`;
                  notifyIcon = 'local_shipping'
                break;
  
                case 'Order Shipped' :
                  msg = `Order no ${params.orderNumber} has been Shipped. Courier name is ${params.courier} and Tracking no. is ${params.trackingId}.`;
                  url = `Orders/PlacedOrders/${params.orderId}`;
                  notifyIcon = 'airport_shuttle'
                break; 
  
                case 'Payment Rejected' :
                  msg = `${vendor} has not received your payment of order no ${params.orderNumber}, Transaction id is ${params.transactionId}.`;
                  url = `Orders/PlacedOrders/${params.orderId}`;
                  notifyIcon = 'money_off'
                break;
  
                case 'Payment Verified' :
                  msg = `${vendor} has received your payment of order no ${params.orderNumber}, Transaction id is ${params.transactionId}.`;
                  url = `Orders/PlacedOrders/${params.orderId}`;
                  notifyIcon = 'account_balance_wallet'
                break;                
  
                case 'Order Rejected' :
                  msg = `${vendor} has rejected your order ${params.orderNumber}.`;
                  url = `Orders/PlacedOrders/${params.orderId}`;
                  notifyIcon = 'thumb_down_alt'
                break;
  
                case 'Order Approved' :
                  msg = `${vendor} has approved your order ${params.orderNumber}.`;
                  url = `Orders/PlacedOrders/${params.orderId}`;
                  notifyIcon = 'thumb_up_alt'
                break;
              }
              return {
                notificationMsg : msg,
                pageUrl : url,
                timeZone : tz,
                time : cO,
                icon : notifyIcon,
                status : notiStatus
              }  
            })

            self.notficationList.next(notfiData);

          }else{
            let error = data['error'];
            self.alertS.errAlert(error);
            self.eS.errorFunc(error);
          }
        }
      )
    }
    catch(err) {
      self.alertS.errAlert(err.message);
    }    
  }

}
