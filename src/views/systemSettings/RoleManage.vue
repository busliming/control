<template>
    <div class="card card-primary">
        <div class="card-header">
            <div class="card-text">
                <h3>角色管理</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-form :inline="true" :model="queryParams" label-width="120px">
                    <el-form-item label="角色名称：">
                        <el-input v-model="queryParams.conditionsMap.roleName" clearable size="small"></el-input>
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
                        <el-button type="primary" size="small" icon="el-icon-circle-plus" style="width: 100px" @click="add">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="card-data">
                <el-table ref="mainTable" :height="MAX_TABLE_HEIGHT" :data="tableData" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}" 
                :header-cell-style="{textAlign:'center'}" v-loading='tableLoading'>
                    <el-table-column type="index" label="序号"></el-table-column>
                    <el-table-column prop="roleName" label="角色名称" sortable></el-table-column>
                    <el-table-column prop="croleName" label="角色描述" sortable></el-table-column>
                    <el-table-column prop="" label="操作" width="460" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="default" size="mini" @click="edit(scope.row)">编辑</el-button>
                            <template v-if="scope.row.state=='1'">
                                <el-button type="danger" size="mini" @click="changeState(scope.row)">禁用</el-button>
                            </template>
                            <template v-if="scope.row.state=='2'">
                                <el-button type="success" size="mini" @click="changeState(scope.row)">启用</el-button>
                            </template>
                            <el-button type="warning" size="mini" @click="del(scope.row)">删除</el-button>
                            <el-button type="primary" size="mini" @click="roleControl(scope.row)">权限控制</el-button>
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
                            <h3>{{ dialog.type === 'add' ? '添加角色' : '编辑角色'}}</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <el-row>
                            <el-form label-width="120px">
                                <el-col :span="24">
                                    <el-form-item label="角色名称:">
                                        <el-input type="text" size="small" clearable v-model="formData.roleName"></el-input>
                                    </el-form-item>
                                    <el-form-item label="角色描述:">
                                        <el-input type="text" size="small" clearable v-model="formData.croleName"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-form>
                        </el-row>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain :loading="dialog.loading" @click="dialog.visible=false">取消</el-button>
                        <el-button type="primary" icon="el-icon-success" :loading="dialog.loading" @click="save">保存</el-button>
                    </div>
                </div>
            </el-dialog>
            <!-- 权限列表弹框 -->
            <el-dialog :visible.sync="Roledialog.visible" width="500px" top="5vh" :close-on-click-modal="false">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>权限控制</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <el-tree :data="Roledialog.rolelist" show-checkbox node-key="id" :default-expand-all='true' :default-checked-keys="Roledialog.checkedlist"
                         :props="defaultProps" ref="tree"></el-tree>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain :loading="Roledialog.loading" @click="rolediacancel">取消</el-button>
                        <el-button type="primary" icon="el-icon-success" :loading="Roledialog.loading" @click="rolesave">保存</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import request from '@/requests/systemSettings/RoleManage'

export default {
    props: ['MAX_TABLE_HEIGHT'],
    data(){
        return{
            // 查询条件
            queryParams: {
                conditionsMap: {
                    roleName: "",
                    isAgent: 1
                },
                limit: 10,
                offset: 0,
                sort: 'id',
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
            },
            Roledialog: {
                visible: false,
                loading: false,
                rolelist:[], //所有权限数据列表
                checkedlist:[], //默认选中的权限
                roleId:0,// 权限id
            },

            //表单信息
            formData: {
                croleName: "",
                id: "",
                isAgent: 1,
                roleName: "",
                state: 1,
            },
            
            //tree
            defaultProps: {
                children: 'nodes',
                label: 'text'
            }
        }
    },
    created(){
        this.queryTableData();
    },
    methods:{
        //获取列表
        queryTableData(type){
            if(type == "search"){
                this.queryParams.limit = 10
                this.queryParams.offset = 0
            }
            this.tableLoading = true
            request.getRoles(this.queryParams).then(res => {
                this.tableLoading = false
                this.tableData = res.rows;
                this.total = res.total;
            })
        },
        //添加按钮
        add(){
            this.dialog.type = 'add';
            this.dialog.visible = true;
            this.setDialogData({
                state:1,
                isAgent:1,
            })
        },
        //formData数据状态
        setDialogData(obj) {
            for (let item in this.formData) {
                this.formData[item] = obj[item] ? obj[item] : ''
            }
        },
        //编辑按钮
        edit(row){
            this.dialog.type = 'edit';
            this.dialog.visible = true;
            this.formData.id = row.id
            this.formData.croleName = row.croleName
            this.formData.roleName = row.roleName
        },
        //保存按钮
        save(){
            //表单验证
            try{
                if (this.formData.croleName === '' || this.formData.roleName === '') {
                    throw '请将表单信息填写完整'
                }
            }
            catch (e) {
                this.$message.error(e);
                return false
            }

            this.dialog.loading = true
            request.addOrUpdateRole(this.formData).then(res => {
                this.dialog.loading = false
                if(res.code === '200'){
                    this.$notify.success({title:res.msg});
                    this.dialog.visible = false;
                    this.queryTableData();
                }else{
                    this.$notify.error({title:res.msg});
                }
            })
        },
        //禁用/启用
        changeState(row){
            let data = {
                croleName: row.croleName,
                id:row.id,
                roleName: row.roleName,
                state: row.state == 1 ? 2 : 1
            }
            let str = row.state == 1 ? "确定禁用角色?" : "确定启用角色?"

            this.$confirm(str, '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true,
                type: "warning"
            }).then(() => {
                this.tableLoading = true
                request.addOrUpdateRole(data).then(res => {
                    this.tableLoading = false
                    if(res.code == "200"){
                        this.$notify.success({title:res.msg});
                        this.queryTableData();
                    }else{
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
        //删除按钮
        del(row){
            this.$confirm("是否确定删除", '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true,
                type: "warning"
            }).then(() => {
                this.tableLoading = true
                request.deleteRole({id:row.id}).then(res => {
                    this.tableLoading = false
                    if(res.code == "200"){
                        this.$notify.success({title:res.msg});
                        this.queryTableData();
                    }else{
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
        //权限控制按钮
        roleControl(row){
            this.Roledialog.loading = true
            this.Roledialog.roleId = row.id
            request.roleMenulist({
                id:row.id
            }).then(res => {
                this.Roledialog.loading = false
                this.Roledialog.visible = true
                if(res.code == "200"){
                    var list = []
                    this.Roledialog.rolelist = eval("[" + res.data + "]")  //所有权限列表
                    for(var item of this.Roledialog.rolelist){
                        if(item.state.checked){
                            if(item.nodes){  //有2级菜单的
                                var bool = item.nodes.every(function(i){  //每一个子节点都checked,bool才为true
                                    return i.checked == true
                                })
                                if(bool){  //子节点全为true 则添加父节点ID
                                    list.push(item.id)
                                }else{   //否则添加子节点ID
                                    for(var item2 of item.nodes){
                                        if(item2.state.checked){
                                            list.push(item2.id)
                                        }
                                    }
                                }
                            }else{  //无二级菜单的  如首页
                                list.push(item.id)
                            }
                        }
                    }
                    this.Roledialog.checkedlist = list
                }else{
                    this.$notify.error({title:res.msg});
                }
            })
        },
        //权限弹框取消按钮（重置）
        rolediacancel(){
            this.Roledialog.checkedlist = []
            this.Roledialog.visible=false
        },
        //权限弹框保存按钮
        rolesave(){
            let data = {
                menuList:this.$refs.tree.getCheckedKeys(),
                roleId:this.Roledialog.roleId
            }
            if(this.$refs.tree.getHalfCheckedKeys().length > 0){ //有半选的情况
                data.menuList = data.menuList.concat(this.$refs.tree.getHalfCheckedKeys())
            }

            this.Roledialog.loading = true
            request.roleToMenu(data).then(res => {
                this.Roledialog.loading = false
                if(res.code == '200'){
                    this.$notify.success({title:res.msg});
                    let token = window.sessionStorage.getItem('token')
                    this.$store.dispatch('queryMenu', token) //刷新菜单
                    this.rolediacancel()   //重置
                    this.queryTableData();
                }else{
                    this.$notify.error({title:res.msg});
                }
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
    }
}
</script>


