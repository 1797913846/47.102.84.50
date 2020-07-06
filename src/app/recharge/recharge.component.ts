import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';
declare var _AP: any;
@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {
  list = [1000, 3000, 5000, 8000, 10000, 20000];
  money: any;
  inputMoney: any;
  payType: any;
  isWeiChat = true;
  showWechatPay = false;
  showAliPay = false;
  payWayConfig = [];
  constructor(public http: HttpService, public data: DataService) {
    this.money = '1000';
    this.inputMoney = '';
    this.payType = 1;
  }

  ngOnInit() {
    this.isWeiXin();
    console.log(this.data.getToken());
    if (location.host.indexOf('anandakeji') > 0 || location.host.indexOf('hankun') > 0 || location.host.indexOf('eastnsd') > 0) {
      this.showWechatPay = true;
    } else {
      this.showWechatPay = false;
    }

    if (location.host.indexOf('ly50etf') > 0 || location.host.indexOf('hankun') > 0) {
      this.showAliPay = true;
      this.payType = 1;
    } else {
      this.showAliPay = false;
      this.payType = 2;
    }
    this.getPayWay();
  }

  getPayWay() {
    this.http.getPayWay().subscribe(res => {
      const array: Array<any> = res['resultInfo'];
      array.forEach(element => {
        const data = {
          index: 1,
          name: '',
          pic: '',
          type: '',
          fee: ''
        };
        data.type = element.type;
        data.fee = element.fee;
        switch (element.type) {
          case 'bank':
            data.name = '银行卡转账（线下）';
            data.pic = 'bank';
            data.index = 2;
            break;
          case 'alipay':
            data.name = '支付宝支付（线下）';
            data.pic = 'ali';
            data.index = 3;
            break;
          case 'hongbo':
            data.name = '第三方支付';
            data.pic = 'yinlian';
            data.index = 4;
            break;
        }
        this.payWayConfig.push(data);
        this.payType = this.payWayConfig[0].index;
      });
    });
  }

  back() {
    this.data.back();
  }

  input() {
    this.money = this.inputMoney;
  }

  select(money) {
    this.money = money;
    this.inputMoney = '';
  }

  isWeiXin() {
    const ua = window.navigator.userAgent.toLowerCase();
    console.log(ua);
    if ((/MicroMessenger/i).test(ua)) {
      this.isWeiChat = true;
    } else {
      this.isWeiChat = false;
    }
  }


  pay() {
    if (this.data.Decimal(this.money) <= 2 && this.money > 0 && this.money !== null) {
      if (this.payType === 1) { // 支付宝支付
        if (this.isWeiChat) {
          _AP.pay(this.http.host + `/alipay/sign?totalAmount=${this.money}&token=${this.data.getToken()}`);
        } else {// 普通浏览器
          this.http.aliPay(this.money).subscribe(res => {
            // 支付方法
            const div = document.createElement('div');
            div.innerHTML = res;
            document.body.appendChild(div);
            document.forms[0].submit();
          });
        }
      } else if (this.payType === 2 || this.payType === 3) { // 银行卡支付
        this.data.setSession('payType', this.payType);
        this.data.setSession('amount', this.money);
        this.data.goto('bankcard');
      } else if (this.payType === 4) {
        const data = {
          amount: this.money
        };
        this.data.loading = true;
        this.http.thirdPay('thirdpayHongbo', data).subscribe(res => {
          this.data.loading = false;
          location.href = res;
        }, (err) => {
          this.data.error = err.error;
          this.data.isError();
        });
      }
    } else {
      this.data.ErrorMsg('充值金额必须大于0，最多两位小数');
    }
  }

  selectPayType(type) {
    this.payType = type;
  }

}
