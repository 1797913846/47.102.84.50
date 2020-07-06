import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DataService } from './data.service';
import { Md5 } from 'ts-md5';
import { PARAMETERS } from '@angular/core/src/util/decorators';

@Injectable()
export class HttpService {
  stompClient: any;
  public host = '';
  public ws = '';
  public stockHQ: any;

  constructor(public http: HttpClient, public data: DataService) {
    console.log(location.protocol);
    // this.host = 'http://47.102.151.13/tn/';
    this.host = 'http://hzyypz.com/tn/';
    // this.host = 'http://139.224.61.211/tn/';
    // this.host = 'http://22088.xyz/tn/';
    // this.host = 'http://h5tncl.starsforge.com/tn/';
    // this.host = 'http://47.99.195.183/tn/'
    // this.host = 'http://47.103.56.22/tn/';
    // this.host = '/tn/';
    // this.host = 'http://106.14.120.212/tn/';
    // this.host = 'http://mlwealth.cn/tn/';
    // this.host='http://47.102.84.50/tn/';
    // this.host='http://10.131.4.155:8080/tn/'
    this.ws = this.host + 'webSocket';
  }

  POST(url, data) {
    this.data.getHeader();
    return this.http.post(url, data, this.data.getHeader());
  }

  /**
 * 用户修改密码
 */
  resetOldPwd(data) {
    return this.POST(this.host + 'tntg/pwdReset', data);
  }

  /**
   * 获取验证码
   */
  getCode(type, phone) {
    return this.http.post(this.host + `public/smsCode/${type}/${phone}`, {});
  }

  /**
   * 查询余额
   */
  getLiftAmount() {
    return this.POST(this.host + `tntg/getLiftAmount`, {});
  }
  /**
   * 结束策略
   */
  finishStrategy() {
    return this.POST(this.host + `tntg/Strategy`, {});
  }

  /**
   * 出金
   */
  withDraw2(data) {
    return this.POST(this.host + `tntg/withdraw`, data);
  }

  /**
   * 开始策略
   */
  deposit(data) {
    return this.POST(this.host + `tntg/deposit`, data);
  }

  /**
   * 资金流水
   */
  getFlow(data) {
    return this.POST(this.host + 'tntg/fundStream/list', data);
  }

  /**
   * 管理费计算公式
   */
  getManagerFee() {
    return this.POST(this.host + 'tntg/manageFee', {});
  }

  /**
   * 融资信息
   */
  financeScheme() {
    return this.POST(this.host + 'tntg/financeScheme', {});
  }

  /**
   * 管理费
   */
  getManagerFee2(data) {
    return this.POST(this.host + 'tntg/theManageFee', data);
  }

  /**
   * 用户注册
   */
  signup(data) {
    return this.http.post(this.host + `public/register`, data);
  }
  signup1(data1) {
    return this.http.post(`http://hzyypz.com:8199/invite/tag`, data1);
  }
  /*新闻 */
  getNewsToken(params: any, reqOpts?: any) {
    let salt = "17598753-888d-4fd0-8dd3-1998386a0ef0"
    let url = "https://api.xuetz.com/api/doMethod"
    let sign = Md5.hashStr(encodeURIComponent(JSON.stringify(params) + salt));
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams().set("param", JSON.stringify(params)).set("sign", sign + ""),
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        })
      };
    }
    return this.http.get(url, reqOpts);
  }

  /**
  * 用户修改密码
  */
  reset(data) {
    return this.http.post(this.host + `public/pwdResetByVerifyCode`, data);
  }

  /**
   * 资讯列表
   */
  newsList() {
    return this.http.post(this.host + 'tn/quota/newsList', {});
  }

  /**
   * 资讯详情
   */
  newsDetail(id) {
    return this.http.post(this.host + `tn/quota/newsDetail/${id}`, {});
  }

  /**
   * 获取银行列表
   */
  getBankList() {
    return this.POST(this.host + 'tn/banks', {});
  }

  /**
   * 银行转账信息提交
   * @param amount 充值金额
   */
  submitBankTrans(amount, type) {
    return this.POST(this.host + 'tntg/submitBankTrans/' + type, { totalAmount: amount });
  }

  /**
   * 获取银行省份列表
   */
  getProvinceList(bankId) {
    return this.POST(this.host + `tn/banks/${bankId}/provinces`, {});
  }

  /**
  * 获取银行城市列表
  */
  getCityList(bankId, provinceId) {
    return this.POST(this.host + `tn/banks/${bankId}/province/${provinceId}/cities`, {});
  }

  /**
  * 获取银行支行列表
  */
  getBranchList(bankId, provinceId, branchId) {
    return this.POST(this.host + `tn/banks/${bankId}/province/${provinceId}/cities/${branchId}/branches`, {});
  }

  /**
   * 查询银行卡绑定
   */
  getCard() {
    return this.POST(this.host + `tn/query/card`, {});
  }


  /**
   * 绑定银行卡
   * @param data 绑定银行卡
   */
  bandCard(data) {
    return this.POST(this.host + `tn/bind/card`, data);
  }

  /**
   * 充值
   */
  aliPay(moeny) {
    return this.http.post(this.host + `alipay/sign?totalAmount=${moeny}`, {},
      { headers: this.data.getPayHeader(), responseType: 'text' });
  }

  /**
   * 第三方支付
   */
  thirdPay(type, data) {
    return this.http.post(`${this.host}${type}/request`, data,
      { headers: { 'Authorization': this.data.getToken() }, responseType: 'text' });
  }

  /**
   * 合约周期
   */
  heyuezhouqi() {
    return this.http.post(this.host + `tn/quota/yymm`, {});
  }

  /**
   * 获取认购/认沽列表
   * @param date 日期
   * @param type 买或卖
   */
  getQuotaList(date, type) {
    return this.http.post(this.host + `tn/quota/yymm/${date}/${type}`, {});
  }

  /**
   * 总体趋势
   */
  generalTrend() {
    return this.http.post(this.host + `tn/quota/generalTrend`, {});
  }

  /**
   * 获取用户自选列表
   */
  getUserStockList() {
    return this.POST(`${this.host}tntg/selfStock/list`, {});
  }

  /**
   * 新增自选股
   * @param code 股票代码
   */
  addStockList(code) {
    return this.POST(`${this.host}tntg/selfStock/insert?stockCode=${code}`, {});
  }

  /**
   * 删除自选股
   * @param code 股票代码
   */
  delStockList(code) {
    return this.POST(`${this.host}tntg/selfStock/delete?stockCode=${code}`, {});
  }

  /**
   * 批量添加自选股
   */
  addStockList2(list) {
    return this.POST(`${this.host}tntg/selfStock/updateBatch`, list);
  }

  /**
   * 分时图数组
   */
  fenshituList(optionCode) {
    return this.POST(this.host + `tn/quota/detail/${optionCode}`, {});
  }

  /**
   * 合约列表
   * @Param date
   */
  heyueList(date) {
    return this.http.post(this.host + `tn/quota/yymm/${date}`, {});
  }

  /**
   * 请求股票行情
   */
  getGPHQ(code, token) {
    return this.POST(this.host + `push/subsMarket/${code}?tokenP=${this.data.getTokenP()}`, {});
  }

  /**
  * 获取手续费
  */
  commission() {
    return this.POST(this.host + 'tntg/commission', {});
  }

  /**
   * 获取收款人信息
   */
  getPayCardInfo() {
    return this.POST(this.host + 'tntg/payCardInfo', {});
  }

  /**
   *  静态信息
   * @param code 合约代码
   */
  getStatic(code) {
    return this.POST(this.host + `tn/quota/static/${code}`, {});
  }
  /**
   * 登录接口
   */
  login(data) {
    return this.http.post(this.host + 'tntg/login', data);
  }

  /**
   * 模糊查询股票
   */
  searchStock(code) {
    return this.http.post(this.host + 'tntg/stock?input=' + code, {});
  }

  /**
   * 提现
   */
  withdraw(data) {
    return this.POST(this.host + 'tntg/lift', data);
  }

  /**
   * 下单 参数 买入：BUY 卖出：SELL
   */
  order(type, data, stockType) {
    return this.POST(this.host + 'tntg/appoint/' + type + '/' + stockType, data);
  }

  /**
   * 取消订阅
   */
  cancelSubscribe() {
    return this.POST(this.host + 'push/unsubsMarket', {});
  }

  /**
   * 查询持仓
   */
  getHold(aurl) {
    return this.POST(this.host + aurl, {});
  }

  /**
   * 查询个人详情
   */
  userDetail() {
    return this.POST(this.host + 'tntg/userInfo', {});
  }

  /**
   * 查询委托
   */
  getAppoint(time) {
    return this.POST(this.host + 'tntg/appointHis?' + time, {});
  }

  /**
   * 个人中心
   */
  userCenter() {
    return this.POST(this.host + 'tntg/capital', {});
  }

  /**
   * 查看个人信息，未登录不跳转到登录界面
   */
  userCenter2() {
    return this.http.post(this.host + 'tntg/capital', {}, { headers: new HttpHeaders({ 'Authorization': this.data.getToken() }) });
  }

  /**
   * 确认撤单
   */
  chedan(code) {
    return this.POST(this.host + 'tntg/cancel/' + code, {});
  }

  /**
   * 自选股订阅
   */
  zixuanSubscribe(string) {
    return this.http.post(this.host + 'push/subscribe/' + string, {});
  }

  /**
   * 获取自选股行情
   */
  zixuanDetail(string) {
    return this.http.post(this.host + 'push/self/' + string, {});
  }

  /**
   * 获取支付途径
   */
  getPayWay() {
    return this.POST(`${this.host}tntg/config/CTRL_PAY_CHANNEL`, {});
  }
}
