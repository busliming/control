<template>
    <div class="card card-primary site-manage">
        <div class="card-header">
            <div class="card-text">
                <h3>站点列表</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-form :inline="true" :model="queryParams" label-width="120px">
                    <el-form-item label="名称/网址：">
                        <el-input v-model="queryParams.conditionsMap.siteName" clearable size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="所属厅主：">
                        <el-input v-model="queryParams.conditionsMap.account" clearable size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="维护状态：">
                        <el-select v-model="queryParams.conditionsMap.maintainStatus" clearable size="small">
                            <el-option value="" label="全部">全部</el-option>
                            <el-option value="1" label="维护中">维护中</el-option>
                            <el-option value="0" label="正常">正常</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="维护时间：">
                        <el-date-picker size="small" v-model="daterange" type="daterange" value-format="yyyy-MM-dd" range-separator="~"
                        start-placeholder="维护开始时间" end-placeholder="维护结束时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="站点状态：">
                        <el-select v-model="queryParams.conditionsMap.status" clearable size="small">
                            <el-option value="" label="全部">全部</el-option>
                            <el-option value="1" label="启用">启用</el-option>
                            <el-option value="0" label="禁用">禁用</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label=" ">
                        <el-button class="search-btn" type="primary" size="small" @click="queryTableData('search')">
                            <i class="el-icon-search"></i>搜索
                        </el-button>
                    </el-form-item>
                </el-form>
                <hr/>
                <el-form :inline="true">
                    <el-form-item>
                        <el-button size="small" style="width: 100px" @click="addSite">添加站点</el-button>
                        <el-button type="success" size="small" style="width: 100px" @click="changeBatchSitesState('1')">批量启用</el-button>
                        <el-button type="danger" size="small" style="width: 100px" @click="changeBatchSitesState('0')">批量禁用</el-button>
                        <el-button type="warning" size="small" style="width: 100px" @click="weihuSites">批量维护</el-button>
                        <el-button type="primary" size="small" style="width: 120px" @click="weihuAll" v-show="!weihuBtn">所有站点维护</el-button>
                        <el-button type="success" size="small" style="width: 120px" @click="resetAll" v-show="weihuBtn">所有站点恢复</el-button>
                        <el-button type="info" size="small" style="width: 100px" @click="deleteSite">批量删除</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="card-data">
                <el-table ref="mainTable" :height="MAX_TABLE_HEIGHT" :data="tableData" @selection-change="handleSiteSelection" style="width: 100%" size="medium" stripe
                :cell-style="{textAlign:'center'}" :header-cell-style="{textAlign:'center'}" v-loading='tableLoading'>
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column sortable prop="siteName" label="站点名称"></el-table-column>
                    <el-table-column sortable prop="domainUrl" label="网址"></el-table-column>
                    <el-table-column sortable prop="account" label="所属厅主"></el-table-column>
                    <el-table-column sortable prop="status" label="站点状态">
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.status =='1'">启用</el-tag>
                            <el-tag type="danger" v-else-if="scope.row.status =='0'">禁用</el-tag>
                            <el-tag type="info" v-else>未知状态</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="maintainStatus" sortable label="维护状态">
                        <template slot-scope="scope">
                            <el-tag type="warning" v-if="scope.row.maintainStatus =='1'">维护中</el-tag>
                            <el-tag type="success" v-else-if="scope.row.maintainStatus =='0'">正常</el-tag>
                            <el-tag type="info" v-else>未知状态</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column sortable prop="eventStart" label="预计维护时间(北京)" :formatter="displayMaintenance"></el-table-column>
                    <el-table-column prop="" label="操作" width="500" fixed="right">
                        <template slot-scope="scope">
                            <el-button size="mini" :v-loading="dialog.loading" @click="editSiteSettings(scope.row)">编辑</el-button>
                            <el-button type="primary" size="mini" @click="bindDomain(scope.row)">域名绑定</el-button>
                            <template v-if="scope.row.status=='1'">
                                <el-button type="danger" size="mini" @click="changeSiteState(scope.row)">禁用</el-button>
                            </template>
                            <template v-if="scope.row.status=='0'">
                                <el-button type="success" size="mini" @click="changeSiteState(scope.row)">启用</el-button>
                            </template>
                            <template v-if="scope.row.maintainStatus=='1'">
                                <el-button type="warning" size="mini" @click="changeTime(scope.row)">修改时间</el-button>
                                <el-button type="success" size="mini" @click="changeSiteMaintainStatus(scope.row)">恢复</el-button>
                            </template>
                            <template v-if="scope.row.maintainStatus=='0'">
                                <el-button type="warning" size="mini" @click="changeSiteMaintainStatus(scope.row)">维护</el-button>
                            </template>
                            <el-button type="info" size="mini" icon="el-icon-download" @click="editDownloadConfig(scope.row)">下载配置</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[10,20,50,100,200]"
                :page-size.sync="queryParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
            <el-dialog width="820px" top="2vh" id="site-add-edit" :visible.sync="dialog.visible">
                <div class="custom-dialog" style="max-height: 96vh">
                    <div class="dialog-header">
                        <div class="card-text"><h3>{{ dialog.type === 'add' ? '添加站点信息' : '更新站点信息' }}</h3></div>
                    </div>
                    <div class="dialog-body">
                        <el-form label-width="150px">
                            <el-card style="margin-bottom: 20px">
                                <el-row>
                                    <el-col :span="16" :offset="4">
                                        <el-form-item label="站点名称:">
                                            <el-input type="text" size="small" clearable v-model="formData.siteName"></el-input>
                                        </el-form-item>
                                        <el-form-item label="站点账号:">
                                            <el-input type="text" size="small" clearable v-model="formData.account">
                                                <template slot="append">
                                                    <el-button size="mini" @click="querySiteAccount">选择</el-button>
                                                </template>
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="站点文件夹:">
                                            <el-input type="text" size="small" clearable v-model="formData.siteFolder"></el-input>
                                        </el-form-item>
                                        <el-form-item label="站点域名:">
                                            <el-input type="text" size="small" clearable v-model="dialog.siteUrl"></el-input>
                                        </el-form-item>
                                        <el-form-item label="代理长链接:">
                                            <el-input type="text" size="small" clearable v-model="formData.wsUrl"></el-input>
                                        </el-form-item>
                                        <el-form-item label="站点标识:">
                                            <el-input type="text" size="small" clearable v-model="formData.stationMark"></el-input>
                                        </el-form-item>
                                        <el-form-item label="短信签名:">
                                            <el-input type="text" size="small" clearable v-model="formData.smsSignature"></el-input>
                                        </el-form-item>
                                        <el-form-item label="第三方下载AppKey:">
                                            <el-input type="text" size="small" clearable v-model="formData.appKey"></el-input>
                                        </el-form-item>
                                        <el-form-item label="AppID:">
                                            <el-input type="text" size="small" clearable v-model="formData.pushAppId"></el-input>
                                        </el-form-item>
                                        <el-form-item label="AppSecret:">
                                            <el-input type="text" size="small" clearable v-model="formData.pushAppSecret"></el-input>
                                        </el-form-item>
                                        <el-form-item label="AppKey:">
                                            <el-input type="text" size="small" clearable v-model="formData.pushAppKey"></el-input>
                                        </el-form-item>
                                        <el-form-item label="MasterSecret:">
                                            <el-input type="text" size="small" clearable v-model="formData.pushMasterSecret"></el-input>
                                        </el-form-item>
                                        <el-form-item label="站点状态:">
                                            <el-select size="small" style="width: 100%" v-model="formData.status">
                                                <el-option value="1" label="启用">启用</el-option>
                                                <el-option value="0" label="禁用">禁用</el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-card>
                            <el-card>
                                <h3>游戏</h3>
                                <div class="sites-box">
                                    <template v-if="gameList.length>1">
                                        <el-checkbox :indeterminate="dialog.isIndeterminate" v-model="dialog.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                                        <div style="margin: 15px 0;"></div>
                                    </template>
                                    <template v-else>无数据</template>
                                    <el-checkbox-group v-model="dialog.checkedGames" @change="handleCheckedGameChange">
                                        <template v-for="(game,index) in gameList">
                                            <el-col :span="6" :key="index">
                                                <el-checkbox :label="game.gameId" :key="game.gameId">{{game.gameName}}</el-checkbox>
                                            </el-col>
                                        </template>
                                    </el-checkbox-group>
                                </div>
                            </el-card>
                        </el-form>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain :loading="dialog.loading" @click="dialog.visible=false">取消</el-button>
                        <el-button type="primary" icon="el-icon-success" :loading="dialog.loading" @click="updateSite">保存</el-button>
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
                                <el-date-picker style="width: 100%" v-model="maintainDate" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="~"
                                start-placeholder="维护开始时间" end-placeholder="维护结束时间"></el-date-picker>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain :loading="maintainDialog.loading" @click="maintainDialog.visible=false">取消</el-button>
                        <el-button type="primary" icon="el-icon-success" :loading="maintainDialog.loading" @click="updateMaintainStatus('1')">保存</el-button>
                    </div>
                </div>
            </el-dialog>
            <!--选择站点账号弹框-->
            <el-dialog :visible.sync="accountQueryDialog.visible" width="400px">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>站点账号</h3>
                        </div>
                    </div>
                    <div class="dialog-body" style="padding: 20px 40px">
                        <el-form label-width="80px">
                            <el-form-item label="厅主账号:">
                                <el-input type="text" size="small" clearable v-model="accountQueryDialog.account">
                                    <template slot="append">
                                        <el-button type="primary" icon="el-icon-search" size="mini" @click="querySiteAccount">查询</el-button>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-table height="300" :data="accountQueryDialog.tableData" style="width: 100%" size="small" stripe :fit="true" :cell-style="{textAlign:'center'}"
                            :header-cell-style="{textAlign:'center'}" v-loading='accountQueryDialog.loading'>
                                <el-table-column sortable prop="account" label="厅主账号"></el-table-column>
                                <el-table-column sortable prop="nickName" label="站点名称"></el-table-column>
                                <el-table-column prop="" label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="primary" size="mini" plain="" @click="selectAccount(scope.row)">选择</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-form>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="info" icon="el-icon-error" plain size="small" @click="accountQueryDialog.visible=false">关闭</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import request from '@/requests/siteManage'

export default {
    props: ['MAX_TABLE_HEIGHT'],
    data() {
        return {
            // 查询条件
            daterange: [],
            maintainDate: [],
            queryParams: {
                conditionsMap: {
                    siteName: '',           //站点名称
                    account: '',            //站点账号
                    status: '',             //站点状态
                    maintainStatus: '',     //维护状态
                    eventStart: '',         //维护时间开始
                    eventEnd: ''            //维护时间结束
                },
                limit: 10,
                offset: 0,
                sort: 'createDate',
                sortOrder: 'desc'
            },
            // 列表属性
            tableData: [],
            selectedSites: [],
            tableLoading: false,
            //分页属性
            pageNum: 1,
            pageSize: 10,
            total: 0,
            //弹框属性
            dialog: {
                visible: false,
                loading: false,
                type: 'add',
                gameList: [],   //弹框的站点类表 - 已处理
                checkAll: false,
                checkedGames: [],
                isIndeterminate: false,
                siteUrl: '',
                dlUrl: '',
                lobbyList: [{
                    key: 1,
                    value: ''
                }]
            },
            gameList: [],   //数据返回的站点列表
            //维护弹框属性
            maintainDialog: {
                visible: false,
                loading: false,
            },
            maintainData: {
                conditionsMap: {
                    idList: []
                },
                maintainStatus: '',
                eventStart: '',
                eventEnd: '',
            },
            //账号选择弹框
            accountQueryDialog: {
                loading: false,
                visible: false,
                account: '',
                tableData: []
            },
            //站点信息
            formData: {
                conditionsMap: {
                    gameList: [],       //游戏
                },
                siteId: '',
                siteName: '',       //站点名称
                account: '',        //站点账号
                siteFolder: '',     //站点文件夹
                domains: [],        //站点域名+厅主域名+下载地址
                domainUrl: '',      //站点域名
                wsUrl: '',          //代理长链接
                stationMark: '',    //站点标识
                smsSignature: '',   //短信签名
                status: '',        //站点状态
                appKey: '',         //第三方下载AppKey
                pushAppId:'',
                pushAppSecret:'',
                pushAppKey:'',
                pushMasterSecret:''
            },
            isChange:false,  //是否是修改时间
            siteId:'', // 修改时间时用
            weihuBtn:false, //显示维护所有站点按钮还是恢复所有站点按钮   为true显示全部恢复
        }
    },
    methods: {
        // 获取站点列表
        queryTableData(type) {
            if (type === 'search') {
                this.pageNum = 1;
                this.queryParams.offset = 0;
            }
            this.tableLoading = true;
            this.queryParams.conditionsMap.eventStart = this.daterange ? this.daterange[0] : '';
            this.queryParams.conditionsMap.eventEnd = this.daterange ? this.daterange[1] : '';
            request.siteList(this.queryParams).then(res => {
                this.tableLoading = false;
                this.tableData = res.Pagination.rows;
                this.total = res.Pagination.total;
                this.weihuBtn = res.sitesHasMaintain;
            }).catch(e => {
                this.$notify.error({title:e});
            })
        },
        // 显示维护状态
        displayMaintenance(row) {
            if (row.eventStart == null && row.eventEnd == null) {
                return '-'
            } else if (row.eventStart == null) {
                return '~' + row.eventEnd
            } else if (row.eventEnd == null) {
                return row.eventStart + '~ 未知'
            } else {
                return row.eventStart + '~ ' + row.eventEnd
            }
        },
        // 更改站点状态
        changeSiteState(row) {
            let msg = row.status === '1' ? '确定禁用站点' : '确定启用站点';
            let msgType = row.status === '1' ? 'error' : 'warning';
            this.$confirm(msg, '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true,
                type: msgType
            }).then(() => {
                let data = {
                    conditionsMap: {
                        idList: [row.siteId.toString()]
                    },
                    status: row.status === "1" ? "0" : "1"
                };
                this.tableLoading = true;
                request.upOrDownSite(data).then(res => {
                    this.tableLoading = false;
                    if (res.code === '200') {
                        this.$notify.success({title:res.msg});
                        this.queryTableData();
                    } else {
                        this.$notify.error({title:res.msg})
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        //批量启用/禁用
        changeBatchSitesState(type) {
            if (this.selectedSites.length < 1) {
                this.$message.warning("请勾选站点!");
                return;
            }
            let msg = type === '1' ? '确定启用站点？' : '确定禁用站点？';
            let msgType = type === '1' ? 'warning' : 'error';
            this.$confirm(msg, '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true,
                type: msgType
            }).then(() => {
                let data = {
                    conditionsMap: {
                        idList: this.selectedSites
                    },
                    status: type
                };
                this.tableLoading = true;
                request.upOrDownSite(data).then(res => {
                    this.tableLoading = false;
                    if (res.code === '200') {
                        this.$notify.success({title:res.msg})
                        this.queryTableData();
                    } else {
                        this.$notify.error({title:res.msg})
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        // 单条维护/恢复按钮
        changeSiteMaintainStatus(row) {
            this.maintainData.conditionsMap.idList = [];
            let msg = row.maintainStatus === "0" ? "确定维护站点?" : "确定恢复站点?";
            this.$confirm(msg, '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true,
                type: 'warning'
            }).then(() => {
                this.maintainData.conditionsMap.idList.push(row.siteId.toString());
                this.maintainData.maintainStatus = '1';
                if (row.maintainStatus === '1') {
                    this.maintainData.eventStart = null;
                    this.maintainData.eventEnd = null;
                    this.maintainData.maintainStatus = '0';
                    this.updateMaintainStatus('0');
                }
                else {
                    this.maintainDialog.visible = true
                }
            })
        },
        // 更新维护状态
        updateMaintainStatus(type) {
            if(this.isChange){ //修改时间
                var list = []
                list.push(this.siteId)
                var s = this.maintainDate ? this.maintainDate[0] : '';
                var e = this.maintainDate ? this.maintainDate[1] : '';
                var now = new Date();
                var start = new Date(s)
                if(start.getTime() <= now.getTime()){
                    this.$message.error('只能配置当前时间段之后的时间!')
                    return false
                }

                this.maintainDialog.loading = true;
                request.preventiveAllSite2({
                    eventStart:s,
                    eventEnd:e,
                    idList:list
                }).then(res => {
                    this.maintainDialog.loading = false;
                    if (res.code === '200') {
                        this.maintainDate = []
                        this.isChange = false
                        this.maintainDialog.visible = false;
                        this.$notify.success({title:res.msg})
                        this.queryTableData();
                    } else {
                        this.$notify.error({title:res.msg})
                    }
                })
            }else{ //维护或恢复
                if(this.maintainData.maintainStatus == 'all'){ //全部站点维护
                    var s = this.maintainDate ? this.maintainDate[0] : '';
                    var e = this.maintainDate ? this.maintainDate[1] : '';
                    var now = new Date();
                    var start = new Date(s)
                    if(start.getTime() <= now.getTime()){
                        this.$message.error('只能配置当前时间段之后的时间!')
                        return false
                    }
                    this.maintainDialog.loading = true;
                    request.preventive({
                        eventStart: s,
                        eventEnd:e,
                        status:1,
                    }).then(res => {
                        this.maintainDialog.loading = false;
                        if (res.code === '200') {
                            this.maintainDate = []
                            this.maintainDialog.visible = false;
                            this.$notify.success({title:res.msg})
                            this.queryTableData();
                        } else {
                            this.$notify.error({title:res.msg})
                        }
                    })
                }else{ //单个或批量
                    if (type === '0') {
                        this.maintainData.eventStart = null;
                        this.maintainData.eventEnd = null;
                    }
                    if (type === '1') {
                        this.maintainData.eventStart = this.maintainDate ? this.maintainDate[0] : '';
                        this.maintainData.eventEnd = this.maintainDate ? this.maintainDate[1] : '';
                        var now = new Date();
                        var start = new Date(this.maintainData.eventStart)
                        if(start.getTime() <= now.getTime()){
                            this.$message.error('只能配置当前时间段之后的时间!')
                            return false
                        }
                    }
                    this.maintainDialog.loading = true;
                    request.preventiveAllSite(this.maintainData).then(res => {
                        this.maintainDialog.loading = false;
                        if (res.code === '200') {
                            this.maintainDate = []
                            this.maintainDialog.visible = false;
                            this.$notify.success({title:res.msg})
                            this.queryTableData();
                        } else {
                            this.$notify.error({title:res.msg})
                        }
                    })
                }
            }
        },
        //批量维护按钮
        weihuSites(){
            if (this.selectedSites.length < 1) {
                this.$message.warning("请勾选站点!");
                return;
            }
            this.$confirm('确定维护站点?', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true,
                type: 'warning'
            }).then(() => {
                this.maintainDialog.visible = true
                this.maintainData.conditionsMap.idList = this.selectedSites
                this.maintainData.maintainStatus = '1';
                this.maintainData.eventStart = null;
                this.maintainData.eventEnd = null;
            })
        },
        //修改时间按钮
        changeTime(row){
            this.siteId = row.siteId.toString()
            this.isChange = true
            this.maintainDialog.visible = true
        },
        //所有站点维护按钮
        weihuAll(){
            this.$confirm('确定维护所有站点?', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true,
                type: 'warning'
            }).then(() => {
                this.maintainDialog.visible = true
                this.maintainData.maintainStatus = 'all';
            })
        },
        //所有站点恢复按钮
        resetAll(){
            this.$confirm('确定恢复所有站点?', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true,
                type: 'warning'
            }).then(() => {
                request.preventive({
                    status:0,
                }).then(res => {
                    if (res.code === '200') {
                        this.$notify.success({title:res.msg})
                        this.queryTableData();
                    } else {
                        this.$notify.error({title:res.msg})
                    }
                })
            })
        },
        // 站点域名绑定
        bindDomain(row) {
            this.$router.push({
                path: `/siteManage/domainBinding/siteId=${row.siteId}`
            })
        },
        // 添加站点
        addSite() {
            this.dialog.type = 'add';
            this.dialog.loading = true;
            request.getPayTypeListAndGameList({
                siteId: ''
            }).then(res => {
                this.dialog.loading = false;
                if (res.code === '200') {
                    this.gameList = res.data.gameList;
                    this.setDialogData({status:'1'}, res.data.gameList);
                    this.dialog.visible = true;
                } else {
                    this.$notify.error({title:res.msg})
                    this.dialog.visible = false
                }
            });
            this.dialog.lobbyList = [{
                key: 1,
                value: ''
            }];
            this.dialog.siteUrl = '';
            this.dialog.dlUrl = '';
        },
        // 编辑站点信息
        editSiteSettings(row) {
            this.dialog.type = 'edit';
            this.dialog.visible = true;
            let params = {
                siteId: row.siteId
            };
            request.getPayTypeListAndGameList(params).then(res => {
                if (res.code === '200') {
                    this.gameList = res.data.gameList;
                    this.setDialogData(row, res.data.gameList);
                } else {
                    this.$notify.error({title:res.msg})
                    this.dialog.visible = false
                }
            });
            request.getDomainsUpdateSite(params).then(res => {
                if (res.code === '200') {
                    let objList = res.data;
                    this.dialog.lobbyList = [];
                    // 站点域名
                    let url0 = objList.filter(obj => {
                        return obj.domainType === '0'
                    });

                    this.dialog.siteUrl = url0.length ? url0[0].domainUrl : '';
                    // 下载地址
                    let url8 = objList.filter(obj => {
                        return obj.domainType === '8'
                    });
                    this.dialog.dlUrl = url8.length ? url8[0].domainUrl : '';
                    // 大厅域名
                    for (let item in objList) {
                        // if (objList[item].domainType === '0') {
                        //     this.dialog.siteUrl = objList[item].domainUrl;
                        // }
                        if (objList[item].domainType === '7') {
                            this.dialog.lobbyList.push({
                                value: objList[item].domainUrl,
                                key: item
                            });
                        }
                        // if (objList[item].domainType === '8') {
                        //     this.dialog.dlUrl = objList[item].domainUrl;
                        // }
                    }
                    if (this.dialog.lobbyList.length === 0) {
                        this.dialog.lobbyList = [{
                            key: 1,
                            value: ''
                        }]
                    }
                    // console.log(this.dialog.lobbyList);
                } else {
                    this.$notify.error({title:res.msg})
                }
            })
        },
        // 添加一条大厅域名
        addRow() {
            if (this.dialog.lobbyList.length < 3) {
                this.dialog.lobbyList.push({key: Date.now(), value: ''});
            } else {
                this.$message.warning('只能添加最多3条域名!')
            }
        },
        // 删除一条大厅域名
        delRow(item) {
            let index = this.dialog.lobbyList.indexOf(item);
            if (index !== -1) {
                this.dialog.lobbyList.splice(index, 1);
            }
        },
        // 获取站点账号列表
        querySiteAccount() {
            let data = {
                conditionsMap: {account: this.accountQueryDialog.account},
                limit: 10,
                offset: 0,
                sort: "createDate",
                sortOrder: "desc"
            };
            this.accountQueryDialog.visible = true;
            this.accountQueryDialog.loading = true;
            request.querySiteAccount(data).then(res => {
                this.accountQueryDialog.loading = false;
                this.accountQueryDialog.tableData = res.rows
            })
        },
        // 选择厅主账号
        selectAccount(row) {
            this.formData.siteId = row.siteId;
            this.formData.account = row.account;
            this.accountQueryDialog.visible = false
        },
        // 勾选站点事件
        handleCheckAllChange(val) {
            this.dialog.checkedGames = val ? this.dialog.gameList : [];
            this.dialog.isIndeterminate = false;
        },
        handleCheckedGameChange(value) {
            let checkedCount = value.length;
            this.dialog.checkAll = checkedCount === this.gameList.length;
            this.dialog.isIndeterminate = checkedCount > 0 && checkedCount < this.gameList.length;
        },
        // 更新站点信息
        updateSite() {
            let checked = this.dialog.checkedGames;
            // let list = this.gameList;
            this.formData.conditionsMap.gameList = [];

            for (let i in checked) {
                this.formData.conditionsMap.gameList.push({
                    gameId: checked[i] //, roomMaxNum: '', roomRobotNum: ''
                })
            }
            // this.formData.conditionsMap.gameList.forEach(e => {
            //     for (let i in list) {
            //         if (e.gameId === list[i].gameId) {
            //             e.roomMaxNum = list[i].roomMaxNum;
            //             e.roomRobotNum = list[i].roomRobotNum
            //         }
            //     }
            // });
            // 获取站点域名，下载地址，大厅域名 + 输入验证
            let lobbyInputError = false;
            this.formData.domains = [
                {
                    domainUrl: this.dialog.siteUrl,
                    domainType: '0'
                },
                // {
                //     domainUrl: this.dialog.dlUrl,
                //     domainType: '8'
                // },
            ];
            // for (let i in this.dialog.lobbyList) {
            //     if (this.dialog.lobbyList[i].value.trim() === '') {
            //         lobbyInputError = true
            //     } else {
            //         this.formData.domains.push({
            //             domainUrl: this.dialog.lobbyList[i].value,
            //             domainType: '7'
            //         });
            //     }
            // }
            // 输入验证
            try {
                if (this.formData.siteName === '') throw '站点名称不能为空！';
                else if (this.formData.account === '') throw '站点账号不能为空！';
                // else if (lobbyInputError) throw '请输入大厅域名！';
                else if (this.dialog.siteUrl === '') throw '站点域名不能为空！';
                // else if (this.dialog.dlUrl === '') throw '下载地址不能为空！';
                else if (this.formData.wsUrl === '') throw '代理长链接不能为空！';

                else if (this.formData.stationMark === '') throw '站点标识不能为空！';

                else if (this.formData.pushAppId.length>100) throw 'AppID最多可输入100个字符！';

                else if (this.formData.pushAppSecret.length>100) throw 'AppSecret最多可输入100个字符！';

                else if (this.formData.pushAppKey.length>100) throw 'AppKey最多可输入100个字符！';

                else if (this.formData.pushMasterSecret.length>100) throw 'MasterSecret最多可输入100个字符！';
            }
            catch (e) {
                this.$message.warning(e);
                return;
            }
            // 获取勾选的游戏
            // let tmp = this.formData.conditionsMap.gameList;
            // for (let i in tmp) {
            //     if (tmp[i].roomMaxNum === '' || tmp[i].roomMaxNum === null) {
            //         this.$message.warning('请输入玩家最多人数！');
            //         return;
            //     } else if (tmp[i].roomRobotNum === '' || tmp[i].roomRobotNum === null) {
            //         this.$message.warning('请输入房间最多机器人数！');
            //         return
            //     }
            // }
            this.dialog.loading = true;
            if (this.dialog.type === 'add') {
                request.createSite(this.formData).then(res => {
                    this.dialog.loading = false;
                    if (res.code === '200') {
                        this.$notify.success({title:res.msg})
                        this.dialog.visible = false;
                        this.queryTableData();
                    } else {
                        this.$notify.error({title:res.msg})
                    }
                });
            }
            if (this.dialog.type === 'edit') {
                request.updateSite(this.formData).then(res => {
                    this.dialog.loading = false;
                    if (res.code === '200') {
                        this.$notify.success({title:res.msg})
                        this.dialog.visible = false;
                        this.queryTableData();
                    } else {
                        this.$notify.error({title:res.msg})
                    }
                });
            }
        },
        // 删除站点
        deleteSite() {
            let data = {
                conditionsMap: {
                    idList: this.selectedSites
                }
            };
            if (this.selectedSites.length < 1) {
                this.$message.warning("请勾选站点!");
                return;
            }
            this.$confirm('确定删除？', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true,
                type: 'warning'
            }).then(() => {
                this.tableLoading = true;
                request.deleteSite(data).then(res => {
                    this.tableLoading = false;
                    if (res.code === '200') {
                        this.$notify.success({title:res.msg})
                        this.queryTableData();
                    } else {
                        this.$notify.error({title:res.msg})
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        // 显示站点详情
        setDialogData(obj, gameList) {
            let count = 0;
            this.dialog.checkedGames = [];
            this.dialog.checkAll = false;
            this.dialog.isIndeterminate = false;
            for (let item in this.formData) {
                if (item != 'conditionsMap' && item != status) {
                    this.formData[item] = obj[item] ? obj[item] : '';
                }
            }
            for (let i in gameList) {
                this.dialog.gameList.push(gameList[i].gameId);    //获取站点列表
                if (gameList[i].flag == '0') {
                    count++;
                    this.dialog.checkedGames.push(gameList[i].gameId);     //勾选站点
                }
            }
            if (count === this.gameList.length) {
                this.dialog.checkAll = true;
            } else if (count > 0) {
                this.dialog.isIndeterminate = true;
            }
        },
        editDownloadConfig(row) {
            this.$router.push({
                path: `/siteManage/downloadConf/siteId=${row.siteId}`,
            });
        },
        handleSiteSelection(sites) {
            this.selectedSites = [];
            for (let i in sites) {
                this.selectedSites.push(sites[i].siteId.toString())
            }
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
        this.queryTableData();
    }
}
</script>

<style lang="scss">
    .site-manage {
        #site-add-edit {
            .el-input__inner {
                text-align: left;
            }
        }
    }
</style>
