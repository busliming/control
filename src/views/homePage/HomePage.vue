<template>
    <div class="card card-primary home-page">
        <div class="card-body">
            <div class="toolbar">
                <!--搜索栏-->
                <el-form :inline="true" label-width="120px">
                    <el-form-item label="日期选择：">
                        <el-date-picker
                                size="small" v-model="daterange" type="daterange"
                                format="yyyy-MM-dd" value-format="yyyy-MM-dd" range-separator="~"
                                start-placeholder="开始日期" end-placeholder="结束日期"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" @click="setQueryDate(1)">
                            今日
                        </el-button>
                        <el-button size="small" @click="setQueryDate(2)">
                            昨日
                        </el-button>
                        <el-button size="small" @click="setQueryDate(3)">
                            本周
                        </el-button>
                        <el-button size="small" @click="setQueryDate(4)">
                            上周
                        </el-button>
                        <el-button size="small" @click="setQueryDate(5)">
                            本月
                        </el-button>
                        <el-button size="small" @click="setQueryDate(6)">
                            上月
                        </el-button>
                    </el-form-item>
                    <el-form-item label="站点名称：">
                        <el-select
                                v-model="siteId"
                                filterable clearable
                                placeholder="全部站点" size="small"
                        >
                            <el-option label="全部站点" value="">全部站点</el-option>
                            <el-option
                                    v-for="item in siteList"
                                    :key="item.siteId"
                                    :label="item.siteName"
                                    :value="item.siteId"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="" style="margin-left:20px">
                        <el-button
                                class="search-btn" type="primary"
                                size="small" icon="el-icon-search"
                                :loading="pageLoading"
                                @click="queryHandler()"
                        >
                            搜索
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div class="card-data">
                <el-row style="display: flex"><!--row1-->
                    <Counter
                            className="count1" title="总盈亏"
                            tips="总下注-总中奖-总税收"
                            bottomLabel="本月日均盈利"
                            :value="homeData.totalAmountProfit"
                            :average="homeData.dayTotalAmountProfit"
                            v-loading="pageLoading"
                            element-loading-background="rgba(0, 0, 0, 0.2)"
                    />
                    <Counter
                            className="count2" title="总入款额"
                            tips="统计时间范围内：人工充值+官方充值+线上支付"
                            bottomLabel="本月日均入款额"
                            :value="homeData.totalRechargeAmount"
                            :average="homeData.dayTotalRechargeAmount"
                            v-loading="pageLoading"
                            element-loading-background="rgba(0, 0, 0, 0.2)"
                    />
                    <Counter
                            className="count3" title="总出款额"
                            tips="统计时间范围内：银行卡出款+支付宝出款+自动出款+人工提现"
                            bottomLabel="本月日均出款额"
                            :value="homeData.totalWithdrawalAmount"
                            :average="homeData.dayTotalWithdrawalAmount"
                            v-loading="pageLoading"
                            element-loading-background="rgba(0, 0, 0, 0.2)"
                    />
                    <Counter
                            className="count4" title="有效会员下注"
                            bottomLabel="本月日均有效下注"
                            :value="homeData.validMember"
                            :average="homeData.dayValidMember"
                            v-loading="pageLoading"
                            element-loading-background="rgba(0, 0, 0, 0.2)"
                    />
                </el-row><!--/row1-->

                <el-row><!--row2-->
                    <StatisticTable
                            :data="homeData"
                            v-loading="pageLoading"
                            element-loading-background="rgba(0, 0, 0, 0.05)"
                    />
                </el-row><!--/row2-->

                <el-row><!--row3: 笔数/人数+注册人数-->
                    <VChart
                            :data="chart1"
                            :chartSettings="chartSettings"
                            :isUpdated="siteId"
                            @mutation="VChartMutations1"
                    />
                </el-row><!--/row3-->

                <el-row><!--row4：充提+游戏热门-->
                    <VChart
                            :data="chart2"
                            :chartSettings="chartSettings"
                            :isUpdated="siteId"
                            @mutation="VChartMutations2"
                    />
                </el-row><!--/row4-->

                <el-row><!--row5：盈亏＋流量分布-->
                    <VChart
                            :data="chart3"
                            :chartSettings="chartSettings"
                            :isUpdated="siteId"
                            @mutation="VChartMutations3"
                    />
                </el-row><!--/row5-->

            </div><!--/card-data-->
        </div><!--/card-body-->
    </div>
</template>

<script>
    import StatisticTable from './components/StatisticTable'
    import Counter from './components/Counter'
    import VChart from './components/VChart'
    import request from '@/requests/homePage'
    import formatter from '@/tools/formatter'

    export default {
        components: {VChart, Counter, StatisticTable},
        data() {
            return {
                isSiteChanged: false, //是否勾选站点
                pageLoading: false,
                // 搜索栏
                daterange: [],
                siteList: [],
                siteId: '',
                // row1  // row2 //注册人数
                homeData: {
                    rechargeAmount: '',
                    firstDepositPeople: '',
                    firstDepositAmount: '',
                    twoCount: '',
                    twoAmount: '',
                    rechargeCount: '',
                    rechargePeopleCount: '',
                    withdrawalAmount: '',
                    withdrawalCount: '',
                    withdrawalPeople: '',
                    refuseAmount: '',
                    refuseNumber: '',
                    memberBalance: '',
                    safeBalance: '',
                    betAmount2: '',
                    betAmount2Number: '',
                    betAmount: '',
                    betNumber: '',
                    betCount: '',
                    taxAmount: '',
                    taxNumber: '',
                    rebateAmount: '',
                    rebateNumber: '',
                    activityAmount: '',
                    activityNumber: '',
                    rechargetime: '',
                    withdrawaltime: '',
                    totalAmountProfit: '',
                    dayTotalAmountProfit: '',
                    totalRechargeAmount: '',
                    dayTotalRechargeAmount: '',
                    totalWithdrawalAmount: '',
                    dayTotalWithdrawalAmount: '',
                    validMember: '',
                    dayValidMember: ''
                },
                // row3: 笔数/人数 + 注册人数
                chartSettings: {//图表的设置
                    area: true,
                    labelMap: {
                        withdrawCount: '提现笔数',
                        chargeCount: '充值笔数',
                        firstPeopleCount: '首充笔数',

                        withdrawMoney: '提现金额',
                        chargeMoney: '充值金额',
                        firstMoney: '首充金额',

                        systemMoney: '累计系统盈亏',
                        promotionRebate: '累计推广返水',
                        serviceTax: '累计服务税收',
                    }
                },
                chart1: {    //处理的数据
                    type: 1, //笔数/人数 - component的类型
                    mainTitle: '笔数/人数',
                    summary: [
                        {label: '累计充值笔数/人数', val1: '0', val2: '0'},
                        {label: '累计提现笔数 /人数', val1: '0', val2: '0'},
                        {label: '累计首充笔数', val1: '0'}
                    ],
                    rawData: {},            //接口返回-未处理的数据
                    chartLoading: false,    //图表loading状态
                    chartType: 1,   // 1: 提现笔数 2: 充值笔数 3: 首充笔数
                    chartData: {    //图表数据
                        colPrototypes: [
                            ['createDate', 'withdrawCount'],
                            ['createDate', 'chargeCount'],
                            ['createDate', 'firstPeopleCount']
                        ],
                        columns: [],
                        rows: []
                    },
                    rightBar: {     //注册人数
                        title: '注册人数',
                        tabList: [],
                        tableData: [],
                        loading: false
                    }
                },
                // row4: 充提 +　游戏热门
                chart2: {           //处理的数据
                    type: 2,    //充提 - component的类型
                    mainTitle: '充提',
                    summary: [  //充提数据
                        {label: '累计充值金额', val1: '0.00'},
                        {label: '累计提现金额', val1: '0.00'},
                        {label: '累计首充金额', val1: '0.00'}
                    ],
                    chartType: 1,   // 1: 提现金额 2: 充值金额 3: 首充金额
                    rawData: {},            //接口返回-未处理的数据
                    chartLoading: false,    //图表loading状态
                    chartData: {    //图表数据
                        colPrototypes: [
                            ['createDate', 'withdrawMoney'],
                            ['createDate', 'chargeMoney'],
                            ['createDate', 'firstMoney']
                        ],
                        columns: [],
                        rows: []
                    },
                    rightBar: { //游戏热度
                        title: '游戏热度',
                        rawData: [],
                        activeTab: '1',
                        tabList: ['有效下注', '人数'],
                        tableData: [],
                        loading: false
                    }
                },
                // row5：盈亏　＋　流量分布
                chart3: {           //处理的数据
                    type: 3, //盈亏 - component的类型
                    mainTitle: '盈亏',
                    summary: [  //盈亏数据
                        {label: '累计系统盈亏', val1: '0.00'},
                        {label: '累计推广返利', val1: '0.00'},
                        {label: '累计服务税收', val1: '0.00'}
                    ],
                    chartLoading: false,    //图表loading状态
                    rawData: {},            //接口返回-未处理的数据
                    chartData: {    //图表数据
                        colPrototypes: [
                            ['createDate', 'systemMoney'],
                            ['createDate', 'promotionRebate'],
                            ['createDate', 'serviceTax']
                        ],
                        columns: [],
                        rows: []
                    },
                    chartType: 1,   // 1: 系统盈亏 2: 推广返水 3: 服务税收
                    rightBar: { //流量分布
                        title: '流量分布',
                        rawData: [],
                        // tabList: ['Android', 'iOS', 'Web'],
                        tabList: ['Android', 'iOS'],
                        activeTab: '1',
                        tableData: [],
                        loading: false
                    }
                },
                VChartMutations: {   //所有图表的事件
                    queryChartData: (params, data) => {     //获取图表数据
                        let args = {
                            conditionsMap: {
                                startDate: params.startDate,
                                endDate: params.endDate,
                                siteId: this.siteId.toString()
                            },
                            limit: 0,
                            offset: 0,
                            sort: "",
                            sortOrder: ""
                        };
                        data.chartLoading = true;
                        if (data.type === 1) {      //笔数/人数
                            request.GameHomeCountStatistics(args).then(res => {
                                data.chartLoading = false;
                                if (res.code === '200') {
                                    data.summary[0].val1 = res.data.chargeCount;            //累计充值笔数/人数
                                    data.summary[0].val2 = res.data.chargePeopleCount;      //累计充值笔数/人数
                                    data.summary[1].val1 = res.data.withdrawCount;          //累计提现笔数 /人数
                                    data.summary[1].val2 = res.data.withdrawPeopleCount.toString();    //累计提现笔数 /人数
                                    data.summary[2].val1 = res.data.firstPeopleCount;       //累计首充笔数
                                    data.rawData = res.data;
                                    this.VChartMutations.handleChartTypeChange(data.chartType, data)
                                } else {
                                    this.$notify.error({title: res.msg});
                                }
                            });
                        }
                        if (data.type === 2) {      //充提
                            request.GameHomeMoneyStatistics(args).then(res => {
                                data.chartLoading = false;
                                if (res.code === '200') {
                                    data.summary[0].val1 = res.data.totalChargeCount.toFixed(2) + '';      //累计充值金额
                                    data.summary[1].val1 = res.data.totalWithdrawCount.toFixed(2) + '';    //累计提现金额
                                    data.summary[2].val1 = res.data.totalFirstPeopleCount.toFixed(2) + ''; //累计首充金额
                                    data.rawData = res.data;
                                    this.VChartMutations.handleChartTypeChange(data.chartType, data)
                                } else {
                                    this.$notify.error({title: res.msg});
                                }
                            });
                        }
                        if (data.type === 3) {      //盈亏
                            request.GameHomeProfitLossStatistics(args).then(res => {
                                data.chartLoading = false;
                                if (res.code === '200') {
                                    data.summary[0].val1 = formatter.divideBy1000(res.data.systemMoney) + '';   //累计系统盈亏
                                    data.summary[1].val1 = formatter.divideBy1000(res.data.promotionRebate) + '';   //累计推广返利
                                    data.summary[2].val1 = formatter.divideBy1000(res.data.serviceTax) + '';   //累计首充金额
                                    data.rawData = res.data;
                                    //字段做除以1000的处理
                                    if (res.data.serviceMoneyList) {
                                        data.rawData.serviceMoneyList = res.data.serviceMoneyList.map(item => {
                                            return {
                                                ...item,
                                                serviceTax: formatter.divideBy1000(item.serviceTax)
                                            }
                                        });
                                    }
                                    if (res.data.promotionMoneyList) {
                                        data.rawData.promotionMoneyList = res.data.promotionMoneyList.map(item => {
                                            return {
                                                ...item,
                                                promotionRebate: formatter.divideBy1000(item.promotionRebate)
                                            }
                                        });
                                    }
                                    if (res.data.systemMoneyList) {
                                        data.rawData.systemMoneyList = res.data.systemMoneyList.map(item => {
                                            return {
                                                ...item,
                                                systemMoney: formatter.divideBy1000(item.systemMoney)
                                            }
                                        });
                                    }
                                    this.VChartMutations.handleChartTypeChange(data.chartType, data);
                                } else {
                                    this.$notify.error({title: res.msg});
                                }
                            });
                        }
                    },
                    handleTableTypeChange: (type, data) => {         //获取左边表格的数据
                        switch (data.type) {
                            case 2: //游戏热度
                                if (type === '1') {
                                    data.rightBar.tableData = data.rightBar.rawData.heatDataMoney
                                }
                                if (type === '2') {
                                    data.rightBar.tableData = data.rightBar.rawData.heatDataCount
                                }
                                data.rightBar.activeTab = type;
                                break;
                            case 3: //流量分布
                                data.rightBar.activeTab = type;
                                this.queryGameFlowStatistics();
                                break
                        }
                    },
                    handleChartTypeChange: (type, data) => {        //处理图表类型选择的事件
                        let idx = type - 1;
                        let list = [];
                        let rowKey = [];
                        data.chartType = type;
                        switch (data.type) {
                            case 1:     //笔数/人数
                                list = ['withdrawList', 'chargeList', 'firstList'];
                                rowKey = ['withdrawCount', 'chargeCount', 'firstPeopleCount'];
                                break;
                            case 2:     //充提
                                list = ['totalWithdrawList', 'totalChargeList', 'totalFirstList'];
                                rowKey = ['withdrawMoney', 'chargeMoney', 'firstMoney'];
                                break;
                            case 3:     //盈亏
                                list = ['systemMoneyList', 'promotionMoneyList', 'serviceMoneyList'];
                                rowKey = ['systemMoney', 'promotionRebate', 'serviceTax'];
                                break;
                        }
                        if ((!data.rawData) || (!data.rawData[list[idx]]) || data.rawData[list[idx]].length === 0) {
                            data.chartData.rows = [{createDate: '暂无数据'}];
                        } else {
                            data.chartData.rows = data.rawData[list[idx]];
                        }
                        for (let item of data.chartData.rows) {
                            if (!item[rowKey[idx]]) {
                                item[rowKey[idx]] = 0
                            }
                        }
                        data.chartData.columns = data.chartData.colPrototypes[idx];
                    }
                }
            }
        },
        computed: {
            queryParams() {
                return {
                    conditionsMap: {
                        siteId: this.siteId.toString(),
                        startDate: this.daterange ? formatter.DateToYMD(this.daterange[0]) : '',
                        endDate: this.daterange ? formatter.DateToYMD(this.daterange[1]) : ''
                    },
                    limit: 0,
                    offset: 0,
                    sort: "",
                    sortOrder: ""
                }
            }
        },
        methods: {
            //获取站点列表
            getSiteList() {
                request.getSiteInfo({}).then(res => {
                    if (res.code === '200') {
                        this.siteList = res.data
                    }
                })
            },
            //设置日期：1：今天，2：昨天，3：本周，4：上周，5：本月，6：上月
            setQueryDate(val) {
                let date = new Date();      //今天的日期
                let day = date.getDay();    //今天的日子
                let time = date.getTime();  //现在的时分秒
                let start;                  //开始时间
                let end;                    //结束时间
                switch (val) {
                    case 1:     //今天
                        start = date;
                        end = date;
                        break;
                    case 2:     //昨天
                        start = time - 3600 * 1000 * 24;
                        end = time - 3600 * 1000 * 24;
                        break;
                    case 3:     //本周
                        start = day === 0 ? time - 6 * 3600 * 1000 * 24 : time - (day - 1) * 3600 * 1000 * 24;
                        end = date;
                        break;
                    case 4:     //上周
                        start = day === 0 ? time - 6 * 3600 * 1000 * 24 : time - (day - 1) * 3600 * 1000 * 24;
                        end = start - 3600 * 1000 * 24; //上周日
                        start = start - 7 * 3600 * 1000 * 24; //上周一
                        break;
                    case 5:     //本月
                        start = time - (date.getDate() - 1) * 3600 * 1000 * 24;//本月一号
                        end = date;
                        break;
                    case 6:     //上月
                        end = time - date.getDate() * 3600 * 1000 * 24;    //上月最后一天
                        start = end - (new Date(end).getDate() - 1) * 3600 * 1000 * 24; //上月第一天
                        break;
                }
                this.daterange = [new Date(start), new Date(end)];
                this.queryHandler();
            },
            // 营收等统计
            querynewGameMoneyStatistics() {
                this.pageLoading = true;
                this.chart1.rightBar.loading = true;
                request.newGameMoneyStatistics(this.queryParams).then(res => {
                    this.pageLoading = false;
                    this.chart1.rightBar.loading = false;
                    if (res.code === '200') {
                        this.homeData = res.data;
                        this.homeData.totalAmountProfit = formatter.divideBy1000(res.data.totalAmountProfit);
                        this.homeData.dayTotalAmountProfit = formatter.divideBy1000(res.data.dayTotalAmountProfit);
                        this.homeData.validMember = formatter.divideBy1000(res.data.validMember);
                        this.homeData.dayValidMember = formatter.divideBy1000(res.data.dayValidMember);
                        this.chart1.rightBar.tableData = res.data.registered
                    } else {
                        this.$notify.error({title: res.msg});
                    }
                });
            },

            //获取游戏热度的数据
            queryGameHeatStatistics() {
                this.chart2.rightBar.loading = true;
                request.GameHeatStatistics(this.queryParams).then(res => {
                    this.chart2.rightBar.loading = false;
                    this.chart2.rightBar.rawData = res.data;
                    this.VChartMutations.handleTableTypeChange(this.chart2.rightBar.activeTab, this.chart2)
                });
            },
            //获取流量分布的数据
            queryGameFlowStatistics() {
                let params = this.queryParams;
                switch (this.chart3.rightBar.activeTab) {
                    case '1':
                        params.conditionsMap.deviceName = 'Android';
                        break;
                    case '2':
                        params.conditionsMap.deviceName = 'iOS';
                        break;
                    case '3':
                        params.conditionsMap.deviceName = 'Web'
                }
                this.chart3.rightBar.loading = true;
                request.GameFlowStatistics(params).then(res => {
                    this.chart3.rightBar.loading = false;
                    if (res.data.flowAndroidList) {
                        this.chart3.rightBar.tableData = res.data.flowAndroidList
                    }
                    if (res.data.flowIOSList) {
                        this.chart3.rightBar.tableData = res.data.flowIOSList
                    }
                    if (res.data.flowWindowsList) {
                        this.chart3.rightBar.tableData = res.data.flowWindowsList
                    }
                });
            },
            // 点击搜索按钮
            queryHandler() {
                this.querynewGameMoneyStatistics();
                this.queryGameHeatStatistics();
                this.queryGameFlowStatistics();
            },
            VChartMutations1(method, params) {
                return this.VChartMutations[method](params, this.chart1)
            },
            VChartMutations2(method, params) {
                return this.VChartMutations[method](params, this.chart2)
            },
            VChartMutations3(method, params) {
                return this.VChartMutations[method](params, this.chart3)
            },
        },
        created() {
            this.getSiteList();
            this.setQueryDate(1);
        }
    }
</script>

<style lang="scss">
    .card.home-page {
        position: relative;
        .card-body {
            padding: 20px 10px 10px;
            height: calc(100% - 33px);
            border-radius: 4px;
            overflow: auto;
            .toolbar {
            }
            .card-data {
                overflow: auto;
                height: calc(100% - 125px);
                > .el-row {
                    margin-bottom: 20px;
                }
                .el-row:first-child {
                    .count {
                        margin-right: calc(8% / 3);
                        &:nth-child(4) {
                            margin: 0;
                        }
                        width: 23%;
                        height: 148px;
                        box-shadow: 0px 10px 15px 0px rgba(49, 54, 88, 0.2);
                        border-radius: 2px;
                        /*display: inline-block;*/
                        color: #fff;
                        .inner {
                            width: 100%;
                            height: 100%;
                            padding: 35px 25px 0 25px;
                            p:first-child {
                                width: 100%;
                                line-height: 14px;
                                font-size: 14px;
                                margin-bottom: 25px;
                                i {
                                    font-size: 12px;
                                }
                            }
                            p:nth-child(2) {
                                width: 100%;
                                line-height: 24px;
                                font-size: 24px;
                                margin-bottom: 7px;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                            p:nth-child(3) {
                                line-height: 14px;
                                font-size: 14px;
                                margin-top: 20px;
                                span:nth-child(1) {
                                    margin-left: 10px;
                                }
                            }
                        }
                        &.count1 {
                            background-image: linear-gradient(90deg, #ee7647 0%, #e65e5a 47%, #dd466d 100%), linear-gradient(#ffffff, #ffffff);
                            .inner {
                                background: url('~@/assets/icon/img_1.png') no-repeat right bottom;
                                background-size: 140px 121px;
                            }
                        }
                        &.count2 {
                            background-image: linear-gradient(90deg, #8d6ef3 0%, #6079db 47%, #3383c3 100%), linear-gradient(#ffffff, #ffffff);
                            .inner {
                                background: url('~@/assets/icon/img_2.png') no-repeat right bottom;
                                background-size: 134px 122px;
                            }
                        }
                        &.count3 {
                            background-image: linear-gradient(90deg, #39cfc0 0%, #25b5c9 47%, #119bd2 100%), linear-gradient(#ffffff, #ffffff);
                            .inner {
                                background: url('~@/assets/icon/img_3.png') no-repeat right bottom;
                                background-size: 135px 114px;
                            }
                        }
                        &.count4 {
                            background-image: linear-gradient(90deg, #e870eb 0%, #b36af2 50%, #8363f9 100%), linear-gradient(#ffffff, #ffffff);
                            .inner {
                                background: url('~@/assets/icon/img_4.png') no-repeat right bottom;
                                background-size: 154px 118px;
                            }
                        }
                    }
                }

                .el-row:nth-child(2) {
                    .el-card {
                        margin-bottom: 5px;
                        height: 100%;
                        .el-card {
                            height: 42px;
                            overflow-y: auto;
                            .el-form-item {
                                margin-bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
