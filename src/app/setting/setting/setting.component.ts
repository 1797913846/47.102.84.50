import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { HttpService } from '../../http.service';
declare var layer: any;
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  allottedScale = '';
  constructor(public data: DataService, public http: HttpService) { }

  ngOnInit() {
    this.usercenter();
  }

  back() {
    this.data.back();
  }

  usercenter() {
    this.http.userCenter().subscribe((res: DataService['userInfo']) => {
      this.allottedScale = res.allottedScale;
    }, (err) => {
      this.data.error = err.error;
      this.data.isError();
    }, () => {
      this.data.Loading(this.data.hide);
    });
  }

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

  logout() {
    this.data.ErrorMsg('注销成功');
    this.data.isConnect = false;
    this.data.token = this.data.randomString(32);
    this.data.removeSession('opUserCode');
    setTimeout(() => {
      this.data.goto('main/login');
    }, 1000);
  }

  userDetail() {
    this.data.goto('userDetail');
  }

  goto(url) {
    if (url === 'card') {
      this.data.setSession('updateCard', true);
    }
    this.data.goto(url);
  }

}
