<template>
    <div class="card card-primary">
        <div class="card-header">
            <div class="card-text">
                <h3>站点管理</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-row>
                    <el-form :inline="true">
                        <el-form-item>
                            <el-button type="success" size="small" icon="el-icon-circle-plus" style="width: 100px" @click="addSiteDomains">
                                新增
                            </el-button>
                            <el-button type="danger" size="small" icon="el-icon-delete" style="width: 100px" :loading="deleting" @click="batchDeleteDomains">
                                批量删除
                            </el-button>
                            <el-button type="warning" size="small" style="width: 100px" @click="changeAllState">
                                批量禁用
                            </el-button>
                            <el-button type="primary" size="small" style="width: 100px" @click="editAgentDomain">
                                代理域名
                            </el-button>
                            <el-button size="small" style="width: 100px" @click="goPush">
                                推广域名
                            </el-button>
                            <el-button type="info" size="small" icon="el-icon-back" style="width: 100px" @click="goBack">
                                返回上级
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-row>
            </div>
            <div class="card-data">
                <el-table :height="MAX_TABLE_HEIGHT" :data="tableData" @selection-change="handleSelectionChange" style="width: 100%" size="medium" stripe
                :cell-style="{textAlign:'center'}" :header-cell-style="{textAlign:'center'}" v-loading='tableLoading'>
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="domainUrl" label="站点域名">
                        <template slot-scope="scope">
                            <a style="text-decoration:underline;color:#008afb" @click="see(scope.row.domainUrl)">{{scope.row.domainUrl}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" v-if="scope.row.defaultTag != 1" @click="editRowData(scope.row)">编辑</el-button>
                            <template v-if="scope.row.status=='1'">
                                <el-button type="warning" size="mini" v-if="scope.row.defaultTag != 1" @click="changeDomainState(scope.row)">禁用</el-button>
                            </template>
                            <template v-if="scope.row.status=='0'">
                                <el-button type="success" size="mini" v-if="scope.row.defaultTag != 1" @click="changeDomainState(scope.row)">启用</el-button>
                            </template>
                            <el-button type="danger" size="mini" v-if="scope.row.defaultTag != 1" @click="deleteTableRow(scope.row)">删除</el-button>
                            <el-button type="info" size="mini" @click="viewDomainDetails(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[10,20,50]"
                :page-size.sync="queryParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
            <!--添加主域名弹框-->
            <el-dialog :visible.sync="addDomains.visible" width="520px" :close-on-click-modal="false">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>添加主域名</h3>
                        </div>
                    </div>
                    <div class="dialog-body" style="padding: 20px 40px">
                        <template v-for="(row,index) in addDomains.rowCount">
                            <el-row :key="index">
                                <el-form :inline="true">
                                    <el-form-item label="域名：">
                                        <el-input type="text" size="small" clearable v-model="addDomains.inputVal[index]"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button size="small" type="danger" :disabled="addDomains.rowCount===1" @click="deleteRow(index)">删除</el-button>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button size="small" type="primary" icon="el-icon-plus" @click="addRow(index)">添加</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-row>
                        </template>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain :loading="addDomains.loading" @click="addDomains.visible=false">取消</el-button>
                        <el-button type="primary" icon="el-icon-success" :loading="addDomains.loading" @click="updateSiteDomains">保存</el-button>
                    </div>
                </div>
            </el-dialog>
            <!--编辑弹框-->
            <el-dialog :visible.sync="editDomain.visible" width="500px" :close-on-click-modal="false">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>修改主域名</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <el-form label-width="100px">
                            <el-form-item label="域名：">
                                <el-input type="text" size="small" clearable v-model="editDomain.data.domainUrl"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain :loading="editDomain.loading" @click="editDomain.visible=false">取消</el-button>
                        <el-button type="primary" icon="el-icon-success" :loading="editDomain.loading" @click="updateRowData">保存</el-button>
                    </div>
                </div>
            </el-dialog>
            <!--查看弹框-->
            <el-dialog :visible.sync="domainInfo.visible" width="550px" :close-on-click-modal="false">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>查看域名</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <el-form label-width="150px">
                            <el-form-item label="PC门户域名：">
                                <el-input type="text" size="small" readonly v-model="domainInfo.data.pcPortal"></el-input>
                            </el-form-item>
                            <el-form-item label="H5门户域名：">
                                <el-input type="text" size="small" readonly v-model="domainInfo.data.h5Portal"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="primary" @click="domainInfo.visible=false">关闭</el-button>
                    </div>
                </div>
            </el-dialog>
            <!--代理域名弹框-->
            <el-dialog :visible.sync="editAgent.visible" width="500px" :close-on-click-modal="false">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>修改代理域名</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <el-form label-width="100px">
                            <el-form-item :label="item.label" v-for="(item,index) in agentList" :key="index">
                                <el-input type="text" size="small" clearable v-model="item.url"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain :loading="editAgent.loading" @click="editAgent.visible=false">取消</el-button>
                        <el-button type="primary" icon="el-icon-success" :loading="editAgent.loading" @click="updateAgentDomain">保存</el-button>
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
                //查询条件
                queryParams: {
                    limit: 10,
                    offset: 0,
                    siteId: '',
                    sort: "siteId",
                    sortOrder: "desc"
                },
                //分页属性
                pageNum: 1,
                pageSize: 10,
                total: 0,
                // 删除按钮loading状态
                deleting: false,
                // 域名列表属性
                tableData: [],
                tableLoading: false,
                selectedRows: [],
                // 添加域名弹框属性
                addDomains: {
                    visible: false,
                    loading: false,
                    rowCount: 1,
                    inputVal: []
                },
                // 编辑代理域名弹框的属性
                editAgent: {
                    loading: false,
                    visible: false,
                    data: {
                        domainUrls:[],
                        siteId: ''
                    }
                },
                agentList:[//代理域名弹框列表
                    {label:'域名',url:''},
                    {label:'备用域名',url:''},
                    {label:'备用域名',url:''},
                    {label:'备用域名',url:''},
                    {label:'备用域名',url:''},
                    {label:'备用域名',url:''},
                ], 
                // 编辑列表的数据的属性
                editDomain: {
                    visible: false,
                    loading: false,
                    data: {
                        defaultTag: '',
                        domainUrl: '',
                        siteId: '',
                        id: '',
                        domainGroupId: ''
                    }
                },
                // 查看域名信息的弹框
                domainInfo: {
                    visible: false,
                    loading: false,
                    data: {
                        pcPortal: '',
                        h5Portal: '',
                    }
                }
            }
        },
        created() {
            this.queryParams.siteId = parseInt(this.$route.params.siteId);
            this.queryTableData();
        },
        methods: {
            // 获取表格数据
            queryTableData() {
                this.tableLoading = true;
                request.getMainSiteDomainList(this.queryParams).then(res => {
                    this.tableLoading = false;
                    this.tableData = res.rows;
                    this.total = res.total;
                }).catch(e => {
                    this.$notify.error({title:e});
                })
            },
            // 批量添加代理域名
            addSiteDomains() {
                this.addDomains.rowCount = 1;
                this.addDomains.inputVal = [];
                this.addDomains.visible = true
            },
            //新增一条
            addRow() {
                if (this.addDomains.rowCount < 5) {
                    this.addDomains.rowCount++;
                } else {
                    this.$message.error('只能添加五条数据')
                }
            },
            //删除一条
            deleteRow(i) {
                let count = this.addDomains.rowCount;
                let input = this.addDomains.inputVal;
                this.addDomains.rowCount--;
                for (let k in this.addDomains.inputVal) {
                    if (k > i && k < count) {
                        this.addDomains.inputVal[k - 1] = input[k];
                    }
                }
                this.addDomains.inputVal.splice(count-1 , 1)
            },
            //添加弹框保存按钮
            updateSiteDomains() {
                let list = this.addDomains.inputVal;
                let params = {
                    domains: [],
                    siteId: this.queryParams.siteId
                };
                let err = [false, ''];
                if (list.length === 0) {
                    err = [true, '请输入域名！'];
                } else {
                    for (let i in list) {
                        if (list[i].trim() === '') {
                            err = [true, '请输入域名！'];
                            break
                        } else if (list[i].indexOf('http:') !== -1 || list[i].indexOf('www.') !== -1) {
                            err = [true, '输入域名不能带www.或者http:前缀！'];
                            break
                        }
                        params.domains.push({
                            defaultTag: 0,
                            domainUrl: list[i].trim(),
                            siteId: this.queryParams.siteId
                        });
                    }
                }
                if (err[0] === true) {
                    this.$message.warning(err[1]);
                    return;
                }
                params.domains[0].defaultTag = this.total < 1 ? 1 : 0;
                this.addDomains.loading = true;
                request.addSiteDomainInfo(params).then(res => {
                    this.addDomains.loading = false;
                    if (res.code === '200') {
                        this.$notify.success({title:res.msg});
                        this.addDomains.visible = false;
                        this.queryTableData()
                    } else {
                        this.$notify.error({title:res.msg});
                    }
                })
            },
            //批量删除按钮
            batchDeleteDomains() {
                if (this.selectedRows.length < 1) {
                    this.$message.warning('请勾选站点！');
                    return;
                }
                let selectedSites = [];
                for (let i in this.selectedRows) {
                    selectedSites.push(this.selectedRows[i].domainGroupId)
                }
                this.$confirm('是否确定删除当前域名？', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    center: true,
                    type: 'warning'
                }).then(() => {
                    let data = {
                        groupIds: selectedSites,
                        siteId: this.queryParams.siteId
                    };
                    this.deleting = true;
                    request.delSiteDomainInfo(data).then(res => {
                        this.deleting = false;
                        if (res.code === '200') {
                            this.$notify.success({title:res.msg});
                            this.queryTableData();
                        } else {
                            this.$notify.error({title:res.msg})
                        }
                    })
                }).catch(() => {});
            },
            // 代理域名按钮
            editAgentDomain() {
                this.editAgent.visible = true;
                request.getSiteAgentDomain({siteId: this.queryParams.siteId}).then(res => {
                    if (res.code === '200') {
                        for(var i in res.data){
                            this.agentList[i].url = res.data[i].domainUrl
                        }
                    } else {
                        this.$notify.error({title:res.msg})
                    }
                })
            },
            //代理域名保存按钮
            updateAgentDomain() {
                try {
                    for(var item of this.agentList){
                        if (item.label == '域名' && item.url.trim() === '') {
                            throw '首条代理域名不得为空';
                        }
                        if (item.url.indexOf('www.') !== -1 || item.url.indexOf('http:') !== -1) {
                            throw '输入域名不能带www.或者http:前缀！'
                        }
                    }
                }
                catch (e) {
                    this.$message.warning(e);
                    return;
                }

                this.editAgent.data.domainUrls = []
                this.editAgent.data.siteId = this.queryParams.siteId
                for(var item of this.agentList){
                    if(item.url){
                        this.editAgent.data.domainUrls.push(item.url)
                    }
                }
                this.editAgent.loading = true;
                request.addOrUpdateAgentDomain(this.editAgent.data).then(res => {
                    this.editAgent.loading = false;
                    if (res.code === '200') {
                        this.editAgent.visible = false;
                        this.$notify.success({title:res.msg});
                    } else {
                        this.$notify.error({title:res.msg});
                    }
                })
            },
            //返回上级按钮
            goBack() {
                this.$router.push('/siteManage')
            },
            //外链跳转
            see(url){
                window.open('http://www.'+url)
            },
            //跳转推广域名
            goPush(){
                this.$router.push({
                    path: `/siteManage/pushUrl/siteId=${this.queryParams.siteId}`
                })
            },
            //编辑按钮
            editRowData(row) {
                for (let i in this.editDomain.data) {
                    this.editDomain.data[i] = row[i]
                }
                this.editDomain.visible = true;
            },
            //编辑弹框保存按钮
            updateRowData() {
                this.editDomain.loading = true;
                this.editDomain.data.domainUrl = this.editDomain.data.domainUrl.trim()
                request.editSiteDomainInfo(this.editDomain.data).then(res => {
                    this.editDomain.loading = false;
                    if (res.code === '200') {
                        this.$notify.success({title:res.msg});
                        this.editDomain.visible = false;
                        this.queryTableData();
                    } else {
                        this.$notify.error({title:res.msg})
                    }
                });
            },
            //禁用/启用按钮
            changeDomainState(row) {
                let msg = row.status == 1 ? '确定禁用当前选中的域名吗？禁用后，将无法访问' : '确定启用该域名吗？';
                this.$confirm(msg, '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    center: true,
                    type: 'warning'
                }).then(() => {
                    var list = []
                    list.push(row.domainGroupId)
                    let params = {
                        groupIds: list,
                        siteId: row.siteId,
                        status: (row.status == 1) ? 0 : 1
                    };
                    this.tableLoading = true;
                    request.enabledSiteDomain(params).then(res => {
                        this.tableLoading = false;
                        if (res.code === '200') {
                            this.$notify.success({title:res.msg});
                            this.queryTableData();
                        } else {
                            this.$notify.error({title:res.msg})
                        }
                    })
                }).catch(() => {});
            },
            //批量禁用按钮
            changeAllState(){
                if (this.selectedRows.length < 1) {
                    this.$message.warning('请勾选站点！');
                    return;
                }

                let msg = '确定禁用当前选中的域名吗？禁用后，将无法访问(当前共选中'+ this.selectedRows.length +'条)';
                this.$confirm(msg, '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    center: true,
                    type: 'warning'
                }).then(() => {
                    var list = []
                    for(var item of this.selectedRows){
                        list.push(item.domainGroupId)
                    }
                    let params = {
                        groupIds: list,
                        siteId: this.queryParams.siteId,
                        status: 0
                    };
                    this.tableLoading = true;
                    request.enabledSiteDomain(params).then(res => {
                        this.tableLoading = false;
                        if (res.code === '200') {
                            this.$notify.success({title:res.msg});
                            this.queryTableData();
                        } else {
                            this.$notify.error({title:res.msg})
                        }
                    })
                }).catch(() => {});
            },
            //删除按钮
            deleteTableRow(row) {
                if (row.status == 1) {
                    this.$message.warning('请禁用域名后再删除');
                    return false;
                }
                this.$confirm('是否确定删除当前域名？', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    center: true,
                    type: 'warning'
                }).then(() => {
                    let params = {
                        groupIds: [row.domainGroupId],
                        siteId: row.siteId
                    };
                    this.tableLoading = true;
                    request.delSiteDomainInfo(params).then(res => {
                        this.tableLoading = false;
                        if (res.code === '200') {
                            this.$notify.success({title:res.msg});
                            this.queryTableData();
                        } else {
                            this.$notify.error({title:res.msg})
                        }
                    })
                }).catch(() => {});
            },
            //查看按钮
            viewDomainDetails(row) {
                this.tableLoading = true;
                request.getMainSiteDomainDetail({
                    domainGroupId: row.domainGroupId,
                    siteId: row.siteId
                }).then(res => {
                    this.tableLoading = false;
                    if (res.code === '200') {
                        for (let i in res.data) {
                            if (res.data[i].domainType === '3') {
                                this.domainInfo.data.pcPortal = res.data[i].domainUrl;
                            }
                            if (res.data[i].domainType === '5') {
                                this.domainInfo.data.h5Portal = res.data[i].domainUrl;
                            }
                        }
                        this.domainInfo.visible = true;
                    } else {
                        this.$notify.error({title:res.msg})
                    }
                });
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
        },
    }
</script>
