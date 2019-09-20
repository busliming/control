<template>
    <div class="card card-primary">
        <div class="card-header">
            <div class="card-text">
                <h3>库存日志</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-form :inline="true" label-width="100px">
                    <el-form-item label="">
                        <el-button type="info" size="small" icon="el-icon-back" style="width: 100px" @click="$router.push('/controlSystem')">返回</el-button>
                    </el-form-item>
                    <el-form-item label="日期选择：" v-show="dateShow">
                        <el-date-picker size="small" v-model="datetimerange" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="~"
                        start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label=" " label-width="40px" v-show="dateShow">
                        <el-button class="search-btn" type="primary" @click="queryTableData(2)" size="small" style="width: 100px">
                            <i class="el-icon-search"></i>
                            搜索
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="card-data">
                <el-tabs type="border-card" @tab-click="handleClick">
                    <el-tab-pane label="库存衰减日志">
                        <el-table :max-height="500" :data="tableData" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
                        :header-cell-style="{textAlign:'center'}" v-loading='tableLoading'>
                            <el-table-column prop="roomName" label="房间名">
                                <template slot-scope="scope">{{scope.row.gameName+'-'+scope.row.roomName}}</template>
                            </el-table-column>
                            <el-table-column prop="stockWeak" label="库存衰减(%)"></el-table-column>
                            <el-table-column prop="sumStockWeak" label="累计衰减"></el-table-column>
                            <el-table-column prop="updateBy" label="操作者"></el-table-column>
                            <el-table-column prop="createDate" label="添加时间"></el-table-column>
                        </el-table>
                        <div class="pagination">
                            <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[10,20,50,100,200]"
                            :page-size.sync="queryParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="玩家单控日志">
                        <el-table :max-height="450" :data="tableData" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
                        :header-cell-style="{textAlign:'center'}" v-loading='tableLoading'>
                            <el-table-column prop="accountId" label="会员ID"></el-table-column>
                            <el-table-column prop="winLose" label="输赢">
                                <template slot-scope="scope">
                                    <el-tag v-if="scope.row.winLose > 0" type="success">{{scope.row.winLose}}</el-tag>
                                    <el-tag v-else-if="scope.row.winLose < 0" type="danger">{{scope.row.winLose}}</el-tag>
                                    <el-tag v-else type="info">{{scope.row.winLose}}</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column prop="winRateBattleBet" label="对战类与下注类胜率"></el-table-column>
                            <el-table-column prop="winRateFish" label="捕鱼类胜率"></el-table-column>
                            <el-table-column prop="addDate" label="添加时间"></el-table-column>
                            <el-table-column prop="updateBy" label="操作人"></el-table-column>
                        </el-table>
                        <div style="margin-top:15px;font-size:14px">
                            <span style="margin-right:30px">玩家总增加金额：{{totalPlusMoney}}</span>
                            <span>玩家总减少金额：{{totalMinusMoney}}</span>
                        </div>
                        <div class="pagination">
                            <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[10,20,50,100,200]"
                            :page-size.sync="queryParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import request from '@/requests/controlSystem'

export default {
    data(){
        return{
            type:1, //1为库存衰减 2为玩家单控
            queryParams: {
                conditionsMap: {
                    siteId:this.$route.params.siteId,
                    startDate:'',
                    endDate:'',
                },
                sort: "createDate",
                sortOrder: "desc",
                limit: 10,
                offset: 0,
            },
            dateShow:false,//日期条件搜索
            datetimerange: [],

            // 列表属性
            tableData:[],
            tableLoading:false,
            totalPlusMoney:'',
            totalMinusMoney:'',

            //分页属性
            pageNum: 1,
            pageSize: 10,
            total: 0,
        }
    },
    created(){
        this.queryTableData(1)
    },
    methods:{
        //获取列表 / 搜索
        queryTableData(type){
            var str;
            if(type == 1){
                str = 'selectStockWeakLog'
            }else{
                str = 'selectControlLog'
            }
            this.queryParams.conditionsMap.startDate = this.datetimerange ? this.datetimerange[0] : '';
            this.queryParams.conditionsMap.endDate = this.datetimerange ? this.datetimerange[1] : '';
            this.tableLoading = true
            request[str](this.queryParams).then(res => {
                console.log(res)
                this.tableLoading = false
                this.tableData = res.rows;
                this.total = res.total;
                if(res.params){
                    this.totalPlusMoney = res.params.totalPlusMoney
                    this.totalMinusMoney = res.params.totalMinusMoney
                }
            })
        },
        //切换tab
        handleClick(tab, event) {
            this.queryParams.offset = 0
            this.pageNum = 1
            this.datetimerange = []
            this.dateShow = tab.label == '库存衰减日志' ? false : true
            this.type = tab.label == '库存衰减日志' ? 1 : 2
            this.queryTableData(this.type)
        },
        sizeChangeHandle(size) {  //表格显示条数改变
            this.queryParams.limit = size;
            this.queryTableData(this.type);
        },
        currentChangeHandle(activePage) {  //表格显示页数改变
            this.pageNum = activePage;
            this.queryParams.offset = (activePage - 1) * this.queryParams.limit;
            this.queryTableData(this.type);
        },
    },
}
</script>

