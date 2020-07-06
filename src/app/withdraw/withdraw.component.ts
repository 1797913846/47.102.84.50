import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  backableScale: any;
  constructor(public data: DataService, public http: HttpService) {
    this.backableScale = this.data.getSession('backscale');
  }

  ngOnInit() {

  }

  back() {
    this.data.back();
  }

  goto(url) {
    if (url === 'card') {
      this.data.setSession('updateCard', false);
    }
    this.data.goto(url);
  }
}
