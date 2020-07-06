import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
declare var layer: any;

@Component({
  selector: 'app-usercenter',
  templateUrl: './usercenter.component.html',
  styleUrls: ['./usercenter.component.css']
})
export class UsercenterComponent implements OnInit, OnDestroy {
  public menuList = [{
    id: 'withdraw',
    name: '提现',
    class: ''
  }, {
    id: 'recharge',
    name: '充值',
    class: 'sell'
  }, {
    id: 'deposit',
    name: '入金',
    class: 'deposit'
  }, {
    id: 'chujin',
    name: '出金',
    class: 'chedan'
  }, {
    id: 'capitalflow',
    name: '资金流水',
    class: 'chicang'
  }];
  public userInfo: DataService['userInfo'];
  public logo = 'hk';
  public option: any;
  freezaFee = 0;
  ableScale = 0;
  allottedScale = '';
  anum: any;
  bnum: any;
  cnum: any;
  constructor(public data: DataService, public http: HttpService) {
  }
  ngOnDestroy() {
    this.data.clearInterval();
  }
  ngOnInit() {
    this.logo = this.data.logo;
    this.data.clearInterval();
    this.userInfo = this.data.userInfo;
    this.usercenter();
  }

  goto(url) {
    this.data.goto('main/jiaoyi/' + url);
  }

  goto1(url) {
    if (url === 'card') {
      this.data.setSession('updateCard', true);
    }
    this.data.goto(url);
  }

  setting() {
    this.data.goto('setting');
  }

  usercenter() {
    console.log("usercenter>>")
    this.http.userCenter().subscribe((res: DataService['userInfo']) => {
      this.userInfo = res;
      const backscale = res['balance'];
      this.data.setSession('userName', res['accountName']);
      this.data.setSession('ableTakeoutScale', res['ableTakeoutScale']);
      this.freezaFee = parseFloat(this.userInfo.lockScale) + parseFloat(this.userInfo.freezeScale);
      this.data.setSession('backscale', parseFloat(backscale) <= 0 ? 0 : backscale);
      //证券市值
      let a = Number(this.userInfo.stockScale);
      //可用资金
      let b = Number(this.userInfo.ableScale);
      //冻结资金
      let c = Number(this.freezaFee);
      let d = Number(a + b + c);
      this.anum = ((a / d) * 100).toFixed(2) + '%';
      this.bnum = ((b / d) * 100).toFixed(2) + '%';
      this.cnum = ((c / d) * 100).toFixed(2) + '%';
      console.log('我是abc', a, b, c);
      this.option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          // data: ['直接访问', '邮件营销', '联盟广告']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['90%', '100%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: a },
              { value: b },
              { value: c }
            ],
            itemStyle: {
              normal: {
                color: function (params) {
                  //自定义颜色
                  var colorList = ['#0064B9', '#C80005', '#FCC257'];
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      };
      this.data.intervalCapital = setTimeout(() => {
        this.usercenter();
      }, 60000);
      this.allottedScale = res.allottedScale;
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    }, () => {
      this.data.Loading(this.data.hide);
    });
  }
  /**
  * 取消订阅
  */
  cancelSubscribe() {
    this.http.cancelSubscribe().subscribe((res) => {
      this.data.resetStockHQ();
      console.log('取消订阅');
    });
  }

  logout() {
    this.cancelSubscribe();
    this.data.ErrorMsg('注销成功');
    this.data.isConnect = false;
    this.data.token = this.data.randomString(32);
    localStorage.removeItem('h5tncltoken');
    this.data.removeSession('opUserCode');
    setTimeout(() => {
      this.data.goto('main/login');
    }, 1000);
  }

  goto2(url) {
    if (url === 'withdraw') {
      this.http.getCard().subscribe(res => {
        if (this.data.isNull(res)) {
          this.data.ErrorMsg('请先绑定银行卡');
          this.data.goto('card');
        } else {
          this.data.goto(url);
        }
      });
    } else {
      this.data.goto(url);
      this.data.setSession('cashScale', this.userInfo['cashScale']);
      this.data.setSession('allottedScale', this.userInfo.allottedScale);
    }

  }

  // 结案
  submit() {
    if (this.allottedScale !== '0') {
      layer.open({
        content: '确定结案？'
        , btn: ['确定', '取消']
        , yes: (index) => {
          layer.close(index);
          this.http.finishStrategy().subscribe(res => {
            this.data.ErrorMsg('结案成功');
            setTimeout(() => {
              this.data.back();
            }, 1000);
          }, (err) => {
            this.data.error = err.error;
            this.data.isError();
          });
        }
      });
    } else {
      this.data.ErrorMsg('此账户还没有申请策略，没有可结束的方案');
    }
  }

  userDetail() {
    this.data.goto('userDetail');
  }
}
