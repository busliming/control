<template>
    <div class="card card-primary daily-promotion-record">
        <div class="card-header">
            <div class="card-text">
                <h3>每日记录</h3>
            </div>
        </div>
        <el-button
                type="info" size="small" icon="el-icon-d-arrow-left"
                class="go-back-btn"
                @click="goBackHandler"
        >
            返回上一页
        </el-button>
        <div class="card-body">
            <div class="toolbar">
                <el-form :inline="true">
                    <el-form-item label="日期：">
                        <el-date-picker
                                size="mini" v-model="daterange" type="daterange"
                                format="yyyy-MM-dd" value-format="yyyy-MM-dd" range-separator="~"
                                start-placeholder="开始日期" end-placeholder="结束日期"
                        />
                    </el-form-item>
                    <el-form-item label="">
                        <el-button type="primary" size="small" icon="el-icon-search"
                                   @click="queryTableData('search')">
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
                        v-loading='tableLoading'
                >
                    <el-table-column
                            label="日期"
                            prop="createDate"
                    />
                    <el-table-column
                            label="会员账号"
                            prop="account"
                    />
                    <el-table-column
                            label="会员ID"
                            prop="playId"
                    />
                    <el-table-column
                            label="注册"
                            prop="registerNumber"
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
                            label="充值金额"
                            prop="rechargeAmount"
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
                            label="税收"
                            prop="tax"
                    >
                        <template slot-scope="scope">
                            {{ scope.row.tax | divideBy1000 }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="下注"
                            prop="betMoney"
                    >
                        <template slot-scope="scope">
                            {{ scope.row.betMoney.toFixed(2) | divideBy1000 }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="盈亏"
                            prop="changeAmount"
                    >
                        <template slot-scope="scope">
                            {{ scope.row.changeAmount.toFixed(2) | divideBy1000 }}
                        </template>
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
                daterange: [],
                // 查询条件
                queryParams: {
                    startTime: '',
                    endTime: '',
                    offset: 0,
                    limit: 10,
                    sort: "createDate",
                    sortOrder: "desc",
                    account: '',
                    playId: '',
                    id: ''
                },
                //分页属性
                pageNum: 1,
                pageSize: 10,
                total: 0,
                // 表格数据
                tableData: [],
                tableLoading: false
            }
        },
        filters: {
            divideBy1000(val) {
                return formatter.divideBy1000(val)
            }
        },
        methods: {
            // 获取报表的数据
            queryTableData(type) {
                if (type === 'search') {
                    if (type === 'search') {
                        this.pageNum = 1;
                        this.queryParams.offset = 0;
                    }
                }
                this.queryParams.startTime = this.daterange ? this.daterange[0] : '';
                this.queryParams.endTime = this.daterange ? this.daterange[1] : '';
                this.loading = true;
                request.dailyRecord(this.queryParams).then(res => {
                    if (res.rows) {
                        this.total = res.total;
                        this.tableData = res.rows;
                    } else {
                        this.$notify.error({title: res.msg});
                    }
                    this.loading = false;
                })
            },
            // 返回上一页
            goBackHandler() {
                this.$router.push('/promotionReport')
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
            this.queryParams.playId = this.$route.params.playId;
            this.queryParams.account = this.$route.params.account;
            this.queryParams.siteId = this.$route.params.siteId;
            this.queryParams.id = this.$route.params.id;
            this.daterange.push(formatter.DateToYMD(new Date()) + ' 00:00:00');
            this.daterange.push(formatter.DateToYMDHMS(new Date()));
            this.queryTableData()
        }
    }
</script>

<style lang="scss">
    .daily-promotion-record {
        position: relative;
        .go-back-btn {
            z-index: 999;
            position: absolute;
            top: 58px;
            right: 40px;
        }
    }
</style>
