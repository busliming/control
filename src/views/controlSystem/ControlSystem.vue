<template>
    <div class="card card-primary">
        <div class="card-header">
            <div class="card-text">
                <h3>控制系统</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="card-data">
                <el-table :max-height="MAX_TABLE_HEIGHT" :data="tableData" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
                :header-cell-style="{textAlign:'center'}" v-loading='tableLoading'>
                    <el-table-column prop="siteName" label="站点名称"></el-table-column>
                    <el-table-column prop="dayWinLose" label="当日盈亏">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.dayWinLose > 0" type="success">{{scope.row.dayWinLose}}</el-tag>
                            <el-tag v-else-if="scope.row.dayWinLose < 0" type="danger">{{scope.row.dayWinLose}}</el-tag>
                            <el-tag v-else type="info">{{scope.row.dayWinLose}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="totalStock" label="总库存">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.totalStock > 0" type="success">{{scope.row.totalStock}}</el-tag>
                            <el-tag v-else-if="scope.row.totalStock < 0" type="danger">{{scope.row.totalStock}}</el-tag>
                            <el-tag v-else type="info">{{scope.row.totalStock}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="totalWinLose" label="总盈亏">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.totalWinLose > 0" type="success">{{scope.row.totalWinLose}}</el-tag>
                            <el-tag v-else-if="scope.row.totalWinLose < 0" type="danger">{{scope.row.totalWinLose}}</el-tag>
                            <el-tag v-else type="info">{{scope.row.totalWinLose}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="操作" fixed="right" width="400">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="$router.push({path: `/playerControl/siteId=${scope.row.siteId}`})">玩家单控</el-button>
                            <el-button type="primary" size="mini" @click="$router.push({path: `/gameControl/siteId=${scope.row.siteId}`})">游戏控制</el-button>
                            <el-button type="primary" size="mini" @click="$router.push({path: `/levels/siteId=${scope.row.siteId}`})">库存档位</el-button>
                            <el-button type="primary" size="mini" @click="$router.push({path: `/logs/siteId=${scope.row.siteId}`})">日志</el-button>
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
import request from '@/requests/controlSystem'

export default {
    props: ['MAX_TABLE_HEIGHT'],
    data(){
        return{
            queryParams: {
                conditionsMap: {},
                sort: "createDate",
                sortOrder: "desc",
                limit: 10,
                offset: 0,
            },

            // 列表属性
            tableData:[],
            tableLoading:false,

            //分页属性
            pageNum: 1,
            pageSize: 10,
            total: 0,
        }
    },
    created(){
        this.queryTableData()
    },
    methods:{
        //获取列表
        queryTableData(){
            this.tableLoading = true
            request.selectSiteControl(this.queryParams).then(res => {
                this.tableLoading = false
                for(var item of res.rows){
                    item.dayWinLose = item.dayWinLose.toFixed(2)
                    item.totalStock = item.totalStock.toFixed(2)
                    item.totalWinLose = item.totalWinLose.toFixed(2)
                }
                this.tableData = res.rows;
                this.total = res.total;
            })
        },
        sizeChangeHandle(size) {  //表格显示条数改变
            this.queryParams.limit = size;
            this.queryTableData();
        },
        currentChangeHandle(activePage) {  //表格显示页数改变
            this.pageNum = activePage;
            this.queryParams.offset = (activePage - 1) * this.queryParams.limit;
            this.queryTableData();
        },
    }
}
</script>
