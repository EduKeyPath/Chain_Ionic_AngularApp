import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {
  public pageName: string;

  constructor() { }

  ngOnInit() {
    const path = window.location.pathname.split('/')[1];
    this.pageName = path;
  }
}
