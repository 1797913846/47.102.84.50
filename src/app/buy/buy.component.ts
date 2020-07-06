import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { DataService, StockList } from '../data.service';
import { HttpService } from '../http.service';
import { Response } from '@angular/http';
import { trigger, state, style, animate, transition } from '@angular/animations';
declare var StockChart: any;
declare var EmchartsMobileTime: any;
declare var EmchartsMobileK: any;

declare var layer: any;
import * as $ from 'jquery';
@Component({
    selector: 'app-buy',
    templateUrl: './buy.component.html',
    styleUrls: ['./buy.component.css'],
    animations: [
        trigger('showDelete', [
            //股票列表消失
            state('inactive', style({
                height: 0,
                opacity: 0
            })),
            //股票列出现
            state('active', style({
                height: '400px',
                opacity: 1
            })),
            //动画效果
            transition('inactive => active', animate('100ms ease-in')),
            transition('active => inactive', animate('100ms ease-out'))
        ])
    ]
})
export class BuyComponent implements DoCheck, OnDestroy, OnInit {
    textname: string = '限价';
    namename: any = 'xj';
    isShow: any = false;
    text: string;
    text2: string;
    classType: string;
    //show变量是用来控制股票列表移动的，当show为active的时候就出现，且上移了
    show = 'inactive';
    stockCode = '';
    appointPrice: any;
    appointCnt: any;
    ccount: any;
    fullcount: any;
    minPrice: number;
    maxPrice: number;
    stockHQ: any;
    list: any;
    stockName: string;
    connectStatus: boolean;
    market = 'market';
    submitAlert: boolean;
    userName: string;
    socketInterval: any;
    lastPrice: any;
    priceType: any;
    maxAppointCnt = ''; // 最大可买数量
    ableScale = 0; // 可用资金
    ygsxf = 0; // 预估手续费
    commission = 0; // 交易佣金
    price = [];
    volumes = [];
    showChart = false; // 展示分时图
    showLine = false;

    chartTypeList = [{
        name: '分时',
        type: 'T1'
    }, {
        name: '五日',
        type: 'T5'
    }, {
        name: '日K',
        type: 'DK'
    }, {
        name: '周K',
        type: 'WK'
    }, {
        name: '月K',
        type: 'MK'
    }];
    chartType = 'T1';
    constructor(public data: DataService, public http: HttpService) {
        this.fullcount = '--';
        this.maxPrice = 10;
        this.minPrice = 5;
        this.stockHQ = this.data.stockHQ;
        this.appointPrice = '';
        this.connectStatus = false;
        this.submitAlert = this.data.hide;
        this.userName = this.data.getOpUserCode();
        if (!this.data.isNull(this.data.getSession('optionCode'))) {
            if (this.data.getUrl(3) === 'buy') {
                this.text = '买入';
                this.classType = 'BUY';
                this.text2 = '买';
            } else if (this.data.getUrl(3) === 'sell') {
                this.text = '卖出';
                this.classType = 'SELL';
                this.text2 = '卖';
            }
            this.stockCode = this.data.getSession('optionCode');
            this.getGPHQ();
        }
        this.http.commission().subscribe(res => {
            this.ygsxf = parseFloat(res.toString());
        });
        this.ableScale = this.data.getSession('backscale');
    }

    handle(cnt) {
        let fee = this.appointPrice * cnt * this.ygsxf;
        if (fee <= 5) {
            fee = 5;
        }
        if (this.classType === 'BUY') { // 买入手续费
            return Math.round((fee + this.appointPrice * this.appointCnt * 0.00002) * 100) / 100;
        } else { // 卖出手续费
            // tslint:disable-next-line:max-line-length
            return Math.round((fee + this.appointPrice * this.appointCnt * 0.00002 + this.appointPrice * this.appointCnt * 0.001) * 100) / 100;
        }
    }

    ngOnInit() {
        var oHeight = $(document).height();
        // 在adnroid中如何监听软键盘的弹起与收起
        $(window).resize(function () { //ios软键盘弹出不会触发resize事件
            if ($(document).height() < oHeight) {
                // 当软键盘弹起，在此处操作
                $("#search-div").css("position", "absolute");
                $("#search-div").css("bottom", "-265px");
                $("#footer1").css("position", "static");
            } else {
                // 当软键盘收起，在此处操作
                $("#search-div").css("position", "absolute"); //adsolute或fixed，看你布局
                $("#search-div").css("bottom", "0px");
                $("#footer1").css("position", "fixed");
            }
        });
    }

    ngDoCheck() {
        if (this.data.getUrl(3) === 'buy') {
            this.text = '买入';
            this.classType = 'BUY';
            this.text2 = '买';
        } else if (this.data.getUrl(3) === 'sell') {
            this.text = '卖出';
            this.classType = 'SELL';
            this.text2 = '卖';
        }
        this.stockHQ = this.data.stockHQ;
        if (this.data.searchStockCode !== '' && this.data.searchStockCode.length === 6 && this.data.searchStockCode !== this.stockCode) {
            this.stockCode = this.data.searchStockCode;
            this.getGPHQ();
        }
    }

    changeType(type) {
        window.clearTimeout(this.data.timeoutFenshi);
        this.chartType = type;
        if (this.chartType === 'T1' || this.chartType === 'T5') {
            this.getFenshituList();
        } else {
            this.KLine();
        }
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnDestroy() {
        this.data.resetStockHQ();
        this.cancelSubscribe();
        this.data.searchStockCode = '';
    }

    ableCnt() {
        // tslint:disable-next-line:max-line-length
        if (this.classType === 'BUY' && !this.data.isNull(this.appointPrice)
            && !this.data.isNull(this.appointCnt)) {
            this.maxAppointCnt = (this.ableScale / (10000 * parseFloat(this.appointPrice) + this.commission)).toString();
            this.maxAppointCnt = parseInt(this.maxAppointCnt, 0).toString();
        }
        return this.maxAppointCnt;
    }

    /**
    * 选择买入量
    */
    selectCount(text) {
        if (this.fullcount !== '--') {
            this.ccount = text;
            switch (text) {
                case 'full':
                    // 选择全仓的时候，判断是否是买入，买入的话，全仓数量按照正常规则。卖出的话，全仓数量为可卖数量
                    if (this.classType === 'BUY') {
                        this.appointCnt = this.data.roundDown(this.fullcount);
                    } else {
                        this.appointCnt = this.fullcount;
                    }

                    break;
                case 'half':
                    this.appointCnt = this.data.roundDown(this.fullcount / 2);
                    break;
                case '1/3full':
                    this.appointCnt = this.data.roundDown(this.fullcount / 3);
                    break;
                case '1/4full':
                    this.appointCnt = this.data.roundDown(this.fullcount / 4);
                    break;
            }
        }

    }



    /**
     * 选择价格类型
     */
    selectType(type) {
        this.priceType = type;
        switch (type) {
            case 1:
                this.appointPrice = this.stockHQ.lastPrice;
                break;
            case 2:
                this.appointPrice = this.stockHQ.sellLevel.sellPrice01;
                break;
            case 3:
                this.appointPrice = this.stockHQ.buyLevel.buyPrice01;
                break;
            default:
                break;
        }
        this.appointPrice = this.data.roundNum(this.appointPrice, 4);
    }

    /**
     * 获取股票列表
     */
    //(股票代码/首字母)键入的时候触发的
    getQuotation() {
        this.data.searchStockCode = '';
        this.stockHQ.lastPrice = '';
        this.stockHQ.upRatio = '';
        this.stockName = '';
        //show变量是用来控制股票列表移动的,当show为active的时候就出现，且上移了
        this.show = 'active';

        window.clearTimeout(this.data.timeoutFenshi);
        this.cancelSubscribe();
        //stockCode为输入框输入的检索内容，双向绑定的
        this.http.searchStock(this.stockCode).subscribe((res) => {
            //这里就请求拿到了列表
            this.list = res;
            // if (this.stockCode.length === 6 && !this.data.isNull(this.list[0])) {
            //     this.selectGP(this.list[0]);
            // }
        }, (err) => {
            this.data.error = err.error;
            this.data.isError();
        });
        if (!this.connectStatus) {

        }
        //当stockCode为0时，相当于取消了搜索框键入值
        if (this.stockCode.length === 0) {
            //inactive的时候把列表高度设为1，且透明了
            this.show = 'inactive';
            this.showChart = false;
            this.clear();
        }
    }

    KLine() {
        const marketType = (this.stockCode.substr(0, 1) === '5' || this.stockCode.substr(0, 1) === '6') ? '1' : '2';
        const chart = new EmchartsMobileK({
            container: 'chart',
            type: this.chartType,
            code: `${this.stockCode}${marketType}`,
            width: document.body.clientWidth,
            height: 200,
            dpr: 2,
            showVMark: true
        });
        // 调用绘图方法
        chart.draw();

        this.data.timeoutFenshi = setTimeout(() => {
            this.KLine();
        }, 30000);
    }

    getFenshituList() {
        const marketType = (this.stockCode.substr(0, 1) === '5' || this.stockCode.substr(0, 1) === '6') ? '1' : '2';
        const chart = new EmchartsMobileTime({
            container: 'chart',
            type: this.chartType,
            code: `${this.stockCode}${marketType}`,
            width: document.body.clientWidth,
            height: 180,
            dpr: 2
        });
        // 调用绘图方法
        chart.draw();

        this.data.timeoutFenshi = setTimeout(() => {
            this.getFenshituList();
        }, 30000);
    }
    fenshitu() {
        StockChart.drawTrendLine({
            id: 'trendLine',
            height: 150,
            width: document.body.clientWidth - 20,
            prices: this.price,
            volumes: this.volumes,
            volumeHeight: 40,
            preClosePrice: parseFloat(this.stockHQ.preClosePrice),
            middleLineColor: 'rgb(169, 126, 0)'
        });
    }
    changeName() {
        this.isShow = !this.isShow;
    }
    closeName() {
        if (this.namename == 'xj') {
            this.textname = '限价'
        } else if (this.namename == 'sj') {
            this.textname = '市价'
        }
        this.isShow = false;
    }
    closeBu() {
        if (this.namename == 'xj') {
            this.textname = '限价'
        } else if (this.namename == 'sj') {
            this.textname = '市价'
        }
        this.isShow = false;
    }
    /**
     * 买入
     */
    buy() {
        if (this.data.isNull(this.stockCode)) {
            this.data.ErrorMsg('股票代码不能为空');
        } else if (this.data.Decimal(this.appointPrice) > 2) {
            this.data.ErrorMsg('委托价格不能超过两位小数');
        } else if (this.data.isNull(this.appointPrice)) {
            this.data.ErrorMsg('委托价格不能为空');
        } else if (this.appointPrice < parseFloat(this.stockHQ.priceDownlimit).toFixed(2)) {
            this.data.ErrorMsg('委托价格不能低于跌停价');
        } else if (this.appointPrice > parseFloat(this.stockHQ.priceUplimit).toFixed(2)) {
            this.data.ErrorMsg('委托价格不能高于涨停价');
        } else if (parseInt(this.appointCnt, 0) !== this.appointCnt) {
            this.data.ErrorMsg(`${this.text}数量必须是整数`);
        } else if (this.appointCnt % 100 !== 0) {
            if (this.classType === 'SELL' && this.appointCnt === this.fullcount) {
                this.submitAlert = this.data.show;
            } else {
                this.data.ErrorMsg(this.text + '数量必须是100的整数倍');
            }
        } else if (this.appointCnt > this.fullcount) {
            if (this.classType === 'BUY') {
                this.data.ErrorMsg(`可用资金不足`);
            } else {
                this.data.ErrorMsg(`可卖数量不足`);
            }
        } else if (this.appointCnt <= 0) {
            this.data.ErrorMsg(`${this.text}数量必须大于0`);
            // } else if (this.appointCnt > 29) {
            //     this.data.ErrorMsg(this.text + '数量不能大于29张');
        } else {
            this.submitAlert = this.data.show;
        }

    }

    /**
     * 买入确认
     */
    submintBuy() {
        let price;
        if (this.namename == 'xj') {
            price = this.appointPrice
        } else if (this.namename == 'sj') {
            if (this.classType === 'BUY') {
                price = this.stockHQ.priceUplimit
            } else {
                price = this.stockHQ.priceDownlimit
            }
        }
        this.data.Loading(this.data.show);
        const content = {
            'stockCode': this.stockCode,
            'appointCnt': this.appointCnt,
            'appointPrice': price
        };
        this.http.order(this.classType, content, this.classType === 'BUY' ? 'OPEN' : 'CLOSE').subscribe((res: Response) => {
            if (res['success']) {
                this.data.ErrorMsg('委托已提交');
                this.closeAlert();
                this.clear();
            }
        }, (err) => {
            this.data.error = err.error;
            this.data.isError();
            this.closeAlert();
        }, () => {
            this.data.Loading(this.data.hide);
            this.closeAlert();
            this.clear();
        });
    }

    /**
     * 关闭弹窗
     */
    closeAlert() {
        this.submitAlert = this.data.hide;
    }

    /**
     * 增加减少买入价
     */
    count(type) {
        if (!this.data.isNull(this.appointPrice)) {
            this.appointPrice = parseFloat(this.appointPrice);
            if (type === -1 && this.appointPrice > 0) {
                this.appointPrice = this.appointPrice - 0.01;
            } else if (type === 1) {
                this.appointPrice = this.appointPrice + 0.01;
            }
            this.appointPrice = parseFloat(this.appointPrice.toFixed(2));
        }
    }

    /**
     * 增加减少买入量
     */
    count2(type) {
        this.ccount = '';
        if (!this.data.isNull(this.appointCnt)) {
            if (type === -1 && this.appointCnt > 0) {
                this.appointCnt = this.appointCnt - 100;
            } else if (type === 1) {
                this.appointCnt = this.appointCnt + 100;
            }
        }
    }

    /**
     * 清空
     */
    clear() {
        window.clearTimeout(this.data.timeoutFenshi);
        this.showChart = false;
        this.stockCode = '';
        this.appointPrice = '';
        this.appointCnt = '';
        this.ccount = '';
        this.stockName = '';
        this.fullcount = '--';
        this.priceType = 0;
        this.data.resetStockHQ();
        this.data.searchStockCode = '';
        this.stockHQ = this.data.stockHQ;
        this.cancelSubscribe();
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
    /**
     * 选取价格
     */
    selectPrice(price) {
        if (typeof (price) === 'string') {
            this.appointPrice = parseFloat(price);
        } else {
            this.appointPrice = price;
        }
        this.appointPrice = this.data.roundNum(this.appointPrice, 2);
    }

    /**
     * 模糊查询选择股票
     */
    selectGP(data: StockList) {
        this.stockCode = data.stockCode;
        this.appointPrice = '';
        this.getGPHQ();
    }

    // 选中合约
    getGPHQ() {
        this.showChart = true;
        this.priceType = 1;
        this.ccount = '';
        this.show = 'inactive';
        this.data.searchStockCode = this.stockCode;
        this.http.getGPHQ(this.stockCode, this.data.token).subscribe((res) => {
            window.clearTimeout(this.data.timeoutFenshi);
            if (this.stockCode.length === 6) {
                this.getFenshituList();
            }
            if (!this.data.isNull(res['resultInfo']['quotation'])) {
                this.data.stockHQ = res['resultInfo']['quotation'];
                if (this.classType === 'BUY') {
                    let reg = /^688[0-9]{3}$/;
                    if (reg.test(this.data.stockHQ.stockCode)) {
                        this.appointCnt = 200;
                    } else {
                        this.appointCnt = 100;
                    }
                    this.fullcount = res['resultInfo']['maxBuyCnt'];
                } else {
                    this.fullcount = res['resultInfo']['maxSellCnt'];
                    // if (this.fullcount > 29) {
                    //     this.appointCnt = 29;
                    // } else {
                    //     this.appointCnt = this.fullcount;
                    // }
                    this.appointCnt = this.fullcount;

                }
                this.stockName = this.data.stockHQ.stockName;
                this.appointPrice = this.data.roundNum(this.data.stockHQ.lastPrice, 4);
            } else {
                this.stockHQ = this.data.stockHQ;
            }

        }, (err) => {
            this.data.error = err.error;
            this.data.isError();
        });
    }


    totalPrice(a, b) {
        if (!this.data.isNull(a) && !this.data.isNull(b)) {
            return this.data.roundNumber(a * b);
        } else {
            return '------';
        }
    }

    color(string) {

        if (!this.data.isNull(string)) {
            string = string.toString();
            if (string.indexOf('-') >= 0) {
                return 'green';
            } else {
                return 'red';
            }
        }
    }

    /**
     * 返回行情加个颜色
     */
    HQColor(price) {
        if (price !== '--') {
            if (price > this.stockHQ.preClosePrice) {
                return 'red';
            } else if (price < this.stockHQ.preClosePrice) {
                return 'green';
            } else {
                return '';
            }
        }

    }

    /**
     * 输入买入量
     */
    inputCnt() {
        this.ccount = '';
    }
}
