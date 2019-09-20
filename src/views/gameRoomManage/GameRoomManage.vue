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
                        <el-button class="search-btn" type="primary" @click="queryTableData('search')" size="small">
                            <i class="el-icon-search"></i>
                            搜索
                        </el-button>
                    </el-form-item>
                </el-form>
                <hr/>
                <el-form :inline="true">
                    <el-form-item>
                        <el-button type="primary" size="small" icon="el-icon-circle-plus" style="width: 100px"
                                   @click="add">添加
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
                            <el-button type="text" @click="godown(scope.row)">{{scope.row.account}}</el-button>
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
                            <el-button type="default" size="mini" @click="editSiteSettings(scope.row)">编辑</el-button>
                            <el-button type="warning" size="mini" @click="goGameList(scope.row)">游戏</el-button>
                            <template v-if="scope.row.state=='1'">
                                <el-button type="danger" size="mini" @click="changeSiteState(scope.row)">禁用</el-button>
                            </template>
                            <template v-if="scope.row.state=='2'">
                                <el-button type="success" size="mini" @click="changeSiteState(scope.row)">启用</el-button>
                            </template>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[10,20,50,100,200]"
                :page-size.sync="queryParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
            <!-- 新建/更新弹框 -->
            <el-dialog :visible.sync="dialog.visible" width="500px" top="5vh" :close-on-click-modal="false">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>{{ dialog.type === 'add' ? '添加账号' : '编辑用户'}}</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <el-row>
                            <el-form label-width="100px" @keyup.native="inputValidate">
                                <el-col :span="24">
                                    <el-form-item label="厅主账号:">
                                        <el-input type="text" size="small" clearable v-model="formData.account"
                                                  :disabled="dialog.accountDisabled"></el-input>
                                    </el-form-item>
                                    <el-form-item label="密码:">
                                        <el-input type="password" size="small" clearable v-model="formData.password"
                                                  v-if="dialog.type == 'add'"></el-input>
                                        <el-input type="password" size="small" clearable v-model="formData.password"
                                                  v-if="dialog.type == 'edit'"></el-input>
                                    </el-form-item>
                                    <el-form-item label="真实姓名:">
                                        <el-input type="text" size="small" clearable v-model="formData.realName"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码:">
                                        <el-input type="text" size="small" clearable
                                                  v-model="formData.phone"></el-input>
                                    </el-form-item>
                                    <el-form-item label="QQ号码:">
                                        <el-input type="text" size="small" clearable v-model="formData.qq"></el-input>
                                    </el-form-item>
                                    <el-form-item label="微信号码:">
                                        <el-input type="text" size="small" clearable
                                                  v-model="formData.weixin"></el-input>
                                    </el-form-item>
                                    <el-form-item label="厅主状态:">
                                        <el-select size="small" style="width: 100%" v-model="formData.state">
                                            <el-option value="1" label="启用">启用</el-option>
                                            <el-option value="2" label="禁用">禁用</el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-form>
                        </el-row>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain :loading="dialog.loading"
                                   @click="dialog.visible=false">取消
                        </el-button>
                        <el-button type="primary" icon="el-icon-success" :loading="dialog.loading"
                                   @click="saveSiteSettings">保存
                        </el-button>
                    </div>
                </div>
            </el-dialog>
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

                //弹框属性
                dialog: {
                    visible: false,
                    loading: false,
                    type: 'add',
                    tableData: [],
                    accountDisabled: false
                },

                //表单信息
                formData: {
                    id: '',
                    account: '',        //厅主账号
                    password: '',
                    realName: '',
                    phone: '',
                    qq: '',
                    weixin: '',
                    state: '1',
                    accountType: '1',
                    siteId: '',
                }
            }
        },
        created() {
            this.queryTableData();
        },
        methods: {
            //获取列表
            queryTableData(type) {
                if (type == "search") {
                    this.pageNum = 1
                    this.queryParams.limit = 10
                    this.queryParams.offset = 0
                }
                this.tableLoading = true
                request.getAccounts(this.queryParams).then(res => {
                    this.tableLoading = false
                    // for(var item of res.rows){
                    //     item.state = String(item.state)
                    // }
                    this.tableData = res.rows;
                    this.total = res.total;
                })
            },
            //添加
            add() {
                this.dialog.type = 'add';
                this.dialog.visible = true;
                this.dialog.accountDisabled = false
                this.setDialogData({
                    state: '1',
                    accountType:'1'
                })
            },
            //编辑按钮
            editSiteSettings(row) {
                this.dialog.type = 'edit';
                this.dialog.visible = true;
                this.dialog.accountDisabled = true
                this.setDialogData(row)
            },
            //formData数据状态
            setDialogData(obj) {
                for (let item in this.formData) {
                    this.formData[item] = obj[item] ? obj[item] : ''
                }
            },
            //保存
            saveSiteSettings() {
                //表单验证
                try {
                    if (this.formData.account === '') {
                        throw '请输入会员账号'
                    } else if (!exp.account.test(this.formData.account)) {
                        throw '请输入6-14位字母加数字的用户账号'
                    }
                    if (this.formData.password === '') {
                        throw '请输入密码'
                    } else if (!exp.pwd.test(this.formData.password)) {
                        throw '请输入6-14位字母加数字的密码'
                    }
                    if(this.formData.phone !== '' && !exp.phone.test(this.formData.phone)){
                        throw '手机号码不可用'
                    }
                    if(this.formData.qq !== '' && !exp.qq.test(this.formData.qq)){
                        throw '请输入5-11位的QQ号码'
                    }
                    if(this.formData.weixin !== '' && !exp.weixin.test(this.formData.weixin)){
                        throw '请输入6-20位的微信号码'
                    }
                }
                catch (e) {
                    this.$message.error(e);
                    return false
                }

                var str = ""
                if (this.dialog.type == "add") {//新增
                    str = "addControlAccount"
                }
                if (this.dialog.type == "edit") {//修改
                    str = "updateControlAccount"
                }
                this.dialog.loading = true
                request[str](this.formData).then(res => {
                    this.dialog.loading = false
                    if (res.code === '200') {
                        this.$notify.success({title:res.msg});
                        this.dialog.visible = false;
                        this.queryTableData();
                    } else {
                        this.$notify.error({title:res.msg})
                    }
                })
            },
            //禁用/启用
            changeSiteState(row) {
                let msg = row.state == '1' ? '确定禁用账号' : '确定启用账号';
                let msgType = row.state == '1' ? 'error' : 'warning';
                this.$confirm(msg, '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    center: true,
                    type: msgType
                }).then(() => {
                    var data = {
                        state: row.state == 1 ? 2 : 1,
                        account: row.account,
                        id: row.id,
                        accountType: 1,
                        isFlag: 1
                    }
                    this.tableLoading = true;
                    request.updateControlAccount(data).then(res => {
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
            //游戏按钮 点击跳转
            goGameList(row) {
                this.$router.push(`/gameList/siteId=${row.siteId}`);
            },
            //点击账号 跳转下级页面
            godown(row) {
                this.$router.push(`/childAccountList/AccountId=${row.id}&name=${row.account}&parentAccountId=${row.parentAccountId}`);
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
            //验证类型不符合置空
            inputValidate(){
                this.formData.realName=this.formData.realName.replace(/[0-9-\/\\!@#%&_=:;"',<>`~^$*+?.()|[\]{}]/g,'');
                this.formData.phone=this.formData.phone.replace(/[^0-9]+/g,'');
                this.formData.qq=this.formData.qq.replace(/[^0-9]+/g,'');
            },
        }
    }
</script>

<style>
.accountclick{color: #008afb;font-weight: 600}
</style>



