import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Injectable()

export class DataService {
  isConnect = false; // 判断是否需要链接ws
  alert = false;
  loading = false;
  errMsg = '出错啦';
  error: Error;
  show = true;
  searchStockCode = '';
  sellCnt = '';
  hide = false;
  isLogin = false;
  token: string;
  tokenP: string;
  timeoutFenshi: any; // 分时图
  timeoutQoute: any; // 行情列表
  intervalCapital: any; // 个人中心
  intervalHold: any;  // 持仓
  intervalAppoint: any; // 委托
  intervalZX: any; // 自选股
  nowUrl: string;
  market: 'market'; // 行情的ws，header
  selectOption = [{
    value: 0,
    text: '== 请选择 =='
  }];

  passwordRE = /^[A-Za-z0-9]+$/;

  /**
   * 股票行情
   */
  stockHQ = {
    'stockName': '',
    'closePrice': '',
    'highPrice': '',
    'lowPrice': '',
    'lastPrice': '',
    'openPrice': '',
    'orderTime': '',
    'preClosePrice': '',
    'stockCode': '',
    'buyLevel': {
      'buyPrice01': '--',
      'buyPrice02': '--',
      'buyPrice03': '--',
      'buyPrice04': '--',
      'buyPrice05': '--',
      'buyPrice06': '--',
      'buyPrice07': '--',
      'buyPrice08': '--',
      'buyPrice09': '--',
      'buyPrice10': '--',
      'buyVolume01': '--',
      'buyVolume02': '--',
      'buyVolume03': '--',
      'buyVolume04': '--',
      'buyVolume05': '--',
      'buyVolume06': '--',
      'buyVolume07': '--',
      'buyVolume08': '--',
      'buyVolume09': '--',
      'buyVolume10': '--'
    },
    'sellLevel': {
      'sellPrice01': '--',
      'sellPrice02': '--',
      'sellPrice03': '--',
      'sellPrice04': '--',
      'sellPrice05': '--',
      'sellPrice06': '--',
      'sellPrice07': '--',
      'sellPrice08': '--',
      'sellPrice09': '--',
      'sellPrice10': '--',
      'sellVolume01': '--',
      'sellVolume02': '--',
      'sellVolume03': '--',
      'sellVolume04': '--',
      'sellVolume05': '--',
      'sellVolume06': '--',
      'sellVolume07': '--',
      'sellVolume08': '--',
      'sellVolume09': '--',
      'sellVolume10': '--'
    }

  };
  /**
   * 当日委托数据类型
   */
  drwt = {
    'accountCode': '',
    'appointCnt': 900,
    'appointOrderCode': '',
    'appointPrice': '',
    'appointStatus': '',
    'appointStockCode': '',
    'appointTime': '',
    'appointType': 1,
    'dealAvrPrice': '',
    'dealCnt': 900,
    'isVritual': 1,
    'memo': '',
    'pkOrder': '',
    'productCode': '',
    'teamCode': ''
  };
  /**
 * 用户信息
 */
  userInfo = {
    allottedScale: '', // 初期规模
    ableScale: '',  // 可用资金
    accountName: 'null', // 中文名
    lockScale: '', // 冻结资金
    stockScale: 0, // 股票市值
    totalScale: '', // 总资产
    financeRatio: 8,
    financePeriod: 'day',
    balance: '',
    cashScale: 0,
    freezeScale: '',
    limitAbleScale: ''
  };

  opUserCode: string;
  logo = '';
  constructor(public router: Router) {
    this.token = this.getToken();
    this.opUserCode = this.getSession('opUserCode');
    if (this.getSession('userInfo') !== null) {

      const response = this.getSession('userInfo');
      this.token = '';
    }
    this.initLogo();
  }

  initLogo() {
    this.logo = 'login';
  }

  redirectTo(url) {
    location.replace(url);
  }

  /**
   * 获取当前url最后的参数
   */
  getUrl(num) {
    return window.location.hash.split('/')[num];
  }

  /**
 * 获取本地缓存，如果为空，则返回param
 * @param sessionName 本地缓存名
 * @param param 本地缓存为空时，赋值的值
 */
  getSessionOrParam(sessionName, param) {
    if (!this.isNull(this.getSession(sessionName))) {
      return this.getSession(sessionName);
    } else {
      return param;
    }
  }

  resetStockHQ() {
    this.stockHQ = {
      'stockName': '',
      'closePrice': '',
      'highPrice': '',
      'lowPrice': '',
      'lastPrice': '',
      'openPrice': '',
      'orderTime': '',
      'preClosePrice': '',
      'stockCode': '',
      'buyLevel': {
        'buyPrice01': '--',
        'buyPrice02': '--',
        'buyPrice03': '--',
        'buyPrice04': '--',
        'buyPrice05': '--',
        'buyPrice06': '--',
        'buyPrice07': '--',
        'buyPrice08': '--',
        'buyPrice09': '--',
        'buyPrice10': '--',
        'buyVolume01': '--',
        'buyVolume02': '--',
        'buyVolume03': '--',
        'buyVolume04': '--',
        'buyVolume05': '--',
        'buyVolume06': '--',
        'buyVolume07': '--',
        'buyVolume08': '--',
        'buyVolume09': '--',
        'buyVolume10': '--'
      },
      'sellLevel': {
        'sellPrice01': '--',
        'sellPrice02': '--',
        'sellPrice03': '--',
        'sellPrice04': '--',
        'sellPrice05': '--',
        'sellPrice06': '--',
        'sellPrice07': '--',
        'sellPrice08': '--',
        'sellPrice09': '--',
        'sellPrice10': '--',
        'sellVolume01': '--',
        'sellVolume02': '--',
        'sellVolume03': '--',
        'sellVolume04': '--',
        'sellVolume05': '--',
        'sellVolume06': '--',
        'sellVolume07': '--',
        'sellVolume08': '--',
        'sellVolume09': '--',
        'sellVolume10': '--'
      }

    };
  }

  /**
   * 页面跳转
   */
  goto(url) {
    return this.router.navigate([url]);
  }

  /**
   * 判断有几位小数
   */
  Decimal(num) {
    num = num + '';
    if (num.indexOf('.') !== -1) {
      return num.split('.')[1].length;
    } else {
      return 0;
    }
  }

  back() {
    window.history.back();
  }

  /**
   * 底部菜单栏
   */
  getFooterMenu() {
    return [{
      id: 'index',
      name: '首页',
      title: '期权T型报价',
      class: 'index'
    }, {
      id: 'zixuan',
      name: '自选',
      title: '自选',
      class: 'hangqing'
    }, {
      id: 'jiaoyi',
      name: '交易',
      title: '交易',
      class: 'jiaoyi'
    }, {
      id: 'chicang',
      name: '资产',
      title: '期权T型报价',
      class: 'zichan'
    }, {
      id: 'usercenter',
      name: '个人',
      title: '个人中心',
      class: 'geren'
    }];
  }

  /**
   * 获取个人中心菜单列表
   */
  getCenterMenuList() {
    return [{
      id: 'buy',
      name: '买入',
      class: ''
    }, {
      id: 'sell',
      name: '卖出',
      class: 'sell'
    }, {
      id: 'chedan',
      name: '撤单',
      class: 'chedan'
    }, {
      id: 'chicang',
      name: '持仓',
      class: 'chicang'
    }, {
      id: 'search',
      name: '查询',
      class: 'search'
    }];
  }

  /**
   * 获取当前时间：毫秒
   */
  getTime(type, time) {
    time = new Date(time);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const millseconds = time.getMilliseconds();
    switch (type) {
      case 'yyyy-MM-ddhh:mm:ss':
        return year + '-' + this.add0(month).toString() + '-' + this.add0(day) + ' ' +
          this.add0(hour) + ':' + this.add0(minutes) + ':' + this.add0(seconds);
      case 'yyyyMMddhhmmss':
        return year + this.add0(month).toString() + this.add0(day) +
          this.add0(hour) + this.add0(minutes) + this.add0(seconds) + this.add0(millseconds);
      case 'yyyy-MM-dd':
        return year + '-' + this.add0(month) + '-' + this.add0(day);
      case 'yyyyMMss':
        return year + this.add0(month).toString() + this.add0(day);
      case 'yyyy/MM/dd':
        return year + '/' + this.add0(month) + '/' + this.add0(day);
    }
  }

  beforeMonth() {
    return (new Date().getTime() - 2592000000);
  }

  /**
   * 个位数补充0
   */
  add0(num) {
    return num < 10 ? '0' + num : num;
  }

  getSession(name): any {
    return localStorage.getItem(name);
  }
  setSession(name, data) {
    return localStorage.setItem(name, data);
  }

  removeSession(name) {
    return localStorage.removeItem(name);
  }

  /**
   * 请求出错提示
   */
  isError() {
    this.Loading(this.hide);
    this.alert = true;
    setTimeout(() => {
      this.alert = false;
    }, 2000);
    this.errMsg = this.error.resultInfo;
    if (this.error.resultCode === 'token.error') {
      this.removeSession('token');
      this.clearInterval();
      this.goto('main/login');
    }
  }

  /**
   * 输入出错提示
   */
  ErrorMsg(desc) {
    this.alert = true;
    setTimeout(() => {
      this.alert = false;
    }, 1000);
    this.errMsg = desc;
  }

  getTokenP() {
    if (this.isNull(this.tokenP)) {
      return this.getLocalStorage('tokenP');
    } else {
      return this.tokenP;
    }
  }

  /**
   * 本地缓存
   * @param name // 缓存名
   * @param value // 缓存值
   */
  setLocalStorage(name, value) {
    localStorage.setItem(name, value);
  }

  /**
   * 获取本地缓存
   * @param name // 缓存名
   */
  getLocalStorage(name) {
    return localStorage.getItem(name);
  }

  /**
   * 加载中提示
   */
  Loading(type) {
    this.loading = type;
  }

  /**
   * 买入卖出数量向上取整
   */
  roundDown(num) {
    return parseInt((num / 100).toString(), 0) * 100;
  }

  /**
   * 判断是否为空
   */
  isNull(string) {
    // tslint:disable-next-line:max-line-length
    return (string === NaN || string === 'NaN' || string === 'undefined' || string === '' || string === null || string === 'null' || string === undefined || string === 'NaN') ? true : false;
  }

  hadHeader() {
    if (this.getSession('header') !== undefined) {
      const headers = new HttpHeaders(JSON.parse(this.getSession('header')));
      return headers;
    }
  }

  getHeader() {
    if (this.isNull(this.token)) {
      if (this.isNull(this.getToken())) {
        this.clearInterval();
        this.ErrorMsg('请登录');
        this.goto('main/login');
        return;
      } else {
        this.token = this.getToken();
        return { headers: new HttpHeaders({ 'Authorization': this.getToken() }) };
      }

    } else {
      return { headers: new HttpHeaders({ 'Authorization': this.token }) };
    }

  }

  /**
   * 带参数的页面跳转
   */
  gotoId(url, id) {
    this.router.navigate([url, id]);
  }

  getPayHeader() {
    if (this.isNull(this.token)) {
      if (this.isNull(this.getToken())) {
        this.clearInterval();
        this.ErrorMsg('请登录');
        this.goto('main/login');
        return;
      } else {
        this.token = this.getToken();
        // tslint:disable-next-line:max-line-length
        return new HttpHeaders({ 'Authorization': this.getToken(), 'Content-Type': 'text/html' });
      }

    } else {
      return new HttpHeaders({ 'Authorization': this.token, 'Content-Type': 'text/html' });
    }
  }

  getToken() {
    if (this.isNull(this.token)) {
      return this.getLocalStorage('token');
    } else {
      return this.token;
    }
  }

  getOpUserCode() {
    if (this.isNull(this.opUserCode)) {
      return this.getSession('opUserCode');
    } else {
      return this.opUserCode;
    }
  }

  /**
   * 限制只能输入数字
   */
  keyup() {
    const k = event['keyCode'];
    if (((k >= 48) && (k <= 57)) || k === 8 || ((k >= 96) && (k <= 105)) || k === 110 || k === 190) {// 限制输入数字

    } else {
      this.preventDefault();
    }
  }

  preventDefault() {
    if (window.event) {
      window.event.returnValue = false;
    } else {
      event.preventDefault(); // for firefox
    }
  }

  /**
   * 判断时间点是否在8：00到16：00之间
   */
  isPerfectTime() {
    const time = new Date();
    if (time.getHours() >= 8 && (time.getHours() <= 16)) {
      return true;
    } else {
      return false;
    }

  }

  /**
   * 清除轮询
   */
  clearInterval() {

    window.clearTimeout(this.intervalAppoint);
    window.clearTimeout(this.intervalCapital);
    window.clearTimeout(this.intervalHold);
    window.clearTimeout(this.intervalZX);
    window.clearTimeout(this.timeoutQoute);
    window.clearTimeout(this.timeoutFenshi);
  }

  /**
   * 四舍五入
   */
  roundNumber(num) {
    if (!this.isNull(num)) {
      return Math.round(num * 100) / 100;
    } else {
      return '';
    }

  }

  /**
   * 是否为验证数字
   */
  isNum(num) {
    return /^[0-9]*$/.test(num);
  }
  /**
 * 保留n位小数
 */
  roundNum(num, n): number {
    let temp = '1';
    for (let x = 1; x <= n; x++) {
      temp = temp + '0';
    }
    const i = parseInt(temp, 0);
    return Math.round(num * i) / i;
  }

  /**
   * 随机生成n位字符串
   * @param num 生成字符串的位数
   */
  randomString(num) {
    const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c',
      'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
      's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
      'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
      'V', 'W', 'X', 'Y', 'Z'];
    let temp = '';
    for (let i = 0; i < num; i++) {
      temp = temp + arr[Math.round(Math.random() * (arr.length - 1))];
    }
    return temp;
  }

}


export interface Error {
  resultCode: string;
  resultInfo: string;
  success: boolean;
}

export interface StockList {
  pinYin: string;
  stockCode: string;
  stockName: string;
}
