<template>
    <div class="card card-primary">
        <div class="card-header">
            <div class="card-text">
                <h3>会员报表</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-form :inline="true" :model="queryParams" label-width="120px">
                    <el-form-item label="日期选择：">
                        <el-date-picker size="small" v-model="datetimerange" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="~"
                        start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item style="margin-left:50px">
                        <el-button type="primary" size="small" @click="countDate(1)">今日</el-button>
                        <el-button type="primary" size="small" @click="countDate(2)">昨日</el-button>
                        <el-button type="primary" size="small" @click="countDate(3)">本周</el-button>
                        <el-button type="primary" size="small" @click="countDate(4)">上周</el-button>
                        <el-button type="primary" size="small" @click="countDate(5)">本月</el-button>
                        <el-button type="primary" size="small" @click="countDate(6)">上月</el-button>
                    </el-form-item>
                    <el-form-item label="会员账号：">
                        <el-input clearable size="small" v-model="queryParams.account"></el-input>
                    </el-form-item>
                    <el-form-item label="会员ID：">
                        <el-input clearable size="small" v-model="queryParams.playId"></el-input>
                    </el-form-item>
                    <el-form-item label=" ">
                        <el-button class="search-btn" type="primary" size="small" @click="search">
                            <i class="el-icon-search"></i>
                            搜索
                        </el-button>
                    </el-form-item>
                </el-form>
                <hr/>
                <el-form :inline="true">
                    <el-form-item>
                        <el-button type="info" size="small" icon="el-icon-back" style="width: 100px" @click="$router.push({path: '/betRecord'})">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="card-data">
                <el-table ref="mainTable" :height="MAX_TABLE_HEIGHT" :data="tableData" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
                :header-cell-style="{textAlign:'center'}" v-loading='tableLoading'>
                    <el-table-column prop="account" label="会员账号"></el-table-column>
                    <el-table-column prop="playId" label="会员ID"></el-table-column>
                    <el-table-column prop="totalBet" label="下注总金额"></el-table-column>
                    <el-table-column prop="totalBetMoney" label="有效下注总金额"></el-table-column>
                    <el-table-column prop="totalChangeValue" label="总税收"></el-table-column>
                    <el-table-column prop="totalChangeAmount" label="总盈亏"></el-table-column>
                    <el-table-column prop="" label="操作" width="100" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="goSingleMember(scope.row)">详情</el-button>
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
                account:"",  //根据会员账号
                playId:'', //根据会员ID
                limit: 10,
                offset: 0,
                siteId:this.$route.params.siteId,
            },

            // 列表属性
            tableData: [],
            tableLoading: false,

            //分页属性
            pageNum: 1,
            pageSize: 10,
            total: 0,
        }
    },
    mounted(){
        var info = JSON.parse(sessionStorage.getItem("page1info"))
        var info2 = JSON.parse(sessionStorage.getItem("page2info"))
        if(info2){  //返回到此页面
            this.datetimerange = info2.date
            this.queryParams.account = info2.acc
            this.queryParams.playId = info2.acid
            this.queryTableData()
            sessionStorage.removeItem("page2info")
        }else{
            this.datetimerange = info.date
            this.queryTableData()
        }
    },
    methods:{
        //获取列表
        queryTableData(){
            this.queryParams.startTime = this.datetimerange ? this.datetimerange[0] : '';
            this.queryParams.endTime = this.datetimerange ? this.datetimerange[1] : '';
            this.tableLoading = true
            request.queryAllUserReport(this.queryParams).then(res => {
                for(var item of res.rows){
                    item.totalBet = parseInt(item.totalBet/10)/100;
                    item.totalBetMoney = parseInt(item.totalBetMoney/10)/100;
                    item.totalChangeValue = parseInt(item.totalChangeValue/10)/100;
                    item.totalChangeAmount = parseInt(item.totalChangeAmount/10)/100;
                }
                this.tableLoading = false
                this.tableData = res.rows
                this.total = res.total
            })
        },
        //搜索
        search(){
            this.pageNum = 1
            this.queryParams.limit = 10
            this.queryParams.offset = 0
            this.queryTableData()
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
        //跳转
        goSingleMember(row){
            var data = {
                date:this.datetimerange,
                acc:this.queryParams.account,
                acid:this.queryParams.playId
            }
            sessionStorage.setItem("page2info",JSON.stringify(data))
            this.$router.push({
                // name: '会员报表详情',
                // params: {
                //     siteId: row.siteId,
                //     account:row.account
                // }
                path: `/memberReportDetail/siteId=${row.siteId}&account=${row.account}`,
            })
        },
        currentChangeHandle(activePage) {  //表格显示页数改变
            this.pageNum = activePage;
            this.queryParams.offset = (activePage - 1) * this.queryParams.limit;
            this.queryTableData();
        },
        sizeChangeHandle(size) {  //表格显示条数改变
            this.queryParams.limit = size;
            this.queryTableData();
        },
    }
}
</script>

