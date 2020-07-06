import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';
import { Router, RouterState, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-chicang',
  templateUrl: './chicang.component.html',
  styleUrls: ['../chedan/chedan.component.css']
})
export class ChicangComponent implements OnInit {
  public userInfo: DataService['userInfo'];
  isJiaoyi: any;
  isChicang: any;
  freezaFee: any;
  url: any;
  detail = {
    cashScale: 0,
    commission: 0,
    cordonLine: 0,
    financePeriod: 'day',
    financeRatio: 0,
    financeStartDate: '',
    flatLine: 0,
    manageFeeRate: 0,
    manageMakeFeeRate: 0,
    opUserCode: '',
    positionRatio: 0,
    secondBoardPositionRatio: 0
  };
  data1: any;
  data2: any;
  data3: any;
  width1: any;
  width2: any;
  width3:any;
  id: any;
  constructor(public data: DataService, public http: HttpService, private routeInfo: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.data.getUrl(2) === 'chicang') {
      this.isJiaoyi = false;
    } else {
      this.isJiaoyi = true;
    }
    console.log('我啊', '/' + this.data.getUrl(1) + '/' + this.data.getUrl(2) + '/' + this.data.getUrl(3) === '/main/jiaoyi/chicang');
    if (
      '/' + this.data.getUrl(1) + '/' + this.data.getUrl(2) + '/' + this.data.getUrl(3) === '/main/jiaoyi/chicang'
    ) {
      this.isChicang = true;
    } else {
      this.isChicang = false
    }
    this.http.userDetail().subscribe(res => {
      Object.assign(this.detail, res);
      console.log('我是个人详情', this.detail)
      //平仓线
      this.data1 = this.detail.flatLine;
      //预警线
      this.data2 = this.detail.cordonLine;
      this.data2 = Math.round(this.data2);
      this.usercenter();
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    });
    this.userInfo = this.data.userInfo;

    this.url = window.location.href.split('#')[1];
    console.log(this.url)
  }

  overflow(type) {
    if (!type) {
      return 'chicang';
    } else {
      return '';
    }
  }

  usercenter() {
    this.http.userCenter().subscribe((res: DataService['userInfo']) => {
      this.userInfo = res;
      let idName = this.userInfo.financePeriod;
      console.log('我存在吗',idName);
      if (!idName) {
        this.id='noway';
      } else {
        switch (idName) {
          case 'day':
            this.id = 0;
            break;
          case 'week':
            this.id = 1;
            break;
          case 'month':
            this.id = 2;
            break;
          case 'single':
            this.id = 3;
          default:
            break;
        }
      }
      this.data3 = this.userInfo.totalScale;
      console.log('我是总资产', this.data3);
      console.log('我', this.userInfo)
      this.data3 = Number(this.data3);
      this.data2 = Number(this.data2);
      this.data1 = Number(this.data1);
      if (this.data3 > this.data1 && this.data3 > this.data2) {
        console.log('对的')
        if ((this.data2 / this.data3) * 100 < 50) {
          this.width1 = (this.data1 / this.data3) * 100 + '%';
          this.width2 = (this.data2 / this.data3) * 100 + 5 + '%';
        } else if ((this.data2 / this.data3) * 100 > 80) {
          this.width1 = (this.data1 / this.data3) * 100 - 20 + '%';
          this.width2 = (this.data2 / this.data3) * 100 - 15 + '%';
        } else {
          this.width1 = (this.data1 / this.data3) * 100 + '%';
          this.width2 = (this.data2 / this.data3) * 100 + '%';
        }
      } else if (this.data2 > this.data3 && this.data2 >= this.data1) {
        //预警线大于总资产
        console.log('错的');
        this.width2 = "100%";
        this.width1 = (this.data1 / this.data2) * 100 + "%";
        this.width3 = (this.data3 / this.data2) * 100 + "%";
        document.getElementById('yuan').style.left = this.width3;
        // document.getElementById('zong').style.marginLeft = this.width3;
      }
      console.log('宽度1', this.width1)
      console.log('宽度2', this.width2)
      if (document.getElementById('data1')) {
        document.getElementById('data1').style.width = this.width1;
      }
      if (document.getElementById('data2')) {
        document.getElementById('data2').style.width = this.width2;
      }
      this.freezaFee = parseFloat(this.userInfo.lockScale) + parseFloat(this.userInfo.freezeScale);
      this.data.intervalCapital = setTimeout(() => {
        this.usercenter();
      }, 3000);
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    }, () => {
      this.data.Loading(this.data.hide);
    });
  }

  add(type) {
    let type1 = type;
    console.log(333);
    this.data.setSession('zixuanId', this.id);
    this.data.goto('deposit');
  }
}
