<template>
    <div class="card card-primary">
        <div class="card-header">
            <div class="card-text">
                <h3>会员报表详情</h3>
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
                    <el-form-item label="游戏名称：">
                        <el-select  v-model="queryParams.gameId" clearable size="small">
                            <el-option value="" label="全部"></el-option>
                            <el-option v-for="(item,index) in games" :key="index" :label="item.gameName" :value="item.gameId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="游戏房间：">
                        <el-select v-model="queryParams.roomName"  clearable size="small">
                            <el-option value="" label="全部"></el-option>
                            <el-option v-for="(item,index) in rooms" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
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
                        <el-button type="info" size="small" icon="el-icon-back" style="width: 100px" @click="$router.push({name:'会员报表'})">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="card-data">
                <el-table ref="mainTable" :height="MAX_TABLE_HEIGHT" :data="tableData" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
                :header-cell-style="{textAlign:'center'}" v-loading='tableLoading'>
                    <el-table-column prop="startTime" label="开始时间"></el-table-column>
                    <el-table-column prop="endTime" label="结束时间"></el-table-column>
                    <el-table-column prop="account" label="会员账号"></el-table-column>
                    <el-table-column prop="playId" label="会员ID"></el-table-column>
                    <el-table-column prop="createBy" label="游戏名称"></el-table-column>
                    <el-table-column prop="roomName" label="游戏房间"></el-table-column>
                    <el-table-column prop="betMoney" label="下注金额"></el-table-column>
                    <el-table-column prop="lotteryMoney" label="中奖金额"></el-table-column>
                    <el-table-column prop="changeAmount" label="盈亏"></el-table-column>
                    <el-table-column prop="changeValue" label="税收"></el-table-column>
                    <el-table-column prop="pumping" label="抽水"></el-table-column>
                    <el-table-column prop="" label="操作" width="100" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="goGameDetail(scope.row)">详情</el-button>
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
                account:this.$route.params.account,
                startTime:'',
                endTime:'',
                limit: 10,
                offset: 0,
                siteId:this.$route.params.siteId,
                gameId:'',
                roomName:'',
            },
            // 列表属性
            tableData: [],
            tableLoading: false,
            rooms:[],//房间数据
            games:[],//游戏名数据

            //分页属性
            pageNum: 1,
            pageSize: 10,
            total: 0,
        }
    },
    mounted(){
        var info = JSON.parse(sessionStorage.getItem("page3info"))
        var info2 = JSON.parse(sessionStorage.getItem("page2info"))
        if(info){ //返回到此页面
            this.datetimerange = info.date
            this.queryParams.gameId = info.gid
            this.queryParams.roomName = info.rname
            this.queryTableData()
            sessionStorage.removeItem("page3info")
        }else{
            this.datetimerange = info2.date
            this.queryTableData()
        }

        this.getroom()
        this.getgame()
    },
    watch:{
        'queryParams.gameId':{   //监听是否选择游戏
            deep:true,  //深度监控
            // immediate: true, // 第一次默认值也监听
            handler(val) {
                if(val){  //改变
                    var data = {
                        siteId:this.$route.params.siteId,
                        gameId:val
                    }
                    this.getroom(data)
                }else{  //清空
                    this.getroom()
                }
            },
        },
    },
    methods:{
        //获取列表
        queryTableData(){
            this.queryParams.startTime = this.datetimerange ? this.datetimerange[0] : '';
            this.queryParams.endTime = this.datetimerange ? this.datetimerange[1] : '';
            this.tableLoading = true
            request.getGameRecord(this.queryParams).then(res => {
                for(var item of res.rows){
                    item.betMoney = parseInt(item.betMoney/10)/100;
                    item.lotteryMoney = parseInt(item.lotteryMoney/10)/100;
                    item.changeAmount = parseInt(item.changeAmount/10)/100;
                    item.changeValue = parseInt(item.changeValue/10)/100;
                    item.pumping = parseInt(item.pumping/10)/100;
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
        //获取游戏房间
        getroom(params){
            var data;
            if(params){
                data = params
            }else{
                data = {siteId:this.$route.params.siteId}
            }
            request.getRoomTypeList(data).then(res => {
                if(res.code == '200'){
                    var arr = []
                    //去重
                    for(var i = 0 ;i<res.data.length; i++){
                        if(arr.indexOf(res.data[i].roomName) == -1){
                            arr.push(res.data[i].roomName)
                        }
                    }
                    this.rooms = arr
                }
            })
        },
        //获取游戏名称
        getgame(){
            request.getGameType({
                siteId:this.$route.params.siteId
            }).then(res => {
                if(res.code == '200'){
                    this.games = res.data
                }
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
        //跳转
        goGameDetail(row){
            var data = {
                date:this.datetimerange,
                gid:this.queryParams.gameId,
                rname:this.queryParams.roomName,
                sid:this.$route.params.siteId,
                acc:this.$route.params.account,
            }
            if(row.gameId == 3 || row.gameId == 13 || row.gameId == 19 || row.gameId == 29){  //捕鱼
                sessionStorage.setItem("fishdata",JSON.stringify(row))
            }
            sessionStorage.setItem("page3info",JSON.stringify(data))
            this.$router.push({
                // name: '投注详情',
                // params: {
                //     id:row.detailsId,
                //     siteId:this.$route.params.siteId,
                //     gameId:row.gameId
                // }
                path: `/betDetail/siteId=${this.$route.params.siteId}&id=${row.detailsId}&gameId=${row.gameId}`
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

