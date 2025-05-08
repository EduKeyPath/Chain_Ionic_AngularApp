import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html'
})
export class PlaceOrderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.removeItem('cart');
  }
}
