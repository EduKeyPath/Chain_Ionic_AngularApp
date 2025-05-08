import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../depe/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  totalCartItems;
  cartItems;
  //totalItems = 0;
  totalPrice;

  constructor(private cartService : CartService) {
    this.cartService.totalCartItems$.subscribe(totalItems => this.totalCartItems = totalItems);
    this.cartService.totalCartPrice$.subscribe(totalPrice => this.totalPrice = totalPrice);
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.cartItems;
    //console.log('this.cartItems', this.cartItems);
  }

  subtractQty(cId){
    //console.log(cId, this.cartItems[cId]);
    let qty   = this.cartItems[cId].qty;
    if(qty>1){
      this.cartItems[cId].qty = qty - 1;
      this.cartItems[cId].amount = this.cartItems[cId].price * this.cartItems[cId].qty;
    }
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartService.updateCount();
    //this.cartService.updateCartPrice();
  }

  addQty(cId){
    //console.log(cId, this.cartItems[cId]);
    let qty   = this.cartItems[cId].qty;
    if(qty<10){
      this.cartItems[cId].qty = qty + 1;
      this.cartItems[cId].amount = this.cartItems[cId].price * this.cartItems[cId].qty;
    }      
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartService.updateCount();
    //this.cartService.updateCartPrice();
  }

  removeItem(index){
    this.cartService.removeItemFromCart(index);
  }

}
