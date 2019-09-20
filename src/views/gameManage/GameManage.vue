<template>
    <div class="card card-primary">
        <div class="card-header">
            <div class="card-text">
                <h3>游戏列表</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-form :inline="true"
                         :model="queryParams"
                         label-width="120px">
                    <el-form-item label="游戏名称：">
                        <el-input v-model="queryParams.conditionsMap.gameName"
                                  clearable size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="游戏类型：">
                        <el-select v-model="queryParams.conditionsMap.gameType"
                                   clearable size="small">
                            <el-option value="" label="全部">全部</el-option>
                            <el-option value="1" label="下注游戏">下注游戏</el-option>
                            <el-option value="2" label="捕鱼游戏">捕鱼游戏</el-option>
                            <el-option value="3" label="对战游戏">对战游戏</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="游戏状态：">
                        <el-select v-model="queryParams.conditionsMap.status"
                                   clearable size="small">
                            <el-option value="" label="全部">全部</el-option>
                            <el-option value="1" label="正常">正常</el-option>
                            <el-option value="2" label="关闭">关闭</el-option>
                            <el-option value="3" label="开发中">开发中</el-option>
                            <el-option value="4" label="敬请期待">敬请期待</el-option>
                            <el-option value="5" label="即将上线">即将上线</el-option>
                            <el-option value="6" label="维护中">维护中</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label=" ">
                        <el-button class="search-btn" type="primary" size="small"
                                   icon="el-icon-search"
                                   @click="queryTableData('search')">
                            搜索
                        </el-button>
                    </el-form-item>
                </el-form>
                <el-form :inline="true"
                         :model="queryParams"
                         label-width="120px">
                    <el-form-item label="维护时间：">
                        <el-date-picker
                                size="small"
                                v-model="daterange"
                                type="datetimerange"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                range-separator="~"
                                start-placeholder="维护开始时间"
                                end-placeholder="维护结束时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="search-btn" type="warning" style="width: 100%" size="small"
                                   icon="el-icon-error"
                                   @click="setBatchGameMaintain('maintain')"
                        >
                            批量维护
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="search-btn" type="danger" style="width: 100%" size="small"
                                   icon="el-icon-error"
                                   @click="setBatchGameMaintain('disable')">
                            批量关闭
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="search-btn" type="success" style="width: 100%" size="small"
                                   icon="el-icon-setting"
                                   @click="setBatchGameMaintain('enable')">
                            批量开启
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="search-btn" type="primary" style="width: 100%" size="small"
                                   icon="el-icon-circle-plus"
                                   @click="addGame">
                            添加
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div class="card-data">
                <el-table
                        ref="multipleTable"
                        :height="MAX_TABLE_HEIGHT"
                        :data="tableData"
                        @selection-change="handleSelectionChange"
                        style="width: 100%"
                        size="medium"
                        stripe
                        :cell-style="{textAlign:'center'}"
                        :header-cell-style="{textAlign:'center'}"
                        v-loading='tableLoading'
                >
                    <el-table-column
                            type="selection"
                            width="44">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="gameId"
                            label="游戏ID">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="gameName"
                            label="游戏名称">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="gameUrl"
                            label="游戏Url"
                            min-width="200px">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="gameGenre"
                            label="游戏分组"
                            min-width="100px">
                        <template slot-scope="scope" style="font-weight: bold">
                            <el-tag v-if="scope.row.gameGenre==1" type="primary">
                                棋牌游戏
                            </el-tag>
                            <el-tag v-if="scope.row.gameGenre==2" type="warning">
                                捕鱼游戏
                            </el-tag>
                            <el-tag v-if="scope.row.gameGenre==3" type="success">
                                电玩街机
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="status"
                            label="游戏状态">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.status==1" type="success">正常</el-tag>
                            <el-tag v-if="scope.row.status==2" type="danger">关闭</el-tag>
                            <el-tag v-if="scope.row.status==3" type="warning">开发中</el-tag>
                            <el-tag v-if="scope.row.status==4" type="info">敬请期待</el-tag>
                            <el-tag v-if="scope.row.status==5" type="primary">即将上线</el-tag>
                            <el-tag v-if="scope.row.status==6" type="default">维护中</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="maintainStatus"
                            label="维护状态">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.maintainStatus==0" type="success">正常</el-tag>
                            <el-tag v-else type="info">维护中</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="eventStart"
                            label="维护时间(北京)"
                            min-width="130px"
                            :formatter="displayMaintenance">
                    </el-table-column>

                    <!--<el-table-column-->
                            <!--sortable-->
                            <!--prop="onLineAccountNumber"-->
                            <!--label="在线会员数">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                            <!--sortable-->
                            <!--prop="betSum"-->
                            <!--label="总下注">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-tag v-if="scope.row.betSum!=0&&scope.row.betSum!==null">-->
                                <!--{{ scope.row.betSum }}-->
                            <!--</el-tag>-->
                            <!--<template v-else>-</template>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                            <!--sortable-->
                            <!--prop="systemProfit"-->
                            <!--min-width="110px"-->
                            <!--label="总输赢">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-tag type="success" v-if="parseFloat(scope.row.systemProfit)>0">-->
                                <!--{{ scope.row.systemProfit }}-->
                            <!--</el-tag>-->
                            <!--<el-tag type="danger" v-else-if="parseFloat(scope.row.systemProfit)<0">-->
                                <!--{{ scope.row.systemProfit }}-->
                            <!--</el-tag>-->
                            <!--<template v-else>-</template>-->
                        <!--</template>-->
                    <!--</el-table-column>-->

                    <el-table-column
                            prop=""
                            label="操作"
                            fixed="right"
                    >
                        <template slot-scope="scope">
                            <el-dropdown>
                                <span class="el-dropdown-link">
                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item
                                            @click.native="viewRoomList(scope.row)">房间
                                    </el-dropdown-item>
                                    <el-dropdown-item
                                            @click.native="editGameSite(scope.row)">站点
                                    </el-dropdown-item>
                                    <el-dropdown-item
                                            @click.native="editGameInfo(scope.row)">修改
                                    </el-dropdown-item>
                                    <el-dropdown-item
                                            @click.native="changeGameMaintainStatus(scope.row)"
                                    >
                                        {{ scope.row.maintainStatus === '0' ? '维护' : '恢复' }}
                                    </el-dropdown-item>
                                    <el-dropdown-item
                                            @click.native="deleteGame(scope.row)">删除
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
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
            <!--游戏信息弹框-->
            <el-dialog :visible.sync="gameDialog.visible" width="500px">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>{{ gameDialog.type === 'add' ? '添加游戏' : '修改游戏' }}</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <el-form label-width="120px">
                            <el-form-item label="游戏名称:">
                                <el-input type="text" size="small" clearable=""
                                          v-model="gameData.gameName"></el-input>
                            </el-form-item>
                            <el-form-item label="游戏ID:">
                                <el-input type="text" size="small" clearable=""
                                          :disabled="gameDialog.type==='edit'"
                                          v-model="gameData.gameId"></el-input>
                            </el-form-item>
                            <el-form-item label="游戏URL:">
                                <el-input type="text" size="small" clearable=""
                                          v-model="gameData.gameUrl"></el-input>
                            </el-form-item>
                            <el-form-item label="游戏类型:">
                                <el-select size="small" clearable=""
                                           v-model="gameData.gameType">
                                    <el-option value="1" label="下注游戏">下注游戏</el-option>
                                    <el-option value="2" label="捕鱼游戏">捕鱼游戏</el-option>
                                    <el-option value="3" label="对战游戏">对战游戏</el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="游戏分组:">
                                <el-select size="small" clearable=""
                                           v-model="gameData.gameGenre">
                                    <el-option value="1" label="棋牌游戏">棋牌游戏</el-option>
                                    <el-option value="2" label="捕鱼游戏">捕鱼游戏</el-option>
                                    <el-option value="3" label="电玩街机">电玩街机</el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="游戏状态:">
                                <el-select size="small" clearable=""
                                           v-model="gameData.status">
                                    <el-option :value="1" label="正常">正常</el-option>
                                    <el-option :value="2" label="关闭">关闭</el-option>
                                    <el-option :value="3" label="开发中">开发中</el-option>
                                    <el-option :value="4" label="敬请期待">敬请期待</el-option>
                                    <el-option :value="5" label="即将上线">即将上线</el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain :loading="gameDialog.loading"
                                   @click="gameDialog.visible=false">
                            取消
                        </el-button>
                        <el-button type="primary" icon="el-icon-success" :loading="gameDialog.loading"
                                   @click="updateGameInfo">
                            保存
                        </el-button>
                    </div>
                </div>
            </el-dialog>
            <!--游戏站点配置弹框-->
            <el-dialog :visible.sync="gameSiteDialog.visible" width="700px">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>设置站点</h3>
                        </div>
                    </div>
                    <div class="dialog-body" style="padding: 20px 60px">
                        <h4>选择站点：</h4>
                        <div class="sites-box">
                            <template v-if="gameSiteList.length>1">
                                <el-checkbox :indeterminate="gameSiteDialog.isIndeterminate"
                                             v-model="gameSiteDialog.checkAll"
                                             @change="handleCheckAllChange">全选
                                </el-checkbox>
                                <div style="margin: 15px 0;"></div>
                            </template>
                            <template v-else>
                                无数据
                            </template>
                            <div style="margin: 15px 0;"></div>
                            <el-checkbox-group v-model="gameSiteDialog.checkedSites" @change="handleCheckedSitesChange">
                                <template v-for="site in gameSiteList">
                                    <el-col :span="6" :key="site.siteId">
                                        <el-checkbox :label="site.siteName">
                                            {{site.siteName}}
                                        </el-checkbox>
                                    </el-col>
                                </template>
                            </el-checkbox-group>
                        </div>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain :loading="gameSiteDialog.loading"
                                   @click="gameSiteDialog.visible=false">
                            取消
                        </el-button>
                        <el-button type="primary" icon="el-icon-success" :loading="gameSiteDialog.loading"
                                   @click="setGameSite">
                            保存
                        </el-button>
                    </div>
                </div>
            </el-dialog>
            <!--维护弹框-->
            <el-dialog :visible.sync="maintainDialog.visible" width="500px">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>维护时间配置</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <el-form label-width="120px">
                            <el-form-item label="维护时间：">
                                <el-date-picker
                                        style="width: 100%"
                                        v-model="maintainDate"
                                        type="datetimerange"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        range-separator="~"
                                        start-placeholder="维护开始时间"
                                        end-placeholder="维护结束时间">
                                </el-date-picker>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain
                                   :loading="maintainDialog.loading"
                                   @click="maintainDialog.visible=false">
                            取消
                        </el-button>
                        <el-button type="primary" icon="el-icon-success"
                                   :loading="maintainDialog.loading"
                                   @click="updateMaintainStatus('1')">
                            保存
                        </el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import exp from '@/tools/regexp'
    import request from '@/requests/gameManage'

    export default {
        props: ['MAX_TABLE_HEIGHT'],
        data() {
            return {
                // 查询条件
                daterange: [],
                maintainDate: [],
                queryParams: {
                    conditionsMap: {
                        gameName: '',           //游戏名称
                        gameType: '',           //游戏类型
                        status: '',             //游戏状态
                    },
                    limit: 10,
                    offset: 0,
                    sort: 'gameId',
                    sortOrder: 'asc'
                },
                // 列表属性
                tableData: [],
                tableLoading: false,
                selected: [],
                //分页属性
                pageNum: 1,
                pageSize: 10,
                total: 0,
                //添加+编辑游戏弹框属性
                gameDialog: {
                    visible: false,
                    loading: false,
                    type: 'add',
                },
                // 游戏信息
                gameData: {
                    id: '',
                    gameGenre: '', //游戏分组
                    gameId: '', //游戏id
                    gameName: '',   //游戏名称
                    gameType: '',   //游戏类型
                    gameUrl: '',    //游戏URL
                    status: ''     //游戏状态
                },
                // 游戏的站点配置弹框
                gameSiteDialog: {
                    visible: false,
                    loading: false,
                    siteList: [],   //弹框的站点类表 - 已处理
                    checkAll: false,
                    checkedSites: [],
                    isIndeterminate: false
                },
                gameSiteList: [],   //数据返回的站点列表
                gameSiteData: {
                    conditionsMap: {
                        siteList: []
                    },
                    gameId: ''
                },
                //维护弹框属性
                maintainDialog: {
                    visible: false,
                    loading: false,
                },
                maintainData: {
                    eventEnd: '',
                    eventStart: '',
                    gameId: '',
                    id: '',
                    maintainStatus: 1
                }
            }
        },
        methods: {
            // 获取游戏列表
            queryTableData(type) {
                if (type === 'search') {
                    this.pageNum = 1;
                    this.queryParams.offset = 0;
                    this.queryParams.limit = 10
                }
                this.tableLoading = true;
                request.getGames(this.queryParams).then(res => {
                    this.tableLoading = false;
                    this.tableData = res.rows;
                    this.total = res.total;
                }).catch(e => {
                    this.$notify.error({title:e});
                })
            },
            // 列表维护时间显示
            displayMaintenance(row) {
                if (row.eventStart == null && row.eventEnd == null) {
                    return '-'
                } else if (row.eventStart == null) {
                    return ' ~ ' + row.eventEnd
                } else if (row.eventEnd == null) {
                    return row.eventStart + ' ~ '
                } else {
                    return row.eventStart + ' ~ ' + row.eventEnd
                }
            },
            // 添加游戏
            addGame() {
                this.gameDialog.type = 'add';
                this.setGameDialogData({});
                this.gameDialog.visible = true
            },
            // 修改游戏信息
            editGameInfo(row) {
                this.gameDialog.type = 'edit';
                this.setGameDialogData(row);
                this.gameDialog.visible = true
            },
            // 在弹框显示游戏信息
            setGameDialogData(data) {
                for (let i in this.gameData) {
                    this.gameData[i] = data[i] ? data[i] : '';
                }
                if (!data.status) {
                    this.gameData.status = 1
                }
            },
            // 更新游戏信息
            updateGameInfo() {
                let data = this.gameData;
                try {
                    if (data.gameName === '') {
                        throw '输入游戏名称！'
                    } else if (!exp.chineseChar.test(data.gameName)) {
                        throw '游戏名称请输入中文！'
                    }
                    if (data.gameId === '') {
                        throw '请输入游戏ID！';
                    } else if (!exp.numberCheck.test(data.gameId)) {
                        throw '游戏ID只能输入数字！'
                    }
                    if (data.gameUrl === '') {
                        throw '请输入游戏URL！';
                    } else if (exp.space.test(data.gameUrl)) {
                        throw '游戏URL不能包含空格！'
                    } else if (exp.nonChineseChar.test(data.gameUrl)) {
                        throw '游戏URL不能包含中文!'
                    } else if (!exp.urlCheck.test(data.gameUrl)) {
                        throw '请输入正确的游戏URL！'
                    }
                    if (data.gameType === '') {
                        throw '请选择游戏类型！';
                    }
                    if (data.gameGenre === '') {
                        throw '请选择游戏分组！'
                    }
                }
                catch (e) {
                    this.$message({
                        type: 'warning',
                        message:e
                    });
                    return;
                }
                this.gameDialog.loading = true;
                request.addOrUpdateGame(this.gameData).then(res => {
                    this.gameDialog.loading = false;
                    if (res.code === '200') {
                        this.$notify.success({title:res.msg});
                        this.gameDialog.visible = false;
                        this.queryTableData()
                    } else {
                        this.$notify.error({title:res.msg})
                    }
                })
            },
            // 查看房间列表
            viewRoomList(row) {
                this.$router.push({
                    path: `/gameManage/roomList/gameName=${row.gameName}&gameId=${row.gameId}`,
                })
            },
            // 修改游戏的站点配置
            editGameSite(row) {
                this.gameSiteDialog.loading = true;
                this.gameSiteDialog.checkedSites = [];
                request.getGameSite({gameId: row.gameId}).then(res => {
                    this.gameSiteDialog.loading = false;
                    if (res.code === '200') {
                        // 获取站点类表
                        this.gameSiteList = res.data;
                        for (let i in res.data) {
                            this.gameSiteDialog.siteList.push(res.data[i].siteName);    //获取站点列表
                            if (res.data[i].flag === '0') {
                                this.gameSiteDialog.checkedSites.push(res.data[i].siteName)     //勾选站点
                            }
                        }
                        this.gameSiteData.gameId = row.gameId;
                        this.gameSiteDialog.visible = true;
                    } else {
                        this.$notify.error({title:res.msg})
                    }
                })
            },
            // 勾选站点事件
            handleCheckAllChange(val) {
                this.gameSiteDialog.checkedSites = val ? this.gameSiteDialog.siteList : [];
                this.gameSiteDialog.isIndeterminate = false;
            },
            handleCheckedSitesChange(value) {
                let checkedCount = value.length;
                this.gameSiteDialog.checkAll = checkedCount === this.gameSiteList.length;
                this.gameSiteDialog.isIndeterminate = checkedCount > 0 && checkedCount < this.gameSiteList.length;
            },
            // 更新游戏的站点配置
            setGameSite() {
                this.gameSiteDialog.loading = true;
                let list = this.gameSiteList;
                let checked = this.gameSiteDialog.checkedSites;
                this.gameSiteData.conditionsMap.siteList = [];
                for (let i in list) {
                    if (checked.indexOf(list[i].siteName) !== -1) {
                        let tmp = String(list[i].siteId);
                        this.gameSiteData.conditionsMap.siteList.push(tmp)
                    }
                }
                request.setGameSite(this.gameSiteData).then(res => {
                    this.gameSiteDialog.loading = false;
                    if (res.code === '200') {
                        this.$notify.success({title:res.msg});
                        this.gameSiteDialog.visible = false;
                    } else {
                        this.$notify.error({title:res.msg})
                    }
                })
            },
            // 维护/恢复游戏
            changeGameMaintainStatus(row) {
                let msg = row.maintainStatus === "0" ? "确定维护游戏?" : "确定恢复游戏?";
                this.$confirm(msg, '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    center: true,
                    type: 'warning'
                }).then(() => {
                    this.maintainData.gameId = row.gameId;
                    this.maintainData.id = row.id;
                    this.maintainData.maintainStatus = '1';
                    if (row.maintainStatus === '1') {
                        this.maintainData.maintainStatus = '0';
                        this.updateMaintainStatus('0');
                    }
                    else {
                        this.maintainDialog.visible = true
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            // 更新维护状态
            updateMaintainStatus(type) {
                if (type === '0') {
                    this.maintainData.eventStart = null;
                    this.maintainData.eventEnd = null;
                }
                if (type === '1') {
                    this.maintainData.eventStart = this.maintainDate ? this.maintainDate[0] : '';
                    this.maintainData.eventEnd = this.maintainDate ? this.maintainDate[1] : '';
                }
                this.maintainDialog.loading = true;
                request.setGameMaintain(this.maintainData).then(res => {
                    this.maintainDialog.loading = false;
                    if (res.code === '200') {
                        this.maintainDialog.visible = false;
                        this.$notify.success({title:res.msg});
                        this.queryTableData();
                    } else {
                        this.$notify.error({title:res.msg})
                    }
                })
            },
            // 删除游戏
            deleteGame(row) {
                this.$confirm('确定删除游戏？', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    center: true,
                    type: 'warning'
                }).then(() => {
                    let data = {
                        conditionsMap: {
                            idList: [row.gameId]
                        }
                    };
                    this.tableLoading = true;
                    request.deleteGame(data).then(res => {
                        this.tableLoading = false;
                        if (res.code === '200') {
                            this.$notify.success({title:res.msg});
                            this.queryTableData();
                        } else {
                            this.$notify.error({title:res.msg});
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            //批量维护/启用/关闭游戏
            setBatchGameMaintain(type) {
                let data = {
                    idList: [],
                    maintainEndDate: '',
                    maintainStartDate: '',
                    maintainStatus: '',
                    status: ''
                };
                if (this.selected.length > 0) {
                    for (let i in this.selected) {
                        data.idList.push(this.selected[i].gameId)
                    }
                }
                if (data.idList.length < 1) {
                    this.$notify.warning('请选中游戏！');
                    return;
                }
                if (type === 'maintain') {
                    data.maintainStartDate = this.daterange ? this.daterange[0] : '';
                    data.maintainEndDate = this.daterange ? this.daterange[1] : '';
                    data.maintainStatus = 1;
                }
                if (type === 'disable') {
                    data.status = 2
                }
                if (type === 'enable') {
                    data.status = 1
                }
                request.setBatchGameMaintain(data).then(res => {
                    if (res.code === '200') {
                        this.$notify.success({title:res.msg});
                        this.queryTableData()
                    } else {
                        this.$notify.error({title:res.msg})
                    }
                })
            },
            //列表勾选事件
            handleSelectionChange(val) {
                this.selected = val;
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
        }
        ,
        created() {
            this.queryTableData();
        }
    }
</script>
