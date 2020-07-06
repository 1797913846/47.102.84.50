import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
import { Md5 as hexMD5 } from 'ts-md5';
declare var Swiper: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {
  list: any;
  timeout: any;
  newslist: any;
  flag: boolean = false;
  timer = null;
  size: any;
  sizeNum: any;
  type = 0;
  title = [{
    id: 0,
    text: '日进斗金'
  }];
  detail = [{
    img: './assets/images/banner1.png',
    btn: './assets/images/btn1.png',
    id: 0,
    num: 'NO.1',
    amount: '1000',
    multiple: '8',
    date: '日',
    money: '3',
    money2: '元',
    text: '2个交易日',
    style: 'span1',
    btns: 'btn1',
    text1: '日进斗金'
  }];

  maxMul: 0;
  minMul: 0;
  logo = '';
  staticData = [];
  financeData = [];
  financeDetail = [];
  newsToken: string = "";
  newsTitle: object;
  newsId: any;
  newsContent: object;
  pageNum: object = [1, 2, 3, 4, 5];
  page: any = 1;
  locked: boolean = false;
  constructor(public data: DataService, public http: HttpService) {
    this.logo = this.data.logo;
  }

  ngOnInit() {
    const mySwiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
      },
      autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
      },
    });
    this.generalTrend();
    this.newsList();

    this.financeScheme();
    this.getNewsToken();
    this.stopTouchendPropagationAfterScroll();
    // clearInterval(this.timer);
    // this.sizeNum = 0;
    // this.timer = setInterval(() => {
    //   this.sizeNum++;
    //   this.size = -40 * this.sizeNum;
    //   console.log('距离', this.sizeNum, this.size);
    //   var scrollBox = document.getElementById('scrollBox');
    //   scrollBox.style.marginTop = this.size + 'px';
    //   this.showMarquee();
    // }, 3000);
  }
  showMarquee() {
    this.flag = true;
  }
  getNewsToken() {
    const param = {
      "method": 'getToken',
      "time": Date.parse(new Date().toString()) / 1000,
      "appId": 'XJH_APP',
      "secret": 'xjh@999'
    }
    this.http.getNewsToken(param).subscribe(res => {
      console.log(res);
      let token = res['token'];
      localStorage.setItem("tokenx", token);
      this.getNewsTitle(token);
    }, err => {
      this.data.error = err.error;
      this.data.isError();
    });
  }
  getNewsTitle(token) {
    const param = {
      "method": 'getNav',
      "time": Date.parse(new Date().toString()) / 1000,
      "token": token
    }
    this.http.getNewsToken(param).subscribe(res => {
      console.log(res);
      this.newsTitle = res['data'];
      let id = this.newsTitle[0].id;
      this.getNewsContent(id);
    }, err => {
      this.data.error = err.error;
      this.data.isError();
    });
  }
  getPage(page) {
    this.page = page;
    this.getNewsContent(this.newsId);
  }
  getNewsContent(id) {
    this.newsId = id;
    let token = localStorage.getItem("tokenx");
    const param = {
      "method": 'getNavPageData',
      "time": Date.parse(new Date().toString()) / 1000,
      "token": token,
      "rows": 5,
      "page": this.page,
      "q": id,
    }
    this.http.getNewsToken(param).subscribe(res => {
      console.log(res);
      this.newsContent = res['data'];
    }, err => {
      this.data.error = err.error;
      this.data.isError();
    });
  }
  newsList() {
    this.http.newsList().subscribe(res => {
      this.newslist = res;
    }, err => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  ngOnDestroy() {
    window.clearTimeout(this.timeout);
    clearInterval(this.timer);
  }

  generalTrend() {
    this.http.generalTrend().subscribe(res => {
      this.list = res;
      this.timeout = setTimeout(() => {
        this.generalTrend();
      }, 60000);
    }, err => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  getManageFee() {
    this.http.getManagerFee().subscribe(res => {
      this.detail.forEach((element, index) => {
        element.money = (res['resultInfo'][index]['financeRate'] * 1000 * this.minMul).toFixed(2);
      });
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

  financeScheme() {
    this.http.financeScheme().subscribe(res => {
      const data = {
        id: 0,
        mul: 1
      };
      this.staticData = res['resultInfo'];
      this.financeData = res['resultInfo']['day'];
      this.finance();
      //  this.getManageFee();
    });
  }

  finance() {
    this.financeDetail = [];
    this.financeData.sort((a, b) => {
      return a['financeRatio'] - b['financeRatio'];
    });
    this.maxMul = this.financeData[this.financeData.length - 1]['financeRatio'];
    this.minMul = this.financeData[0]['financeRatio'];
  }
  stopTouchendPropagationAfterScroll() {
    this.locked = false;
    let that = this;
    window.addEventListener('touchmove', function (ev) {
      that.locked || (that.locked = true, window.addEventListener('touchend', stopTouchendPropagation, true));
    }, true);

    function stopTouchendPropagation(ev) {
      ev.stopPropagation();
      window.removeEventListener('touchend', stopTouchendPropagation, true);
      that.locked = false;
    }
  }
  goto(id) {
    if (this.locked == false) {
      this.data.setSession('zixuanId', id);
      this.data.goto('deposit');
    }
  }

  goto2(id) {
    this.data.gotoId('newdetail', id);
  }

  selectType(id) {
    this.type = id;
    if (id === 0) {
      this.financeData = this.staticData['day'];
    } else if (id === 1) {
      this.financeData = this.staticData['week'];
    } else {
      this.financeData = this.staticData['month'];
    }
    this.finance();
  }

}
