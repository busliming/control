<template>
    <div class="card card-primary">
        <div class="card-header">
            <div class="card-text">
                <h3>终端银行控制</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-form :inline="true">
                    <el-form-item>
                        <el-button type="primary" size="small" icon="el-icon-circle-plus" style="width: 100px" @click="add">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="card-data">
                <el-table ref="mainTable" :height="MAX_TABLE_HEIGHT" :data="tableData" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}" 
                :header-cell-style="{textAlign:'center'}" v-loading='tableLoading'>
                    <el-table-column prop="bankName" label="银行名称" sortable></el-table-column>
                    <el-table-column prop="bankOrder" label="排序" sortable></el-table-column>
                    <el-table-column prop="state" label="状态" sortable>
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.state == 1">启用</el-tag>
                            <el-tag type="danger" v-else-if="scope.row.state == 0">停用</el-tag>
                            <el-tag type="info" v-else>未知状态</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="操作" width="380" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="default" size="mini" @click="editSiteSettings(scope.row)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[10,20,50,100,200]" 
                :page-size.sync="queryParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
            <!-- 新建/编辑弹框 -->
            <el-dialog :visible.sync="dialog.visible" width="500px" top="5vh" :close-on-click-modal="false">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>{{ dialog.type === 'add' ? '新增' : '编辑'}}</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <el-row>
                            <el-form label-width="120px">
                                <el-col :span="24">
                                    <el-form-item label="银行名称:">
                                        <el-input type="text" size="small" clearable v-model="formData.bankName"></el-input>
                                    </el-form-item>
                                    <el-form-item label="排序:">
                                        <el-input type="tel" size="small" clearable v-model.number="formData.bankOrder"></el-input>
                                    </el-form-item>
                                    <el-form-item label="状态:">
                                        <el-select size="small" style="width: 100%" v-model="formData.state">
                                            <el-option :value="1" label="启用">启用</el-option>
                                            <el-option :value="0" label="停用">停用</el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-form>
                        </el-row>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain :loading="dialog.loading" @click="dialog.visible=false">取消</el-button>
                        <el-button type="primary" icon="el-icon-success" :loading="dialog.loading" @click="saveSiteSettings">保存</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import request from '@/requests/systemSettings/BankingControl'

export default {
    props: ['MAX_TABLE_HEIGHT'],
    data(){
        return{
            // 查询条件
            queryParams: {
                limit: 10,
                offset: 0,
                order: "asc"
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

            //表单信息
            formData: {
                bankName: "",
                bankOrder: "",
                id: "",
                state: "",
            }
        }
    },
    created(){
        this.queryTableData();
    },
    methods:{
        //获取列表
        queryTableData(type){
            this.tableLoading = true
            request.getAllBankList(this.queryParams).then(res => {
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
            })
        },
        //formData数据状态
        setDialogData(obj) {
            for (let item in this.formData) {
                if(item == 'state'){
                    this.formData[item] = Number(obj[item])
                }else{
                    this.formData[item] = obj[item] ? obj[item] : ''
                }
            }
        },
        //编辑按钮
        editSiteSettings(row){
            this.dialog.type = 'edit';
            this.dialog.visible = true;
            this.setDialogData(row)
        },
        //保存按钮
        saveSiteSettings(){
            //表单验证
            try{
                if (this.formData.bankName === '' || this.formData.bankOrder === '') {
                    throw '请将表单信息填写完整'
                }
            }
            catch (e) {
                this.$message.error(e);
                return false
            }

            this.dialog.loading = true
            request.addOrUpdateBank(this.formData).then(res => {
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
        //删除按钮
        del(row){
            this.$confirm("是否确定删除", '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true,
                type: "warning"
            }).then(() => {
                this.tableLoading = true
                request.deleteByBankId({bankId:row.id*1}).then(res => {
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


