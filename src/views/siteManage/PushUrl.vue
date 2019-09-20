<template>
    <div class="card card-primary">
        <div class="card-header">
            <div class="card-text">
                <h3>推广域名</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-form :inline="true">
                    <el-form-item>
                        <el-button type="success" size="small" icon="el-icon-circle-plus" style="width: 100px" @click="pushAdd">
                            新增
                        </el-button>
                        <el-button type="danger" size="small" icon="el-icon-delete" style="width: 100px" @click="delAll">
                            批量删除
                        </el-button>
                        <el-button type="warning" size="small" style="width: 100px" @click="changeAll">
                            批量禁用
                        </el-button>
                        <el-button type="info" size="small" icon="el-icon-back" style="width: 100px" @click="goBack">
                            返回上级
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="card-data">
                <el-table :max-height="MAX_TABLE_HEIGHT" :data="tableData" @selection-change="handleSelectionChange" style="width: 100%" size="medium" stripe
                :cell-style="{textAlign:'center'}" :header-cell-style="{textAlign:'center'}" v-loading='tableLoading'>
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="domainName" label="域名名称"></el-table-column>
                    <el-table-column prop="styleType" label="模板样式">
                        <template slot-scope="scope">
                            <div v-if="scope.row.styleType == 1">经典默认</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="domainUrl" label="推广域名">
                        <template slot-scope="scope">
                            <a style="text-decoration:underline;color:#008afb;cursor: pointer;" @click="see(scope.row.domainUrl)">{{scope.row.domainUrl}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="regNum" label="注册人数"></el-table-column>
                    <el-table-column prop="accountId" label="推广ID">
                        <template slot-scope="scope">
                            <a v-if="scope.row.popuType == 1">{{scope.row.accountId}}</a>
                            <div v-else>所有人</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <template v-if="scope.row.popuStatus=='1'">
                                <el-button type="warning" size="mini" @click="changeStatus(scope.row,0)">禁用</el-button>
                            </template>
                            <template v-if="scope.row.popuStatus=='0'">
                                <el-button type="success" size="mini" @click="changeStatus(scope.row,1)">启用</el-button>
                            </template>
                            <el-button type="danger" size="mini" @click="del(scope.row)" v-if="scope.row.defaultTag != 1">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[10,20,50]"
                :page-size.sync="queryParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
            <!--个人信息弹框-->
            <!-- <el-dialog :visible.sync="infoDialog.visible" width="720px" :close-on-click-modal="false">
                <div class="custom-dialog">
                    <div class="dialog-body" style="padding: 20px 40px">
                        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                            <el-tab-pane label="基础信息" name="first">
                                <el-form label-width="110px">
                                    <el-col :span="12">
                                        <el-form-item label="会员账号:"></el-form-item>
                                        <el-form-item label="会员上级:"></el-form-item>
                                        <el-form-item label="层级经验:">
                                            <el-col :span="18">
                                                <el-input type="text" size="mini" clearable style="width:90%"></el-input>
                                            </el-col>
                                            <el-col :span="6">
                                                <el-button type="primary" size="mini">修改</el-button>
                                            </el-col>
                                        </el-form-item>
                                        <el-form-item label="会员密码:">
                                            <el-col :span="18">
                                                <el-input type="text" size="mini" clearable style="width:90%"></el-input>
                                            </el-col>
                                            <el-col :span="6">
                                                <el-button type="primary" size="mini">修改</el-button>
                                            </el-col>
                                        </el-form-item>
                                        <el-form-item label="会员层级:"></el-form-item>
                                        <el-form-item label="QQ号码:">
                                            <el-col :span="18">
                                                <el-input type="text" size="mini" clearable style="width:90%"></el-input>
                                            </el-col>
                                            <el-col :span="6">
                                                <div style="text-align:center;color:red">(3)</div>
                                            </el-col>
                                        </el-form-item>
                                        <el-form-item label="支付宝:">
                                            <el-col :span="18">
                                                <el-input type="text" size="mini" clearable style="width:90%"></el-input>
                                            </el-col>
                                            <el-col :span="6">
                                                <div style="text-align:center;color:red">(3)</div>
                                            </el-col>
                                        </el-form-item>
                                        <el-form-item label="E-mail:">
                                            <el-col :span="18">
                                                <el-input type="text" size="mini" clearable style="width:90%"></el-input>
                                            </el-col>
                                            <el-col :span="6">
                                                <div style="text-align:center;color:red">(3)</div>
                                            </el-col>
                                        </el-form-item>
                                        <el-form-item label="实名认证:"></el-form-item>
                                        <el-form-item label="账号状态:"></el-form-item>
                                        <el-form-item label="注册时间:"></el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="会员ID:"></el-form-item>
                                        <el-form-item label="所属站点:"></el-form-item>
                                        <el-form-item label="状态:">
                                            <el-col :span="18">
                                                <el-select size="mini" v-model="tableData[0].a" style="width:90%">
                                                    <el-option :value="1" label="正常">正常</el-option>
                                                    <el-option :value="2" label="禁用">禁用</el-option>
                                                </el-select>
                                            </el-col>
                                        </el-form-item>
                                        <el-form-item label="手机号码:">
                                            <el-col :span="18">
                                                <el-input type="text" size="mini" clearable style="width:90%"></el-input>
                                            </el-col>
                                            <el-col :span="6">
                                                <div style="text-align:center;color:red">(3)</div>
                                            </el-col>
                                        </el-form-item>
                                        <el-form-item label="推广层级:"></el-form-item>
                                        <el-form-item label="微信号码:">
                                            <el-col :span="18">
                                                <el-input type="text" size="mini" clearable style="width:90%"></el-input>
                                            </el-col>
                                            <el-col :span="6">
                                                <div style="text-align:center;color:red">(3)</div>
                                            </el-col>
                                        </el-form-item>
                                        <el-form-item label="设备标识码:">
                                            <el-col :span="18">
                                                123123
                                            </el-col>
                                            <el-col :span="6">
                                                <div style="text-align:center;color:red">(3)</div>
                                            </el-col>
                                        </el-form-item>
                                        <el-form-item label="银行名称:">
                                            <el-col :span="18">
                                                <el-input type="text" size="mini" clearable style="width:90%"></el-input>
                                            </el-col>
                                        </el-form-item>
                                        <el-form-item label="银行卡:">
                                            <el-col :span="18">
                                                <el-input type="text" size="mini" clearable style="width:90%"></el-input>
                                            </el-col>
                                            <el-col :span="6">
                                                <div style="text-align:center;color:red">(3)</div>
                                            </el-col>
                                        </el-form-item>
                                        <el-form-item label="上次登录ip:">
                                            <el-col :span="18">
                                                0.0.0.0
                                            </el-col>
                                            <el-col :span="6">
                                                <div style="text-align:center;color:red">(3)</div>
                                            </el-col>
                                        </el-form-item>
                                        <el-form-item label="最后登陆时间:"></el-form-item>
                                    </el-col>
                                    <el-form-item label="" label-width="0" style="text-align:center">
                                        <el-button type="primary" icon="el-icon-success" :loading="infoDialog.loading">保存</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane label="账户信息" name="second">
                                <el-card style="margin-bottom:20px">
                                    <el-form label-width="110px">
                                        <el-form-item label="账户总金额:"></el-form-item>
                                        <el-form-item label="账户余额:"></el-form-item>
                                        <el-form-item label="保险箱余额:"></el-form-item>
                                    </el-form>
                                </el-card>
                                <el-card>
                                    <el-form label-width="110px">
                                        <el-form-item label="派彩金额:">总计</el-form-item>
                                        <el-form-item label="有效投注金额:">总计</el-form-item>
                                        <el-form-item label="投注金额:">总计</el-form-item>
                                        <el-form-item label="中奖金额:">总计</el-form-item>
                                        <el-form-item label="入款信息:"></el-form-item>
                                        <el-form-item label="出款信息:"></el-form-item>
                                        <el-form-item label="优惠信息:"></el-form-item>
                                        <el-form-item label="返水信息:"></el-form-item>
                                    </el-form>
                                </el-card>
                            </el-tab-pane>
                            <el-tab-pane label="游戏信息" name="third">
                                <el-table :max-height="600" :data="tableData" style="width: 100%" size="medium" stripe v-loading='tableLoading'
                                :cell-style="{textAlign:'center'}" :header-cell-style="{textAlign:'center'}">
                                    <el-table-column prop="a" label="游戏"></el-table-column>
                                    <el-table-column prop="a" label="游戏次数"></el-table-column>
                                    <el-table-column prop="a" label="盈亏金额"></el-table-column>
                                    <el-table-column prop="a" label="最后游戏时间"></el-table-column>
                                </el-table>
                                <div class="pagination">
                                    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[10,20,50]"
                                    :page-size.sync="queryParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="稽核查询" name="fourth">
                                <el-table :max-height="600" :data="tableData" style="width: 100%" size="medium" stripe v-loading='tableLoading'
                                :cell-style="{textAlign:'center'}" :header-cell-style="{textAlign:'center'}">
                                    <el-table-column prop="a" label="订单号"></el-table-column>
                                    <el-table-column prop="a" label="存款时间"></el-table-column>
                                    <el-table-column prop="a" label="金额"></el-table-column>
                                    <el-table-column prop="a" label="已打码量"></el-table-column>
                                    <el-table-column prop="a" label="应打码量"></el-table-column>
                                    <el-table-column prop="a" label="剩余打码量"></el-table-column>
                                    <el-table-column prop="a" label="是否通过"></el-table-column>
                                    <el-table-column prop="a" label="扣除费用"></el-table-column>
                                </el-table>
                                <p style="margin-top:20px">剩余总打码量：</p>
                                <div class="pagination">
                                    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[10,20,50]"
                                    :page-size.sync="queryParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="登陆日志" name="fifth">
                                <el-table :max-height="600" :data="tableData" style="width: 100%" size="medium" stripe v-loading='tableLoading'
                                :cell-style="{textAlign:'center'}" :header-cell-style="{textAlign:'center'}">
                                    <el-table-column prop="a" label="时间"></el-table-column>
                                    <el-table-column prop="a" label="IP"></el-table-column>
                                    <el-table-column prop="a" label="IP登陆次数"></el-table-column>
                                    <el-table-column prop="a" label="地址"></el-table-column>
                                    <el-table-column prop="a" label="设备"></el-table-column>
                                </el-table>
                                <div class="pagination">
                                    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[10,20,50]"
                                    :page-size.sync="queryParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="资金账变" name="sixth">
                                <el-table :max-height="600" :data="tableData" style="width: 100%" size="medium" stripe v-loading='tableLoading'
                                :cell-style="{textAlign:'center'}" :header-cell-style="{textAlign:'center'}">
                                    <el-table-column prop="a" label="订单号/局号"></el-table-column>
                                    <el-table-column prop="a" label="账变类型"></el-table-column>
                                    <el-table-column prop="a" label="账变前余额"></el-table-column>
                                    <el-table-column prop="a" label="账变金额"></el-table-column>
                                    <el-table-column prop="a" label="账变后余额"></el-table-column>
                                    <el-table-column prop="a" label="账变时间"></el-table-column>
                                </el-table>
                                <div class="pagination">
                                    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[10,20,50]"
                                    :page-size.sync="queryParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </el-dialog> -->
            <!-- 推广域名新增弹框 -->
            <el-dialog :visible.sync="pushDomain.visible" width="450px" :close-on-click-modal="false">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text"><h3>{{pushDomain.type == 'add' ? '新增推广域名' : '编辑推广域名'}}</h3></div>
                    </div>
                    <div class="dialog-body">
                        <el-form label-width="80px">
                            <el-form-item label="域名名称">
                                <el-input type="text" size="small" clearable v-model="pushDomain.data.domainName" maxlength="20"></el-input>
                            </el-form-item>
                            <el-form-item label="外部链接">
                                <el-input type="text" size="small" clearable v-model="pushDomain.data.externalUrl" maxlength="50"></el-input>
                            </el-form-item>
                            <el-form-item label="推广域名">
                                <el-input type="text" size="small" clearable v-model="pushDomain.data.domainUrl" maxlength="50"></el-input>
                            </el-form-item>
                            <el-form-item label=" ">
                                <el-radio :label="0" v-model="pushDomain.data.popuType">所有会员</el-radio>
                                <el-radio :label="1" v-model="pushDomain.data.popuType">自定义</el-radio>
                                <el-tooltip class="item" effect="dark" placement="right">
                                    <div slot="content">
                                        &nbsp;&nbsp;&nbsp;自定义:选择自定义,绑定了推广员的ID后,无论怎么改变后缀,<br/>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;从此链接下载的会员都会作为此推广员的下级。<br/>
                                        所有会员:当选择所有会员时,推广链接后面会附带会员的ID,<br/>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果在打开链接的过程中删除或修改了ID,那么此时<br/>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通过本条链接下载的用户会直接作为厅主的下级。
                                    </div>
                                    <i class="el-icon-question"></i>
                                </el-tooltip>
                            </el-form-item>
                            <el-form-item label="推广ID">
                                <el-input type="number"  :disabled="pushDomain.data.popuType == 0" size="small" clearable v-model.number="pushDomain.data.accountId" 
                                placeholder="请输入推广员的id" maxlength="8"></el-input>
                            </el-form-item>
                            <el-form-item label="模板样式">
                                <el-select v-model="pushDomain.data.styleType" clearable size="small" style="width: 100%;">
                                    <el-option :value="1" label="经典默认">经典默认</el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain :loading="pushDomain.loading" @click="pushDomain.visible=false">取消</el-button>
                        <el-button type="primary" icon="el-icon-success" :loading="pushDomain.loading" @click="pushAddSave">保存</el-button>
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
    data(){
        return{
            activeName:'first',
            //查询条件
            queryParams: {
                limit: 10,
                offset: 0,
                siteId: '',
            },
            //分页属性
            pageNum: 1,
            pageSize: 10,
            total: 0,
            //列表属性
            tableData: [],
            tableLoading: false,
            selectedRows: [],
            //个人信息弹框属性
            infoDialog:{
                visible: false,
                loading: false,
            },
            // 推广域名新增弹框
            pushDomain: {
                type:'',
                visible: false,
                loading: false,
                data: {
                    domainName:'',
                    externalUrl:'',
                    domainUrl:'',
                    popuType:0,   //0所有  1自定义
                    accountId:'', //推广ID
                    styleType:1,
                    siteId:'',
                    id:'',
                }
            },
        }
    },
    created() {
        this.queryParams.siteId = parseInt(this.$route.params.siteId);
        this.queryTableData();
    },
    watch:{
        'pushDomain.data.popuType':{   //监听是否选择游戏
            deep:true,  //深度监控
            // immediate: true, // 第一次默认值也监听
            handler(val) {
                if(val == 0){
                    this.pushDomain.data.accountId = ''
                }
            },
        },
    },
    methods:{
        // 获取表格数据
        queryTableData() {
            this.tableLoading = true;
            request.getSitePopuDomains(this.queryParams).then(res => {
                this.tableLoading = false;
                this.tableData = res.data.rows;
                for(var item of this.tableData){
                    item.regNum = item.regNum ? item.regNum : 0
                }
                this.total = res.data.total;
            }).catch(e => {
                this.$notify.error({title:e});
            })
        },
        //推广域名新增按钮
        pushAdd(){
            for (let i in this.pushDomain.data) { //重置数据
                if(i == 'popuType'){
                    this.pushDomain.data[i] = 0
                }else if(i == 'styleType'){
                    this.pushDomain.data[i] = 1
                }else{
                    this.pushDomain.data[i] = ''
                }
            }
            this.pushDomain.visible = true
            this.pushDomain.type = 'add'
            this.pushDomain.data.siteId = this.queryParams.siteId
        },
        //新增保存按钮
        pushAddSave(){
            try {
                if (this.pushDomain.data.domainUrl === ''){
                    throw '推广域名不能为空！';
                }
                if(this.pushDomain.data.domainUrl.indexOf('http') !== -1){
                    throw '推广域名不能带http前缀！'
                }
                if(this.pushDomain.data.externalUrl.indexOf('http') !== -1){
                    throw '外部链接不能带http前缀！'
                }
            }
            catch (e) {
                this.$message.error(e);
                return;
            }
            this.pushDomain.data.accountId = this.pushDomain.data.accountId == '' ? 0 : this.pushDomain.data.accountId
            this.pushDomain.loading = true
            request.addOrUpSitePopuDomains(this.pushDomain.data).then(res => {
                this.pushDomain.loading = false;
                if (res.code === '200') {
                    this.pushDomain.visible = false
                    this.$notify.success({title:res.msg});
                    this.queryTableData();
                } else {
                    if(this.pushDomain.data.accountId == 0){
                        this.pushDomain.data.accountId = null
                    }
                    this.$notify.error({title:res.msg})
                }
            })
        },
        //删除按钮
        del(row){
            if (row.popuStatus == 1) {
                this.$message.warning('请禁用域名后再删除');
                return false;
            }
            this.$confirm('是否确定删除当前域名？', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true,
                type: 'warning'
            }).then(() => {
                var list = []
                list.push(row.id)
                var data = {
                    ids:list,
                    siteId:this.queryParams.siteId
                }
                this.tableLoading = true
                request.delSitePopuDomain(data).then(res => {
                    this.tableLoading = false;
                    if (res.code === '200') {
                        this.$notify.success({title:res.msg});
                        this.queryTableData();
                    } else {
                        this.$notify.error({title:res.msg})
                    }
                })
            })
        },
        //批量删除
        delAll(){
            if (this.selectedRows.length < 1) {
                this.$message.warning("请勾选要删除的域名!");
                return;
            }
            this.$confirm('是否确定删除当前域名？(当前共选中'+ this.selectedRows.length+'条)', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true,
                type: 'warning'
            }).then(() => {
                var list = []
                for(var item of this.selectedRows){
                    list.push(item.id)
                }
                var data = {
                    ids:list,
                    siteId:this.queryParams.siteId
                }
                this.tableLoading = true
                request.delSitePopuDomain(data).then(res => {
                    this.tableLoading = false;
                    if (res.code === '200') {
                        this.$notify.success({title:res.msg});
                        this.queryTableData();
                    } else {
                        this.$notify.error({title:res.msg})
                    }
                })
            })
        },
        // 禁用/启用按钮
        changeStatus(row,num){
            var msg = num == 0 ? '是否确认禁用该域名？' : '是否确认启用该域名？'
            this.$confirm(msg, '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true,
                type: 'warning'
            }).then(() => {
                var list = []
                list.push(row.id)
                var data = {
                    ids:list,
                    siteId:this.queryParams.siteId,
                    popuStatus:num
                }
                this.tableLoading = true
                request.enabledSitePopuDomain(data).then(res => {
                    this.tableLoading = false;
                    if (res.code === '200') {
                        this.$notify.success({title:res.msg});
                        this.queryTableData();
                    } else {
                        this.$notify.error({title:res.msg})
                    }
                })
            })
        },
        //批量禁用
        changeAll(){
            if (this.selectedRows.length < 1) {
                this.$message.warning("请勾选要禁用的域名!");
                return;
            }
            this.$confirm('是否确定禁用当前域名？(当前共选中'+ this.selectedRows.length+'条)', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true,
                type: 'warning'
            }).then(() => {
                var list = []
                for(var item of this.selectedRows){
                    list.push(item.id)
                }
                var data = {
                    ids:list,
                    siteId:this.queryParams.siteId,
                    popuStatus:0
                }
                this.tableLoading = true
                request.enabledSitePopuDomain(data).then(res => {
                    this.tableLoading = false;
                    if (res.code === '200') {
                        this.$notify.success({title:res.msg});
                        this.queryTableData();
                    } else {
                        this.$notify.error({title:res.msg})
                    }
                })
            })
        },
        //返回上级按钮
        goBack() {
            var id = window.location.hash.split('=')[1]
            this.$router.push({
                path: '/siteManage/domainBinding/siteId='+id
            })
        },
        //外链跳转
        see(url){
            window.open('http://'+url)
        },
        // 表格勾选事件
        handleSelectionChange(val) {
            this.selectedRows = val
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

<style>
/* chrome type为number移除箭头 */
input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
     -webkit-appearance:textfield;
}
</style>

