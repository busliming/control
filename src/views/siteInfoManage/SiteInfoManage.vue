<template>
    <div class="card card-primary">
        <div class="card-header">
            <div class="card-text">
                <h3>消息列表</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-form :inline="true" :model="queryParams" label-width="120px">
                    <el-form-item label="邮件类型：">
                        <el-select v-model="queryParams.conditionsMap.type" clearable size="small">
                            <el-option value="" label="全部">全部</el-option>
                            <el-option value="1" label="系统邮件">系统邮件</el-option>
                            <el-option value="2" label="维护邮件">维护邮件</el-option>
                            <el-option value="3" label="站点邮件">站点邮件</el-option>
                            <el-option value="4" label="一般邮件">一般邮件</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="时间选择：">
                        <el-date-picker size="small" v-model="datetimerange" type="datetimerange"
                                        value-format="yyyy-MM-dd HH:mm:ss" range-separator="~" start-placeholder="开始时间"
                                        end-placeholder="结束时间"></el-date-picker>
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
                    <el-table-column prop="noticeTitle" label="邮件标题" sortable></el-table-column>
                    <el-table-column prop="noticeContent" label="邮件内容" sortable></el-table-column>
                    <el-table-column prop="state" label="状态">
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.state =='1'">启用</el-tag>
                            <el-tag type="danger" v-else-if="scope.row.state =='2'">禁用</el-tag>
                            <el-tag type="info" v-else>未知状态</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createDate" label="发布时间" sortable></el-table-column>
                    <el-table-column prop="" label="站点" width="100">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="seedetail(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createBy" label="创建人" sortable></el-table-column>
                    <el-table-column prop="remark" label="备注" sortable></el-table-column>
                    <el-table-column prop="type" label="类型" sortable>
                        <template slot-scope="scope">
                            <el-tag type="primary" v-if="scope.row.type =='1'">系统邮件</el-tag>
                            <el-tag type="danger" v-if="scope.row.type =='2'">维护邮件</el-tag>
                            <el-tag type="warning" v-if="scope.row.type =='3'">站点邮件</el-tag>
                            <el-tag type="info" v-if="scope.row.type =='4'">一般邮件</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="操作" width="220" fixed="right">
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
            <!-- 添加邮件弹框 -->
            <el-dialog :visible.sync="dialog.visible" width="850px" top="5vh" :before-close="dia1back" :close-on-click-modal="false">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>{{ dialog.type === 'add' ? '添加邮件' : '编辑邮件'}}</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <el-row>
                            <el-form label-width="100px">
                                <el-col :span="18">
                                    <el-form-item label="邮件标题:">
                                        <el-input type="text" size="small" clearable v-model="formData.noticeTitle"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮件内容:">
                                        <el-input type="textarea" size="small" clearable v-model="formData.noticeContent" resize="both" rows="5"></el-input>
                                    </el-form-item>
                                    <el-form-item label="选择站点:">
                                        <div class="sites-box">
                                            <el-checkbox v-model="dialog.checkAll" @change="handleCheckAllChange"
                                            v-if="dialog.siteList && dialog.siteList.length > 1">全选</el-checkbox>
                                            <div style="margin: 5px 0;"></div>
                                            <el-checkbox-group v-model="dialog.checkedSites" @change="handleCheckedSitesChange" style="display:flex;flex-flow: row wrap;">
                                                <el-checkbox v-for="site in dialog.siteList" :label="site" :key="site.siteId" style="margin-left:0;width:20%">
                                                    {{site.siteName}}
                                                </el-checkbox>
                                            </el-checkbox-group>
                                        </div>
                                    </el-form-item>
                                    <el-form-item label="备注:">
                                        <el-input type="text" size="small" clearable v-model="formData.remark"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮件类型:">
                                        <el-select size="small" style="width: 100%" v-model="formData.type">
                                            <el-option value="1" label="系统邮件">系统邮件</el-option>
                                            <el-option value="2" label="维护邮件">维护邮件</el-option>
                                            <el-option value="3" label="站点邮件">站点邮件</el-option>
                                            <el-option value="4" label="一般邮件">一般邮件</el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="邮件状态:">
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
                        <el-button type="danger" icon="el-icon-error" plain :loading="dialog.loading" @click="dia1back">取消</el-button>
                        <el-button type="primary" icon="el-icon-success" :loading="dialog.loading" @click="saveSiteSettings">保存</el-button>
                    </div>
                </div>
            </el-dialog>
            <!-- 站点查看弹框 -->
            <el-dialog :visible.sync="siteDialog.visible" width="850px" top="5vh" :before-close="dia2back" :close-on-click-modal="false">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>发送到以下站点</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <el-row>
                            <el-form label-width="10px">
                                <el-col :span="18">
                                    <el-form-item label=" ">
                                        <div class="sites-box2">
                                            <el-checkbox v-for="site in siteDialog.checked" :label="site" :key="site.siteId" style="margin-left:0;width:20%" :checked="true" :disabled="true">
                                                {{site.siteName}}
                                            </el-checkbox>
                                        </div>
                                    </el-form-item>
                                </el-col>
                            </el-form>
                        </el-row>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain :loading="siteDialog.loading" @click="dia2back">取消</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import request from '@/requests/siteInfoManage'

export default {
    props: ['MAX_TABLE_HEIGHT'],
    data() {
        return {
            // 查询条件
            datetimerange: [],
            queryParams: {
                conditionsMap: {
                    type: '',       //邮件类型
                    beginDate: '',      //开始时间
                    endDate: '',     //结束时间
                    isAgent: 1,
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

            //添加邮件弹框属性
            dialog: {
                visible: false,
                loading: false,
                checkAll: false,
                type: 'add',
                checkedSites: [],
                siteList: [],
            },
            //查看站点弹框属性
            siteDialog: {
                visible: false,
                loading: false,
                checked: [],
            },

            //表单信息
            formData: {
                id: "",
                noticeTitle: "",
                noticeContent: "",
                remark: "",
                type: "",
                state: "1",
                isAgent: 1,
                isEmail: 1,
                conditionsMap: {
                    siteList: [],//被选中的框
                }
            }
        }
    },
    created() {
        this.queryTableData()
    },
    methods: {
        //查询列表
        queryTableData(type) {
            if (type == "search") {
                this.pageNum = 1
                this.queryParams.limit = 10
                this.queryParams.offset = 0
            }
            this.tableLoading = true;
            this.queryParams.conditionsMap.beginDate = this.datetimerange ? this.datetimerange[0] : '';
            this.queryParams.conditionsMap.endDate = this.datetimerange ? this.datetimerange[1] : '';
            request.getNotices(this.queryParams).then(res => {
                this.tableLoading = false;
                this.tableData = res.rows;
                this.total = res.total;
            })
        },
        //添加
        add() {
            this.dialog.type = 'add';
            this.dialog.loading = true;
            this.setDialogData({state: '1'})
            this.dialog.visible = true;
            this.formData.id = ""
            request.getSiteList({}).then(res => {
                this.dialog.loading = false;
                this.dialog.siteList = res.data;
            })
        },
        //添加/修改邮件保存按钮
        saveSiteSettings() {
            this.formData.conditionsMap.siteList = []
            for (var item of this.dialog.checkedSites) {
                this.formData.conditionsMap.siteList.push(String(item.siteId))
            }

            //表单验证
            try{
                if(this.formData.noticeTitle === ''){
                    throw '请输入消息标题!'
                }
                if(this.formData.noticeContent === ''){
                    throw '请输入消息内容!'
                }
                if(this.formData.conditionsMap.siteList.length == 0){
                    throw '请选择发送站点!'
                }
                if(this.formData.type === ''){
                    throw '请选择消息类型!'
                }
            }
            catch (e) {
                this.$message.error(e);
                return false
            }

            this.dialog.loading = true
            request.addOrUpdateNotice(this.formData).then(res => {
                this.dialog.loading = false
                if (res.code === '200') {
                    this.$notify.success({title:res.msg});
                    this.dia1back()
                    this.queryTableData();
                } else {
                    this.$notify.error({title:res.msg})
                }
            })
        },
        //查看按钮
        seedetail(row) {
            this.siteDialog.visible = true;
            this.siteDialog.loading = true;
            request.getSiteList({id: row.id}).then(res => {
                this.siteDialog.loading = false;
                for (var item of res.data) {
                    if (item.flag === "0") {
                        this.siteDialog.checked.push(item)
                    }
                }
            })
        },
        //编辑按钮
        editSiteSettings(row) {
            this.dialog.type = 'edit';
            this.dialog.loading = true;
            this.setDialogData(row)
            request.getSiteList({id: row.id}).then(res => {
                this.dialog.visible = true;
                this.dialog.loading = false;
                if (res.code === '200'){
                    this.dialog.siteList = res.data;
                    for (var item of this.dialog.siteList) {
                        if (item.flag === "0") {
                            this.dialog.checkedSites.push(item)
                            if(this.dialog.checkedSites.length == this.dialog.siteList.length){
                                this.dialog.checkAll = true
                            }
                        }
                    }
                } else {
                    this.$notify.error({title:res.msg})
                }
            })
        },
        //formData数据状态
        setDialogData(obj) {
            for (let item in this.formData) {
                if (item == 'state') {
                    this.formData[item] = String(obj[item])
                } else if (item == 'conditionsMap') {
                    this.formData[item] = {
                        siteList: []
                    }
                } else if (item == "isAgent" || item == "isEmail") {
                    this.formData[item] = 1
                }
                else {
                    this.formData[item] = obj[item] ? obj[item] : ''
                }
            }
        },
        //删除按钮
        del(row) {
            this.$confirm("是否确定删除", '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true,
                type: "warning"
            }).then(() => {
                this.tableLoading = true
                request.deleteNotice({
                    id:row.id,
                }).then(res => {
                    this.tableLoading = false
                    if(res.code == "200"){
                        this.$notify.success({title:res.msg});
                        this.queryTableData();
                    }else{
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
        //新增编辑弹框取消按钮
        dia1back(){
            this.dialog.visible=false
            this.dialog.checkAll = false
            this.dialog.checkedSites = []
        },
        //查看弹框取消按钮
        dia2back(){
            this.siteDialog.visible = false
            this.siteDialog.checked = []
        },
        // 全选/全不选
        handleCheckAllChange(val) {
            this.dialog.checkedSites = val ? this.dialog.siteList : [];
        },
        handleCheckedSitesChange(value) {
            let checkedCount = value.length;
            this.dialog.checkAll = checkedCount === this.dialog.siteList.length;
        },
        currentChangeHandle(activePage) {  //表格显示页数改变
            this.pageNum = activePage;
            this.queryParams.offset = (activePage - 1) * this.queryParams.limit;
            this.queryTableData();
        },
        sizeChangeHandle(size) {  //表格显示条数改变
            this.queryParams.limit = size;
            this.queryTableData();
        },
    }
}
</script>

<style lang="scss" scoped>
.custom-dialog {
    .sites-box {
        width: 140%;
        max-height: 350px;
        overflow-y: scroll;
        border: 1px solid #e2e2e2;
        border-radius: 5px;
        padding: 20px;
        margin-top: 10px;
    }
    .sites-box2 {
        width: 140%;
        max-height: 660px;
        overflow-y: scroll;
        border: 1px solid #e2e2e2;
        border-radius: 5px;
        padding: 20px;
        margin-top: 10px;
    }
}
</style>


