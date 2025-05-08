import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  
  constructor(private router : Router) {
    if(!!localStorage.getItem('token')){
      this.router.navigate(['/Dashboard']);
    }
  }

  ngOnInit() {}

}
