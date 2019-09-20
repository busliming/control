<template>
    <div class="card card-primary">
        <div class="card-header">
            <div class="card-text">
                <h3>公司账单</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-form :inline="true" :model="queryParams" label-width="120px">
                    <el-form-item label="站点名称：">
                        <el-select v-model="searchInp" filterable size="small">
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
                <el-table ref="mainTable" :max-height="MAX_TABLE_HEIGHT" :data="tableData" style="width: 55%" size="medium" stripe :cell-style="{textAlign:'center'}"
                :header-cell-style="{textAlign:'center'}" v-loading='tableLoading'>
                    <el-table-column prop="siteName" label="站点名称"></el-table-column>
                    <el-table-column prop="" label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="goDetail(scope.row)">查看明细</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination" style="width: 55%;margin: 30px 0 10px;">
                <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[10,20,50,100,200]"
                :page-size.sync="queryParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import request from '@/requests/reportQuery'

export default {
    props: ['MAX_TABLE_HEIGHT'],
    data(){
        return{
            // 查询条件
            queryParams: {
                conditionsMap: {
                    siteName: '',   //站点名称
                },
                limit: 10,
                offset: 0,
                sort: 'createDate',
                sortOrder: 'desc'
            },
            options: [], //下拉框数据
            searchInp: '全部站点',

            // 列表属性
            tableData:[],
            tableLoading: false,

            //分页属性
            pageNum: 1,
            pageSize: 10,
            total: 0,
        }
    },
    mounted(){
        this.getAllSites()
        this.queryTableData()
    },
    methods:{
        // 获取站点列表
        queryTableData() {
            this.tableLoading = true;
            request.siteList(this.queryParams).then(res => {
                this.tableLoading = false;
                this.tableData = res.Pagination.rows;
                this.total = res.Pagination.total;
            }).catch(e => {
                this.$notify.error({title:e});
            })
        },
        //搜索
        search(){
            this.pageNum = 1;
            this.queryParams.offset = 0;
            this.queryParams.limit = 10
            this.queryParams.conditionsMap.siteName = this.searchInp == '全部站点' ? '' : this.searchInp
            this.queryTableData()
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
        //跳转
        goDetail(row){
            // this.$router.push({
            //     name:'账单详情',
            //     params: {
            //         siteId: row.siteId
            //     }
            // })
            this.$router.push({
                path: `/billsDetail/siteId=${row.siteId}`,
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
