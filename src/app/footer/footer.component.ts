import { Component, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements DoCheck {

  public url: string;
  public menuList: any;
  public name: string;
  public tiao: boolean = false;
  constructor(public data: DataService, public http: HttpService) {
    this.menuList = this.data.getFooterMenu();
  }

  ngDoCheck() {
    this.url = this.data.getUrl(2);
    if (this.url === 'ssgp') {
      this.url = 'zixuan';
    }
    this.title();
    if (this.data.getUrl(2) !== 'jiaoyi') {
      this.data.nowUrl = '';
      // this.data.clearInterval();
    }
    this.isiPhone();
  }



  isiPhone() {
    let isIphoneX: any = (() => {
      if (typeof window !== 'undefined' && window) {
        // console.log('userAgent>>',window.navigator.userAgent)
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
  goto(url) {
    const data = {
      type: 0,
      mulType: 8,
      money: ''
    };
    this.data.setSession('strategyData', JSON.stringify(data));
    if (url !== this.data.getUrl(2)) {
      this.http.cancelSubscribe().subscribe(res => {
        console.log('取消订阅');
      });
      this.data.resetStockHQ();
      this.data.removeSession('optionCode');
      this.url = url;
      this.data.setSession('zixuanId', 0);
      this.data.goto('main/' + url);
      this.title();
    }
  }

  title() {
    for (const i in this.menuList) {
      if (this.menuList[i]['id'] === this.url) {
        this.name = this.menuList[i]['title'];
      }
    }
  }

}
