import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
declare var layer: any;
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit, OnDestroy {
  logo = '';
  hasZixuan = this.data.hide;
  show = 'inactive';
  zixuanList: any;
  zixuanArray = [];
  list: any;
  quote50ETF: any;
  quoteDetail: any;
  q50eft = {
    lastPrice: '',
    upDiff: '',
    upRatio: '',
    stockCode: ''
  };
  dateType = [
    '天', '周', '月'
  ];
  tablist: any;
  timeout: any;
  localStorge = `zixuan${this.data.getSession('opUserCode')}`;
  money = 1000;
  typeList = [{
    id: 0,
    num: 'NO.1',
    date: '日',
    money: '3',
    text: '天天赢',
    class: 'tty',
    amount: 1000
  }];
  type = 0;
  mulType = 8;
  detail = [];
  tabs = 0;
  public userInfo: DataService['userInfo'];
  confirm = false;
  fee = 0;
  addType: any;
  msgText: string;
  managerFee = 0;
  managerData = [];
  financeData = [];
  dayFinace = [];
  weekFinace = [];
  monthFinace = [];
  staticData = [];
  constructor(public data: DataService, public http: HttpService, public activeRoute: ActivatedRoute) {
    this.type = this.data.getSession('zixuanId');
    this.logo = this.data.logo;
  }
  ngOnDestroy() {
    this.data.clearInterval();
  }
  ngOnInit() {
    this.data.clearInterval();
    this.userInfo = this.data.userInfo;
    this.usercenter();
    // this.getManageFee();
    this.financeScheme();
  }

  financeScheme() {
    this.http.financeScheme().subscribe(res => {
      const data = {
        id: 0,
        mul: 1
      };
      this.staticData = res['resultInfo'];
      if (this.data.getSession('zixuanId') === '0') {
        this.financeData = this.staticData['day'];
      } else if (this.data.getSession('zixuanId') === '1') {
        this.financeData = this.staticData['week'];
      } else {
        this.financeData = this.staticData['month'];
      }
      this.finance();
      if (this.userInfo.allottedScale === '0') {
        this.mulType = this.detail[0].mul;
      } else {
        this.mulType = this.userInfo.financeRatio;
      }

    });
  }

  finance() {
    this.detail = [];
    this.financeData.sort((a, b) => {
      return b['financeRatio'] - a['financeRatio'];
    });
    this.financeData.forEach((element, index) => {
      this.detail.push({ id: index, mul: element['financeRatio'], financeFeeRate: element['financeFeeRate'], makeFeeRate: element['makeFeeRate'] });
    });
    this.mulType = this.detail[0].mul;
  }


  back() {
    this.data.back();
  }

  getManageFee() {
    this.managerData = [];
    this.http.getManagerFee().subscribe(res => {
      res['resultInfo'].forEach(element => {
        this.managerData.push(element['financeRate']);
        this.managerFee = this.managerData[this.type];
      });
    });
  }

  amount(mul) {
    return ((mul * this.money) / 10000).toFixed(2);
  }

  judge() {
    if (this.money % 1000 !== 0 || this.money === null || this.money <= 0) {
      // 信息框
      layer.open({
        content: '投入金额必须是1000的倍数，且大于0'
        , skin: 'msg'
        , time: 2
      });
      return false;
    } else {
      return true;
    }
  }

  goto(id, mul, fee) {
    if (!this.data.isNull(this.data.getSession('opUserCode'))) {
      if (this.judge()) {
        const data = {
          type: this.type.toString(),
          mulType: mul,
          money: this.money,
          cordonLineRate: this.financeData[id]['cordonLineRate'],
          flatLineRate: this.financeData[id]['flatLineRate'],
          positionRatio: this.financeData[id]['positionRatio'],
          secondBoardPositionRatio: this.financeData[id]['secondBoardPositionRatio'],
          fee
        };
        console.log(data);
        this.data.setSession('strategyData', JSON.stringify(data));
        if (this.userInfo.allottedScale === '0') {
          this.mulType = id;
          this.data.setSession('isAdd', false);
          this.data.goto('strategy');
          this.data.setSession('allottedScale2', '0');
        }

      }
    } else {
      this.data.goto('main/login');
    }

  }

  // manageFeeFn(type, financeFeeRate) {
  //   return (Math.round(type * this.money * financeFeeRate * 100) / 100).toFixed(2);
  // }
  //50环境的变建仓费率了
  manageFeeFn1(type, makeFeeRate) {
    console.log('建仓', makeFeeRate)
    return (Math.round(type * this.money * makeFeeRate * 100) / 100).toFixed(2);
  }
  addNum(num) {
    return num * 100
  }
  selectType(id, money) {
    if (this.userInfo.allottedScale === '0') {
      this.type = id;
      if (id === 0) {
        this.financeData = this.staticData['day'];
      } else if (id === 1) {
        this.financeData = this.staticData['week'];
      } else {
        this.financeData = this.staticData['month'];
      }
      if (!this.data.isNull(this.financeData)) {
        this.finance();
      } else {
        this.detail = [];
      }
      // this.managerFee = this.managerData[this.type];
      this.data.setSession('zixuanId', this.type);
    }
  }

  usercenter() {
    this.http.userCenter2().subscribe((res: DataService['userInfo']) => {
      this.userInfo = res;
      if (this.userInfo.allottedScale !== '0') { // 已申请策略
        this.mulType = this.userInfo.financeRatio;
        switch (this.userInfo.financePeriod) {
          case 'day':
            this.type = 0;
            break;
          case 'week':
            this.type = 1;
            break;
          case 'month':
            this.type = 2;
            break;
          default:
            break;
        }
        this.money = JSON.parse(this.data.getSession('strategyData')).money || this.userInfo.cashScale;
      } else {
        this.type = this.data.getSession('zixuanId') || 0;
        this.mulType = 8;
        this.money = JSON.parse(this.data.getSession('strategyData')).money || 1000;
      }

    }, (err) => {
      // this.data.error = err.error;
      // this.data.isError();
      this.userInfo.allottedScale = '0';
    }, () => {
      this.data.Loading(this.data.hide);
    });
  }

  submit() {
    layer.open({
      content: '确定结案？'
      , btn: ['确定', '取消']
      , yes: (index) => {
        layer.close(index);
        this.http.finishStrategy().subscribe(res => {
          this.data.ErrorMsg('结案成功');
          this.usercenter();
        }, (err) => {
          this.data.error = err.error;
          this.data.isError();
        });
      }
    });
  }

  add(type) {
    this.addType = type;
    this.http.userCenter2().subscribe((res: DataService['userInfo']) => {
      this.userInfo = res;
      this.data.setSession('isAdd', type);
      if (type) { // 增配
        if (this.judge()) {
          this.fee = parseInt(this.userInfo.totalScale, 0) - parseInt(this.userInfo.allottedScale, 0);
          if (this.fee < 0) {
            this.fee = Math.abs(this.fee);
            this.confirm = true;
            this.msgText = `预补足的费用为${this.fee}元，是否在本次增配中自动补足`;
          } else {
            this.isAddFn();
          }
        }
      } else { // 非增配
        if (this.money <= 0 || this.data.Decimal(this.money) > 2) {
          layer.open({
            content: '非增配入金金额必须大于0,且不能超过两位小数'
            , skin: 'msg'
            , time: 2
          });
        } else {
          this.msgText = '是否确定入金';
          this.confirm = true;
        }
      }
    });

  }

  isAddFn() {
    let id = 0;
    this.financeData.forEach((element, index) => {
      if (element['financeRatio'] === this.mulType) {
        return id = index;
      }
    });
    const data = {
      type: this.type.toString(),
      mulType: this.mulType,
      money: this.money,
      cordonLineRate: this.financeData[id]['cordonLineRate'],
      flatLineRate: this.financeData[id]['flatLineRate'],
      positionRatio: this.financeData[id]['positionRatio'],
      secondBoardPositionRatio: this.financeData[id]['secondBoardPositionRatio'],
    };
    this.data.setSession('strategyData', JSON.stringify(data));
    this.data.setSession('allottedScale2', this.userInfo.allottedScale);
    this.data.goto('strategy');
  }

  ok() {
    if (this.addType) { // 增配
      this.isAddFn();
    } else { // 非增配
      this.confirm = false;
      const data = {
        newStrategy: false,
        financeRatio: this.userInfo.financeRatio,
        financePeriod: this.userInfo.financePeriod,
        amount: this.money,
        expandScale: false
      };
      this.http.deposit(data).subscribe(res2 => {
        this.data.ErrorMsg('申请成功');
      }, (err) => {
        this.data.ErrorMsg('账户余额不足，请充值');
        setTimeout(() => {
          this.data.goto('recharge');
        }, 1000);
      });
    }
  }
}
