<template>
    <div class="card card-primary">
        <div class="card-header">
            <div class="card-text">
                <h3>厅主---列表</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-form :inline="true" :model="queryParams" label-width="120px">
                    <el-form-item label="状态：">
                        <el-select v-model="queryParams.conditionsMap.state" clearable size="small">
                            <el-option value="" label="全部">全部</el-option>
                            <el-option value="1" label="正常">正常</el-option>
                            <el-option value="2" label="冻结">冻结</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="账号：">
                        <el-input v-model="queryParams.conditionsMap.account" clearable size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名：">
                        <el-input v-model="queryParams.conditionsMap.realName" clearable size="small"></el-input>
                    </el-form-item>
                    <el-form-item label=" ">
                        <el-button class="search-btn" type="primary" size="small">
                            <i class="el-icon-search"></i>
                            搜索
                        </el-button>
                    </el-form-item>
                </el-form>
                <hr/>
                <el-form :inline="true">
                    <el-form-item>
                        <el-button type="primary" size="small" icon="el-icon-circle-plus" style="width: 100px"
                                   >添加
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="card-data">
                <el-table ref="mainTable" :height="MAX_TABLE_HEIGHT" :data="tableData" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
                :header-cell-style="{textAlign:'center',color:'#102858'}" v-loading='tableLoading'>
                    <el-table-column type="index" label="序号"></el-table-column>
                    <el-table-column prop="account" label="账号" sortable>
                        <template slot-scope="scope">
                            <el-button type="text">{{scope.row.account}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="realName" label="真实姓名" sortable></el-table-column>
                    <el-table-column prop="siteName" label="站点名称" sortable></el-table-column>
                    <el-table-column prop="state" label="状态">
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.state =='1'">正常</el-tag>
                            <el-tag type="danger" v-else-if="scope.row.state =='2'">冻结</el-tag>
                            <el-tag type="info" v-else>未知状态</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createDate" label="注册日期" sortable></el-table-column>
                    <el-table-column prop="" label="操作" width="220" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="default" size="mini" >编辑</el-button>
                            <el-button type="warning" size="mini">游戏</el-button>
                            <template v-if="scope.row.state=='1'">
                                <el-button type="danger" size="mini" >禁用</el-button>
                            </template>
                            <template v-if="scope.row.state=='2'">
                                <el-button type="success" size="mini">启用</el-button>
                            </template>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination :current-page="pageNum" :page-sizes="[10,20,50,100,200]"
                :page-size.sync="queryParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
            <!-- 新建/更新弹框 -->
        </div>
    </div>
</template>

<script>
    import request from '@/requests/gameRoomManage'
    import exp from '@/tools/regexp'

    export default {
        props: ['MAX_TABLE_HEIGHT'],
        data() {
            return {
                // stockWeak: 0, //全局库存衰减值
                // stockWeakLoading: false,
                // 查询条件
                queryParams: {
                    conditionsMap: {
                        state: '',       //状态
                        account: '',      //账号
                        realName: '',     //真实姓名
                        accountType: 1,
                    },
                    limit: 10,
                    offset: 0,
                    sort: 'createDate',
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
        created() {
            this.queryTableData();
        },
        methods: {
            //获取列表
            queryTableData() {
                // if (type == "search") {
                //     this.pageNum = 1
                //     this.queryParams.limit = 10
                //     this.queryParams.offset = 0
                // }
                this.tableLoading = true
                request.getAccounts(this.queryParams).then(res => {
                    this.tableLoading = false
                    // for(var item of res.rows){
                    //     item.state = String(item.state)
                    // }
                    this.tableData = res.rows;
                    this.total = res.total;
                    console.log(this.tableData)
                })
            }
        }
    }
</script>

<style>
.accountclick{color: #008afb;font-weight: 600}
</style>



