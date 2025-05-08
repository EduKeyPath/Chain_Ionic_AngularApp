import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = {
    vendorId : 0,
    totalPrice : 0,
    totalItems : 0,
    items : []
  }
  storedCartItems = localStorage.getItem('cart');
  localCart: any = (this.storedCartItems)?JSON.parse(this.storedCartItems):this.cart;
  cartItems : any = this.localCart.items || [];
  cartCount : any = this.cartItems.map((item) => item.qty).reduce((prev, curr) => {
    return prev + curr;
  }, 0);
  private totalCartItems: BehaviorSubject<string> = new BehaviorSubject<string>(this.cartCount);
  public totalCartItems$: Observable<string> = this.totalCartItems.asObservable();

  cartPrice : any = this.cartItems.map((item) => item.price*item.qty).reduce((prev, curr) => {
    return prev + curr;
  }, 0);
  private totalCartPrice: BehaviorSubject<string> = new BehaviorSubject<string>(this.cartPrice);
  public totalCartPrice$: Observable<string> = this.totalCartPrice.asObservable();
  
  constructor() { }

  getCartItems(){
    return this.cartItems;
  }

  addToCart(productDtls, multiCode, iPath, vID, bCode){
    let product   = {...productDtls};
    this.localCart.vendorId = vID;
    localStorage.setItem('cart', JSON.stringify(this.localCart));
    product.qty     = (product.qty)?product.qty+1:1;
    product.brandC  = bCode;
    product.imgPath = iPath;
    let index       = this.cartItems.findIndex((cart) => {
      return (cart.id === product.id);
    })
    if(index>=0){
      this.cartItems[index].qty       = this.cartItems[index].qty+product.qty;
      this.cartItems[index].amount     = (this.cartItems[index].amount + (product.price * multiCode * product.qty));
    }else{
      product.pCode     = product.price;
      product.price     = product.price * multiCode;
      product.amount    = product.price * product.qty;
      this.cartItems.push(product);
    }
    this.updateCount();
  }

  removeItemFromCart(index){
    if(confirm('Do you really want to remove this item from your cart?')){
      this.cartItems.splice(index, 1);
      this.updateCount();
    }
  }

  updateCount(){
    this.cartCount  = this.cartItems.map((item) => item.qty).reduce((prev, curr) => prev+curr, 0);
    this.cartPrice  = this.cartItems.map((item) => item.price*item.qty).reduce((prev, curr) => {
      return prev + curr;
    }, 0);
    this.totalCartItems.next(this.cartCount);
    this.totalCartPrice.next(this.cartPrice);
    this.localCart = {
      ...this.localCart,
      totalPrice : this.cartPrice,
      totalItems : this.cartCount,
      items : this.cartItems
    };
    localStorage.setItem('cart', JSON.stringify(this.localCart));
  }

  emptyCart(){
    localStorage.removeItem('cart');
    this.localCart  = this.cart;
    this.cartItems  = [];
    this.cartCount  =  0;
    this.updateCount();
  }
  
}
