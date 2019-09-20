<template>
    <div class="card card-primary">
        <div class="card-header">
            <div class="card-text">
                <h3>{{ gameName }} - 房间列表</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-form :inline="true">
                    <el-form-item>
                        <el-button type="info" size="small" icon="el-icon-back" style="width: 100px"
                                   @click="$router.push({path:'/gameManage'})">返回
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
                            sortable
                            prop="siteId"
                            label="所属ID">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="roomName"
                            label="房间名称">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="minMoney"
                            label="房间最低金额">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="roomField"
                            label="游戏底分">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="whetherPassword"
                            label="是否有密码">
                        <template slot-scope="scope">
                            {{scope.row.whetherPassword == 1 ? '是' : '否'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop=""
                            label="房间状态">
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.roomStatus == 1">正常</el-tag>
                            <el-tag type="danger" v-else-if="scope.row.roomStatus == 2">关闭</el-tag>
                            <el-tag type="info" v-else>未知</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop=""
                            label="房间类型">
                        <template slot-scope="scope">
                            <el-tag type="primary" v-if="scope.row.roomType == 1">体验类型</el-tag>
                            <el-tag type="warning" v-else-if="scope.row.roomType == 2">财富类型</el-tag>
                            <el-tag type="info" v-else>未知类型</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop=""
                            label="桌子数">
                        <template slot-scope="scope">
                            {{scope.row.tableNum != '0' ? scope.row.tableNum : '1'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="roomPersons"
                            label="房间人数">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop=""
                            label="货币类型">
                        <template slot-scope="scope">
                            <el-tag type="primary" v-if="scope.row.moneyType == 1">积分</el-tag>
                            <el-tag type="warning" v-else-if="scope.row.moneyType == 2">金币</el-tag>
                            <el-tag type="info" v-else>未知类型</el-tag>
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
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import request from '@/requests/gameManage'

    export default {
        props: ['MAX_TABLE_HEIGHT'],
        data() {
            return {
                gameName: '',
                // 查询条件
                queryParams: {
                    conditionsMap: {
                        gameId: ''
                    },
                    limit: 10,
                    offset: 0,
                    sort: 'createDate',
                    sortOrder: 'desc'
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
        methods: {
            queryTableData() {
                this.tableLoading = true;
                request.getRoomPage(this.queryParams).then(res => {
                    this.tableLoading = false;
                    this.total = res.total;
                    this.tableData = res.rows;
                }).catch(e => {
                    this.$notify.error({title:e});
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
            this.gameName = this.$route.params.gameName;
            this.queryParams.conditionsMap.gameId = this.$route.params.gameId;
            this.queryTableData()
        }
    }
</script>
