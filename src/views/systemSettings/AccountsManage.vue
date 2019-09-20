<template>
    <div class="card card-primary">
        <div class="card-header">
            <div class="card-text">
                <h3>总控账号管理</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-form :inline="true" :model="queryParams" label-width="80px">
                    <el-form-item label="账号：">
                        <el-input placeholder="请输入账号" clearable size="small" v-model="queryParams.conditionsMap.account"></el-input>
                    </el-form-item>
                    <el-form-item label=" ">
                        <el-button class="search-btn" type="primary" size="small" @click="queryTableData('search')">
                            <i class="el-icon-search"></i>
                            搜索
                        </el-button>
                    </el-form-item>
                </el-form>
                <hr/>
                <el-form :inline="true">
                    <el-form-item>
                        <el-button type="primary" size="small" icon="el-icon-circle-plus" style="width: 100px" @click="createAccount">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="card-data">
                <el-table :height="MAX_TABLE_HEIGHT" :data="tableData" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
                :header-cell-style="{textAlign:'center'}" v-loading='tableLoading'>
                    <el-table-column sortable type="index" label="序号" width="50"></el-table-column>
                    <el-table-column sortable prop="account" label="用户账号"></el-table-column>
                    <el-table-column sortable prop="realName" label="真实姓名"></el-table-column>
                    <el-table-column sortable prop="roleName" label="用户角色"></el-table-column>
                    <el-table-column sortable prop="createDate" label="创建时间"></el-table-column>
                    <el-table-column sortable prop="state" label="状态">
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.state =='1'">正常</el-tag>
                            <el-tag type="danger" v-else-if="scope.row.state =='2'">冻结</el-tag>
                            <el-tag type="info" v-else>未知状态</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="default" size="mini" @click="editAccount(scope.row)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="deleteAccount(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[10,20,50,100,200]"
                :page-size.sync="queryParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
            <!--添加弹框-->
            <el-dialog :visible.sync="dialog.visible" width="500px" :close-on-click-modal="false">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>{{ dialog.type === 'add' ? '添加总控账号' : '编辑总控账号' }}</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <el-form label-width="120px" :model="formData" ref="formData">
                            <el-form-item label="用户账号:" prop="account">
                                <el-input type="text" size="small" v-model="formData.account" clearable="" maxlength="14" :disabled="dialog.type==='edit'"></el-input>
                            </el-form-item>
                            <el-form-item label="密码:" prop="password">
                                <el-input type="password" size="small" v-model="formData.password" clearable=""></el-input>
                            </el-form-item>
                            <el-form-item label="用户名称:" prop="realName">
                                <el-input type="text" v-model="formData.realName" size="small" clearable="" maxlength="30"></el-input>
                            </el-form-item>
                            <el-form-item label="用户角色:" prop="roleName">
                                <el-select v-model="formData.roleId" size="small" clearable placeholder="用户角色" style="width:100%">
                                    <el-option v-for="item in roleNameptions" :key="item.id" :value="item.id" :label="item.roleName"></el-option>
                                </el-select>
                            </el-form-item>
                            <!--<h1>{{formData.roleId}}</h1>-->
                            <el-form-item label="用户状态:" prop="state">
                                <el-select v-model="formData.state" size="small" clearable placeholder="用户状态" style="width:100%">
                                    <el-option :value="1" label="正常"></el-option>
                                    <el-option :value="2" label="冻结"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain @click="dialog.visible=false">取消</el-button>
                        <el-button type="primary" icon="el-icon-success" :loading="dialog.loading" @click="updateAccount">保存</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import exp from '@/tools/regexp'
import request from '@/requests/systemSettings/AccountsManage'

export default {
    props: ['MAX_TABLE_HEIGHT'],
    data() {
        return {
            queryParams: {
                conditionsMap: {
                    account: '',
                    accountType: '0',//0：总控账号，1：厅主账号，2：会员账号，11厅主子账号，09总控子账号
                    sort: "createDate",
                    sortOrder: "desc",
                },
                limit: 10,
                offset: 0,
            },
            // 列表属性
            tableData: [],
            multipleSelection: [],
            tableLoading: false,
            //分页属性
            pageNum: 1,
            pageSize: 10,
            total: 0,

            roleName: '',
            roleNameptions: [],//用户角色
            //弹框属性
            dialog: {
                visible: false,
                loading: false,
                type: 'add',
            },
            //添加账户表单
            formData: {
                id: '',
                account: '',
                password: '',
                realName: '',
                roleName: '',
                roleId: null,
                state: '',
                accountType: '0'
            },
        }
    },
    methods: {
        //搜索/获取会员列表
        queryTableData(type) {
            if(type == 'search') {
                this.pageNum = 1;
                this.queryParams.offset = 0;
                this.queryParams.limit = 10
            }
            this.tableLoading = true;
            request.getUsers(this.queryParams).then(res => {
                this.tableLoading = false;
                this.tableData = res.rows;
                this.total = res.total
            })
        },
        //点击添加账号弹框
        createAccount() {
            this.dialog.type = 'add';
            this.setDialogData({'state':1});
            this.dialog.visible = true;
        },
        //点击编辑弹窗
        editAccount(row) {
            this.dialog.type = 'edit';
            this.setDialogData(row);
            this.dialog.visible = true;
        },
        setDialogData(obj) {
            for (let i in this.formData) {
                this.formData[i] = obj[i] ? obj[i] : ''
            }
            this.formData.accountType = '0';
        },
        //添加账号方法
        updateAccount() {
            try {
                if (this.formData.account.trim() === '') {
                    throw '请输入会员账号'
                } else if (!exp.account.test(this.formData.account)) {
                    throw '请输入6-14位字母加数字的用户账号'
                }
                else {
                    if (this.formData.password.trim() === '') {
                        throw '请输入账户密码';
                    } else if (!exp.pwd.test(this.formData.password)) {
                        throw '请输入6-14位字母加数字的密码';
                    }
                }
                if (this.formData.realName.trim() === '') {
                    throw '请输入用户名称'
                }
                if (this.formData.roleId === '') {
                    throw '请选择用户角色'
                }
                if (this.formData.state === '') {
                    throw '请选择用户状态'
                }
            }
            catch (e) {
                this.$message.error(e);
                return false
            }
            this.dialog.loading = true;
            if (this.formData.id) {//如果有id请求编辑接口
                request.updateControlAccount(this.formData).then(res => {
                    this.dialog.loading = false;
                    if (res.code === '200') {
                        this.dialog.visible = false;
                        this.$notify.success({title:res.msg});
                        this.queryTableData()
                    } else {
                        this.$notify.error({title:res.msg});
                    }
                })
            } else {//如果没有请求新增接口
                request.addControlAccount(this.formData).then(res => {
                    this.dialog.loading = false;
                    if (res.code === '200') {
                        this.dialog.visible = false;
                        this.$notify.success({title:res.msg});
                        this.queryTableData()
                    } else {
                        this.$notify.error({title:res.msg});
                    }
                })
            }
        },
        //删除
        deleteAccount(row) {
            this.$confirm('确定删除用户吗?', '信息', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                request.deleteUser(data).then(res => {
                    if (res.code === '200') {
                        this.$notify.success({title:res.msg});
                        this.queryTableData();
                    }else{
                        this.$notify.error({title:res.msg});
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
            let data = {
                accountType: '0',
                conditionsMap: {
                    idList: row.id
                }
            }
        },
        //获取用户角色列表
        roleNameList() {
            let data = {
                limit: 100,
                offset: 0,
                sort: "id",
                sortOrder: "desc",
                conditionsMap: {
                    isAgent: 1,
                    state: this.state
                }
            };
            request.getRoles(data).then(res => {
                this.roleNameptions = res.rows.filter(item => item.state == 1)
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
    },
    created() {
        //获取用户列表
        this.queryTableData();
        //获取用户角色列表
        this.roleNameList();
    }
}
</script>

