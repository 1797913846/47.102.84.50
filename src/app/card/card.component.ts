import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  bankList: any;
  provinceList: any;
  cityList: any;
  branchesList: any;
  id: any;
  filledIn: boolean;
  filledIn2: boolean;
  cardInfo = {
    id: '',
    bankId: '',
    bankName: '',
    provinceId: '',
    provinceName: '',
    cityId: '',
    cityName: '',
    subBranchId: '',
    subBranchName: '',
    cardNo: '',
    userName: '',
    identityNo: '',
    mobile: ''
  };
  isUpdate = 'false';
  text = '绑定';
  constructor(public data: DataService, public http: HttpService) {
    this.id = '';
    this.bankList = this.data.selectOption;
    this.cardInfo.bankId = '0';
    this.provinceList = this.data.selectOption;
    this.cardInfo.provinceId = '0';
    this.cityList = this.data.selectOption;
    this.cardInfo.cityId = '0';
    this.branchesList = this.data.selectOption;
    this.cardInfo.subBranchId = '0';
    this.isUpdate = this.data.getSession('updateCard') || 'false';
    this.text = this.isUpdate === 'true' ? '修改' : '绑定';
  }

  ngOnInit() {
    this.getBankList();
    this.getCard();
  }

  back() {
    this.data.back();
  }

  // 获取银行列表
  getBankList() {
    this.http.getBankList().subscribe((res: Array<any>) => {
      this.bankList = this.data.selectOption.concat(res);
    }, err => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  // 获取该银行省份
  getProvinces() {
    this.http.getProvinceList(this.cardInfo.bankId).subscribe((res: Array<any>) => {
      this.provinceList = this.data.selectOption.concat(res);
      this.getCity();
    }, err => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  // 获取银行所在省份的城市列表
  getCity() {
    this.http.getCityList(this.cardInfo.bankId, this.cardInfo.provinceId).subscribe((res: Array<any>) => {
      this.cityList = this.data.selectOption.concat(res);
      this.getBranch();
    }, err => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  // 获取银行支行列表
  getBranch() {
    this.http.getBranchList(this.cardInfo.bankId, this.cardInfo.provinceId, this.cardInfo.cityId).subscribe((res: Array<any>) => {
      this.branchesList = this.data.selectOption.concat(res);
    }, err => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  // 查询绑定的银行卡
  getCard() {
    this.http.getCard().subscribe(res => {
      if (!this.data.isNull(res)) {
        if (this.isUpdate === 'true') {
          this.filledIn = false;
        } else {
          this.filledIn = true;
        }
        this.filledIn2 = true;
        this.cardInfo = Object.assign(this.cardInfo, res);
        this.id = this.cardInfo.id;
        this.getBranch();
        this.getProvinces();
        this.getCity();
      } else {
        this.filledIn = false;
        this.filledIn2 = false;
      }
    }, err => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  // 绑定银行卡
  submit() {
    this.cardInfo.bankName = this.getName(this.bankList, this.cardInfo.bankId);
    this.cardInfo.provinceName = this.getName(this.provinceList, this.cardInfo.provinceId);
    this.cardInfo.cityName = this.getName(this.cityList, this.cardInfo.cityId);
    this.cardInfo.subBranchName = this.getName(this.branchesList, this.cardInfo.subBranchId);
    if (this.cardInfo.bankId === '0') {
      this.data.ErrorMsg('请选择开户银行');
    } else if (this.cardInfo.provinceId === '0') {
      this.data.ErrorMsg('请选择开户银行省份');
    } else if (this.cardInfo.cityId === '0') {
      this.data.ErrorMsg('请选择开户银行城市');
    } else if (this.cardInfo.subBranchId === '0') {
      this.data.ErrorMsg('请选择开户银行支行');
    } else if (this.cardInfo.cardNo.length === 0) {
      this.data.ErrorMsg('请输入正确的银行卡号');
    } else if (this.cardInfo.userName.length === 0) {
      this.data.ErrorMsg('请输入正确的银行卡户名');
    } else if (this.cardInfo.identityNo.length !== 18) {
      this.data.ErrorMsg('请输入正确的身份证号');
    } else if (this.cardInfo.mobile.length !== 11) {
      this.data.ErrorMsg('请输入正确的手机号码');
    } else {
      this.http.bandCard(this.cardInfo).subscribe(res => {
        this.data.ErrorMsg(`${this.text}成功`);
        this.getCard();
        this.back();
      }, err => {
        this.data.error = err.error;
        this.data.isError();
      });
    }

  }

  getName(list, id): string {
    let name;
    list.some(element => {
      if (element.value.toString() === id.toString()) {
        name = element.text;
        return true;
      }
    });
    return name;
  }

  optionChange(name, value) {
    if (value !== 0) {
      switch (name) {
        case 'bankId':
          this.cardInfo.provinceId = '0';
          this.cardInfo.cityId = '0';
          this.cardInfo.subBranchId = '0';
          this.getProvinces();
          break;
        case 'provinceId':
          this.cardInfo.cityId = '0';
          this.cardInfo.subBranchId = '0';
          this.getCity();
          break;
        case 'cityId':
          this.cardInfo.subBranchId = '0';
          this.getBranch();
          break;
        default:
          break;
      }
    }
  }

}
