import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
declare var QRCode: any;
@Component({
  selector: 'app-ercode',
  templateUrl: './ercode.component.html',
  styleUrls: ['./ercode.component.css']
})
export class ErCodeComponet implements OnInit {
  constructor(public data: DataService, public http: HttpService) { }
  ercode: any;
  ngOnInit() {
    console.log(window.location.href)
    this.ercode = window.location.href.split('#')[0]  + localStorage.getItem('uri');
    console.log('我是二维码地址', this.ercode)
    const qrcode = new QRCode('qrcode', {
      width: 200,
      height: 200
    });
    qrcode.makeCode(this.ercode);
  }
  back() {
    this.data.back();
  }

}
