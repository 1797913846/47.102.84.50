import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  detail: any;
  constructor(public data: DataService) { }

  ngOnInit() {
    this.detail = JSON.parse(this.data.getSession('transactionDetail'));
  }

  back() {
    this.data.back();
  }

}
