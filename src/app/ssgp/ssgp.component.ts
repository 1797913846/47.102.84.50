import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-ssgp',
  templateUrl: './ssgp.component.html',
  styleUrls: ['./ssgp.component.css']
})
export class SsgpComponent implements OnInit {
  stockCode = '';
  list: any;
  zixuanList = '';
  zixuanArray = [];
  constructor(public data: DataService, public http: HttpService) {

  }

  ngOnInit() {
    this.data.clearInterval();
  }

  clear() {
    this.stockCode = '';
    this.getQuotation();
  }

  close() {
    history.go(-1);
    // localStorage.removeItem('zixuan');
  }

  /**
 * 获取行情快照
 */
  getQuotation() {
    const content = null;
    this.http.searchStock(this.stockCode).subscribe((res) => {
      this.list = res;
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  /**
   * 添加自选股
   */
  add(code) {
    if (this.data.isLogin) {
      this.http.addStockList(code).subscribe(res => {
        console.log(res);
        this.data.ErrorMsg('添加成功');
      }, err => {
        this.data.error = err.error;
        this.data.isError();
      });
    } else {
      let temp = [];
      if (!this.data.isNull(this.data.getLocalStorage('localZixuan'))) {
        this.zixuanList = this.data.getLocalStorage('localZixuan');
        temp = this.zixuanList.split(',');
      }
      if (this.zixuanList.indexOf(code) > 0) {
        this.data.ErrorMsg('该股票已添加');
      } else {
        temp.push(code);
        this.zixuanList = temp.join();
        this.data.ErrorMsg('添加成功');
        this.data.setLocalStorage('localZixuan', this.zixuanList);
      }
    }
  }

  goto2(code) {
    this.data.setSession('optionCode', code);
    this.data.goto('chart');
  }

}
