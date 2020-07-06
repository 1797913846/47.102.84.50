import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
declare var layer: any;
@Component({
  selector: 'app-chujin',
  templateUrl: './chujin.component.html',
  styleUrls: ['./chujin.component.css']
})
export class ChujinComponent implements OnInit {
  reduceScale = 'true';
  reCashScale: number;
  amount: number;
  cashScale = 0;
  cashScale2 = 0;
  ableTakeoutScale: number;
  constructor(public data: DataService, public http: HttpService) { }

  ngOnInit() {
    this.usercenter();
  }


  back() {
    this.data.back();
  }

  usercenter() {
    this.http.userCenter().subscribe((res: DataService['userInfo']) => {
      this.ableTakeoutScale = parseFloat(res['ableTakeoutScale']);
      if (parseFloat(res.totalScale) - parseFloat(res.allottedScale) > 0) {
        this.cashScale = res.cashScale - 1000 <= 0 ? 0 : res.cashScale - 1000;
      } else {
        this.cashScale = 0;
      }
      this.cashScale2 = this.cashScale;
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    }, () => {
      this.data.Loading(this.data.hide);
    });
  }

  change() {
    this.amount = null;
    if (this.reduceScale === 'true') {
      this.cashScale2 = this.cashScale;
    } else {
      this.cashScale2 = this.ableTakeoutScale;
    }
  }

  submit() {
    if (this.data.getSession('allottedScale') !== '0') { // 判断是否申请过策略
      if (this.reduceScale === 'true') { // 减少规模
        if (!this.judge()) {
          this.data.ErrorMsg('减少保证金必须是1000的倍数');
        } else if (this.amount > this.cashScale2) {
          this.data.ErrorMsg('不允许出金后剩余保证金为0');
        } else {
          this.withDraw2();
        }
      } else { // 不减少规模
        if (this.data.isNull(this.amount) || this.amount === 0) {
          this.data.ErrorMsg('请输入出金金额');
        } else if (this.amount > this.cashScale2) {
          this.data.ErrorMsg('可出金金额不足');
        } else {
          this.withDraw2();
        }
      }
    } else {
      this.data.ErrorMsg('还未申请策略，不能出金');
    }

  }

  withDraw2() {
    const data = {
      reduceScale: this.reduceScale,
      reCashScale: this.reduceScale === 'true' ? this.amount : '', // 保证金
      amount: this.reduceScale === 'false' ? this.amount : '' // 提盈
    };
    this.http.withDraw2(data).subscribe(res => {
      this.data.ErrorMsg('出金成功');
      setTimeout(() => {
        history.back();
      }, 1000);
    }, err => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  judge() {
    if (this.amount % 1000 !== 0 || this.amount === null || this.amount === 0) {
      return false;
    } else {
      return true;
    }
  }
}
