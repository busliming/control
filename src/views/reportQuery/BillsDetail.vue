<template>
    <div class="card card-primary">
        <div class="card-header">
            <div class="card-text">
                <h3>账单详情</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-form :inline="true" label-width="120px">
                    <el-form-item label="占成比例(%)：">
                        <el-input clearable size="small" v-model="proportionAll"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button type="primary" size="small" style="width: 100px;margin-left:20px" @click="allSave(1)" :loading="btnLoading">保存</el-button>
                    </el-form-item>
                    <el-form-item label="维护费用：">
                        <el-input clearable size="small" v-model="costAll"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button type="primary" size="small" style="width: 100px;margin-left:20px" @click="allSave(2)" :loading="btnLoading">保存</el-button>
                    </el-form-item>
                    <el-form-item label=" ">
                        <el-button class="search-btn" type="primary" size="small" @click="exportOut" :loading="btnLoading">导出</el-button>
                        <a v-if="src" :href="src" :download="downloadname" @click="src=''">
                            <el-tag type="" style='background: #fff;'>导出成功，点击下载</el-tag>
                        </a>
                    </el-form-item>
                </el-form>
                <hr/>
                <el-form :inline="true">
                    <el-form-item>
                        <el-button type="info" size="small" icon="el-icon-back" style="width: 100px" @click="$router.push({path:'/companyBills'})">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="card-data">
                <el-table ref="mainTable" :max-height="MAX_TABLE_HEIGHT" :data="tableData" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
                :header-cell-style="{textAlign:'center'}" v-loading='tableLoading' @selection-change="changeFun">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="billNo" label="账单号"></el-table-column>
                    <el-table-column prop="billName" label="账单名称"></el-table-column>
                    <el-table-column prop="occupyProportion" label="占成比例"></el-table-column>
                    <el-table-column prop="totalBillProfit" label="总盈亏"></el-table-column>
                    <el-table-column prop="occupyAmount" label="占成金额"></el-table-column>
                    <el-table-column prop="maintenanceAmount" label="维护费用"></el-table-column>
                    <el-table-column prop="totalBillAmount" label="应付总账单金额">
                        <template slot-scope="scope">
                            {{scope.row.totalBillAmount + '('+ scope.row.maintenanceDay +'天)'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="payState" label="付款状态">
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.payState =='1'">已付款</el-tag>
                            <el-tag type="danger" v-else-if="scope.row.payState =='2'">未付款</el-tag>
                            <el-tag type="info" v-else>未知状态</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="操作" fixed="right" width="280">
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" v-if="scope.row.payState == '2'" @click="surePay(scope.row)">确认付款</el-button>
                            <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
                            <el-button type="primary" size="mini" @click="remark(scope.row)">账单备注</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[10,20,50,100,200]"
                :page-size.sync="queryParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
            <!-- 编辑弹框 -->
            <el-dialog :visible.sync="dialog.editvisible" width="500px" top="5vh" :close-on-click-modal="false">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>编辑</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <el-row>
                            <el-form label-width="100px">
                                <el-col :span="22">
                                    <el-form-item label="占成比例(%):">
                                        <el-input type="text" size="small" clearable v-model="proportion"></el-input>
                                    </el-form-item>
                                    <el-form-item label="维护费用:">
                                        <el-input type="text" size="small" clearable v-model="cost"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-form>
                        </el-row>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain :loading="dialog.editloading" @click="dialog.editvisible=false">取消</el-button>
                        <el-button type="primary" icon="el-icon-success" :loading="dialog.editloading" @click="saveEdit">保存</el-button>
                    </div>
                </div>
            </el-dialog>
            <!-- 备注弹框 -->
            <el-dialog :visible.sync="dialog.remarkvisible" width="500px" top="5vh" :close-on-click-modal="false">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>账单备注</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <el-row>
                            <el-form label-width="60px">
                                <el-col :span="24">
                                    <el-form-item label="备注:">
                                        <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-form>
                        </el-row>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain :loading="dialog.remarkloading" @click="dialog.remarkvisible=false">取消</el-button>
                        <el-button type="primary" icon="el-icon-success" :loading="dialog.remarkloading" @click="saveRemark">保存</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import request from '@/requests/reportQuery'

export default {
    props: ['MAX_TABLE_HEIGHT'],
    data(){
        return{
            // 查询条件
            queryParams: {
                conditionsMap: {
                    siteId:this.$route.params.siteId,
                },
                limit: 10,
                offset: 0,
                sort: 'createDate',
                sortOrder: 'desc',
            },

            // 列表属性
            tableData:[],
            tableLoading: false,

            //分页属性
            pageNum: 1,
            pageSize: 10,
            total: 0,

            //弹框属性
            dialog: {
                editvisible: false,
                editloading: false,
                remarkvisible: false,
                remarkloading: false,
            },
            id:'',//数据Id
            btnLoading:false,
            proportionAll:'',//批量修改占成比例
            costAll:'',//批量修改费用
            proportion:'',   //占成比例(单条数据)
            cost:'',  //费用(单条数据)
            textarea:'', //备注
            totalWin:'',//总盈亏
            checkList:[],
            src:'',  //导出的地址
        }
    },
    created(){
        this.queryTableData()
    },
    computed:{
        downloadname:{
            get(){
                // 获取当前日期
                let date = new Date();
                // 获取当前月份
                let nowMonth = date.getMonth() + 1;
                // 获取当前是几号
                let strDate = date.getDate();
                // 添加分隔符“-”
                let seperator = "-";
                // 对月份进行处理，1-9月在前面添加一个“0”
                if (nowMonth >= 1 && nowMonth <= 9) {
                nowMonth = "0" + nowMonth;
                }
                // 对月份进行处理，1-9号在前面添加一个“0”
                if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
                }
                // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
                let nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
                return '公司账单详情'+nowDate+'.xls'
            },
            set(){}
        }
    },
    methods:{
        //获取列表
        queryTableData(){
            request.getBill(this.queryParams).then(res => {
                for(var item of res.rows){
                    item.occupyProportion = item.occupyProportion*100+"%"
                    item.totalBillProfit = parseInt(item.totalBillProfit/10)/100;
                    item.occupyAmount = parseInt(item.occupyAmount/10)/100;
                    item.maintenanceAmount = parseInt(item.maintenanceAmount/10)/100;
                    item.totalBillAmount = parseInt(item.totalBillAmount/10)/100;
                }
                this.tableData = res.rows
                this.total = res.total
            })
        },
        //编辑按钮
        edit(row){
            this.dialog.editvisible = true
            this.id = row.id
            this.proportion = row.occupyProportion.split('%')[0]
            this.cost = row.maintenanceAmount
            this.totalWin = row.totalBillProfit
        },
        //编辑保存
        saveEdit(){
            try {
                if(!this.proportion){
                    throw '占成比例不得为空'
                }
                if(!this.cost){
                    throw '维护费用不得为空'
                }
            }
            catch (e) {
                this.$message({
                    type: 'error',
                    message:e
                });
                return false
            }

            this.dialog.editloading = true
            var data = {
                id:this.id,
                updateType:3,
                occupyProportion:this.proportion/100,
                maintenanceAmount:this.cost*1000,
                totalBillProfit:this.totalWin*1000
            }
            request.updateBill(data).then(res => {
                this.dialog.editloading = false
                if(res.code == '200'){
                    this.$notify.success({title:res.msg})
                    this.dialog.editvisible = false
                    this.queryTableData();
                }else{
                    this.$notify.error({title:res.msg});
                }
            })
        },
        //备注按钮
        remark(row){
            this.dialog.remarkvisible = true
            this.id = row.id
            this.textarea = row.remark
        },
        //修改备注保存
        saveRemark(){
            this.dialog.remarkloading = true
            var data = {
                id:this.id,
                remark:this.textarea,
                updateType:5
            }
            request.updateBill(data).then(res => {
                this.dialog.remarkloading = false
                if(res.code == '200'){
                    this.$notify.success({title:res.msg})
                    this.dialog.remarkvisible = false
                    this.queryTableData();
                }else{
                    this.$notify.error({title:res.msg});
                }
            })
        },
        //确认付款
        surePay(row){
            this.$confirm("确定要更改付款状态吗？", '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true,
                type: "warning"
            }).then(() => {
                this.tableLoading = true
                var data = {
                    id:row.id,
                    payState:1,
                    updateType:4
                }
                request.updateBill(data).then(res => {
                    this.tableLoading = false
                    console.log(res)
                    if(res.code == '200'){
                        this.$notify.success({title:res.msg})
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
        //批量修改保存
        allSave(num){
            try {
                if (this.checkList.length <= 0) {
                    throw '请先勾选需要更改的数据'
                }
                if(num == 1 && !this.proportionAll){
                    throw '占成比例不得为空'
                }
                if(num == 2 && !this.costAll){
                    throw '维护费用不得为空'
                }
            }
            catch (e) {
                this.$message({
                    type: 'error',
                    message:e
                });
                return false
            }

            let list = []
            for (let item of this.checkList) {
                list.push(item.id)
            }
            let data = {
                conditionsMap:{
                    idList:list
                },
                updateType:num
            }
            if(num == 1){
                data.occupyProportion = this.proportionAll/100
            }
            if(num == 2){
                data.maintenanceAmount = this.costAll*1000
            }
            this.btnLoading = true
            request.updateBill(data).then(res => {
                this.btnLoading = false
                // console.log(res)
                if(res.code == '200'){
                    this.proportionAll = ''
                    this.costAll = ''
                    this.$notify.success({title:res.msg})
                    this.queryTableData();
                }else{
                    this.$notify.error({title:res.msg});
                }
            })
        },
        //导出
        exportOut(){
            let data = {
                conditionsMap:{},
                siteId:this.$route.params.siteId
            }
            this.btnLoading = true
            request.comBillExport(data).then(res => {
                this.btnLoading = false
                if(res.code != 300 && res.code != 520){
                    let type = 'application/msexcel,charset=uft-8';
                    let blob = new Blob([res], {type: type});
                    let URL = window.URL || window.webkitURL;
                    let objectUrl = URL.createObjectURL(blob);
                    this.src = objectUrl;
                    console.log(this.src)
                }else{
                    this.$notify.error({title:res.msg});
                }
            })
        },
        //selection-change
        changeFun(val) {
            // console.log(val)
            this.checkList = val;
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

