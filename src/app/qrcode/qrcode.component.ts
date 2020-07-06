import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var QRCode: any;
@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {
  code: string;
  constructor(public activeRoute: ActivatedRoute) {
    this.code = this.activeRoute.snapshot.params['id'];
  }

  ngOnInit() {
    const qrcode = new QRCode('qrcode');
    qrcode.makeCode(this.code);
  }

  back() {
    history.back();
  }

}
