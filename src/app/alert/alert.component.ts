import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  errMsg = '';

  constructor(public data: DataService) {
    this.errMsg = this.data.errMsg;
  }

  ngOnInit() {
  }

}
