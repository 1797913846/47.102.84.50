import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpService } from '../http.service';
declare var layer: any;
@Component({
  selector: 'app-zixuan',
  templateUrl: './zixuan.component.html',
  styleUrls: ['./zixuan.component.css'],
  animations: [
    trigger('showDelete', [
      state('inactive', style({
        transform: 'translateX(0)',
      })),
      state('active', style({
        transform: 'translateX(61px)'
      })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('500ms ease-out'))
    ])
  ]
})
export class ZixuanComponent implements OnInit, OnDestroy {
  hasZixuan = this.data.hide;
  show = 'inactive';
  zixuanList = '';
  zixuanArray = [];
  userStockList = [];
  list: any;
  quote50ETF: any;
  quoteDetail: any;
  q50eft = {
    lastPrice: '',
    upDiff: '',
    upRatio: '',
    stockCode: ''
  };
  tablist: any;
  timeout: any;
  constructor(public data: DataService, public http: HttpService) { }
  ngOnDestroy() {
    this.data.clearInterval();
  }
  ngOnInit() {
    this.data.clearInterval();
    // localStorage.clear();
    this.getStockList();
    this.generalTrend();
  }


  getStockList() {
    this.data.clearInterval();
    this.http.getUserStockList().subscribe(res => {
      this.zixuanList = '';
      this.userStockList = [];
      this.data.isLogin = true;
      const list: Array<any> = res['resultInfo'];
      list.forEach(element => {
        this.userStockList.push(element.stockCode);
      });
      this.zixuanList = this.userStockList.join();
      if (!this.data.isNull(this.data.getLocalStorage('localZixuan'))) {
        layer.open({
          content: `是否将本地自选股加入当前账号？`
          , btn: ['确定', '取消']
          , yes: (index) => {
            layer.close(index);
            const data: Array<string> = this.data.getLocalStorage('localZixuan').split(',');
            data.forEach(element => {
              if (this.zixuanList.indexOf(element) === -1) {
                this.userStockList.push(element);
              }
            });
            this.http.addStockList2(this.userStockList).subscribe(() => {
              this.data.ErrorMsg('添加成功');
              this.data.setLocalStorage('localZixuan', '');
              this.getStockList();
            });
          }, cancel: (index) => {
            layer.close(index);
            localStorage.removeItem('localZixuan');
          }
        });
      }
      if (!this.data.isNull(this.zixuanList)) {
        this.hasZixuan = this.data.show;
        this.subscribe();
      } else {
        this.hasZixuan = this.data.hide;
      }
    }, err => {
      this.data.isLogin = false;
      this.zixuanList = this.data.getLocalStorage('localZixuan');
      if (!this.data.isNull(this.zixuanList)) {
        this.hasZixuan = this.data.show;
        this.subscribe();
      }
    });
  }

  color(string) {
    if (string) {
      if (string.indexOf('-') >= 0) {
        return 'green';
      } else {
        return 'red';
      }
    }
  }

  generalTrend() {
    this.http.generalTrend().subscribe(res => {
      this.tablist = res;
      this.timeout = setTimeout(() => {
        this.generalTrend();
      }, 60000);
    }, err => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  edit() {
    this.show = this.show === 'active' ? 'inactive' : 'active';
  }

  goto2(code) {
    this.data.setSession('optionCode', code);
    this.data.goto('chart');
  }

  goto() {
    this.data.goto('main/ssgp');
  }

  subscribe() {
    if (this.zixuanList.length !== 0) {
      this.http.zixuanSubscribe(this.zixuanList).subscribe((res) => {
        this.getDetail();
        this.data.intervalZX = setTimeout(() => {
          this.subscribe();
        }, 3000);
      }, (err) => {
        this.data.error = err.error;
        this.data.isError();
      }, () => {
        this.data.Loading(this.data.hide);
      });
    }
  }

  getDetail() {
    this.http.zixuanDetail(this.zixuanList).subscribe((res) => {
      this.list = res;
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    }, () => {
      this.data.Loading(this.data.hide);
    });
  }

  del(code) {
    if (this.data.isLogin) { // 已登陆
      this.http.delStockList(code).subscribe(res => {
        this.data.ErrorMsg('删除成功');
        this.getStockList();
      }, err => {
        this.data.error = err.error;
        this.data.isError();
      });
    } else {
      this.zixuanArray = this.zixuanList.split(',');
      for (let i = 0; i < this.zixuanArray.length; i++) {
        if (this.zixuanArray[i] === code) {
          this.zixuanArray.splice(i, 1);
          this.data.ErrorMsg('该股票删除成功');
          this.zixuanList = this.zixuanArray.toString();
          if (this.zixuanList.length !== 0) {
            this.subscribe();
          } else {
            this.data.clearInterval();
            this.hasZixuan = this.data.hide;
          }
          this.data.setLocalStorage('localZixuan', this.zixuanArray);
        }
      }
    }

  }

  fontColor(string) {
    if (string.indexOf('-') === -1) {
      return 'red';
    } else {
      return 'green';
    }
  }

}
