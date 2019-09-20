<template>
    <div class="card card-primary">
        <div class="card-header">
            <div class="card-text">
                <h3>游戏记录</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-form :inline="true" :model="queryParams" label-width="120px">
                    <el-form-item label="游戏名称：">
                        <el-input v-model="queryParams.conditionsMap.gameName" clearable size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="选择日期：">
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
                    <el-form-item label="">
                        <el-button class="search-btn" type="primary" @click="queryTableData('search')" size="small">
                            <i class="el-icon-search"></i>
                            搜索
                        </el-button>
                    </el-form-item>
                </el-form>
                <hr/>
                <el-form :inline="true">
                    <el-form-item>
                        <el-button type="info" size="small" icon="el-icon-back" style="width: 100px" @click="$router.push({name:'厅主列表'})">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="card-data">
                <el-table ref="mainTable" :height="MAX_TABLE_HEIGHT" :data="tableData" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}" 
                :header-cell-style="{textAlign:'center'}" v-loading='tableLoading'>
                    <el-table-column prop="account" label="会员账号"></el-table-column>
                    <el-table-column prop="gameName" label="游戏名称"></el-table-column>
                    <el-table-column prop="roomName" label="房间场次"></el-table-column>
                    <el-table-column prop="tableNumber" label="桌号"></el-table-column>
                    <el-table-column prop="behavior" label="行为"></el-table-column>
                    <el-table-column prop="changeAmount" label="输赢"></el-table-column>
                    <el-table-column prop="lotteryResult" label="开奖"></el-table-column>
                    <el-table-column prop="createDate" label="时间"></el-table-column>
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
import defaultDate from '../reportQuery/queryDate'
import request from '@/requests/gameRoomManage'

export default {
    props: ['MAX_TABLE_HEIGHT'],
    data(){
        return{
            // 查询条件
            datetimerange: [],
            queryParams:{
                conditionsMap:{
                    account: "",
                    endDate: "",
                    gameName: "",
                    siteId: "",
                    startDate: "",
                },
                limit: 10,
                offset: 0,
                sort: "createDate",
                sortOrder: "desc",
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
        this.queryParams.conditionsMap.account = this.$route.params.account
        this.queryParams.conditionsMap.siteId = this.$route.params.siteId
        if(this.queryParams.conditionsMap.account && this.queryParams.conditionsMap.siteId){
            this.queryTableData()
        }
    },
    methods:{
        //获取列表
        queryTableData(type){
            if(type == "search"){
                this.pageNum = 1
                this.queryParams.limit = 10
                this.queryParams.offset = 0
            }
            this.queryParams.conditionsMap.startDate = this.datetimerange ? this.datetimerange[0] : '';
            this.queryParams.conditionsMap.endDate = this.datetimerange ? this.datetimerange[1] : '';
            this.tableLoading = true
            request.findAccountQuery(this.queryParams).then(res => {
                this.tableLoading = false
                this.tableData = res.rows
                this.total = res.total
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
            this.queryTableData();
        },
        sizeChangeHandle(size) {  //表格显示条数改变
            this.queryParams.limit = size;
            this.queryTableData();
        },
    }
}
</script>

