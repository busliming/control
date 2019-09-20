<template>
    <div class="card card-primary">
        <div class="card-header">
            <div class="card-text">
                <h3>总控菜单管理</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-form :inline="true" label-width="120px">
                    <el-form-item label="菜单名称：">
                        <el-input v-model="menuName" clearable size="small"></el-input>
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
                <el-table ref="mainTable" :height="MAX_TABLE_HEIGHT" :data="tableData" style="width: 100%;" size="medium" stripe v-loading='tableLoading'>
                    <el-table-column prop="id" label="id" align="center"></el-table-column>
                    <el-table-column prop="menuName" label="名称" header-align="center">
                        <template slot-scope="scope">
                            <span :style="'margin-right:10px;margin-left:'+scope.row.margin">{{ scope.row.menuName }}</span>
                            <i class="el-icon-arrow-down" style="font-weight:bolder;" v-if="scope.row.list && scope.row.list.length>0 && scope.row.arrow == 'down'" @click="toggle(scope.row)"></i>
                            <i class="el-icon-arrow-right" style="font-weight:bolder;" v-if="scope.row.list && scope.row.list.length>0 && scope.row.arrow == 'right'" @click="toggle(scope.row)"></i>
                        </template>
                    </el-table-column>
                    <el-table-column prop="menuLevel" label="上级ID" align="center"></el-table-column>
                    <el-table-column prop="menuIcon" label="图标" align="center"></el-table-column>
                    <el-table-column prop="menuUrl" label="地址" align="center"></el-table-column>
                    <el-table-column prop="" label="操作" width="250" fixed="right" align="center">
                        <template slot-scope="scope">
                            <el-button type="warning" size="mini" @click="edit(scope.row)">修改</el-button>
                            <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 新建/更新弹框 -->
            <el-dialog :visible.sync="dialog.visible" width="500px" top="5vh" :close-on-click-modal="false">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>{{ dialog.type === 'add' ? '添加菜单' : '修改菜单'}}</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <el-row>
                            <el-form label-width="120px">
                                <el-col :span="24">
                                    <el-form-item label="菜单名称:">
                                        <el-input type="text" size="small" clearable v-model="formData.menuName"></el-input>
                                    </el-form-item>
                                    <el-form-item label="父菜单Id:">
                                        <el-input type="text" size="small" clearable v-model="formData.menuLevel"></el-input>
                                    </el-form-item>
                                    <el-form-item label="排序:">
                                        <el-input type="text" size="small" clearable v-model="formData.menuSort"></el-input>
                                    </el-form-item>
                                    <el-form-item label="是否是菜单:">
                                        <el-select size="small" style="width: 100%" v-model="formData.menuIstrue">
                                            <el-option value="" label="请选择">请选择</el-option>
                                            <el-option value="1" label="是">是</el-option>
                                            <el-option value="2" label="不是">不是</el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="菜单图标:">
                                        <el-input type="text" size="small" clearable v-model="formData.menuIcon"></el-input>
                                    </el-form-item>
                                    <el-form-item label="URL:">
                                        <el-input type="text" size="small" clearable v-model="formData.menuUrl"></el-input>
                                    </el-form-item>
                                    <el-form-item label="权限名称:">
                                        <el-input type="text" size="small" clearable v-model="formData.menuShiro"></el-input>
                                    </el-form-item>
                                    <el-form-item label="菜单标识:" v-if="dialog.type === 'add'">
                                        <el-input type="text" size="small" clearable v-model="formData.menuModule"></el-input>
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
        </div>
    </div>
</template>

<script>
import request from '@/requests/systemSettings/AgentMenuSettings'

export default {
    props: ['MAX_TABLE_HEIGHT'],
    data(){
        return{
            // 查询条件
            menuName: "",

            // 列表属性
            tableData: [],
            tableLoading: false,

            //弹框属性
            dialog: {
                visible: false,
                loading: false,
                type: 'add',
            },

            //表单信息
            formData: {
                id: "",
                isAgent: 1,
                menuIcon: "",
                menuIstrue: "",
                menuLevel: 0,
                menuName: "",
                menuShiro: "",
                menuSort: "",
                menuUrl: "",
                menuModule:"",
            }
        }
    },
    created(){
        this.queryTableData();
    },
    methods:{
        //获取列表
        queryTableData(type){
            let data = {}
            if(type == "search" && this.menuName){
                data = {isAgent:1,menuName:this.menuName}
            }else{
                data = {isAgent:1}
            }
            this.tableLoading = true
            request.permissionList(data).then(res => {
                this.tableLoading = false
                this.addarrow(res,"20px")
                for(var item of res){
                    if(item.list){
                        this.addarrow(item.list,"40px")
                        for(var item2 of item.list){
                            if(item2.list){
                                this.addarrow(item2.list,"60px")
                            }
                        }
                    }
                }
                this.tableData = res;
            })
        },
        //添加箭头及margin
        addarrow(arr,num){
            for(var i = 0 ;i < arr.length; i++){
                if(arr[i].list){
                    arr[i].arrow = "right"
                    for(var j = 0;j<arr[i].list.length;j++){
                        arr[i].list[j].margin = num
                    }
                }
                if(arr[i].menuLevel == 0){ //一级菜单不位移
                    arr[i].margin = 0
                }
            }
        },
        //展开关闭子菜单
        toggle(row) {
            if (row.arrow == "right") {
                row.arrow = "down"
                for (var i = 0; i < this.tableData.length; i++) {
                    if (this.tableData[i].id == row.id) {
                        for (var j = 0; j < this.tableData[i].list.length; j++) {
                            this.tableData.splice(i + 1, 0, this.tableData[i].list[j])
                        }
                    }
                }
            } else {
                row.arrow = "right"
                for (var i = this.tableData.length - 1; i >= 0; i--) {
                    if (this.tableData[i].menuLevel == row.id) {
                        this.tableData.splice(i, 1)
                    }
                    this.closeMenu(row.list, i);
                }
            }
        },
        closeMenu(list, idx) {
            if(list.length > 0){
                for (var i = list.length - 1; i >= 0; i--) {
                    if (this.tableData[idx] && this.tableData[idx].menuLevel == list[i].id) {
                        this.tableData.splice(idx, 1);
                        if (list[i].arrow == "down") {
                            list[i].arrow = "right"
                        }
                    }
                    this.closeMenu(list[i].list, idx)
                }
            }
        },
        //添加按钮
        add(){
            this.dialog.type = 'add';
            this.dialog.visible = true;
            this.setDialogData({
                isAgent: 1,
                menuLevel: 0,
            })
        },
        //formData数据状态
        setDialogData(obj) {
            for (let item in this.formData) {
                this.formData[item] = obj[item] != null && obj[item] != undefined  ? obj[item] : ''
            }
        },
        //修改
        edit(row){
            this.dialog.type = 'edit';
            this.dialog.visible = true;
            row.menuIstrue = row.menuIstrue ? String(row.menuIstrue) : ""
            this.setDialogData(row)
        },
        //删除
        del(row){
            this.$confirm("是否确定删除", '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true,
                type: "warning"
            }).then(() => {
                this.tableLoading = true
                request.deleteMenu({
                    id:row.id,
                    isAgent:1
                }).then(res => {
                    this.tableLoading = false
                    if(res.code == "200"){
                        let token = window.sessionStorage.getItem('token')
                        this.$store.dispatch('queryMenu', token)  //刷新菜单
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
        //保存按钮
        save(){
            //表单验证
            try{
                if (this.formData.menuName === '') {
                    throw '请输入菜单名称'
                }
                if (this.formData.menuSort === '') {
                    throw '请输入排序'
                }
                if (this.formData.menuIstrue === '') {
                    throw '请选择是否是菜单'
                }
                if (this.formData.menuShiro === '') {
                    throw '请输入权限名称'
                }
                if (this.formData.menuModule === '') {
                    throw '请输入菜单标识'
                }
            }
            catch (e) {
                this.$message.error(e);
                return false
            }

            this.dialog.loading = true
            request.addOrUpdateMenu(this.formData).then(res => {
                this.dialog.loading = false
                if(res.code === '200'){
                    let token = window.sessionStorage.getItem('token')
                    this.$store.dispatch('queryMenu', token)  //刷新菜单
                    this.$notify.success({title:res.msg});
                    this.dialog.visible = false;
                    this.queryTableData();
                }else{
                    this.$notify.error({title:res.msg});
                }
            })
        }
    }
}
</script>


