<template>
    <div class="card card-primary">
        <div class="card-header">
            <div class="card-text">
                <h3>支付入款列表</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-form :inline="true" :model="queryParams" label-width="120px">
                    <el-form-item label="入款渠道：">
                        <el-input v-model="queryParams.conditionsMap.payName" clearable size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="入款类型：">
                        <el-select v-model="queryParams.conditionsMap.bankType" clearable  size="small">
                            <el-option value="" label="全部">全部</el-option>
                            <el-option :value="item.payType" :label="item.payName" v-for="(item,index) in selectlist" :key="index">{{item.payName}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态：">
                        <el-select v-model="queryParams.conditionsMap.status" clearable  size="small">
                            <el-option value="" label="全部">全部</el-option>
                            <el-option value="1" label="正常">正常</el-option>
                            <el-option value="0" label="停用">停用</el-option>
                        </el-select>
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
                    <el-table-column prop="id" label="id"></el-table-column>
                    <el-table-column prop="payName" label="入款渠道" sortable></el-table-column>
                    <el-table-column prop="bankType" label="入款类型" sortable :formatter="bankTypeFilter"></el-table-column>
                    <!-- <el-table-column prop="bankType" label="入款类型" sortable>
                         <template slot-scope="scope">
                            <span v-if="scope.row.bankType =='1'">网银</span>
                            <span v-else-if="scope.row.bankType =='2'">微信扫码</span>
                            <span v-else-if="scope.row.bankType =='3'">手机网银</span>
                            <span v-else-if="scope.row.bankType =='4'">手机微信</span>
                            <span v-else-if="scope.row.bankType =='5'">支付宝扫码</span>
                            <span v-else-if="scope.row.bankType =='6'">手机支付宝</span>
                            <span v-else-if="scope.row.bankType =='7'">QQ扫码</span>
                            <span v-else-if="scope.row.bankType =='8'">手机QQ</span>
                            <span v-else-if="scope.row.bankType =='9'">财付通扫码</span>
                            <span v-else-if="scope.row.bankType =='10'">银联扫码</span>
                            <span v-else-if="scope.row.bankType =='11'">京东钱包</span>
                            <span v-else-if="scope.row.bankType =='12'">手机银联APP</span>
                            <span v-else-if="scope.row.bankType =='13'">手机京东</span>
                            <span v-else-if="scope.row.bankType =='14'">百度钱包</span>
                            <span v-else-if="scope.row.bankType =='15'">手机百度钱包</span>
                            <span v-else-if="scope.row.bankType =='17'">快捷支付</span>
                            <span v-else>未知</span>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="pageCallbackUrl" label="渠道同步回调地址" sortable></el-table-column>
                    <el-table-column prop="notifyCallbackUrl" label="渠道异步回调地址" sortable></el-table-column>
                    <el-table-column prop="paySendUrl" label="渠道请求路径" sortable></el-table-column>
                    <el-table-column prop="status" label="状态" sortable>
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
                            <el-tag type="danger" v-else-if="scope.row.status == 0">停用</el-tag>
                            <el-tag type="info" v-else>未知状态</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="操作" width="220" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="default" size="mini" @click="editSiteSettings(scope.row)">编辑</el-button>
                            <el-button type="primary" size="mini" v-if="scope.row.bankType == '1' || scope.row.bankType == '3'" @click="banklist(scope.row)">银行编码</el-button>
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
                            <h3>{{ dialog.type === 'add' ? '添加入款渠道' : '编辑信息'}}</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <el-row>
                            <el-form label-width="120px">
                                <el-col :span="24">
                                    <el-form-item label="入款渠道:">
                                        <el-input type="text" size="small" clearable v-model="formData.payName"></el-input>
                                    </el-form-item>
                                    <el-form-item label="支付请求地址:">
                                        <el-input type="text" size="small" clearable v-model="formData.paySendUrl"></el-input>
                                    </el-form-item>
                                    <el-form-item label="同步回调地址:">
                                        <el-input type="text" size="small" clearable v-model="formData.pageCallbackUrl"></el-input>
                                    </el-form-item>
                                    <el-form-item label="异步回调地址:">
                                        <el-input type="text" size="small" clearable v-model="formData.notifyCallbackUrl"></el-input>
                                    </el-form-item>
                                    <el-form-item label="订单查询地址:">
                                        <el-input type="text" size="small" clearable v-model="formData.queryOrderGateway"></el-input>
                                    </el-form-item>
                                    <el-form-item label="支付类型:">
                                        <el-select size="small" style="width: 100%" v-model="formData.bankType">
                                            <el-option :value="item.payType" :label="item.payName" v-for="(item,index) in selectlist" :key="index">{{item.payName}}</el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="请求方式:">
                                        <el-select size="small" style="width: 100%" v-model="formData.paySendMethod">
                                            <el-option value="POST" label="POST">POST</el-option>
                                            <el-option value="GET" label="GET">GET</el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="状态:">
                                        <el-select size="small" style="width: 100%" v-model="formData.status">
                                            <el-option :value="1" label="启用">启用</el-option>
                                            <el-option :value="0" label="禁用">禁用</el-option>
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
            <!-- 添加银行编码弹框 -->
            <el-dialog :visible.sync="bankDialog.visible" width="800px" top="5vh" :close-on-click-modal="false">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>添加银行编码映射</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <div class="checkbox-group-wrapper">
                            <el-table ref="bankTable" :height="600" :data="bankData" style="width: 100%" size="medium" stripe @selection-change="handleBankSelection"
                            :cell-style="{textAlign:'center'}" :header-cell-style="{textAlign:'center'}" v-loading='bankDialog.loading'>
                                <el-table-column type="selection" width="55"></el-table-column>
                                <el-table-column prop="bankName" label="银行名称"></el-table-column>
                                <el-table-column prop="bankCode" label="银行编码">
                                    <template slot-scope="scope">
                                        <el-input type="text" size="small" v-model="scope.row.bankCode"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain :loading="bankDialog.loading" @click="bankDialog.visible=false">取消</el-button>
                        <el-button type="primary" icon="el-icon-success" :loading="bankDialog.loading" @click="banksave">保存</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import request from '@/requests/systemSettings/PaymentSettings'

export default {
    props: ['MAX_TABLE_HEIGHT'],
    data(){
        return{
            // 查询条件
            queryParams: {
                conditionsMap: {
                    bankType: "",
                    payName: "",
                    status: ""
                },
                limit: 10,
                offset: 0,
                sort: 'id',
                sortOrder: 'desc',
            },

            // 列表属性
            tableData: [],
            tableLoading: false,
            selectlist:[], //搜索处下拉框数据
            bankData:[], //银行列表数据
            paySystemId:0,//银行数据ID

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
            },
            bankDialog:{
                visible: false,
                loading: false,
                multipleSelection :[], //选中
            },

            //表单信息
            formData: {
                bankType: "",
                id: "",
                notifyCallbackUrl: "",
                pageCallbackUrl: "",
                payName: "",
                paySendMethod: "",
                paySendUrl: "",
                queryOrderGateway: "",
                status: "",
            }
        }
    },
    created(){
        this.queryTableData();
        this.getselect();
    },
    methods:{
        //获取列表
        queryTableData(type){
            if(type == "search"){
                this.queryParams.limit = 10
                this.queryParams.offset = 0
            }
            this.tableLoading = true
            request.getPaySystemList(this.queryParams).then(res => {
                this.tableLoading = false
                this.tableData = res.rows;
                this.total = res.total;
            })
        },
        //获取select列表
        getselect(){
            request.availableChannel().then(res => {
                if(res.code == "200"){
                    this.selectlist = res.data
                }else{
                    this.$notify.error({title:res.msg});
                }
            })
        },
        //添加按钮
        add(){
            this.dialog.type = 'add';
            this.dialog.visible = true;
            this.setDialogData({
                status:1,
                paySendMethod:'POST',
                bankType: 3
            })
        },
        //formData数据状态
        setDialogData(obj) {
            for (let item in this.formData) {
                if(item == 'status'){
                    this.formData[item] = obj[item] ? obj[item] : 0
                }else{
                    this.formData[item] = obj[item] ? obj[item] : ''
                }
            }
        },
        //保存按钮
        saveSiteSettings(){
            //表单验证
            try{
                if (this.formData.payName === '' || this.formData.paySendUrl === '' || this.formData.pageCallbackUrl === '' || this.formData.notifyCallbackUrl === '' || this.formData.queryOrderGateway === '') {
                    throw '请将表单信息填写完整'
                }
            }
            catch (e) {
                this.$message.error(e);
                return false
            }
            if(this.formData.bankType == "手机网银"){
                this.formData.bankType = '3'
            }
            if(this.formData.bankType == "手机微信"){
                this.formData.bankType = '4'
            }
            if(this.formData.bankType == "手机支付宝"){
                this.formData.bankType = '6'
            }
            if(this.formData.bankType == "手机QQ"){
                this.formData.bankType = '8'
            }
            if(this.formData.bankType == "手机京东"){
                this.formData.bankType = '13'
            }
            if(this.formData.bankType == "快捷支付"){
                this.formData.bankType = '17'
            }

            this.dialog.loading = true
            request.addOrUpdatePaySystem(this.formData).then(res => {
                this.dialog.loading = false
                if(res.code === '200'){
                    let str = this.dialog.type == 'add' ? "新建成功" : "更新成功"
                    this.$notify.success({title:str});
                    this.dialog.visible = false;
                    this.queryTableData();
                }else{
                    this.$notify.error({title:res.msg});
                }
            })
        },
        //编辑按钮
        editSiteSettings(row){
            this.dialog.type = 'edit';
            this.dialog.visible = true;
            this.setDialogData(row)
        },
        //获取银行列表
        banklist(row){
            this.bankDialog.visible = true;
            this.bankDialog.loading = true
            this.paySystemId = row.id
            request.queryAllBankList({
                drawOrPay: "2",
                paySystemId: row.id
            }).then(res => {
                this.bankDialog.loading = false
                if(res.code === '200'){
                    this.$nextTick(() =>{ //默认选中
                        for(var item of res.data){
                            if(item.bankCode){
                                this.$refs.bankTable.toggleRowSelection(item,true)
                            }
                        }
                    })
                    this.bankData = res.data
                }else{
                    this.$notify.error({title:res.msg});
                }
            })
        },
        //银行列表保存按钮
        banksave(){
            //表单验证
            try{
                if ( this.bankDialog.multipleSelection.length == 0) {
                    throw '请选择要修改的银行数据'
                }
            }
            catch (e) {
                this.$message.error(e);
                return false
            }
            for(var i = 0;i<this.bankDialog.multipleSelection.length;i++){
                this.bankDialog.multipleSelection[i].mappingCode = this.bankDialog.multipleSelection[i].bankCode
                this.bankDialog.multipleSelection[i].paySystemId = this.paySystemId
                this.bankDialog.multipleSelection[i].drawOrPay = 2
            }

            this.bankDialog.loading = true
            request.addOrUpdateBankCode(this.bankDialog.multipleSelection).then(res => {
                this.bankDialog.loading = false
                if(res.code === '200'){
                    this.$notify.success({title:res.msg});
                    this.bankDialog.visible = false;
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
        handleBankSelection(val) {
            this.bankDialog.multipleSelection = val;
        },
        //表格入款类型格式化
        bankTypeFilter(row){
          let val = row.bankType;
          let arr = this.selectlist.map(item => {
            if(item.payType == val){ 
              return item.payName 
            }
          })
          return arr.join('');
        }
    }
}
</script>

