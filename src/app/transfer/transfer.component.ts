import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  backableScale: any;
  liftScale: string;
  constructor(public data: DataService, public http: HttpService) {
    this.backableScale = this.data.getSession('backscale');
    this.liftScale = '';
  }

  ngOnInit() {
  }
  back() {
    this.data.back();
  }

  withdraw() {
    // tslint:disable-next-line:max-line-length
    if (this.liftScale === '' || parseFloat(this.liftScale) <= 0 || this.data.Decimal(this.liftScale) > 2) {
      this.data.ErrorMsg('提现金额必须大于0，最多两位小数');
    } else if (this.liftScale > this.backableScale) {
      this.data.ErrorMsg('提现金额不能大于余额');
    } else {
      const data = {
        liftScale: this.liftScale
      };
      this.data.loading = this.data.show;
      this.http.withdraw(data).subscribe(res => {
        this.data.ErrorMsg('提现申请已提交');
        setTimeout(() => {
          history.go(-2);
        }, 1000);
      }, err => {
        this.data.error = err.error;
        this.data.isError();
      }, () => {
        this.data.loading = this.data.hide;
      });
    }
  }
}
