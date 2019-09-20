<template>
    <div class="card card-primary">
        <div class="card-header">
            <div class="card-text">
                <h3>投注记录</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-form :inline="true" :model="queryParams" label-width="120px">
                    <el-form-item label="日期选择：">
                        <el-date-picker size="small" v-model="datetimerange" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="~"
                        start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="countDate(1)">今日</el-button>
                        <el-button type="primary" size="small" @click="countDate(2)">昨日</el-button>
                        <el-button type="primary" size="small" @click="countDate(3)">本周</el-button>
                        <el-button type="primary" size="small" @click="countDate(4)">上周</el-button>
                        <el-button type="primary" size="small" @click="countDate(5)">本月</el-button>
                        <el-button type="primary" size="small" @click="countDate(6)">上月</el-button>
                    </el-form-item>
                    <el-form-item label="站点名称：">
                        <el-select v-model="searchInp" filterable size="small" @change="selectGet">
                            <el-option v-for="item in options" :key="item.siteId" :label="item.siteName" :value="item.siteName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="" style="margin-left:20px">
                        <el-button class="search-btn" type="primary" size="small" @click="search">
                            <i class="el-icon-search"></i>
                            搜索
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="card-data">
                <el-table ref="mainTable1" :height="140" :data="totaltableData" style="width: 100%;margin-bottom:20px" size="medium" stripe :cell-style="{textAlign:'center'}"
                :header-cell-style="{textAlign:'center'}" v-loading='table1Loading' v-if="table1show">
                    <el-table-column prop="" :label="'全部站点 '+ time1 + '-' + time2">
                        <el-table-column prop="totalNumber" label="总局数"></el-table-column>
                        <el-table-column prop="totalBet" label="总下注金额"></el-table-column>
                        <el-table-column prop="totalBetMoney" label="有效下注总金额"></el-table-column>
                        <el-table-column prop="totalChangeValue" label="总税收"></el-table-column>
                        <el-table-column prop="totalChangeAmount" label="总盈亏"></el-table-column>
                    </el-table-column>
                </el-table>
            </div>
            <div class="card-data">
                <el-table ref="mainTable2" :height="table1show ? MAX_TABLE_HEIGHT-160 : MAX_TABLE_HEIGHT" :data="tableData" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
                :header-cell-style="{textAlign:'center'}" v-loading='table2Loading'>
                    <el-table-column prop="siteName" label="站点名称"></el-table-column>
                    <el-table-column prop="siteAccount" label="厅主账号"></el-table-column>
                    <el-table-column prop="totalNumber" label="总局数"></el-table-column>
                    <el-table-column prop="totalBet" label="下注总金额"></el-table-column>
                    <el-table-column prop="totalBetMoney" label="有效下注总金额"></el-table-column>
                    <el-table-column prop="totalChangeValue" label="总税收"></el-table-column>
                    <el-table-column prop="totalChangeAmount" label="总盈亏"></el-table-column>
                    <el-table-column prop="" label="操作" width="100" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="goAllMember(scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[10,20,50,100,200]"
                :page-size.sync="queryParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import request from '@/requests/reportQuery'
import defaultDate from './queryDate'

export default {
    props: ['MAX_TABLE_HEIGHT'],
    data(){
        return{
            // 查询条件
            datetimerange: [],
            queryParams:{
                startTime:'',
                endTime:'',
                siteName:"",
                limit: 10,
                offset: 0,
                siteId:'',
            },
            options: [], //下拉框数据
            searchInp: '全部站点',

            // 列表属性
            totaltableData:[],//总表数据
            table1Loading: false,
            table1show:true,  //总表是否显示

            tableData: [], //各站点数据
            table2Loading: false,

            //分页属性
            pageNum: 1,
            pageSize: 10,
            total: 0,

            time1:'',
            time2:'',
        }
    },
    mounted(){
        var info = JSON.parse(sessionStorage.getItem("page1info"))
        if(info){  //返回到此页面
            this.datetimerange = info.date
            this.searchInp = info.inp
            sessionStorage.removeItem("page1info")
            this.search()
        }else{
            this.countDate(1)  //获取默认当天时间
            this.queryTotal()  //获取总表
            this.queryall()    //获取站点表
        }
        this.getAllSites() //获取options
    },
    methods:{
        //获取总表
        queryTotal() {
            this.totaltableData = []
            this.queryParams.startTime = this.datetimerange ? this.datetimerange[0] : '';
            this.queryParams.endTime = this.datetimerange ? this.datetimerange[1] : '';
            this.table1Loading = true
            this.time1 = this.queryParams.startTime
            this.time2 = this.queryParams.endTime
            request.queryGameTotalReport(this.queryParams).then(res => {
                this.table1Loading = false
                if(res.code == '200'){
                    res.data.totalBet = parseInt(res.data.totalBet/10)/100;
                    res.data.totalBetMoney = parseInt(res.data.totalBetMoney/10)/100;
                    res.data.totalChangeAmount = parseInt(res.data.totalChangeAmount/10)/100;
                    res.data.totalChangeValue = parseInt(res.data.totalChangeValue/10)/100;
                    this.totaltableData.push(res.data)
                }
            })
        },
        //获取站点表
        queryall(){
            this.queryParams.startTime = this.datetimerange ? this.datetimerange[0] : '';
            this.queryParams.endTime = this.datetimerange ? this.datetimerange[1] : '';
            this.table2Loading = true
            request.queryAllSiteReport(this.queryParams).then(res => {
                this.table2Loading = false
                for(var item of res.rows){
                    item.totalBet = parseInt(item.totalBet/10)/100;
                    item.totalBetMoney = parseInt(item.totalBetMoney/10)/100;
                    item.totalChangeAmount = parseInt(item.totalChangeAmount/10)/100;
                    item.totalChangeValue = parseInt(item.totalChangeValue/10)/100;
                }
                this.tableData = res.rows
                this.total = res.total
            })
        },
        //获取options
        getAllSites(){
            request.getSiteInfo({}).then(res => {
                if(res.code == '200'){
                    var arr = [{
                        siteId:-1,siteName:'全部站点',
                    }]
                    res.data = arr.concat(res.data)
                    this.options = res.data
                }
            })
        },
        //搜索
        search(){
            this.pageNum = 1
            this.queryParams.limit = 10
            this.queryParams.offset = 0
            if(this.searchInp != '全部站点'){
                this.table1show = false
                this.queryParams.siteName = this.searchInp
                this.queryall()
            }else{
                this.queryParams.siteName = ''
                this.queryParams.siteId = ''
                this.table1show = true
                this.queryTotal()
                this.queryall()
            }
        },
        //获取siteId
        selectGet(value){
            var obj = this.options.find((item)=>{
                return item.siteName == value;//筛选出匹配数据
            });
            this.queryParams.siteId = obj.siteId
        },
        //跳转
        goAllMember(row){
            var data = {
                date:this.datetimerange,
                inp:this.searchInp
            }
            sessionStorage.setItem("page1info",JSON.stringify(data))
            this.$router.push({
                // name: '会员报表',
                // params: {
                //     siteId: row.siteId
                // }
                path: `/memberReport/siteId=${row.siteId}`,
            })
        },
        //获取时间
        countDate(num){
            if(num == 1){ //今日
                this.datetimerange = defaultDate.ToDayStr()
            }
            if(num == 2){ //昨日
                this.datetimerange = defaultDate.YesterDayStr()
            }
            if(num == 3){ //本周
                this.datetimerange = defaultDate.ThisWeekStr()
            }
            if(num == 4){ //上周
                this.datetimerange = defaultDate.LastWeekStr()
            }
            if(num == 5){ //本月
                this.datetimerange = defaultDate.ThisMonthStr()
            }
            if(num == 6){ //上月
                this.datetimerange = defaultDate.LastMonthStr()
            }
        },
        currentChangeHandle(activePage) {  //表格显示页数改变
            this.pageNum = activePage;
            this.queryParams.offset = (activePage - 1) * this.queryParams.limit;
            this.queryall();
        },
        sizeChangeHandle(size) {  //表格显示条数改变
            this.queryParams.limit = size;
            this.queryall();
        },
    }
}
</script>

