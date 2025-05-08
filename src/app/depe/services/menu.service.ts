import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  currentMenu = []; 

  afterLoginMenu = [
    {
      title: 'Dashboard',
      url: '/Dashboard',
      icon: 'store'
    },
    {
      title: 'Notification',
      url: '/Notification',
      icon: 'notifications'
    },
    {
      title: 'Contacts',
      url: '/Contacts',
      icon: 'account_box'
    },
    {
      title: 'Groups',
      url: '/Groups',
      icon: 'group'
    },
    {
      title: 'Products',
      url: '/Products',
      icon: 'shop'
    },
    {
      title: 'My Cart',
      url: '/Products/Cart',
      icon: 'shopping_basket'
    },
    {
      title: 'Profile',
      url: '/Profile',
      icon: 'account_circle'
    },
    {
      title: 'Orders',
      url: '/Orders',
      icon: 'storefront'
    },
    {
      title: 'Terms & Conditions',
      url: '/Contents/Terms',
      icon: 'description'
    },
    {
      title: 'Privacy Policy',
      url: '/Contents/Privacy',
      icon: 'description'
    },
    {
      title: 'Support / Suggestion',
      url: '/Contents/Support',
      icon: 'contact_mail'
    },
    {
      title: 'Help',
      url: '/Contents',
      icon: 'live_help'
    },
    {
      title: 'Logout',
      type : 'func',
      url: '/',
      icon: 'lock'
    }
  ];

  beforeLoginMenu = [
    {
      title: 'Login',
      url: '/User',
      icon: 'lock_open'
    },
    {
      title: 'Register',
      url: '/User/Register',
      icon: 'how_to_reg'
    },
    {
      title: 'Terms & Conditions',
      url: '/Contents/Terms',
      icon: 'description'
    },
    {
      title: 'Privacy Policy',
      url: '/Contents/Privacy',
      icon: 'description'
    },
    {
      title: 'Support / Suggestion',
      url: '/Contents/Support',
      icon: 'contact_mail'
    },
    {
      title: 'Help',
      url: '/Contents',
      icon: 'live_help'
    }
  ];

  private menuList: BehaviorSubject<any> = new BehaviorSubject<any>(this.currentMenu);
  public menuList$: Observable<string> = this.menuList.asObservable();

  constructor() {
  }

  loggedInMenu(){
    this.menuList.next(this.afterLoginMenu);
  }

  loggOutMenu(){
    this.menuList.next(this.beforeLoginMenu);
  }

}
