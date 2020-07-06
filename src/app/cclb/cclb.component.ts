import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-cclb',
  templateUrl: './cclb.component.html',
  styleUrls: ['./cclb.component.css']
})
export class CclbComponent implements OnInit {
  list: any;
  isJiaoyi: any;
  url1: any = 1;
  bList: any = [{ id: 1, name: '合并持仓' }, { id: 2, name: '逐笔持仓' }];
  constructor(public data: DataService, public http: HttpService) { }

  ngOnInit() {
    if (this.data.getUrl(2) === 'chicang') {
      this.isJiaoyi = false;
    } else {
      this.isJiaoyi = true;
    }
    this.cxtgcc('tntg/hold');
  }

  /**
   * 查询投顾持仓
   */
  cxtgcc(aurl) {
    this.http.getHold(aurl).subscribe((res) => {
      this.list = res;
      this.data.intervalHold = setTimeout(() => {
        this.cxtgcc(aurl);
      }, 3000);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    }, () => {
      this.data.Loading(this.data.hide);
    });
  }

  select(a) {
    this.data.searchStockCode = a.stockCode;
    this.data.sellCnt = a.stockCntAble;
    if (location.href.indexOf('chicang') > 0 || location.href.indexOf('zixuan') > 0) {
      this.data.goto('main/jiaoyi/sell');
    }
  }

  gotob(url) {
    this.url1 = url;
    clearTimeout(this.data.intervalHold);
    if (this.url1 == 1) {
      this.cxtgcc('tntg/hold');
    } else {
      this.cxtgcc('tntg/holdDetail');
    }
  }

}
