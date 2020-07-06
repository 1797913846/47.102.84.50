import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpService } from '../../http.service';
@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.css']
})
export class ResetPwdComponent implements OnInit {
  oldPwd = '';
  newPwd = '';
  newPwd2 = '';
  constructor(public data: DataService, public http: HttpService) { }

  ngOnInit() {
  }
  back() {
    this.data.back();
  }

  submit() {
    if (this.newPwd.length < 6 || this.newPwd.length > 12 || !this.data.passwordRE.test(this.newPwd)) {
      this.data.ErrorMsg('密码长度必须为6到12位的数字或字母');
    } else if (this.newPwd !== this.newPwd2) {
      this.data.ErrorMsg('两次输入的密码不一致');
    } else {
      const data = {
        oldPasswd: Md5.hashStr(this.oldPwd),
        newPasswd: Md5.hashStr(this.newPwd)
      };
      this.http.resetOldPwd(data).subscribe(res => {
        this.data.ErrorMsg('修改成功，请重新登录');
        this.data.isConnect = false;
        this.data.token = this.data.randomString(32);
        this.data.removeSession('opUserCode');
        setTimeout(() => {
          this.data.goto('main/login');
        }, 1000);
      }, err => {
        this.data.error = err.error;
        this.data.isError();
      });
    }
  }
}
