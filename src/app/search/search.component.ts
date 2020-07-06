import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  date: string;
  drwt: DataService['drwt'];
  list: any;

  constructor(public data: DataService, public http: HttpService) {
  }

  ngOnInit() {
    this.date = this.data.getSessionOrParam('searchDate', this.data.getTime('yyyy-MM-dd', new Date()));
    this.data.setSession('searchDate', this.date);
    this.getOrder();
    this.data.intervalAppoint = setInterval(() => {
      this.getOrder();
    }, 3000);
  }

  getOrder() {
    this.http.getAppoint('date=' + this.data.getTime('yyyyMMss', this.date)).subscribe((res) => {
      this.list = res;
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    }, () => {
      this.data.Loading(this.data.hide);
    });
  }

  goto(data) {
    this.data.nowUrl = '';
    this.data.setSession('transactionDetail', JSON.stringify(data));
    this.data.goto('detail');
  }

  change() {
    if (!this.data.isNull(this.date)) {
      this.data.setSession('searchDate', this.date);
      this.getOrder();
    }
  }

}

