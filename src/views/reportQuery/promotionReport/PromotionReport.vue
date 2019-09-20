<template>
    <div class="card card-primary promotion-report">
        <div class="card-header">
            <div class="card-text">
                <h3>推广报表</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-form :inline="true">
                    <el-form-item label="站点名称：">
                        <el-select
                                v-model="siteId"
                                   ref="siteSelect"
                                   filterable clearable
                                   size="mini"
                        >
                            <!--<el-option label="全部站点" value="">全部站点</el-option>-->
                            <el-option
                                    v-for="item in siteList"
                                    :key="item.siteId"
                                    :label="item.siteName"
                                    :value="item.siteId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="会员账号：">
                        <el-input size="mini" clearable v-model="account"/>
                    </el-form-item>
                    <el-form-item label="会员ID：">
                        <el-input size="mini" clearable v-model="playId"/>
                    </el-form-item>
                    <!--<el-form-item label="日期：">-->
                    <!--<el-form-item label="查询日期：">-->
                    <!--<el-date-picker-->
                    <!--size="mini"-->
                    <!--v-model="daterange"-->
                    <!--type="datetimerange"-->
                    <!--align="center"-->
                    <!--value-format="yyyy-MM-dd HH:mm:ss"-->
                    <!--range-separator="~"-->
                    <!--clearable-->
                    <!--&gt;</el-date-picker>-->
                    <!--</el-form-item>-->
                    <!--</el-form-item>-->
                    <el-form-item label="">
                        <el-button type="primary" size="small" icon="el-icon-search" @click="searchHandler">
                            搜索
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="card-data">
                <el-table
                        :height="MAX_TABLE_HEIGHT"
                        :data="tableData"
                        style="width: 100%"
                        size="medium"
                        stripe
                        :cell-style="{textAlign:'center'}"
                        :header-cell-style="{textAlign:'center'}"
                        v-loading='loading'
                >
                    <el-table-column
                            label="会员账号"
                            prop="account"
                    />
                    <el-table-column
                            label="会员ID"
                            prop="playId"
                    />
                    <el-table-column
                            label="推广等级"
                            prop="level"
                    />
                    <el-table-column
                            label="首充"
                            prop="firstRechargeAmount"
                    />
                    <el-table-column
                            label="二充"
                            prop="secondRechargeAmount"
                    />
                    <el-table-column
                            label="注册累计"
                            prop="registerNumber"
                    />
                    <el-table-column
                            label="充值金额"
                            prop="rechargeAmount"
                    />
                    <el-table-column
                            label="IOS下载"
                            prop="iosNumber"
                    />
                    <el-table-column
                            label="安卓下载"
                            prop="androidNumber"
                    />
                    <el-table-column
                            label="提现金额"
                            prop="withdrawAmount"
                    />
                    <el-table-column
                            label="返利"
                            prop="rebate"
                    >
                        <template slot-scope="scope">
                            {{ scope.row.rebate | divideBy1000 }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="总税收"
                            prop="tax"
                    >
                        <template slot-scope="scope">
                            {{ scope.row.tax | divideBy1000 }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="总盈亏"
                            prop="changeAmount"
                    >
                        <template slot-scope="scope">
                            {{ scope.row.changeAmount | divideBy1000 }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="下级人数"
                            prop="subordinateNumber"
                    />
                    <el-table-column
                            prop=""
                            label="操作"
                            width="120"
                            fixed="right"
                    >
                        <div class="btn-group" slot-scope="scope">
                            <el-button
                                    size="mini" type="primary"
                                       @click="viewParentHandler(scope.row)">
                                查看上级
                            </el-button>
                            <el-button
                                    type="primary" size="mini"
                                       @click="viewChildrenHandler(scope.row)">
                                查看下级
                            </el-button>
                            <el-button
                                    size="mini"
                                       @click="viewDailyReportHandler(scope.row)">
                                每日记录
                            </el-button>
                        </div>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination
                        @size-change="sizeChangeHandle"
                        @current-change="currentChangeHandle"
                        :current-page="pageNum"
                        :page-sizes="[10,20,50,100,200]"
                        :page-size.sync="queryParams.limit"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import request from '@/requests/promotionReport'
    import formatter from '@/tools/formatter'

    export default {
        props: ['MAX_TABLE_HEIGHT'],
        data() {
            return {
                queryType: 'search', //查询类型
                isFirstPage: true,   //是否一级账号
                lastQueryParams: {},    //上次传的参数

                account: '',   //会员账号
                playId: '',   //会员id
                id: '', //账号自己的id
                checkId: '', //, 搜索返回的playId的值复制过来, 点击上级下级不变
                siteId: '',

                siteList: [],
                // daterange: [],   //bug单5928产品说不要

                //分页属性
                pageNum: 1,
                pageSize: 10,
                total: 0,
                // 表格数据
                tableData: [],
                loading: false,
            }
        },
        filters: {
            divideBy1000(val) {
                return formatter.divideBy1000(val)
            }
        },
        computed: {
            viewSuperior() {    //点击上级传0，下级传1，搜索不传
                if (this.queryType === 'search') return '';
                if (this.queryType === 'sup') return 0;
                if (this.queryType === 'sub') return 1;
            },
            queryParams() { //查询条件
                return {
                    limit: this.pageSize,
                    offset: this.queryType !== 'search' ? (this.pageNum - 1) * this.pageSize : 0, //页数
                    sort: "createDate",
                    sortOrder: "desc",
                    // startTime: this.daterange ? this.daterange[0] : '',  //bug单5928产品说不要
                    // endTime: this.daterange ? this.daterange[1] : '',    //bug单5928产品说不要
                    account: this.queryType === 'search' ? this.account : '',   //用来搜索，除了搜索就不传
                    playId: this.queryType === 'search' ? this.playId : '',     //用来搜索，除了搜索就不传
                    id: this.queryType !== 'search' ? this.id : '',             //点击上级下级才传，搜索不传
                    checkId: this.queryType === 'sub' ? this.checkId : '',   //点击下级才传, 是一级账号的,不变
                    siteId: this.siteId,    //站点id
                    viewSuperior: this.viewSuperior
                };
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
            // 获取报表的数据
            queryTableData() {
                if (!this.queryParams.siteId) {
                    this.$message.warning('请选择站点！');
                    return;
                }
                this.loading = true;
                request.getPromotionReport(this.queryParams).then(res => {
                    if (res.rows) {
                        this.total = res.total;
                        this.tableData = res.rows;
                        if (this.queryType === 'search') {
                            this.isFirstPage = true;
                        } else {
                            this.playId = '';
                            this.account = '';
                        }
                    } else {
                        this.queryType = 'search';
                        this.$notify({
                            type: 'warning',
                            title: res.msg
                        })
                    }
                    this.loading = false;
                })
            },
            //查看下级
            searchHandler() {
                this.queryType = 'search';
                this.pageNum = 1;
                this.checkId = '';
                this.queryTableData();
            },
            viewParentHandler(row) {
                this.queryType = 'sup';
                this.id = row.id;
                this.queryTableData();
            },
            // 查看上级
            viewChildrenHandler(row) {
                this.queryType = 'sub';
                this.id = row.id;
                if (this.isFirstPage) {
                    this.checkId = row.playId;
                }
                this.queryTableData();
            },
            // 每日记录
            viewDailyReportHandler(row) {
                this.$router.push({
                    path: `/promotionReport/dailyRecord/siteId=${row.siteId}`+
                    `&id=${row.id}/account=${row.account}&playId=${row.playId}`,
                })
            },
            // 分页
            sizeChangeHandle(size) {  //表格显示条数改变
                this.queryParams.limit = size;
                this.queryTableData();
            },
            currentChangeHandle(activePage) {  //表格显示页数改变
                this.pageNum = activePage;
                this.queryParams.offset = (activePage - 1) * this.queryParams.limit;
                this.queryTableData();
            },
        },
        created() {
            // this.daterange.push(formatter.DateToYMD(new Date()) + ' 00:00:00');
            // this.daterange.push(formatter.DateToYMDHMS(new Date()));
            this.getSiteList();
            this.$alert('', '请选择站点！', {
                center: true,
                callback: action => {
                    this.$refs.siteSelect.focus();
                }
            });
            // this.queryTableData()
        }
    }
</script>

<style lang="scss">
    .promotion-report {
        .btn-group {
            .el-button {
                margin: 0 0 3px 0
            }
        }
    }
</style>
