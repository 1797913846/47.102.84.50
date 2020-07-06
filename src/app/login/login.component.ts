import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logo = 'login';
  public phone: string;
  public password: string;
  public header = {
    'Authorization': ''
  };
  constructor(public data: DataService, public http: HttpService) {
    if (!this.data.isNull(this.data.getLocalStorage('userPhone'))) {
      this.phone = this.data.getLocalStorage('userPhone');
    } else {
      this.phone = '';
    }
    if (!this.data.isNull(this.data.getLocalStorage('password'))) {
      this.password = this.data.getLocalStorage('password');
    } else {
      this.password = '';
    }


  }

  ngOnInit() {
    this.data.setLocalStorage('h5tncltoken', '');
    this.data.clearInterval();
    this.logo = this.data.logo;
  }

  login() {
    if (this.phone === '') {
      this.data.ErrorMsg('请输入登录账号');
    } else if (this.password === '') {
      this.data.ErrorMsg('请输入登录密码');
    } else {
      const body = {
        'username': this.phone,
        'password': Md5.hashStr(this.password)
      };
      this.data.loading = this.data.show;
      this.http.login(body).subscribe((res) => {
        console.log(res);
        this.data.setSession('opUserCode', this.phone);
        this.data.setLocalStorage('userPhone', this.phone);
        this.data.setLocalStorage('password', this.password);
        this.data.opUserCode = this.phone;
        this.data.isConnect = false;
        this.data.token = res['resultInfo'];
        this.data.goto('main/usercenter');
      }, (err) => {
        this.data.error = err.error;
        this.data.isError();
      }, () => {
        this.data.loading = this.data.hide;
      });

    }
  }

  goto(type) {
    this.data.goto('main/' + type);
  }
}
