import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import config from '../../../depe/config/config';

@Component({
  selector: 'app-unauthorised',
  templateUrl: './unauthorised.component.html'
})
export class UnauthorisedComponent implements OnInit {
  logo = config.logoAlt;
  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  backToLogin(){            
    this.router.navigate(['/User/Login']);
  }

}
