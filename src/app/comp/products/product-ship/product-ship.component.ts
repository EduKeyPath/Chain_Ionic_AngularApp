import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { CountryService } from '../../../depe/services/country.service';
import { ProfileService } from '../../../depe/services/profile.service';
import { OrderService } from '../../../depe/services/order.service';
import { CartService } from '../../../depe/services/cart.service';
import { ErrorService } from '../../../depe/services/error.service';
import { AlertService } from '../../../depe/services/alert.service';

@Component({
  selector: 'app-product-ship',
  templateUrl: './product-ship.component.html'
})
export class ProductShipComponent implements OnInit {
  profileData;
  totalCartItems;
  totalPrice;
  productShipForm:FormGroup;
  loading = false;
  pageLoading = false;
  submitted = false;
  contryList = [];
  stateList = [];
  adrsChecked: boolean = true;
  

  constructor(
    private pS:ProfileService,
    private eS:ErrorService,
    private cartService:CartService, 
    private fB:FormBuilder,
    private oS : OrderService,
    private cS:CountryService,
    private router : Router,
    private alertS:AlertService
  ) 
  {
    this.cartService.totalCartItems$.subscribe(totalItems => this.totalCartItems = totalItems);
    this.cartService.totalCartPrice$.subscribe(totalPrice => this.totalPrice = totalPrice);
    this.contryList = this.cS.getContry();
  }

  ngOnInit(): void {
    this.profileDetails();
    this.productShipForm = this.fB.group({
      name : ['', Validators.required],
      mobile : ['', Validators.required],
      altMobile : [''],
      email : [''],
      address : ['', Validators.required],
      country : ['India', Validators.required],
      state : ['', Validators.required],
      city : ['', Validators.required],
      pincode : ['', Validators.required],
      comment : ['']
    })
  }

  profileDetails(){
    let self = this;    
    try {
      this.pS.getProfileDetails().subscribe(
        data => {
          //console.log(data);
          let resData = data['status'];
          if(resData == "true"){
            this.profileData   =   data['result']['details'];
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

  get psF(){
    return this.productShipForm.controls;
  }

  onCountryChange(cI){
    this.stateList = this.cS.getState(cI);
  }
  changeChbxValue(value) {
    this.adrsChecked = !value;
    //console.log(this.adrsChecked)
  }


  makeOrder(){
    if(this.adrsChecked == false){
      let self = this;    
      try {
        if(!!self.profileData  && self.profileData.address && self.profileData.pincode){
          self.loading = true;
          //self.pageLoading = true;
          self.submitted = true;     
          let shipFV = this.profileData;
          delete shipFV['createdOn'];
          delete shipFV['modifiedOn'];
          delete shipFV['timezone'];
          //console.log(shipFV);
          self.oS.placeOrder(shipFV).subscribe(
            data => {
              //console.log(data);
              const dataRes = data['status'];
              if(dataRes == 'true'){
                  this.cartService.emptyCart();
                  self.router.navigate(['/Products/PlaceOrder']);                  
              }else{
                self.loading = false;
                //self.pageLoading = false;
                let error = data['error'];
                self.alertS.errAlert(error);
                self.eS.errorFunc(error);
              }
            }
          );
        }
      }
      catch(err) {
        self.loading = false;
        self.alertS.errAlert(err.message);
      }
    }else {
      let self = this;    
      try {
        if(self.productShipForm.valid){
          self.loading = true;
          //self.pageLoading = true;
          self.submitted = true;     
          let shipFV = self.productShipForm.value;
          //console.log(shipFV);
          self.oS.placeOrder(shipFV).subscribe(
            data => {
              //console.log(data);
              const dataRes = data['status'];
              if(dataRes == 'true'){
                  self.cartService.emptyCart();
                  self.router.navigate(['/Products/PlaceOrder']);
              }else{
                self.loading = false;
                //self.pageLoading = false;
                let error = data['error'];
                self.eS.errorFunc(error);
                self.alertS.errAlert(error);
              }
            }
          );
        }
      }
      catch(err) {
        self.loading = false;
        self.alertS.errAlert(err.message);
      }
    }
  }
  
}
