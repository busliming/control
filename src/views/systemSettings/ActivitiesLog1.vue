<template>
    <div class="card card-primary">
        <div class="card-header">
            <div class="card-text">
                <h3>操作日志</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-form :inline="true" :model="queryParams" label-width="120px">
                    <el-form-item label="日志类型：">
                        <el-select v-model="queryParams.conditionsMap.origin" clearable  size="small">
                            <!--<el-option value="" label="全部">全部</el-option>-->
                            <el-option value="control" label="总控日志">总控日志</el-option>
                            <el-option value="agent" label="代理日志">代理日志</el-option>
                            <el-option value="account-service" label="account日志">account日志</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="操作人：">
                        <el-input v-model="queryParams.conditionsMap.userName" clearable size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="时间选择：">
                        <el-date-picker size="small" v-model="datetimerange" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="~"
                        start-placeholder="操作开始时间" end-placeholder="操作结束时间" ></el-date-picker>
                    </el-form-item>
                    <el-form-item label=" ">
                        <el-button class="search-btn" type="primary" @click="queryTableData('search')" size="small">
                            <i class="el-icon-search"></i>
                            搜索
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="card-data">
                <el-table ref="mainTable" :height="MAX_TABLE_HEIGHT" :data="tableData" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
                        :header-cell-style="{textAlign:'center'}" v-loading='tableLoading'>
                    <el-table-column type="index" label="序号"></el-table-column>
                    <el-table-column prop="origin" label="来源" sortable></el-table-column>
                    <el-table-column prop="operation" label="操作" sortable></el-table-column>
                    <el-table-column prop="ip" label="ip地址" sortable></el-table-column>
                    <el-table-column prop="url" label="url" sortable></el-table-column>
                    <el-table-column prop="operDate" label="操作时间" sortable></el-table-column>
                    <el-table-column prop="username" label="操作人" sortable></el-table-column>
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
import request from '@/requests/systemSettings/ActivitiesLog'

export default {
    props: ['MAX_TABLE_HEIGHT'],
    data(){
        return{
            // 查询条件
            datetimerange:[],
            queryParams: {
                conditionsMap: {
                    eventEnd: "",
                    eventStart: "",
                    origin: "",
                    userName: "",
                },
                limit: 10,
                offset: 0,
                sort: 'operDate',
                sortOrder: 'desc',
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
    created(){
        this.queryTableData()
    },
    methods:{
        //查询列表
        queryTableData(type){
            if(type == "search"){
                this.queryParams.limit = 10
                this.queryParams.offset = 0
            }
            this.tableLoading = true;
            this.queryParams.conditionsMap.eventStart = this.datetimerange.length != 0 ? this.datetimerange[0] : "";
            this.queryParams.conditionsMap.eventEnd = this.datetimerange.length != 0 ? this.datetimerange[1] : "";
            request.queryLog(this.queryParams).then(res => {
                this.tableLoading = false;
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

