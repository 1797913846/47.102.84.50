import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';
declare var StockChart: any;
declare var EmchartsMobileTime: any;
declare var EmchartsMobileK: any;
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, DoCheck, OnDestroy {
  stockHQ: any;
  stockCode: any;
  socketInterval: any;
  stompClient: any;
  price = [];
  isconnect: boolean;
  tiao:boolean=false;
  preClosePrice: any; // 昨收价
  volumes = [];
  staticData = {
    stockName: '',
    exerciseDate: '',
    leftDays: '',
    exercisePrice: '',
    preClosePrice: ''
  };
  chartTypeList = [{
    name: '分时',
    type: 'T1'
  }, {
    name: '五日',
    type: 'T5'
  }, {
    name: '日K',
    type: 'DK'
  }, {
    name: '周K',
    type: 'WK'
  }, {
    name: '月K',
    type: 'MK'
  }];
  chartType = 'T1';
  constructor(public data: DataService, public http: HttpService) {
    this.stockCode = this.data.getSession('optionCode');
    this.isconnect = false;
    this.data.resetStockHQ();
    this.stockHQ = this.data.stockHQ;
  }

  ngOnDestroy() {
    this.data.clearInterval();
  }
  ngDoCheck() {
    this.stockHQ = this.data.stockHQ;
    this.isiPhone();
  }
  ngOnInit() {
    this.subscribeStock();
    this.getStatic();
  }
  isiPhone() {
    let isIphoneX: any = (() => {
      if (typeof window !== 'undefined' && window) {
        console.log('userAgent>>',window.navigator.userAgent)
        return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812;
      }
      return false;
    })();

    if (isIphoneX) {
      this.tiao = true;
    }

    function testUA(str) {

      return navigator.userAgent.indexOf(str) > -1

    }
  }
  getStatic() {
    this.http.getStatic(this.stockCode).subscribe(res => {
      this.staticData = Object.assign(this.staticData, res);
      this.getFenshituList();
    }, err => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  changeType(type) {
    window.clearTimeout(this.data.timeoutFenshi);
    this.chartType = type;
    if (this.chartType === 'T1' || this.chartType === 'T5') {
      this.getFenshituList();
    } else {
      this.KLine();
    }
  }

  KLine() {
    const marketType = (this.stockCode.substr(0, 1) === '5' || this.stockCode.substr(0, 1) === '6') ? '1' : '2';
    const chart = new EmchartsMobileK({
      container: 'chart',
      type: this.chartType,
      code:`${this.stockCode}${marketType}`,
      width: document.body.clientWidth,
      height: 200,
      dpr: 2,
      showVMark: true
    });
    // 调用绘图方法
    chart.draw();

    this.data.timeoutFenshi = setTimeout(() => {
      this.KLine();
    }, 30000);
  }

  getFenshituList() {
    const marketType = (this.stockCode.substr(0, 1) === '5' || this.stockCode.substr(0, 1) === '6') ? '1' : '2';
    const chart = new EmchartsMobileTime({
      container: 'chart',
      type: this.chartType,
      code: `${this.stockCode}${marketType}`,
      width: document.body.clientWidth,
      height: 180,
      dpr: 2
    });
    // 调用绘图方法
    chart.draw();

    this.data.timeoutFenshi = setTimeout(() => {
      this.getFenshituList();
    }, 30000);



    // this.http.fenshituList(this.stockCode).subscribe((res) => {
    //   this.price = [];
    //   this.volumes = [];
    //   Object.keys(res).forEach(key => {
    //     this.price.push(res[key].lastPrice);
    //     this.volumes.push(res[key].totalVolume);
    //   });
    //   this.fenshitu();
    //   this.data.timeoutFenshi = setTimeout(() => {
    //     this.getFenshituList();
    //   }, 30000);
    // }, (err) => {
    //   this.data.error = err.error;
    //   this.data.isError();
    // });
  }

  fenshitu() {
    StockChart.drawTrendLine({
      id: 'trendLine',
      height: 180,
      width: document.body.clientWidth - 20,
      prices: this.price,
      volumes: this.volumes,
      volumeHeight: 50,
      preClosePrice: parseFloat(this.staticData.preClosePrice),
      middleLineColor: 'rgb(169, 126, 0)'
    });
  }

  back() {
    this.data.removeSession('optionCode');
    this.data.back();
  }

  /**
   * 订阅股票
   */
  subscribeStock() {
    this.http.getGPHQ(this.stockCode, this.data.token).subscribe((res) => {
      if (!this.data.isNull(res['resultInfo']['quotation'])) {
        this.data.stockHQ = res['resultInfo']['quotation'];
      } else {
        this.stockHQ = this.data.stockHQ;
      }
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    }, () => {
      this.data.Loading(this.data.hide);
    });
  }
  /**
     * 返回行情加个颜色
     */
  HQColor(price) {
    if (price !== '--') {
      if (price > this.staticData.preClosePrice) {
        return 'red';
      } else if (price < this.staticData.preClosePrice) {
        return 'green';
      } else {
        return '';
      }
    }

  }

  color(string) {

    if (!this.data.isNull(string)) {
      string = string.toString();
      if (string.indexOf('-') >= 0) {
        return 'green';
      } else {
        return 'red';
      }
    }
  }

  goto(url) {
    this.data.searchStockCode = this.stockCode;
    this.data.goto(`main/jiaoyi/${url}`);
  }

}
